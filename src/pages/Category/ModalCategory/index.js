import React, { forwardRef } from "react";
const ModalCategory = forwardRef(({
  data,
  handleChangeInput,
  handleChangeFile,
  handleSubmit,
  handleCancel,
  refFile,
  refFileSmall
}, cancelRef) => {
  const handleClickCancel = (e) => {
    if (cancelRef.current) {
      cancelRef.current.click();
      handleCancel(e);
    }
  };
  return (
    <>
      <div
        className="modal"
        id="exampleModalSkill"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="text-center text-24px pt-3 fw-bold pb-2">
              {"Thêm kỹ năng"}
            </div>
            <div className="container-fluid mt-2">
              <div className="row mb-3">
                <div className="col-3">
                  <label>Tên kỹ năng:</label>
                </div>
                <div className="col-9">
                  <input
                    className="form-control"
                    value={data.categoryName}
                    name="categoryName"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">
                  <label>Hình ảnh:</label>
                </div>
                <div className="col-9">
                  <input
                    id="imageUrl"
                    name="imageUrl"
                    className="form-control"
                    type="file"
                    onChange={handleChangeFile}
                    ref={refFile}
                    ></input>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-3">
                  <label>Hình ảnh nhỏ:</label>
                </div>
                <div className="col-9">
                  <input
                    id="imageSmallUrl"
                    name="imageSmallUrl"
                    className="form-control"
                    type="file"
                    onChange={handleChangeFile}
                    ref={refFileSmall}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center pb-2">
                <button
                  type="button"
                  className="btn btn-secondary me-4"
                  style={{ width: "90px", height: "35px" }}
                  onClick={handleClickCancel}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="d-none btn btn-secondary me-4"
                  style={{ width: "90px", height: "35px" }}
                  data-bs-dismiss="modal"
                  ref={cancelRef}
                >
                  Hủy
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-success"
                  style={{ width: "90px", height: "35px" }}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
})

export default ModalCategory;
