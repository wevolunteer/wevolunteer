import { Create, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input } from "antd";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
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
          rules={[
            {
              required: true,
            },
          ]}
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
          label={"Is Superuser"}
          name={["is_superuser"]}
        >
          <Checkbox />
        </Form.Item>
      </Form>
    </Create>
  );
};
