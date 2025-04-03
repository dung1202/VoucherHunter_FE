import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
import LogIn from "./log_in"
export default function Register(props) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const changeusername = (e) => setusername(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const changeRepeatPassword = (e) => setRepeatPassword(e.target.value);
  const togglePasswordVisibility = () =>
    setPasswordShown(!passwordShown ? true : false);


  const togglePasswordVisibility1 = () =>
    setPasswordShown1(!passwordShown1 ? true : false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setusername(username.replace(/\s+/g, ""));
    const newAccount = { username, email, password };
    if (checkInput())
      try {
        signUp(newAccount).then((res) => {
          if (res.data.message !== "Register successfully!") {
            setAlertMessage(res.data.message);
          } else if (res.data.message === "Register successfully!") {
            localStorage.setItem("accessToken", res.data.accessToken);
            setAlertMessage(res.data.message);
            console.log(alertMessage)
          }
        });
      } catch (e) {
        console.log(e)
      }

  };

  const checkInput = () => {
    if (!checkusername()) {
      setAlertMessage("Tài khoản phải có từ 8 - 30 từ.");
      return false;
    }
    if (!checkEmail()) {
      setAlertMessage("Email phải có chiều dài hơn 30 từ và có đuôi là gmail.com hoặc yahoo.com");
      return false;
    }
    if (!checkPassword()) {
      setAlertMessage("Mật khẩu phải có từ 8 - 30 từ");
      return false;
    }
    if (!checkRepeatPassword()) {
      setAlertMessage("Xác thực mật khẩu không khớp");
      return false;
    }
    return true;
  };

  const checkusername = () => username.length >= 8 && username.length <= 30;
  const checkEmail = () => email.length <= 30 && /^([.\w]+)@(gmail.com|yahoo.com)$/.test(email);
  const checkPassword = () => password.length >= 8 && password.length <= 30;
  const checkRepeatPassword = () =>
    repeatPassword.localeCompare(password) === 0;
  // Bien luu cac loai loi
  const [err, seterr] = useState("");
  // Bien tat mo bang dang nhap tai khoan
  const [show_acc, setShow_acc] = useState(false)
  const handle_accClose = () => {
    setShow_acc(false);
    seterr("");
  };

  const handle_accShow = () => setShow_acc(true);

  const signUp = () => {
    setAlertMessage("")
    handle_accShow()
  }
  //
  return (
    <div>
      {alertMessage === "Register successfully!" ?
        <div className="signup-container-success">
          <div className="div-success">
            <h2 id="signup-title">
              Chúc mừng bạn đã đăng ký thành công!!!
            </h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="button-success" onClick={() => props.gotoHome()}>Trang chủ</button>
              <button className="button-success" onClick={signUp}>Đăng nhập</button>
            </div>
          </div>
        </div>
        :
        <div className="signup-container">
          <form
            className="signup-form flexColumn"
            onSubmit={handleSubmit}
            spellCheck="false"
            autoComplete="off"
          >
            <h2 id="signup-title">ĐĂNG KÝ</h2>
            <label>
              Tên đăng nhập:
              <input
                autoFocus
                className="signup-input"
                name="username"
                type="text"
                value={username}
                placeholder="Tên đăng nhập"
                onChange={changeusername}
                required
              />
            </label>

            <label>
              Email:
              <input
                className="signup-input"
                name="email"
                type="email"
                value={email}
                placeholder="Email"
                onChange={changeEmail}
                required
              />
            </label>
            Mật khẩu
            <label className="signup-password">

              <input
                className="signup-input"
                name="password"
                type={passwordShown ? "text" : "password"}
                value={password}
                placeholder="Mật khẩu"
                onChange={changePassword}
                required
              />
              <FontAwesomeIcon
                className="fa-icons"
                icon={faEye}
                onClick={togglePasswordVisibility}
              />
            </label>
            Xác thực mật khẩu
            <label className="signup-password">

              <input
                className="signup-input"
                name="repeatPassword"
                type={passwordShown1 ? "text" : "password"}
                value={repeatPassword}
                placeholder="Xác thực mật khẩu"
                onChange={changeRepeatPassword}
                required
              />
              <FontAwesomeIcon
                className="fa-icons"
                icon={faEye}
                onClick={togglePasswordVisibility1}
              />
            </label>

            <div className="signup-alert">{alertMessage}</div>
            <label>
              <input
                className="signup-agreement"
                name="termAgreement"
                type="checkbox"
                required
              />
              &nbsp; Tôi đồng ý các điều khoản trong &nbsp;
              <a
                href="https://github.com/dung1202/anonumous_FE"
                target="_blank"
                rel="noreferrer"
              >
                Điều khoản dịch vụ
              </a>
            </label>

            <input className="signup-submit" type="submit" value="Đăng ký" />

            <div className="signup-redirect">
              Bạn đã có tài khoản chưa?
              <div id="redirect-signin" onClick={handle_accShow}>
                Đăng nhập
              </div>
            </div>
          </form>
        </div>
      }
      <LogIn
        show_acc={show_acc}
        handle_accClose={handle_accClose}
        gotoRegister={props.gotoRegister}
        err={err}
        them={props.them}
        logIn={props.logIn}
      />
    </div>
  );
}