import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Cartcss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkToken, getInvoice } from "./Axios";

export default function CheckOutDetail(props) {
  const params = useParams()
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    let id = params.id
    let accessToken = localStorage.getItem("accessToken");
    const check = async () => {
      try {
        const checkId = await checkToken()
        if (checkId.status !== 200) {
          props.gotoHome()
          return;
        } else if (checkId.data.message === "Token is valid") {
          await getInvoice().then((res) => {
            console.log(res.data.data)
            res.data.data.forEach(item => {
              if (item._id === id)
                setData(item)
            });
          })
          setToken(accessToken)
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
    if (item === 0) anh = "/saorong.png";
    if (item > 0 && item < 1) anh = "/saoxin.png";
    if (item >= 1) anh = "/saodac.png";
    let anh1 = "";
    if (item < 2) anh1 = "/saorong.png";
    if (item > 1 && item < 2) anh1 = "/saoxin.png";
    if (item >= 2) anh1 = "/saodac.png";
    let anh2 = "";
    if (item < 3) anh2 = "/saorong.png";
    if (item > 2 && item < 3) anh2 = "/saoxin.png";
    if (item >= 3) anh2 = "/saodac.png";
    let anh3 = "";
    if (item < 4) anh3 = "/saorong.png";
    if (item > 3 && item < 4) anh3 = "/saoxin.png";
    if (item >= 4) anh3 = "/saodac.png";
    let anh4 = "";
    if (item < 5) anh4 = "/saorong.png";
    if (item > 4 && item < 5) anh4 = "/saoxin.png";
    if (item >= 5) anh4 = "/saodac.png";
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

  const numberFormat = new Intl.NumberFormat(
    "vi-VN",
    {
      style: "currency",
      currency: "VND",
    } || undefined
  );

  const changeProductId = (id) => {
    props.changProductId(id)
    localStorage.setItem("product_id", id);
  }

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
      <div className="sp1">
        <table>
          <tr>
            <td>
              <div className="soluong">{index + 1}.</div>
            </td>
            <td>
              <div style={{ marginLeft: '10px' }}>
                <Link onClick={() => { changeProductId(item.product_id._id) }} to={"/detail_product/" + item.product_id.name.replaceAll(" ", "_")}>
                  <img className="img_cart" alt="" src={item.product_id.img} />
                </Link>
              </div>
            </td>
            <td style={{ width: "220px" }}>
              <div style={{ marginLeft: '10px' }}>
                <div className="ten_cart">
                  <Link onClick={() => { changeProductId(item.product_id._id) }} to={"/detail_product/" + item.product_id.name.replaceAll(" ", "_")}>
                    {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
                  </Link>
                </div>
                <div>{sao(item.product_id.vote)}</div>
              </div>
            </td>
            <td style={{ width: "130px" }}>
              <div>
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
            <td style={{ width: "130px" }}>
              <div >
                <input
                  style={{ borderRadius: "10px" }}
                  className="input_sl"
                  type="text"
                  readOnly={true}
                  value={`x${item.quantity}`}
                ></input>
              </div>
            </td>
            <td>
              <div className="thanhTien">
                {phay(
                  item.product_id.discountPrice > 0
                    ? item.product_id.discountPrice * item.quantity
                    : item.product_id.listedPrice * item.quantity
                )}
                <div className="d">đ</div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    );
  };

  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const ngaDate = new Date(data.createdAt);
  const ngay = validateNiceNumber(ngaDate.getDate());
  const thang = validateNiceNumber(ngaDate.getMonth() + 1);
  const nam = ngaDate.getFullYear();

  return (
    <div>
      {token ? (
        <div>
          <div>
            <div className="userTitleContainer">
              <h1 className="userTitle">Chi tiết đơn hàng</h1>
            </div>

            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="cart"
            >
              <div className="ttI">
                <div className="display">
                  <div>Thời gian mua:</div>
                  <div
                    style={{ marginLeft: "10px" }}
                  >{`${ngay}/${thang}/${nam}`}</div>
                </div>
                <div className="display">
                  <div>ID đơn hàng:</div>
                  <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                    {data._id}
                  </div>
                </div>

                <div className="display">
                  <div>Địa chỉ:</div>
                  <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                    {data.deliveryAddress}
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
                      data.totalDiscountPrice
                        ? data.totalDiscountPrice
                        : data.totalListPrice
                    )}
                  </div>
                </div>
                <div className="display">
                  <div>Trạng thái:</div>
                  <div
                    style={{
                      marginLeft: "10px",
                      fontWeight: "600",
                      color: "orange",
                    }}
                  >
                    {data.status === "delivered"
                      ? "Đặt hàng thành công"
                      : "Đang xử lý..."}
                  </div>
                </div>
                {data.log}
              </div>

              <div style={{ width: "800px", borderRadius: "10px", background: 'white' }}>
                <div>
                  {data.products.map(map_cart)}
                </div>
                <div
                  className="display"
                  style={{
                    padding: "10px",
                  }}
                >
                  <div>Ghi chú:</div>
                  <div style={{ marginLeft: "10px", fontWeight: "600" }}>
                    {data.note}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}