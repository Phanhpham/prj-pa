import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../services/product.service";
import { Product } from "../../interface/admin";
import { Link, useNavigate } from "react-router-dom";
import "../css/home.css";
import BannerHome from "./BannerHome";
import BlogHome from "./BlogHome";

// Laay du lieu account tu local
// const account = JSON.parse(localStorage.getItem("account") || "[]");
// const navigate = useNavigate();

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

interface RootState {
  products: {
    product: Product[];
  };
}

// const handleClick = () => {
//   const confirmLogout = confirm("Ban co chac chan dang xuat khong?");
//   if (confirmLogout) {
//     navigate("/login");
//     localStorage.removeItem("account");
//   }
// };

export default function Home() {
  const productState = useSelector(
    (state: RootState) => state.products.product
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Tất cả sản phẩm");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());

    // Lấy dữ liệu favorites từ localStorage
    const favoritesFromStorage = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(
      (favoritesFromStorage as any[]).map((favorite) => favorite.id)
    );
  }, [dispatch]);

  // Cập nhật lại favorites khi có thay đổi
  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(
        favorites.map((id) => ({
          id,
          name:
            productState.find((product: Product) => product.id === id)
              ?.nameProduct || "",
          image:
            productState.find((product: Product) => product.id === id)?.image ||
            "",
        }))
      )
    );
  }, [favorites, productState]);

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      const updatedFavorites = favorites.filter((id) => id !== productId);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, productId];
      setFavorites(updatedFavorites);
    }
  };
  // danh muc sp
  const categories: string[] = [
    "Tất cả sản phẩm",
    ...new Set(productState.map((product: Product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "Tất cả sản phẩm"
      ? productState
      : productState.filter(
          (product: Product) => product.category === selectedCategory
        );
  return (
    <>
      <div>
        {/* Header */}
        <header className="header-container">
          <div className="left-container">
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1342"
              alt=""
            />
          </div>
          <nav className="center-container">
            <ul className="navbar">
              <li>
                <a href="">Sản phẩm</a>
              </li>
              <li>
                <a href="">Sản phẩm mới</a>
              </li>
              <li>
                <a href="">Bộ sưu tập</a>
              </li>
              <li>
                <a href="">Sản phẩm giá tốt</a>
              </li>
              <li>
                <a href="">Sale</a>
              </li>
            </ul>
          </nav>
          <div className="right-container">
            <div className="search">
              <input type="text" placeholder="Tìm kiếm sản phẩm" />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="account">
              <OverlayTrigger
                trigger="click"
                placement="bottom"
                show={showFavorites}
                onToggle={(show) => setShowFavorites(show)}
                overlay={
                  <Popover id="popover-favorites" style={{ maxWidth: "800px" }}>
                    <Popover.Body>
                      <Table responsive>
                        <tbody>
                          <tr>
                            {favorites.map((productId) => (
                              <td key={productId} style={{ padding: "10px" }}>
                                <div style={{ textAlign: "center" }}>
                                  <img
                                    src={
                                      productState.find(
                                        (product: Product) =>
                                          product.id === productId
                                      )?.image || ""
                                    }
                                    alt={`photo`}
                                    style={{
                                      width: "100px",
                                      height: "auto",
                                      marginBottom: "10px",
                                    }}
                                  />
                                  <div>
                                    {productState.find(
                                      (product: Product) =>
                                        product.id === productId
                                    )?.nameProduct || ""}
                                  </div>
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </Table>
                    </Popover.Body>
                  </Popover>
                }
              >
                <div style={{ color: "black", cursor: "pointer" }}>
                  <i
                    className="fa-solid fa-heart"
                    style={{ paddingRight: "5px" }}
                  ></i>
                  Yêu thích
                </div>
              </OverlayTrigger>
            </div>
            <div className="account">
              <i className="fa-solid fa-user"></i>
              <Link to={"/login"} style={{ color: "black" }}>
                Tài khoản
              </Link>
              {/* {account ? (
                <>
                  <a href="" onClick={handleClick}>
                    {account.userName}
                  </a>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user"></i>
                  <Link to={"/register"} style={{ color: "black" }}>
                    Tài khoản
                  </Link>
                </>
              )} */}
            </div>
            <div className="cart">
              <i className="fa-solid fa-cart-shopping"></i>
              <Link to={"/cartProduct"} style={{ color: "black" }}>
                Giỏ hàng
              </Link>
            </div>
          </div>
        </header>
      </div>
      {/* Banner */}
      <BannerHome />
      {/* Product */}
      <div>
        <h1 style={{ textAlign: "center" }}>SẢN PHẨM NỔI BẬT</h1>
        <div className="category-product">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="product-item"
              style={{ position: "relative" }}
            >
              <Link
                to={`/detailProduct/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <img
                  src={product.image}
                  alt={product.nameProduct}
                  style={{ width: "300px", paddingLeft: "50px" }}
                />
                <div className="product-info">
                  <p style={{ color: "grey", marginLeft: "50px" }}>
                    {product.nameProduct}
                  </p>
                  <b style={{ marginLeft: "80px", color: "black" }}>
                    {formatPrice(parseFloat(product.price || "0"))}
                  </b>
                </div>
              </Link>
              <div
                className="overlay"
                onClick={() => toggleFavorite(product.id)}
              >
                <i
                  className={
                    favorites.includes(product.id)
                      ? "fa-solid fa-heart text-danger"
                      : "fa-solid fa-heart text-white"
                  }
                ></i>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Blog */}
      <BlogHome />
    </>
  );
}
