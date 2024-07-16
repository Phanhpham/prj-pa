import React, { useEffect } from "react";
import Menu from "../Menu";
import "../scss/adminHome.scss";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
  searchProduct,
} from "../../services/product.service";
import { Product } from "../../interface/admin";

function AdminUser() {
  const productState = useSelector((state: any) => state.products.product);
  const dispatch = useDispatch();
  console.log(productState);
  useEffect(() => {
    dispatch(getAllProduct());
  }, []);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleLogOut = () => {
    const logout = confirm("chắc chắn muốn đăng xuất?");
    if (logout) {
      navigate("");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không?");
    if (confirmDelete) {
      await dispatch(deleteProduct(id));
      await dispatch(getAllProduct());
    }
  };

  const [search, setSearch] = useState<string>("");
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    await dispatch(searchProduct(search));
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar-admin">
        <div className="logo">
          <h2>ADMIN</h2> <br />
          <ul className="menu">
            <li className="active">
              <NavLink to={"/adminHome"}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Trang chủ</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/adminUser"}>
                <i className="fas fa-user"></i>
                <span>Quản lí tài khoản</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/adminProduct"}>
                <i className="fa-solid fa-book"></i>
                <span>Quản lí san phẩm</span>
              </NavLink>
            </li>
            <li>
              <a href="">
                <i className="fas fa-cog"></i>
                <span>Cài đặt</span>
              </a>
            </li>
            <li className="logout">
              <a onClick={handleLogOut} href="">
                <i className="fas fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content-admin">
        <div className="header-wrapper">
          <div className="header-title">
            <div className="title">
              <span>Shop bán quần áo</span>
              <h2>Quản lí sản phẩm </h2>
            </div>
            <Button variant="primary" onClick={handleShow}>
              + Thêm sản phẩm
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Thêm sản phẩm</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Tên sản phẩm</Form.Label>
                    <Form.Control type="text" placeholder="Nhập tên" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Giá tiền</Form.Label>
                    <Form.Control type="text" placeholder="Nhập giá tiền" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Thêm ảnh</Form.Label>
                    <Form.Control type="file" placeholder="Thêm ảnh" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>số lượng</Form.Label>
                    <Form.Control type="text" placeholder="Nhập số lượng" />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Huỷ
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Thêm
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="user-info">
            <div className="search-box">
              <i className="fa-solid fa-search"></i>
              <input
                type="text"
                placeholder="Tìm kiếm ở đây"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV1mHHzOnO1BG__4Ai6GlaZpfRztsrQM1fols7meZqlY6arSu0mvtlHSArvUHZRquwnA0&usqp=CAU"
              alt=""
            />
          </div>
        </div>

        <div className="table-wrapper">
          <h3 className="main-title">Bảng thống kê</h3> <br />
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Ảnh</th>
                  <th>Giá tiền</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {productState.map((product: Product, index: number) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{product.nameProduct}</td>
                    <td>
                      <img src={product.image}></img>
                    </td>
                    <td>{product.price} đ</td>
                    <td>{product.stock}</td>
                    <td>{product.status}</td>

                    <td>
                      <button className="btn btn-primary">sửa</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(product.id)}
                      >
                        xoá
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
