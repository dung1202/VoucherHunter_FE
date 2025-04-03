import React, { useState, useEffect } from "react";
import "./CheckOut.css";
import {
  Tabs,
  Tab,
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkToken, createInvoice } from "./Axios";
export default function CheckOut(props) {
  const [checktt, setchecktt] = useState(false);
  const [token, setToken] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setcart] = useState([]);
  const [email, setemail] = useState("");
  const [paylay, setpaylay] = useState("");
  const [showMua, setShowMua] = useState(false);
  const [note, setnote] = useState("");
  const [TTtien, setTTtien] = useState("");
  const handleCloseMua = () => setShowMua(false);
  const handleShowMua = () => setShowMua(true);

  // const [cartT, setcartT] = useState([]);


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
          // setcartT([...props.cartItems])
        } else {
          localStorage.setItem("accessToken", "");
          props.gotoHome()
        }
      }
      catch (e) {
        props.gotoHome()
      }
    }
    check()
    if (accessToken === '') props.gotoHome()
  }, [props])

  useEffect(() => {
    const data = async () => {
      const user = await props.userData;
      if (user) {
        // setAvatar(user.photoUrl);
        const Address =
          user.address.detail +
          " " +
          user.address.ward +
          " " +
          user.address.district +
          " " +
          user.address.city;
        setPhone(user.phone);
        setAddress(Address);
        setemail(user.email);
      }
    }
    data()
    let Token = localStorage.getItem("accessToken");
    setcart(props.muaDo);
    setTTtien(props.muaDo);
    setToken(Token);
  }, [token, props.muaDo, props]);

  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  const xoa_item = React.useCallback(
    async (xoaId) => {
      const controller = new AbortController();
      const signal = controller.signal;
      await fetch("https://anonymous-be.onrender.com/cart/auth/removeitem", {
        signal: signal,
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: xoaId }),
      })
        .then((response) => {
          response.json()
        })
        .then((json) => {
          // setItemCart([...itemCart,json.cart.items])
          // setcart(json.cart.items);
          // dispatch(removeFromCart(json.cart.items))
          // setLoading(false);
          props.them();
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Success Abort");
          } else {
            console.error(err);
          }
        });


      // return () => {
      //   // cancel the request before component unmounts
      //   controller.abort();
      // };
    },
    [token, props]
  );

  const goToProduct = () => {
    cart.map((item) => xoa_item(item._id))
    props.gotoProduct()
  };

  const goToProfile = () => {
    cart.map((item) => xoa_item(item._id))
    props.gotoProfile()
  };

  const thanhtoan = (item, index) => {
    if (index < cart.length - 1) {
      let string_name = "";
      let d = 0;
      for (let i = 0; i < item.product_id.name.length; i++) {
        if (d <= 5) {
          if (item.product_id.name[i] === " ") d++;
          if (d < 11) string_name += item.product_id.name[i];
        } else {
          string_name += "...";
          break;
        }
      }
      return (
        <div className="sptt">
          <div>
            <img className="img_cart" alt="" src={item.product_id.img} />
          </div>
          <div className="ten_cart">
            {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
          </div>
          <div>x{item.quantity}</div>
          <div className="thanhTienTT">
            {phay(
              item.product_id.discountPrice > 0
                ? item.product_id.discountPrice * item.quantity
                : item.product_id.listedPrice * item.quantity
            )}
            <div className="d">đ</div>
          </div>
        </div>
      );
    }
  };

  const mua = (tt) => {
    TTtien.pop();
    setchecktt(true);
    TTtien.map((item) => {
      item.product_id = item.product_id._id;
      return <></>;
    });
    let body = {
      note,
      deliveryAddress: address,
      paymentMethod: tt,
      items: TTtien,
    };
    handleShowMua();
    createInvoice(body)
      .then((res) => {
        console.log('dshadjsah')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {token ? (
        <div>
          <div>
            {cart.length > 0 ? (
              <div className="hoadon">
                <div className="tenhd">Xác nhận mua hàng</div>
                <div>{checktt ? "" : cart.map(thanhtoan)}</div>
                <hr></hr>
                <div className="sptt">
                  <div>Tổng</div>
                  <div className="thanhTienToTT">
                    {phay(cart[cart.length - 1])}
                    <div className="d">đ</div>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Email: </div>
                  <input
                    style={{
                      outline: "none",
                      border: "0px",
                      borderBottom: "1px solid red",
                      marginBottom: "10px",
                      width: '50vw'
                    }}
                    value={email}
                    placeholder="Email"
                    readOnly={true}
                  />
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>SĐT: </div>
                  <input
                    style={{
                      outline: "none",
                      border: "0px",
                      borderBottom: "1px solid red",
                      width: '50vw'
                    }}
                    value={phone}
                    placeholder="Số điện thoại"
                    readOnly={true}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div>Địa chỉ: </div>
                  <input
                    style={{
                      outline: "none",
                      border: "0px",
                      borderBottom: "1px solid red",
                      width: '50vw'
                    }}
                    value={address}
                    placeholder="Địa chỉ"
                    readOnly={true}
                  />
                </div>
                <div>Ghi chú:</div>
                <textarea
                  style={{
                    outline: "none",
                    // border: "0px",
                    border: "1px solid black",
                    width: "100%",
                    resize: "none",
                  }}
                  value={note}
                  placeholder="Ghi chú"
                  // resize="none"
                  onChange={(e) => setnote(e.target.value)}
                />

                <Tabs
                  defaultActiveKey="cod"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="cod" title="Tiền mặt">
                    <div>
                      <div onClick={() => mua("COD")} className="kingpin">
                        Mua hàng
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="paylay" title="Paylay" disabled>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>Nhập số tài khoản</div>
                        <input
                          style={{
                            outline: "none",
                            border: "0px",
                            borderBottom: "1px solid red",
                          }}
                          placeholder="Số tài khoản"
                          value={paylay}
                          onChange={(e) => setpaylay(e.target.value)}
                        />
                      </div>

                      <div onClick={() => mua("PAYPAL")} className="kingpin">
                        Mua hàng
                      </div>
                    </div>
                  </Tab>
                  <Tab eventKey="stripe" title="Stripe" disabled>
                    <div>
                      <div onClick={() => mua("STRIPE")} className="kingpin">
                        Mua hàng
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            ) : (
              <div
                className="hoadon"
                style={{ marginBottom: "200px", display: "flex" }}
              >
                <div>"Chúng tôi cần bạn xác nhận lại"</div>
                <div
                  onClick={props.gotoCart}
                  style={{
                    marginLeft: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Đến giỏ hàng
                </div>
              </div>
            )}
          </div>

          <Modal show={showMua} onHide={handleCloseMua}>
            <Modal.Header closeButton>
              <Modal.Title>Cảm ơn bạn đã mua hàng</Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="primary" onClick={goToProduct}>
                Tiếp tục mua hàng
              </Button>
              <Button variant="primary" onClick={goToProfile}>
                Xem hóa đơn
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      ) : null}
    </div>
  );
}
