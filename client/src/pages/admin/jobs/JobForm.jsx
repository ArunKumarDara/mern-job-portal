/* eslint-disable react/prop-types */
import { Input, Form, InputNumber, message, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Loading from "../../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "../../../apiCalls/company";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addJob, updateJob } from "../../../apiCalls/job";

const { TextArea } = Input;

const JobForm = ({ setOpenDrawer, selectedJob, setSelectedJob }) => {
  const queryClient = useQueryClient();
  const isEdit = Object.keys(selectedJob).length;
  const mutationFn = isEdit ? updateJob : addJob;
  const {
    data: companies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
  });

  const { mutate: mutateJob, isPending } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      setOpenDrawer(false);
      setSelectedJob({});
      queryClient.invalidateQueries({ queryKey: ["adminJobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      message.success(response.message);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = (values) => {
    if (isEdit) {
      values.id = selectedJob._id;
    }
    mutateJob(values);
  };

  if (error) return <p>Error fetching latest jobs: {error.message}</p>;

  const selectedCompany = companies?.data?.find(
    (company) => company._id === selectedJob.company._id
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={
            isEdit
              ? {
                  ...selectedJob,
                  requirements: selectedJob.requirements.join(","),
                }
              : {}
          }
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "please enter job title" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Company"
            name="companyId"
            rules={[{ required: true, message: "please enter company name" }]}
            initialValue={isEdit ? selectedJob?.company?._id : undefined}
          >
            <Select
              size="large"
              placeholder="Select Company"
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={companies.data.map((company) => ({
                value: company._id,
                label: company.name,
              }))}
              defaultValue={selectedCompany ? selectedCompany?.name : undefined}
            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "please enter description" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Requirements" name="requirements">
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "please enter job location" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Salary"
            name="salary"
            rules={[{ required: true, message: "please enter salary" }]}
          >
            <InputNumber size="large" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Job Type"
            name="jobType"
            rules={[{ required: true, message: "please enter job type" }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Experience Level"
            name="experienceLevel"
            rules={[
              { required: true, message: "please enter expected experience" },
            ]}
          >
            <InputNumber size="large" className="w-full" />
          </Form.Item>
          <Form.Item
            label="Positions"
            name="positions"
            rules={[
              { required: true, message: "please enter number of positions" },
            ]}
          >
            <InputNumber size="large" className="w-full" />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="w-full font-semibold text-white bg-[#6A38C2] rounded-md mb-3 p-3 hover:shadow-md"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoadingOutlined style={{ marginRight: 8 }} />
                  {isEdit ? "UPDATING..." : "ADDING..."}
                </>
              ) : isEdit ? (
                "UPDATE JOB"
              ) : (
                "ADD JOB"
              )}
            </button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default JobForm;
