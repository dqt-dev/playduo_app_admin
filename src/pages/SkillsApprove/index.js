import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actEnableUserSkill,
  getSkillsApprove,
} from "../../redux/SkillsApprove/action";
import { Empty, Space, Table } from "antd";
import { Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BASE_URL } from "../../common/SystemConstant";
import "./style.css";
import { useNavigate } from "react-router-dom";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const SkillsApprove = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { skills } = useSelector((state) => state.skillsApproveReducer);
  useEffect(() => {
    dispatch(getSkillsApprove({ isEnabled: false }));
  }, []);

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Ảnh đại diện và biệt danh",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record) => {
          return (
            <div
              className="user_info"
              onClick={() => {
                navigate(`/user/${record.userId}`);
              }}
            >
              <img
                className="avatar_user"
                src={BASE_URL + record.avatarUrl}
                alt={record.nickName}
              />
              <span className="nick_name">{record.playerName}</span>
            </div>
          );
        },
      },
      {
        title: "Tên game",
        dataIndex: "categoryName",
        key: "categoryName",
      },
      {
        title: "Giới tính",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => {
          return (
            <Button type="primary" onClick={() => handleEnable(record)}>
              Enable
            </Button>
          );
        },
      },
    ],
    []
  );

  const handleEnable = useCallback((record) => {
    dispatch(actEnableUserSkill(record.skillId));
  }, []);

  return (
    <>
      <Table
        rowKey={"skillId"}
        columns={columns}
        dataSource={skills}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
      />
    </>
  );
};

export default SkillsApprove;
