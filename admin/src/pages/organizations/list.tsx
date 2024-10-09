import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable
} from "@refinedev/antd";
import { BaseRecord, useMany } from "@refinedev/core";
import { Input, Space, Table } from "antd";
import { useState } from "react";

export const OrganizationList = () => {
  const [search, setSearch] = useState("");

  const { tableProps } = useTable({
    syncWithLocation: true,
    filters: {
      defaultBehavior: "replace",
      permanent: [{ field: "q", operator: "eq", value: search }],
    },
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
    <Input
      placeholder={"Search"}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ marginBottom: 16 }}
    />
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="phone" title={"Phone"} />

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
