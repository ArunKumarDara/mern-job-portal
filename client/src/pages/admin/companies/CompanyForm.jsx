/* eslint-disable react/prop-types */
import { Input, Form, InputNumber, Upload, message } from "antd";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompany, updateCompany } from "../../../apiCalls/company";

const { TextArea } = Input;

const CompanyForm = ({
  setOpenDrawer,
  selectedCompany,
  setSelectedCompany,
}) => {
  const [fileList, setFileList] = useState([]);
  const queryClient = useQueryClient();
  const isEdit = Object.keys(selectedCompany).length;
  const { logo, ...initialValues } = selectedCompany;

  const mutationFn = isEdit ? updateCompany : addCompany;

  const { mutate: mutateCompany, isPending } = useMutation({
    mutationFn,
    onSuccess: (response) => {
      setOpenDrawer(false);
      setSelectedCompany({});
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      message.success(response.message);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = (values) => {
    const payload = { ...values, logo: fileList };
    if (isEdit) {
      payload.id = selectedCompany._id;
    }
    mutateCompany(payload);
  };

  const handleUploadChange = (info) => {
    setFileList(info?.fileList[0].originFileObj);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={isEdit ? initialValues : {}}
    >
      <Form.Item
        label="Company Name"
        name="name"
        rules={[{ required: true, message: "please enter company name" }]}
      >
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Website" name="website">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Location" name="location">
        <Input size="large" />
      </Form.Item>
      <Form.Item label="Employees" name="employees">
        <InputNumber size="large" className="w-full" />
      </Form.Item>
      <Form.Item
        label="Logo"
        name="logo"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload
          name="logo"
          listType="picture"
          maxCount={1}
          onChange={handleUploadChange}
          beforeUpload={() => false}
        >
          <button
            type="button"
            className="font-semibold text-white bg-[#6A38C2] rounded-md mb-3 p-2 hover:shadow-md"
          >
            <UploadOutlined /> Upload Logo
          </button>
        </Upload>
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
            "UPDATE COMPANY"
          ) : (
            "ADD COMPANY"
          )}
        </button>
      </Form.Item>
    </Form>
  );
};

export default CompanyForm;
