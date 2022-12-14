import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actAcceptUserSkill,
  actDisableUserSkill,
  actEnableUserSkill,
  getSkillsApprove,
  getSkillsUpdate,
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
  const {skills, skillsUpdate} = useSelector((state) => state.skillsApproveReducer);
  // const skillsUpdate  = useSelector((state) => state.skillsApproveReducer);
  const skillTotal = skills?.concat(skillsUpdate)

  useEffect(() => {
    dispatch(getSkillsApprove({}));
    dispatch(getSkillsUpdate());
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
        title: "Giá",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Số đơn đã nhận",
        dataIndex: "total",
        key: "total",
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
            ) :
            record.isEnabled && record.isUpdated? (
              <Button type="primary" onClick={() => handleAccept(record)}>
                Kích hoạt
              </Button>
            )
            : (
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

  const handleEnable = useCallback((record) => {
    dispatch(actEnableUserSkill(record.skillId));
  }, []);

  const handleAccept = useCallback((record) => {
    dispatch(actAcceptUserSkill(record.skillId));
  }, []);

  const handleDisable = useCallback((record) => {
    dispatch(actDisableUserSkill(record.skillId));
  }, []);

  return (
    <>
      <Table
        rowKey={"skillId"}
        columns={columns}
        dataSource={skillTotal}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
        pagination={{ pageSize: 8 }}
      />
    </>
  );
};

export default SkillsApprove;
