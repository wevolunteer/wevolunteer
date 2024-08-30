import { Create, useForm, ImageField, useSelect } from "@refinedev/antd";
import { Flex, Form, Input, Select, Switch, Typography } from "antd";
import UploadButton from "../../components/UploadButton";
import ImageItem from "../../components/ImageItem";


export const OrganizationCreate = () => {
  const {
    formProps,
    saveButtonProps,
    form: { setFieldValue },
    query,
  } = useForm({});

  const { selectProps: categorySelectProps, query: categoriesResult } =
    useSelect({
      resource: "categories",
      optionLabel: "name",
      optionValue: "id",
    });

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
          label={"Category"}
          name={["category_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{ width: "100%" }} {...categorySelectProps} />
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

        <ImageItem label="Logo" name={"logo"} setFieldValue={setFieldValue} />

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
    </Create>
  );
};
