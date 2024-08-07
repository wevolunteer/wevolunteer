import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";

export const ActivityList = () => {
  const { tableProps, tableQueryResult } = useTable({
    syncWithLocation: true,
  });

  console.log(tableQueryResult);

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
          dataIndex="user"
          title={"User"}
          render={(user) => user?.email}
        />
        <Table.Column
          dataIndex="experience"
          title={"Experience"}
          render={(experience) => experience?.title}
        />

        <Table.Column dataIndex="start_date" title={"Start Date"}
          render={(start_date) => new Date(start_date).toLocaleDateString()}
        />
        <Table.Column dataIndex="end_date" title={"End Date"} 
          render={(end_date) => new Date(end_date).toLocaleDateString()}
        />
        <Table.Column dataIndex="start_time" title={"Start Time"} />
        <Table.Column dataIndex="end_time" title={"End Time"} />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column dataIndex="message" title={"Message"} />

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
