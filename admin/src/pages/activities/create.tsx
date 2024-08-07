import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";
import { Select } from "antd/lib";

export const ActivityCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: experiencesSelectProps } = useSelect({
    resource: "experiences",
    optionLabel: "title",
    optionValue: "id",
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
    </Create>
  );
};
