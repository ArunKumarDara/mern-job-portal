/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Form, Input, message, Select } from "antd";
import { updateProfile } from "../apiCalls/user";
import { getAllCompanies } from "../apiCalls/company";
import Loading from "../components/Loading";
import { useState } from "react";

const UpdateProfile = ({ setOpen, userData }) => {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const {
    data: companies,
    error: companyError,
    isLoading: companiesLoading,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
  });

  const { mutate: mutateProfile } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      message.success(response.message);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const onFinish = (values) => {
    mutateProfile(values);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleChange = (value) => {
    setSelectedCompany(value);
  };

  if (companiesLoading) return <Loading />;
  if (companyError) return <div>Error: {companyError.message}</div>;

  return (
    <>
      <Form
        layout="vertical"
        initialValues={{
          ...userData,
          bio: userData.profile?.bio,
          skills: userData.profile?.skills.join(","),
          company: selectedCompany,
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Name" name="fullName">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input disabled size="large" />
        </Form.Item>
        <Form.Item label="Phone Number" name="phoneNumber">
          <Input size="large" />
        </Form.Item>
        <Form.Item label="Bio" name="bio">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Skills" name="skills">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Current Company" name="company">
          <Select
            showSearch
            value={selectedCompany}
            placeholder="Search Your Company"
            size="large"
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={companies.data
              .filter((company) =>
                company.name.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((d) => ({
                value: d._id,
                label: d.name,
              }))}
          />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="w-full font-semibold text-white bg-[#6A38C2] rounded-md mb-3 p-3 hover:shadow-md"
          >
            UPDATE
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProfile;
