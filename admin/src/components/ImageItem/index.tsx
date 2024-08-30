import { Form, Flex, Typography, Input } from "antd";
import { FC } from "react";
import UploadButton from "../UploadButton";
import { useForm, ImageField } from "@refinedev/antd";

const ImageItem: FC<{
  label: string;
  name: string;
  setFieldValue: (name: string, value: any) => void;
}> = ({ label, name, setFieldValue }) => {
  return (
    <Form.Item label={label} name={[name]} style={{ width: "100%" }}>
      <Flex justify="space-between" gap={20} style={{ width: "100%" }}>
        <Flex vertical gap={5} align="start">
          <Typography.Text>URL</Typography.Text>

          <Flex gap={10}>
            <Form.Item name={[name]} noStyle>
              <Input
                style={{ width: 500 }}
                onChange={(e) => {
                  setFieldValue(name, e.target.value);
                }}
                allowClear
                onClear={() => {
                  setFieldValue(name, null);
                }}
              />
            </Form.Item>
            <UploadButton onUpload={(url) => setFieldValue(name, url)} />
          </Flex>
        </Flex>

        <Form.Item name={[name]} noStyle>
          {/* @ts-expect-error value handled */}
          <ImageField title={"Image"} width={300} />
        </Form.Item>
      </Flex>
    </Form.Item>
  );
};

export default ImageItem;
