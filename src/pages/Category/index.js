import ModalEdit from "./ModelEdit";
import React, { useEffect, useState, useMemo, useRef } from "react";
import ModelSkill from "./ModalCategory";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../redux/Category/action";
import { Button, Empty, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BASE_URL } from "../../common/SystemConstant";
import "./style.css";
import { createCategory } from "./../../redux/Category/action";
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Category = () => {
  const [categoryAdd, setCategoryAdd] = useState({
    categoryName: "",
    imageSmallUrl: null,
    imageUrl: null,
  });

  const [categoryEdit, setCategoryEdit] = useState({
    categoryName: "",
    imageSmallUrl: null,
    imageUrl: null,
  });

  const btnCancelRef = useRef();
  const refFile = useRef();
  const refFileSmall = useRef();

  const btnCancelEditRef = useRef();
  const refFileEdit = useRef();
  const refFileSmallEdit = useRef();
  const btnEdit = useRef();

  const { category } = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, []);
  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Ảnh",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record) => {
          return (
            <div
              className="user_info"
              onClick={() => {
                setCategoryEdit(record)
              }}
            >
              <img
                className="avatar_user"
                src={BASE_URL + record.imageUrl}
                alt={record.nickName}
              />
              <span className="nick_name">{record.playerName}</span>
            </div>
          );
        },
      },
      {
        title: "Tên kỹ năng",
        dataIndex: "categoryName",
        key: "categoryName",
      },
      {
        title: "Hành động",
        key: "action",
        render: (_, record) => {
          return (
           <>
           <button
            data-bs-toggle="modal"
            data-bs-target="#examEdit"
            className="d-none"
            ref={btnEdit}
            ></button>
            <Button
            type="primary" onClick={() => {
              btnEdit.current && btnEdit.current.click()
              setCategoryEdit(record)
            }}>
              Chỉnh sửa
            </Button>
            </>
          );
        },
      },
    ],
    []
  );

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCategoryAdd({ ...categoryAdd, [name]: value });
  };

  const handleChangeFile = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    const { name } = e.target;
    setCategoryAdd({ ...categoryAdd, [name]: fileObj });
  };

  const handleSuccess = () => {
    btnCancelRef.current.click();
    if (refFile.current) refFile.current.value = null;
    if (refFileSmall.current) refFileSmall.current.value = null;
    setCategoryAdd({
      categoryName: "",
      imageSmallUrl: null,
      imageUrl: null,
    });
  };

  const handleSubmit = (e) => {
    let data = new FormData();
    data.append("categoryName", categoryAdd.categoryName);
    if (typeof categoryAdd.imageUrl === "object") {
      data.append("imageUrl", categoryAdd.imageUrl);
    }
    if (typeof categoryAdd.imageSmallUrl === "object") {
      data.append("imageSmallUrl", categoryAdd.imageSmallUrl);
    }
    if (data) {
      dispatch(createCategory(data), handleSuccess());
    }
  };

  const handleCancel = (e) => {
    if (refFile.current) refFile.current.value = null;
    if (refFileSmall.current) refFileSmall.current.value = null;
    setCategoryAdd({
      categoryName: "",
      imageSmallUrl: null,
      imageUrl: null,
    });
  };


  const handleChangeInputEdit = (e) => {
    const { name, value } = e.target;
    setCategoryEdit({ ...categoryEdit, [name]: value });
  };

  const handleChangeFileEdit = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }
    const { name } = e.target;
    setCategoryEdit({ ...categoryEdit, [name]: fileObj });
  };

  const handleSuccessEdit = () => {
    btnCancelEditRef.current.click();
    if (refFileEdit.current) refFileEdit.current.value = null;
    if (refFileSmallEdit.current) refFileSmallEdit.current.value = null;
    setCategoryEdit({
      categoryName: "",
      imageSmallUrl: null,
      imageUrl: null,
      imageSmallUrlFile: null,
      imageUrlFile: null,
    });
  };

  const handleSubmitEdit = (e) => {
    let data = new FormData();
    console.log(categoryEdit)
    data.append("categoryName", categoryEdit.categoryName);
    if (typeof categoryEdit.imageUrlFile === "object") {
      data.append("imageUrl", categoryEdit.imageUrlFile);
    }
    if (typeof categoryEdit.imageSmallUrlFile === "object") {
      data.append("imageSmallUrl", categoryEdit.imageSmallUrlFile);
    }
    if (data) {
      console.log(data.get('imageUrl'))
      dispatch(updateCategory(categoryEdit.categoryId, data), handleSuccessEdit());
    }
  };

  const handleCancelEdit = (e) => {
    if (refFileEdit.current) refFileEdit.current.value = null;
    if (refFileSmallEdit.current) refFileSmallEdit.current.value = null;
    setCategoryEdit({
      categoryName: "",
      imageSmallUrl: null,
      imageUrl: null,
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalSkill"
      >
        Add New
      </button>
      <ModelSkill
        data={categoryAdd}
        handleChangeInput={handleChangeInput}
        handleChangeFile={handleChangeFile}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        ref={btnCancelRef}
        refFile={refFile}
        refFileSmall={refFileSmall}
      />
      <ModalEdit
        data={categoryEdit}
        handleChangeInput={handleChangeInputEdit}
        handleChangeFile={handleChangeFileEdit}
        handleSubmit={handleSubmitEdit}
        handleCancel={handleCancelEdit}
        ref={btnCancelEditRef}
        refFile={refFileEdit}
        refFileSmall={refFileSmallEdit}
      />
      <Table
        rowKey={"categoryId"}
        columns={columns}
        dataSource={category}
        locale={{ emptyText: <Empty description="Không có dữ liệu" /> }}
      />
    </>
  );
};

export default Category;
