import React, { useState, useEffect } from "react";
import "./Productcss.css";
import {
  Carousel,
  Pagination,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pro_is_hot } from "./whiteData"
export default function Product(props) {
  const navi = useNavigate()
  const [array, setarray] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [Data, setData] = useState([]);
  const [array_product, setArray_product] = useState([]);
  const [list, setlist] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([])

  const changeId = (id) => {
    props.changProductId(id)
    localStorage.setItem("product_id", id);
  };

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    const data = () => {
      try {
        const dataArray = props
        setarray([...dataArray.array])
        setData([...dataArray.product])

        const dai = Math.ceil(dataArray.product.length / 8);
        const soTrang = [];
        for (let i = 1; i <= dai; i++) {
          soTrang.push(i);
        }
        setArray_product([...soTrang])

        const mangTrangHienThi = [];
        let k = 3;
        if (soTrang.length <= 3) k = soTrang.length;
        for (let i = 0; i < k; i++) {
          mangTrangHienThi.push(soTrang[i]);
        }
        // console.log(mangTrangHienThi)
        setlist([...mangTrangHienThi])
      } catch (e) { }
    }
    const indexOfLastNews = currentPage * 8;
    const indexOfFirstNews = indexOfLastNews - 8;
    setCurrentTodos(Data.slice(indexOfFirstNews, indexOfLastNews));
    if (Data.length === 0)
      data()
  }, [props, currentPage, Data, array_product])

  const slideProduct = (item) => {
    return (
      <Carousel.Item>
        <Link onClick={() => { changeId(item._id) }} to={"/detail_product/" + item.name.replaceAll(" ", "_")}>
          <img className="d-block w-100" style={{ borderRadius: "10px" }} src={item.img} alt="" />
        </Link>
      </Carousel.Item>
    );
  };

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

  const phay = (x) => {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  };

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
        <img alt="" src={anh} className="sao"></img>
        <img alt="" src={anh1} className="sao"></img>
        <img alt="" src={anh2} className="sao"></img>
        <img alt="" src={anh3} className="sao"></img>
        <img alt="" src={anh4} className="sao"></img>
      </div>
    );
  };

  const load = (i) => {
    setcurrentPage(i);
    let dau = 0;
    let cuoi = 0;
    if (i >= 3) {
      if (i >= array_product.length - 1) {
        dau = array_product.length - 3;
        cuoi = array_product.length;
      } else {
        dau = i - 3;
        cuoi = i + 2;
      }
    } else {
      dau = 0;
      cuoi = 3;
    }
    setlist(array_product.slice(dau, cuoi));
    window.scrollTo(10, 0);
  };

  const wow = (item, index) => {
    return (
      <Pagination.Item
        onClick={() => load(item)}
        active={item === currentPage}
      >
        {item}
      </Pagination.Item>
    );
  };

  const trc = () => {
    load(currentPage - 1);
    window.scrollTo(0, 0);
  };
  const sau = () => {
    load(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const searchVote = (vote) => {
    localStorage.setItem('vote', vote)
    navi('/product/vote')
  }

  const searchMoney = (number) => {
    localStorage.setItem('money', number)
    navi('/product/money')
  }

  return (
    <div className="menu_product">
      <div className="menu_sp">
        <h6>Danh mục sản phẩm</h6>
        <div className="danhmuc">
          <div><Link to='/product/Du lịch'>Du lịch</Link></div>
          <div><Link to='/product/Đồ ăn'>Đồ ăn</Link></div>
        </div>
        <hr />
        <h6>Đánh giá</h6>
        <div className="danhmuc">
          <div style={{ display: "flex" }} onClick={() => { searchVote(5) }}>
            <input
              style={{ marginRight: "10px", cursor: 'pointer' }}
              type="checkbox"
            >
            </input>
            <div style={{ marginTop: "5px" }}>{sao(5)}</div>
            <div style={{ marginLeft: "5px" }}>từ 5 sao</div>
          </div>
          <div style={{ display: "flex" }} onClick={() => { searchVote(4) }}>
            <input
              style={{ marginRight: "10px", cursor: 'pointer' }}
              type="checkbox"
            >
            </input>
            <div style={{ marginTop: "5px" }}>{sao(4)}</div>
            <div style={{ marginLeft: "5px" }}>từ 4 sao</div>
          </div>
          <div style={{ display: "flex" }} onClick={() => { searchVote(3) }}>
            <input
              style={{ marginRight: "10px", cursor: 'pointer' }}
              type="checkbox"
            >
            </input>
            <div style={{ marginTop: "5px" }}>{sao(3)}</div>
            <div style={{ marginLeft: "5px" }}>từ 3 sao</div>
          </div>
        </div>
        <hr />
        <h6>Giá</h6>
        <div className="danhmuc">
          <div style={{ display: "flex" }} onClick={() => { searchMoney(1) }}>
            <input
              style={{ marginRight: "10px", cursor: 'pointer' }}
              type="checkbox"
            >
            </input>
            <div style={{ fontSize: "0.85rem" }}> &lt; 200.000đ</div>
          </div>
          <div style={{ display: "flex" }} onClick={() => { searchMoney(2) }}>
            <input
              style={{ marginRight: "10px", cursor: 'pointer' }}
              type="checkbox"
            >
            </input>
            <div style={{ fontSize: "0.85rem" }}> 200.000đ -&gt; 1.000.000đ</div>
          </div>
          <div style={{ display: "flex" }} onClick={() => { searchMoney(3) }}>
            <input
              style={{ marginRight: "10px", cursor: 'pointer' }}
              type="checkbox"
            >
            </input>
            <div style={{ fontSize: "0.85rem" }}> &gt; 1.000.000đ</div>
          </div>
        </div>
      </div>
      <div className="pro_slide">
        <Carousel>{array.map(slideProduct)}</Carousel>
        <div className="product" style={{ marginTop: "20px" }}>
          {currentTodos ? currentTodos.map(pro) : Pro_is_hot.map(pro)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Pagination style={{ marginBottom: "2vh" }}>
            {currentPage > 1 ? <Pagination.Prev onClick={trc} /> : null}

            {list.map(wow)}

            {currentPage < array_product.length ? (
              <Pagination.Next onClick={sau} />
            ) : null}
          </Pagination>
        </div>
      </div>
    </div>
  );
}
