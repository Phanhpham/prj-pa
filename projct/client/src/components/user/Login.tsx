import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../css/adminlogin.css";
import { Logins } from "../../interface/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../services/admin.service";

const Login = () => {
  const users = useSelector((state: any) => state.users.user);
  console.log(users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState<Logins>({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!inputValue.email) {
      setError((prevError) => ({
        ...prevError,
        email: "Email khong duoc de trong",
      }));
      valid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        email: "",
      }));
    }

    if (!inputValue.password) {
      setError((prevError) => ({
        ...prevError,
        password: "Mat khau khong duoc de trong",
      }));
      valid = false;
    } else {
      setError((prevError) => ({
        ...prevError,
        password: "",
      }));
    }

    if (valid && users.length > 0) {
      const findUser = users.find(
        (user: any) =>
          user.email === inputValue.email &&
          user.password === inputValue.password
      );
      console.log(findUser);
      if (findUser) {
        if (findUser.status === 1) {
          alert("Tài khoản đã bị khoá!!");
        } else {
          localStorage.setItem("account", JSON.stringify(findUser));
          alert("Dang nhap thanh cong");
          navigate("/home");
        }
      } else {
        setError((prevError) => ({
          ...prevError,
          password: "Tai khoan hoac mat khau khong dung",
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img
          src="https://static.vecteezy.com/system/resources/previews/027/428/014/original/nem-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg"
          style={{ width: "750px", height: "700px" }}
        />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img
              src="https://static.ybox.vn/2021/12/6/1639833088609-httpswww.canva.comdesignDAEyyZUaL9oRXE44PMfR_WfJquvULhFzAedit%20(5).png"
              style={{ width: "200px" }}
            />
          </div>
          <div className="login-center">
            <h2>Welcome to NEM !</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={inputValue.email}
              />
              {error.email && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.email}
                </span>
              )}
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="Password"
                  name="password"
                  value={inputValue.password}
                />
                {error.password && (
                  <span style={{ color: "red", fontSize: 14 }}>
                    {error.password}
                  </span>
                )}
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">Remember</label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="/register">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
