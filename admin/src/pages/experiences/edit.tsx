import { BooleanField, Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const ExperienceEdit = () => {
  const { formProps, saveButtonProps, formLoading , query: experienceData} = useForm({});

  
  const { selectProps: categorySelectProps, queryResult: categoriesResult } =
  useSelect({
      resource: "categories",
      defaultValue: experienceData?.data?.data.category_id,
      optionLabel: "name",
      optionValue: "id",
  });


  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
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

        <Form.Item
          label={"Latitude"}
          name={["latitude"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Longitude"}
          name={["longitude"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Address"}
          name={["address"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"City"}
          name={["city"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"State"}
          name={["state"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Zip Code"}
          name={["zip_code"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Country"}
          name={["country"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Contact Name"}
          name={["contact_name"]}
          
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Contact Email"}
          name={["contact_email"]}
          
        > 
          <Input />
        </Form.Item>

        <Form.Item
          label={"Contact Phone"}
          name={["contact_phone"]}
          
        >
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

        <Form.Item
          label={"Published"}
          name={["published"]}
        >
          <Switch 
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
