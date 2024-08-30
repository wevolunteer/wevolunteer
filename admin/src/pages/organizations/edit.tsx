import { Edit, useForm, ImageField } from "@refinedev/antd";
import { Flex, Form, Input, Switch, Typography } from "antd";

export const OrganizationEdit = () => {
  const {
    formProps,
    saveButtonProps,
    formLoading,
    form: { setFieldValue },
    query
  } = useForm({});

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
          label={"Phone"}
          name={["phone"]}
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

        <Form.Item label={"WebSite"} name={["website"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Logo"} name={["logo"]} style={{ height: "100%" }}>
          <Flex justify="normal" gap={20} style={{ height: "100%" }}>
            <Form.Item name={["logo"]} noStyle>
              {/* @ts-expect-error value handled */}
              <ImageField title={"Logo"} width={300} />
            </Form.Item>
            <Flex vertical gap={5}>
              <Typography.Text>URL</Typography.Text>
              <Form.Item name={["logo"]} noStyle>
                <Input
                  style={{ width: 500 }}
                  onChange={(e) => {
                    setFieldValue("logo", e.target.value);
                  }}
                  allowClear
                  onClear={() => {
                    setFieldValue("logo", null);
                  }}
                />
              </Form.Item>
            </Flex>
          </Flex>
        </Form.Item>

        <Form.Item label={"Address"} name={["address"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"City"} name={["city"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"State"} name={["state"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"ZipCode"} name={["zip_code"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Country"} name={["country"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Latitude"} name={["latitude"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Longitude"} name={["longitude"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"TaxCode"} name={["tax_code"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"VATCode"} name={["vat_code"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"ExternalId"} name={["external_id"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Published"} name={["published"]}>
        <Switch
            defaultChecked={query?.data?.data.published}
            onChange={(e) => {
              setFieldValue("published", e);
            }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
