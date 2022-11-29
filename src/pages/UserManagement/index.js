import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actDisableUser, actEnableUser, getUsers } from "../../redux/User/action";
import { Space, Table } from "antd";
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
  const { users, isLoading, error } = useSelector(
    (state) => state.userManagementReducer
  );

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
        title: "Username",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Action",
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

  const handleDisable = (record) => {
    dispatch(actDisableUser(record.id))
  };
  const handleEnable = (record) => {
    dispatch(actEnableUser(record.id))
  };

  return (
    <>
      <Table rowKey={"id"} columns={columns} dataSource={users} />
    </>
  );
};

export default UserManagement;
