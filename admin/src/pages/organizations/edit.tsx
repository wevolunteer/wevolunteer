import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const OrganizationEdit = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});


  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Email"}
          name={["email"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Phone"}
          name={["phone"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ID Esterno"}
          name={["external_id"]}
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
