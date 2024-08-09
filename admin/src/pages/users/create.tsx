import { Create, useForm } from "@refinedev/antd";
import { Checkbox, Form, Input, Switch } from "antd";

export const UserCreate = () => {
  const {
    formProps,
    saveButtonProps,
    form: { setFieldValue },
    query,
  } = useForm({
    defaultFormValues:{
      is_superuser: false,
    }
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
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

        <Form.Item label={"Password"} name={["password"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={"Is Superuser"} name={["is_superuser"]}>
          <Switch
            defaultChecked={query?.data?.data.is_superuser}
            onChange={(e) => {
              setFieldValue("is_superuser", e);
            }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
