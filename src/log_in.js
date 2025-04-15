import React, { useState, useEffect } from "react";
import { Login } from "./Axios";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homecss.css";
import {
    Modal,
    Button,
} from "react-bootstrap";

export default function LogIn(props) {
    // Bien thong tin dang nhap
    const location = useLocation();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    //
    // Bien luu cac loai loi
    const [err, seterr] = useState("");
    //
    // Bien tat mo bang dang nhap tai khoan
    const [show_acc, setShow_acc] = useState(false)
    useEffect(() => {
        setShow_acc(props.show_acc);
        const Err = props.err
        seterr(Err)
    }, [props.show_acc, props.err])
    //
    // Ham dang nhap
    const submit = () => {
        const body = {
            username,
            password,
        };
        if (username.length === 0 || password === 0) {
            seterr("Phải nhập đủ tên đăng nhập và mật khẩu");
        } else if (
            username.length < 8 ||
            username.length > 30 ||
            password.length > 30 ||
            password.length < 8
        ) {
            seterr("Tên đăng nhập hoặc mật khẩu sai");
        } else {
            Login(body).then((res) => {
                if (res.data.message !== "Login successfully!") {
                    seterr("Tên đăng nhập hoặc mật khẩu sai");
                } else if (res.data.message === "Login successfully!") {
                    props.them();
                    localStorage.setItem("accessToken", res.data.accessToken);
                    setShow_acc(false);
                    seterr("");
                    props.logIn();
                    if (location.pathname === '/register') props.gotoHome();
                }
            });
        }
    };
    //
    // Bien va ham xem dang ma hoa hay khong cua mat khau
    const [passwordShown, setPasswordShown] = useState(false);
    const showPass = () => {
        setPasswordShown(true);
    };
    const unShowPass = () => {
        setPasswordShown(false)
    }
    //
    return (
        <div>
            <Modal show={show_acc} onHide={props.handle_accClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text_login">Tên đăng nhập: </div>
                    <input
                        className="login"
                        onChange={(e) => {
                            setusername(e.target.value);
                        }}
                        type="text"
                        placeholder="Tên đăng nhập (test: tiendung)"
                        autoFocus
                    />
                    <div className="text_login">Mật khẩu: </div>
                    <label className="signup-password" style={{ display: "flex" }}>
                        <input
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    submit();
                                }
                            }}
                            className="login"
                            // di chuyen chuot vao input password la text
                            onMouseEnter={showPass}
                            //
                            // di chuyen chuot ra khoi input password la text
                            onMouseLeave={unShowPass}
                            //
                            type={passwordShown ? "text" : "password"}
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                            placeholder="Mật khẩu (test: tiendung12345)"
                        />
                    </label>
                    <div className="check_loi">{err}</div>
                    <div className="signup-redirect" style={{ display: "flex" }}>
                        <div>
                            Bạn chưa có tài khoản?
                        </div>
                        <div className="dangKy" onClick={props.handle_accClose} onMouseDown={props.gotoRegister}>
                            Đăng Ký
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submit}>
                        Đăng nhập
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}