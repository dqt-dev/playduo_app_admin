import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actDisableUser,
  actEnableUser,
  getUsers,
} from "../../redux/User/action";
import { Empty, Space, Table } from "antd";
import { Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BASE_URL } from "../../common/SystemConstant";
import "./style.css";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const UserManagement = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const { users } = useSelector((state) => state.userManagementReducer);

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Ảnh đại diện và biệt danh",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record) => {
          return (
            <div className="user_info">
              <img
                className="avatar_user"
                src={BASE_URL + record.avatarUrl}
                alt={record.nickName}
              />
              <span className="nick_name">{record.nickName}</span>
            </div>
          );
        },
      },
      {
        title: "Tên đăng nhập",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            {!record.isEnabled ? (
              <Button type="primary" onClick={() => handleEnable(record)}>
                Enable
              </Button>
            ) : (
              <Button
                type="primary"
                danger
                onClick={() => handleDisable(record)}
              >
                Disable
              </Button>
            )}
          </Space>
        ),
      },
    ],
    []
  );

  const handleDisable = useCallback((record) => {
    dispatch(actDisableUser(record.id));
  }, []);
  const handleEnable = useCallback((record) => {
    dispatch(actEnableUser(record.id));
  }, []);

  return (
    <>
      <Table
        rowKey={"id"}
        columns={columns}
        dataSource={users}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
      />
    </>
  );
};

export default UserManagement;
