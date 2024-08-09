import { Edit, useForm, useSelect } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { AutoComplete, Form, Input, Select } from "antd";
import { useState } from "react";

export const ActivityEdit = () => {
  const {
    formProps,
    saveButtonProps,
    formLoading,
    query: experienceData,
  } = useForm({});

  // const [experienceSearch, setExperienceSearch] = useState("");
  // const [selectedExperience, setSelectedExperience] = useState(
  //   experienceData?.data?.data.experience
  // );

  // const { data } = useList({
  //   resource: "experiences",
  //   filters: [
  //     {
  //       field: "q",
  //       value: experienceSearch,
  //       operator: "contains",
  //     },
  //   ],
  // });

  const { selectProps: experiencesSelectProps } = useSelect({
    resource: "experiences",
    optionLabel: "title",
    optionValue: "id",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form
        {...{
          ...formProps,
          initialValues: {
            ...formProps.initialValues,
            start_date: formProps.initialValues?.start_date.split("T")[0],
            end_date: formProps.initialValues?.end_date.split("T")[0],
          },
        }}
        layout="vertical"
      >
        <Form.Item
          label={"Experience"}
          name={["experience_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/* <AutoComplete
            value={selectedExperience?.title || ""}
            options={data?.data.map((experience) => ({
              label: experience.title,
              value: experience.id,
            }))}
            onSearch={(q) => setExperienceSearch(q)}
            onSelect={(id) => {
              const exp = data?.data.find(
                (experience) => experience.id === (id as unknown as string)
              );
              setSelectedExperience(exp);
            }}
            notFoundContent={"No experiences found"}
          >
            <Input.Search />
          </AutoComplete> */}

          <Select
            style={{
              width: "100%",
            }}
            {...experiencesSelectProps}
          />
        </Form.Item>

        <Form.Item
          label={"Status"}
          name={["status"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{ width: "100%" }}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </Form.Item>

        <Form.Item label={"Message"} name={["message"]}>
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label={"Start Date"}
          name={["start_date"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"End Date"}
          name={["end_date"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Start Time"}
          name={["start_time"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"End Time"}
          name={["end_time"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
