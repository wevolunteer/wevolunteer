import { Create, useForm, useSelect } from "@refinedev/antd";
import { useList, useResource, useShow } from "@refinedev/core";
import { AutoComplete, Form, Input, Switch } from "antd";
import { Select } from "antd/lib";
import { useRef, useState } from "react";

export const ActivityCreate = () => {
  const { formProps, saveButtonProps } = useForm({});
  const [searchValue, setSearchValue] = useState("");

  const { data } = useList({
    resource: "experiences",
    filters: [{ field: "q", operator: "eq", value: searchValue }],
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Experience"}
          name={["experience_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AutoComplete
            getRawInputElement={() => {
              return (
                <Input
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              );
            }}
            options={data?.data.map((item) => ({
              label: item.title,
              value: item.id,
            }))}
            onSearch={(value) => {
              setSearchValue(value as unknown as string);
            }}
            onSelect={(value, option) => {
              formProps.form?.setFieldValue("experience_id", value);
              setSearchValue(option.label);
            }}
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
    </Create>
  );
};
