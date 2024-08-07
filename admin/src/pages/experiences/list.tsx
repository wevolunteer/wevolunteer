import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable
} from "@refinedev/antd";
import { BaseRecord, useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const ExperienceList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="title" title={"Title"} />
        <Table.Column dataIndex="description" title={"Description"} />
        <Table.Column
          dataIndex="category"
          title={"Category"}
          render={(category) => category?.name}
        />
        <Table.Column dataIndex="city" title={"City"} />
        <Table.Column dataIndex="start_date" title={"Start Date"} />
        <Table.Column dataIndex="end_date" title={"End Date"} />
        <Table.Column dataIndex="published" title={"Published"} render={
          (published) => published ? "Yes" : "No"
        } />
        <Table.Column dataIndex="organization" title={"Organization"} 
          render={(organization) => organization?.name}
          />


        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
