import { Edit, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input, Switch } from "antd";

export const UserEdit = () => {
  const {
    formProps,
    saveButtonProps,
    queryResult,
    form: { setFieldValue },
  } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"First Name"}
          name={["first_name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Last Name"}
          name={["last_name"]}
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
        <Form.Item label={"Phone"} name={["phone"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"New password"} name={["password"]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label={"Is Superuser"} name={["is_superuser"]}>
          <Switch
            defaultChecked={queryResult?.data?.is_superuser}
            onChange={(e) => {
              setFieldValue("is_superuser", e);
            }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
