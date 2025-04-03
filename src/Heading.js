import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Homecss.css";
import {
    OverlayTrigger,
    Tooltip,
    Offcanvas,
} from "react-bootstrap";
import LogIn from "./log_in"
export default function Heading(props) {
    // Bien luu cac loai loi
    const [err, seterr] = useState("");
    // Bien tat mo bang dang nhap tai khoan
    const [show_acc, setShow_acc] = useState(false)
    const handle_accClose = () => {
        setShow_acc(false);
        seterr("");
    };
    const handle_accShow = () => setShow_acc(true);
    //
    // Bien luu anh dai dien cua khach hang
    const [Avatar, setAvatar] = useState("");
    // Thay doi anh khach hang
    useEffect(() => {
        setAvatar(props.avatar)
    }, [props.avatar])
    //
    // Bien tat mo menu (menu hien thi khi man hinh co maxWidth <= 1000px)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //
    const [find, setFind] = useState()

    const searchNow = (e) => {
        setFind(e.target.value)
        window.location.href = '/product/' + e.target.value
    }

    const searchNow1 = () => {
        if (find)
            window.location.href = '/product/' + find
    }

    const changeValue = (e) => {
        setFind(e.target.value)
    }

    return (
        <div className="windown">
            {/* ******************** ok1 hien thi khi man hinh maxWidth 1000px ************************** */}
            <div className="header">
                <div className="ok1">
                    <img
                        src="/menu.png"
                        className="menu1"
                        onClick={handleShow}
                        alt=""
                    />

                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton style={{ paddingBottom: "0px" }}>
                            <Offcanvas.Title>
                                <div className="ok" style={{ display: "flex", flex: "1" }} onClick={handleClose} onMouseUp={props.gotoHome}>
                                    <div>
                                        <img
                                            className="logo"
                                            src="/logo-removebg-preview (1).png"
                                            alt=""
                                        />
                                    </div>
                                    <div style={{ width: "80px", opacity: "0.8" }}>
                                        <img className="logo-chu" src="/logo-chu.png" alt="" />
                                    </div>
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ paddingTop: "0px" }}>
                            <div style={{ display: "flex", marginBottom: "20px" }}>
                                <input
                                    style={{ marginTop: "17px" }}
                                    className="input"
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    onChange={changeValue}
                                    onKeyUp={(e) => {
                                        if (e.keyCode === 13) {
                                            searchNow(e);
                                        }
                                    }}
                                />
                                <img className="layer" src="/Layer.png" alt="" onClick={() => searchNow1()} />
                            </div>
                            <div className="text_header1" onClick={handleClose} onMouseUp={props.gotoHome}>Trang Chủ</div>
                            <div className="text_header1" onClick={handleClose} onMouseUp={props.gotoProduct}>Sản Phẩm</div>
                            <div className="text_header1" onClick={handleClose} onMouseUp={props.gotoNews}>Tin Tức</div>

                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
                <div>
                    <div className="ok" style={{ display: "flex", flex: "1" }} onClick={props.gotoHome}>
                        <div>
                            <img
                                className="logo"
                                src="/logo-removebg-preview (1).png"
                                alt=""
                            />
                        </div>
                        <div style={{ width: "80px", opacity: "0.8" }}>
                            <img className="logo-chu" src="/logo-chu.png" alt="" />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="ok1">
                        <div style={{ display: "flex" }} onClick={Avatar ? props.gotoCart : handle_accShow}>
                            <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
                            >
                                <img className="shop" src="/Shop.png" alt="" />
                            </OverlayTrigger>
                            <div className="donhang">
                                {props.soluong ? props.soluong : 0}
                            </div>
                        </div>
                        <div>
                            <OverlayTrigger
                                key="bottom"
                                placement="bottom"
                                overlay={
                                    <Tooltip id="tooltip-bottom">
                                        {Avatar ? "Trang cá nhân" : "Đăng nhập"}
                                    </Tooltip>
                                }
                            >
                                {Avatar ? (
                                    <img
                                        className="shop shop1"
                                        onClick={props.gotoProfile}
                                        src={Avatar}
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        className="shop shop1"
                                        onClick={handle_accShow}
                                        src="/acc.png"
                                        alt=""
                                    />
                                )}
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
                {/* ********************** ok2 hien thi man may tinh binh thuong ****************** */}
                <div className="ok2">
                    <div className="text_header text_header_first" onClick={props.gotoHome}>Trang chủ</div>
                    <div className="text_header" onClick={props.gotoProduct}>Sản phẩm</div>
                    <div className="text_header" onClick={props.gotoNews}>Tin tức</div>
                </div>
                <div className="img_last">
                    <div>
                        <input
                            style={{ marginTop: "17px" }}
                            className="input"
                            type="text"
                            placeholder="Tìm kiếm"
                            onChange={changeValue}
                            onKeyUp={(e) => {
                                if (e.keyCode === 13) {
                                    searchNow(e);
                                }
                            }}
                        />
                    </div>
                    <div>
                        <img className="layer" src="/Layer.png" alt="" onClick={() => searchNow1()} />
                    </div>
                    <div style={{ display: "flex" }} onClick={Avatar ? props.gotoCart : handle_accShow}>
                        <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={<Tooltip id="tooltip-bottom">Giỏ hàng</Tooltip>}
                        >
                            <img className="shop" src="/Shop.png" alt="" />
                        </OverlayTrigger>
                        <div className="donhang">{props.soluong ? props.soluong : 0}</div>
                    </div>
                    <div>
                        <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={
                                <Tooltip id="tooltip-bottom">
                                    {Avatar ? "Trang cá nhân" : "Đăng nhập"}
                                </Tooltip>
                            }
                        >
                            {Avatar ? (
                                <img
                                    className="shop shop1"
                                    onClick={props.gotoProfile}
                                    src={Avatar}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className="shop shop1"
                                    onClick={handle_accShow}
                                    src="/acc.png"
                                    alt=""
                                />
                            )}
                        </OverlayTrigger>
                    </div>
                </div>
            </div>
            <LogIn
                show_acc={show_acc}
                handle_accClose={handle_accClose}
                gotoRegister={props.gotoRegister}
                err={err}
                them={props.them}
                gotoHome={props.gotoHome}
                logIn={props.logIn}
            />
        </div>
    );
}