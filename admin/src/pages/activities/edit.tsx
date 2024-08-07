import { BooleanField, Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Switch } from "antd";

export const ActivityEdit = () => {
  const {
    formProps,
    saveButtonProps,
    formLoading,
    query: experienceData,
  } = useForm({});

  const { selectProps: experiencesSelectProps } = useSelect({
    resource: "experiences",
    optionLabel: "title",
    optionValue: "id",
  });
  /*

  	ID             uint           `json:"id" gorm:"primaryKey"`
	CreatedAt      time.Time      `json:"created_at"`
	UpdatedAt      time.Time      `json:"updated_at"`
	UserID         uint           `json:"-"`
	User           User           `json:"user"`
	ExperienceID   uint           `json:"-"`
	Experience     Experience     `json:"experience"`
	OrganizationID uint           `json:"-"`
	Organization   Organization   `json:"-"`
	StartDate      time.Time      `json:"start_date"`
	EndDate        time.Time      `json:"end_date"`
	StartTime      string         `json:"start_time"`
	EndTime        string         `json:"end_time"`
	Status         ActivityStatus `json:"status" gorm:"type:varchar(20);default:pending"` // pending, approved, rejected
	Message        string         `json:"message" gorm:"type:text"`

  */
  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
    </Edit>
  );
};
