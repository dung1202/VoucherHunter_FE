import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Detailcss.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Carousel,
} from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Helmet } from "react-helmet";
import {
  getProductById,
  addCart,
  updateItemCart,
  getCart,
} from "./Axios";
import { detail_product } from "./whiteData";
import LogIn from "./log_in"
export default function DetailProduct(props) {
  const [Giam, setGiam] = useState();
  const [sp, setsp] = useState(detail_product);
  const [Product_uu_dai, setProduct_uu_dai] = useState([]);
  const [Input_sl, setInput_sl] = useState(1);
  const [Avatar, setAvatar] = useState("");
  const [addDone, setaddDone] = useState(false);
  const [array, setarray] = useState(sp.listphotos);
  const [id, setId] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    setProduct_uu_dai(props.Product_uu_dai)
    setAvatar(props.avatar)
    // console.log(props.avatar)
  }, [props])

  const custom_config = {
    licenseKey: 'GPL',
    toolbar: {
      items: [],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };

  const changeId = (id) => {
    props.changProductId(id)
    localStorage.setItem("product_id", id);
    setaddDone(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let id = localStorage.getItem("product_id")
    if (props.product_Id)
      id = props.product_Id
    setId(id)
    getProductById(id).then((res) => {
      const sp_theo_id = res.data;
      // console.log(res.data, id)
      // if (sp_theo_id.name) {
      sp_theo_id.name = sp_theo_id.name.charAt(0).toUpperCase() + sp_theo_id.name.slice(1);
      setsp(sp_theo_id);
      setarray(res.data.listphotos);
      if (res.data.discountPrice > 0) {
        let giamgia =
          100 - (res.data.discountPrice / res.data.listedPrice) * 100;

        giamgia = giamgia.toFixed(0);

        if (giamgia === 100 || giamgia > 99.9) giamgia = 99;
        setGiam(giamgia);
      }
      // }
    });
  }, [props.product_Id]);

  const addPro = () => {
    if (!Avatar) setShow_acc(true);
    else {
      getCart().then(async (res) => {
        let bien = [];
        bien = res.data.cart.items;
        // console.log(bien);
        let ktr = 0;
        let sltrc = 0;
        let k = 0;
        for (let i = 0; i < bien.length; i++) {
          if (id !== bien[i].product_id._id) {
            ktr++;
          } else {
            sltrc = bien[i].quantity;
            k = i;
          }
        }
        // console.log(res.data, ktr, sltrc);
        if (ktr === bien.length) {
          const obj = {
            product_id: id,
            quantity: Input_sl,
          };
          addCart(obj).then((res) => {
            props.them();
            setaddDone(true);
          });
        } else {
          const body = {
            id: bien[k]._id,
            quantity: Number(sltrc + Input_sl),
          };
          console.log(res.data);
          updateItemCart(body).then((res) => {
            // console.log("fkdfdjs");
            props.them();
            setaddDone(true);
          });
        }
      });
    }
  };

  const input = (e) => {
    if (Number(e.target.value) < sp.quantity) {
      if (Number(e.target.value) === 0) {
        setInput_sl(1);
      } else setInput_sl(Number(e.target.value));
    } else if (Number(e.target.value) >= sp.quantity) {
      setInput_sl(Number(sp.quantity));
    }
  };

  const sliderPhoto = (item) => {
    return (
      <Carousel.Item>
        <img alt="" className="d-block w-100 dt" style={{ borderRadius: "10px" }} src={item} />
      </Carousel.Item>
    );
  };

  const sao = (item, star) => {
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
        <img alt="" src={anh} className={star}></img>
        <img alt="" src={anh1} className={star}></img>
        <img alt="" src={anh2} className={star}></img>
        <img alt="" src={anh3} className={star}></img>
        <img alt="" src={anh4} className={star}></img>
      </div>
    );
  };

  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

  // const map_hastack = (item) => {
  //   const htag = item.split('#')[1]
  //   return <Link to={'/product/' + htag}><div className="map_hastack">{item}</div></Link>;
  // };

  const pro = (item) => {
    let string_name = "";
    let d = 0;
    for (let i = 0; i < item.name.length; i++) {
      if (d <= 5) {
        if (item.name[i] === " ") d++;
        if (d < 6) string_name += item.name[i];
      } else {
        string_name += "...";
        break;
      }
    }

    let q = "";
    if (item.sold >= 1000) {
      let k = item.sold / 1000;
      k = k.toFixed(1);
      q = `${k}k`;
    } else {
      q = `${item.sold}`;
    }

    let giamgia = 100 - (item.discountPrice / item.listedPrice) * 100;
    giamgia = giamgia.toFixed(0);
    if (giamgia === 100 || giamgia > 99.9) giamgia = 99;

    return (
      <Link onClick={() => { changeId(item._id) }} to={"/detail_product/" + item.name.replaceAll(" ", "_")}>
        <div className="hover1" >
          <img className="img_pro" src={item.img} alt="" />
          <div style={{ padding: "1vw 1vw 0vw 1vw" }}>
            <div className="name_pro">
              {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
            </div>
            <div className="sl">
              <div>{sao(item.vote)}</div>
              <div>{q === "0" ? "" : <div>Đã bán {q}</div>}</div>
            </div>
          </div>
          <div className="listedPrice" style={{ color: "red" }}>
            {phay(
              item.discountPrice > 0 ? item.discountPrice : item.listedPrice
            )}
            <div className="d">đ</div>
            <div style={{ marginLeft: "1vw" }}>
              {item.discountPrice > 0 ? (
                <div className="giamgia giam">-{giamgia}%</div>
              ) : null}
            </div>
          </div>
        </div>
      </Link >
    );
  };

  const [err, seterr] = useState("");
  // Bien tat mo bang dang nhap tai khoan
  const [show_acc, setShow_acc] = useState(false)
  const handle_accClose = () => {
    setShow_acc(false);
    seterr("");
  };

  return (
    <div>
      <dvi>
        <Helmet>
          <title>
            {sp.name}
          </title>
        </Helmet>
      </dvi>
      {sp ? (
        <div className="rong">
          {addDone ? (
            <div className="tb">"Bạn đã thêm thành công"</div>
          ) : null}
          <div style={{ display: "flex" }}>
            <div className="img_slider">
              <Carousel className="car">{array.map(sliderPhoto)}</Carousel>
            </div>

            <div>
              <div className="name_sp">{sp.name}</div>
              {/* <div className="tag">{sp.tags.map(map_hastack)}</div> */}
              <div className="sl1">
                <div>{sao(sp.vote, "sao1")}</div>
                <div style={{ margin: "0px 20px 0px 20px" }}>|</div>
                <div style={{ marginRight: "5px" }}>
                  {sp.sold === "0" ? "" : <div>Đã bán</div>}
                </div>
                <div className="sold">
                  {sp.sold === "0" ? "" : <div>{sp.sold}</div>}
                </div>
                <div style={{ margin: "0px 20px 0px 20px" }}>|</div>
                <div style={{ marginRight: "5px" }}>
                  <div>Sản phẩm có sẵn</div>
                </div>
                <div className="sold">
                  <div>{sp.quantity}</div>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {sp.discountPrice > 0 ? (
                  <div className="discountPrice1">
                    <div style={{ display: "flex" }}>
                      {phay(sp.discountPrice)}
                      <div className="d">đ</div>
                    </div>
                    <div className="listedPrice2">
                      {phay(sp.listedPrice)}
                      <div className="d">đ</div>
                    </div>
                    <div className="giam1">-{Giam}%</div>
                  </div>
                ) : (
                  <div className="listedPrice1">
                    {phay(sp.listedPrice)}
                    <div className="d">đ</div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: "2vh", fontWeight: "600" }}>
                Nhà sản xuất: {sp.supplier}
              </div>
              <div style={{ marginTop: "2vh", display: "flex" }}>
                Số Lượng:
                <div style={{ marginLeft: "20px" }}>
                  <button
                    className="button_1"
                    onClick={() => {
                      if (Input_sl > 1) setInput_sl(Input_sl - 1);
                    }}
                  >
                    -
                  </button>
                  <input
                    className="input_sl"
                    type="number"
                    onChange={input}
                    value={Input_sl}
                  ></input>
                  <button
                    className="button_1"
                    onClick={() => {
                      if (Input_sl < sp.quantity) setInput_sl(Input_sl + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "3vh" }}>
                <div className="listedPrice4" onClick={addPro}>
                  <div style={{ marginRight: "10px" }}>Thêm vào giỏ hàng</div>
                </div>
                <div className="listedPrice3">
                  <div style={{ marginRight: "10px" }}>Thành tiền:</div>
                  {phay(
                    sp.discountPrice > 0
                      ? sp.discountPrice * Input_sl
                      : sp.listedPrice * Input_sl
                  )}
                  <div className="d">đ</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "5vh", fontWeight: "600" }}>Mô tả: </div>
          <div>
            <CKEditor
              editor={ClassicEditor}
              data={sp.description}
              config={custom_config}
              disabled={true}
            />
          </div>
        </div>
      ) : null}
      <div className="chu_gt" id="sp_hot">
        <div className="list">
          <div>Ưu đãi dành cho bạn</div>
        </div>
        <div className="bonus" onClick={props.gotoProduct}>
          Xem thêm -&gt;
        </div>
      </div>
      <div className="product1" style={{ marginBottom: "10px" }}>{Product_uu_dai.map(pro)}</div>
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
