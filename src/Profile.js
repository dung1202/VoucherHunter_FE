import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profilecss.css";
import {
  OverlayTrigger,
  Tooltip,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkToken, getInvoice } from "./Axios";
export default function Proflie(props) {

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    const check = async () => {
      try {
        const checkId = await checkToken()
        if (checkId.status !== 200) {
          props.gotoHome()
          return;
        } else if (checkId.data.message === "Token is valid") {
          setToken(accessToken)
        } else {
          localStorage.setItem("accessToken", "");
          props.gotoHome()
        }
      }
      catch (error) {
        // props.gotoHome()
      }
    }
    check()
    if (accessToken === '') props.gotoHome()
  }, [props])

  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [Invoice, setInvoice] = useState([]);

  const [showXoaAll, setShowXoaAll] = useState(false);
  const handleCloseXoaAll = () => setShowXoaAll(false);
  const handleShowXoaAll = () => setShowXoaAll(true);

  useEffect(() => {
    const data = async () => {
      const user = await props.userData;
      if (user) {
        setAvatar(user.photoUrl);
        setusername(user.username);
        setemail(user.email);
        setphone(user.phone);
        setgender(user.gender);
        setdob(user.dob);
        const Address =
          user.address.detail +
          " " +
          user.address.ward +
          " " +
          user.address.district +
          " " +
          user.address.city;
        setAddress(Address);
      }
      // console.log(user)
    }
    data()

    getInvoice().then((res) => {
      // console.log(res.data);
      setInvoice(res.data.data)
    })

    // fetch("https://voucherhunter.herokuapp.com/auth/invoice", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((json) => {
    //     json.data.reverse();
    //     console.log(json.data);
    //     setInvoice(json.data);
    //   });
  }, [props]);

  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );

  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  // const edit = () => {
  //   navigate("/");
  // };

  const hienInvoice = (item, index) => {
    // console.log(item.paymentStatus);
    let status =
      item.status === "delivered" ? "Đặt hàng thành công" : "Đang xử lý...";
    // console.log(item.products[0].product_id.img);
    let ten_sp = "";

    item.products.map((e) => {
      // console.log(e.product_id.name);
      ten_sp = ten_sp + e.product_id.name + ", ";
      return <></>;
    });

    return (
      <Link to={'/detail_checkout/' + item._id}>
        <div className="invoice_to">
          <div style={{ display: "flex" }}>
            <img
              alt=""
              src={item.products[0].product_id.img}
              className="anh_invoice"
            />
            <div>
              <div className="display">
                <div>Trạng thái:</div>
                <div
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    color: "orange",
                  }}
                >
                  {status}
                </div>
              </div>

              <div className="display">
                <div>Tên các sản phẩm:</div>
                <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                  {ten_sp}
                </div>
              </div>

              <div className="display">
                <div>Số lượng sản phẩm:</div>
                <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                  {item.products.length}
                </div>
              </div>

              <div className="display">
                <div>Số tiền thanh toán:</div>
                <div
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    color: "red",
                  }}
                >
                  {numberFormat.format(
                    item.totalDiscountPrice
                      ? item.totalDiscountPrice
                      : item.totalListPrice
                  )}
                </div>
              </div>
              <div className="display">
                <div>Ghi chú:</div>
                <div style={{ marginLeft: "10px" }}>{item.note}</div>
              </div>
            </div>
          </div>
          <div style={{ marginLeft: "10px" }}>{changDay(item.createdAt)}</div>
        </div>
      </Link>
    );
  };

  const changDay = (day) => {
    const ngaDate = new Date(day);
    const ngay = validateNiceNumber(ngaDate.getDate());
    const thang = validateNiceNumber(ngaDate.getMonth() + 1);
    const nam = ngaDate.getFullYear();
    return `${ngay}/${thang}/${nam}`
  }
  return (
    <div>
      {token ?
        <div>
          <div className="container_profile">
            <div style={{ width: "20vw" }}>
              <img alt="" src={Avatar} className="anh_profile" />
              <div className="name_profile">{username}</div>
            </div>

            <div style={{ margin: "2vh 2vw 0px 2vw", width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <OverlayTrigger
                  key="bottom"
                  // onClick={edit}
                  placement="bottom"
                  overlay={<Tooltip id="tooltip-bottom">Sửa</Tooltip>}
                >
                  <img
                    className="shop shop1"
                    onClick={props.gotoEdit}
                    src="/edit.png"
                    alt=""
                  />
                </OverlayTrigger>
                <OverlayTrigger
                  key="bottom"
                  placement="bottom"
                  overlay={<Tooltip id="tooltip-bottom">Đăng xuất</Tooltip>}
                >
                  <img
                    className="shop shop1"
                    onClick={handleShowXoaAll}
                    src="/signout.png"
                    alt=""
                  />
                </OverlayTrigger>
              </div>
              <div style={{ display: "flex" }}>
                <div className="dinhdanh">
                  <div className="ten_tieude">Ngày sinh:</div>
                  <div className="noidung_tieude">{changDay(dob)}</div>
                </div>
                <div className="dinhdanh">
                  <div className="ten_tieude">Giới tính:</div>
                  <div className="noidung_tieude">{gender}</div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div className="dinhdanh">
                  <div className="ten_tieude">Email:</div>
                  <div className="noidung_tieude">{email}</div>
                </div>
                <div className="dinhdanh">
                  <div className="ten_tieude">Số điện thoại:</div>
                  <div className="noidung_tieude">{phone}</div>
                </div>
              </div>
              <div className="dinhdanh">
                <div className="ten_tieude">Địa chỉ:</div>
                <div className="noidung_tieude">{address}</div>
              </div>
              <div
                className="dinhdanh"
                style={{
                  justifyContent: "center",
                  marginTop: "10px",
                  fontSize: "1.25rem",
                }}
              >
                <div className="ten_tieude">Tổng số tiền bạn đã chi:</div>
                <div className="noidung_tieude">
                  {numberFormat.format(
                    Invoice.map(
                      (item) => item.totalDiscountPrice
                    ).reduceRight((a, b) => a + b, 0)
                  )}
                </div>
              </div>
              <div className="dinhdanh">
                <div className="noidung_tieude">
                  {Invoice.map(hienInvoice)}
                </div>
              </div>
            </div>
          </div>
          <Modal show={showXoaAll} onHide={handleCloseXoaAll}>
            <Modal.Header closeButton>
              <Modal.Title>Bạn có muốn đăng xuất không? </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseXoaAll}>
                Hủy
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  props.dangxuat();
                }}
              >
                Đăng xuất
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        : ""}
    </div>
  );
}
