import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";
import { Select } from "antd/lib";

export const ExperienceCreate = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: categorySelectProps,} =
    useSelect({
      resource: "categories",
      optionLabel: "name",
      optionValue: "id",
    });

  const { selectProps: organizationsSelectProps,} =
  useSelect({
    resource: "organizations",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

      <Form.Item
          label={"Organization"}
          name={["organization_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select style={{width: "100%"}} {...organizationsSelectProps} />
        </Form.Item>

        <Form.Item
          label={"Title"}
          name={["title"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Description"}
          name={["description"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

         <Form.Item
          label={"Image URL"}
          name={["image"]}
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
          <Select style={{width: "100%"}} {...categorySelectProps} />
        </Form.Item>

        <Form.Item label={"Latitude"} name={["latitude"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Longitude"} name={["longitude"]}>
          <Input />
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

        <Form.Item label={"Zip Code"} name={["zip_code"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Country"} name={["country"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Contact Name"} name={["contact_name"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Contact Email"} name={["contact_email"]}>
          <Input />
        </Form.Item>

        <Form.Item label={"Contact Phone"} name={["contact_phone"]}>
          <Input />
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

        <Form.Item label={"Published"} name={["published"]}>
          <Switch />
        </Form.Item>
      </Form>
    </Create>
  );
};
