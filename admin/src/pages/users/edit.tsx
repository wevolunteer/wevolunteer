import { Edit, useForm, ImageField } from "@refinedev/antd";
import { Flex, Form, Input, Switch, Typography } from "antd";

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

        <Form.Item label={"Avatar"} name={["avatar"]} style={{ height: "100%" }}>
          <Flex justify="normal" gap={20} style={{ height: "100%" }}>
          <Form.Item name={["avatar"]} noStyle>
            {/* @ts-expect-error value handled */}
            <ImageField title={"Image"} width={300} />
          </Form.Item>
            <Flex vertical gap={5}>
              <Typography.Text>URL</Typography.Text>
              <Form.Item name={["avatar"]} noStyle>
                <Input
                style={{ width: 500 }}
                  onChange={(e) => {
                    setFieldValue("avatar", e.target.value);
                  }}
                  allowClear
                  onClear={() => {
                    setFieldValue("avatar", null);
                  }}
                />
              </Form.Item>
            </Flex>
          </Flex>
        </Form.Item>

        <Form.Item label={"New password"} name={["password"]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label={"Is Superuser"} name={["is_superuser"]}>
          <Switch
            defaultChecked={queryResult?.data?.data.is_superuser}
            onChange={(e) => {
              setFieldValue("is_superuser", e);
            }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
