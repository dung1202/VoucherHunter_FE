import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cartcss.css";
import {
  Modal,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkToken, updateItemCart } from "./Axios";

export default function Cart(props) {
  const [token, setToken] = useState("");
  const [cart, setcart] = useState([]);

  const [tien, setTien] = useState(0);
  const [showXoa, setShowXoa] = useState(false);
  const [xoaId, setxoaId] = useState("");
  const [checkBoxAll, setCheckBoxAll] = useState(false)

  const handleCloseXoa = () => setShowXoa(false);
  const handleShowXoa = () => setShowXoa(true);

  const changeProductId = (id) => {
    props.changProductId(id)
    localStorage.setItem("product_id", id);
  }

  const input_sl = (e, index) => {
    const newItems = [...cart];
    if (Number(e.target.value) < newItems[index].product_id.quantity) {
      if (Number(e.target.value) === 0) {
        newItems[index].quantity = 1;
      } else newItems[index].quantity = Number(e.target.value);
    } else if (Number(e.target.value) >= newItems[index].product_id.quantity) {
      newItems[index].quantity = newItems[index].product_id.quantity;
    }
    setcart(newItems);
    handleChange()
  };
  const cong_sl = (item, index) => {
    const newItems = [...cart];
    if (newItems[index].quantity < newItems[index].product_id.quantity) newItems[index].quantity += 1;
    setcart(newItems)
    handleChange()
  };
  const tru_sl = (item, index) => {
    const newItems = [...cart];
    if (newItems[index].quantity >= 2) newItems[index].quantity -= 1;
    setcart(newItems)
    handleChange()
  };

  useEffect(() => {
    handleChange()
  })

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
          setcart([...props.cartItems])
          // handleChange()
        } else {
          localStorage.setItem("accessToken", '');
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

  const sao = (item) => {
    let anh = "";
    if (item === 0) anh = "saorong.png";
    if (item > 0 && item < 1) anh = "saoxin.png";
    if (item >= 1) anh = "saodac.png";
    let anh1 = "";
    if (item < 2) anh1 = "saorong.png";
    if (item > 1 && item < 2) anh1 = "saoxin.png";
    if (item >= 2) anh1 = "saodac.png";
    let anh2 = "";
    if (item < 3) anh2 = "saorong.png";
    if (item > 2 && item < 3) anh2 = "saoxin.png";
    if (item >= 3) anh2 = "saodac.png";
    let anh3 = "";
    if (item < 4) anh3 = "saorong.png";
    if (item > 3 && item < 4) anh3 = "saoxin.png";
    if (item >= 4) anh3 = "saodac.png";
    let anh4 = "";
    if (item < 5) anh4 = "saorong.png";
    if (item > 4 && item < 5) anh4 = "saoxin.png";
    if (item >= 5) anh4 = "saodac.png";
    return (
      <div style={{ display: "flex" }}>
        <img src={anh} className="sao1" alt=""></img>
        <img src={anh1} className="sao1" alt=""></img>
        <img src={anh2} className="sao1" alt=""></img>
        <img src={anh3} className="sao1" alt=""></img>
        <img src={anh4} className="sao1" alt=""></img>
      </div>
    );
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
          setTien(0)
          props.them();
          handleCloseXoa();
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

  const updateSL = (id, sl) => {
    const body = {
      id: id,
      quantity: sl,
    };
    updateItemCart(body).then((res) => { });
  };

  const handleCheckboxChange = (item, index) => {
    const newItems = [...cart];
    newItems[index].checkbox = !newItems[index].checkbox;
    let tong = 0;
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].checkbox === true)
        tong += newItems[i].product_id.discountPrice > 0
          ? newItems[i].product_id.discountPrice * newItems[i].quantity
          : newItems[i].product_id.listedPrice * newItems[i].quantity
    }
    setTien(tong)
    setcart(newItems);
    let dem = 0;
    newItems.map((item, index) => {
      if (item.checkbox) dem++
      return (
        <div></div>
      )
    })
    if (dem === newItems.length) setCheckBoxAll(true)
    else setCheckBoxAll(false)
  };

  const handleChange = () => {
    let tong = 0;
    const newItems = [...cart];
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].checkbox === true)
        tong += newItems[i].product_id.discountPrice > 0
          ? newItems[i].product_id.discountPrice * newItems[i].quantity
          : newItems[i].product_id.listedPrice * newItems[i].quantity
    }
    setTien(tong)

    let dem = 0;
    newItems.map((item, index) => {
      if (item.checkbox) dem++
      return (
        <div></div>
      )
    })
    if (dem === newItems.length) setCheckBoxAll(true)
    else setCheckBoxAll(false)
  };

  const map_cart = (item, index) => {
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
      <div className="sp">
        <table >
          <tr>
            <td>
              <input
                style={{ marginRight: "10px", cursor: 'pointer' }}
                type="checkbox"
                checked={item.checkbox}
                onChange={() => handleCheckboxChange(item, index)}
              />
            </td>
            <td>
              <div className="soluong">{index + 1}.</div>
            </td>
            <td >
              <div style={{ marginLeft: "20px" }}>
                <Link onClick={() => { changeProductId(item.product_id._id) }} to={"/detail_product/" + item.product_id.name.replaceAll(" ", "_")}>
                  <img className="img_cart" alt="" src={item.product_id.img} />
                </Link>
              </div>
            </td>
            <td style={{ width: "350px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <div className="ten_cart">
                    <Link onClick={() => { changeProductId(item.product_id._id) }} to={"/detail_product/" + item.product_id.name.replaceAll(" ", "_")}>
                      {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
                    </Link>
                  </div>
                  <div>{sao(item.product_id.vote)}</div>
                </div>
              </div>
            </td>
            <td style={{ width: "350px" }}>
              <div style={{ display: "flex", justifyContent: "right" }}>
                {item.product_id.discountPrice > 0 ? (
                  <div className="discount">
                    <div style={{ display: "flex" }}>
                      {phay(item.product_id.discountPrice)}
                      <div className="d">đ</div>
                    </div>
                  </div>
                ) : (
                  <div className="discount">
                    {phay(item.product_id.listedPrice)}
                    <div className="d">đ</div>
                  </div>
                )}
              </div>
            </td>
            <td style={{ width: "400px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="button_1"
                  onClick={() => {
                    tru_sl(item, index);
                    updateSL(item._id, item.quantity);
                  }}
                >
                  -
                </button>
                <input
                  className="input_sl"
                  type="number"
                  onChange={(e) => {
                    input_sl(e, index);
                    updateSL(item._id, item.quantity);
                  }}
                  value={item.quantity}
                ></input>
                <button
                  className="button_1"
                  onClick={() => {
                    cong_sl(item, index);
                    updateSL(item._id, item.quantity);
                  }}
                >
                  +
                </button>
              </div>
            </td>
            <td style={{ width: "200px" }}>
              <div className="thanhTien">
                {phay(
                  item.product_id.discountPrice > 0
                    ? item.product_id.discountPrice * item.quantity
                    : item.product_id.listedPrice * item.quantity
                )}
                <div className="d">đ</div>
              </div>
            </td>
            <td>
              <div>
                <img
                  className="anh"
                  alt=""
                  src="/xoa-item.png"
                  onClick={() => {
                    setxoaId(item._id);
                    handleShowXoa();
                  }}
                />
              </div>
            </td>
          </tr>
        </table>
      </div >
    );
  };

  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  const mua = () => {
    let doMua = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].checkbox)
        doMua.push(cart[i]);
    }
    if (doMua.length > 0) {
      doMua.push(tien);
      props.out(doMua);
      props.gotoCheckOut()
    }
  };

  return (
    <div>
      {token ? (
        <div>
          {cart.length ? (
            <div>
              <div style={{ position: "fixed", zIndex: "10" }}>
                <div className="tieude" >
                  <table>
                    <tr>
                      <td>
                        <div style={{ display: 'flex' }}>
                          <div>
                            <input
                              style={{ marginRight: "10px", cursor: 'pointer' }}
                              type="checkbox"
                              checked={checkBoxAll}
                              onChange={() => {
                                cart.map((item, index) => {
                                  item.checkbox = !checkBoxAll
                                  return (
                                    <div></div>
                                  )
                                })
                                setCheckBoxAll(!checkBoxAll)
                              }}
                            />
                          </div>
                          <div>Stt</div>
                        </div>
                      </td>
                      <td style={{ width: "130px" }}>
                        <div style={{ marginLeft: "20px", textAlign: "center" }}>Ảnh</div>
                      </td>
                      <td style={{ width: "430px" }}>
                        <div style={{ textAlign: "center" }}>Tên sản phẩm</div>
                      </td>
                      <td style={{ width: "100px" }}>
                        <div style={{ textAlign: "center" }}>Đơn giá</div>
                      </td>
                      <td style={{ width: "300px" }}>
                        <div style={{ textAlign: "center" }}>Số lượng</div>
                      </td>
                      <td style={{ width: "230px" }}>
                        <div style={{ flex: "1.5" }} className="mua" onClick={mua}>
                          Mua hàng
                          <div className="thanhTienTo">
                            {phay(tien)}
                            <div className="d">đ</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <div style={{ height: "15vh" }}></div>
              <div>
                <div className="cart">{cart.map(map_cart)}</div>
              </div>
            </div>
          ) : (
            <div className="rong-to">
              <img className="rong" alt="" src="/empty-cart.png" />
            </div>
          )}
        </div>
      ) : null}

      <Modal show={showXoa} onHide={handleCloseXoa}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có muốn xóa sản phẩm này? </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseXoa}>
            Hủy
          </Button>
          <Button variant="primary" onClick={() => xoa_item(xoaId)}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
