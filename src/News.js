import React, { useState, useEffect } from "react";
import "./Productcss.css";
import {
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getNews } from "./Axios";
import { whiteNews } from "./whiteData";
export default function News(props) {
  const [data, setdata] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [array_product, setarray_product] = useState([]);
  const [list, setlist] = useState([]);

  useEffect(() => {
    const dataNews = async () => {
      const fetchedNews = await props.news;
      const fetchedSoTrang = await props.soTrang;

      setdata(fetchedNews);
      console.log(fetchedNews, fetchedSoTrang);

      let mang = [];
      for (let i = 0; i < fetchedSoTrang; i++) {
        mang.push(i + 1);
      }
      setarray_product([...mang]);

      let mang1 = [];
      let k = 3;
      if (mang.length <= 3) k = mang.length;
      for (let i = 0; i < k; i++) {
        mang1.push(mang[i]);
      }

      console.log(mang1);
      setlist([...mang1]);
    };

    if (data.length === 0) {
      dataNews();
    }
  }, [props, data.length]);

  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const changeNewsId = async (id) => {
    await props.changeNewsId(id)
    localStorage.setItem("news_id", id);
  }

  const pro = (item) => {
    const date = new Date(item.createdAt);
    const day = validateNiceNumber(date.getDate());
    const ok = validateNiceNumber(date.getMonth() + 1);
    const nam = date.getFullYear();

    let string_name = "";
    let d = 0;
    for (let i = 0; i < item.title.length; i++) {
      if (d <= 9) {
        if (item.title[i] === " ") d++;
        if (d < 11) string_name += item.title[i];
      } else {
        string_name += "...";
        break;
      }
    }
    // const map_hastack = (item) => {
    //   return <div className="map_hastack">{item}</div>;
    // };
    return (
      <Link onClick={() => { changeNewsId(item._id) }} to={"/detail_news/" + item.title.replaceAll(" ", "_")}>
        <div className="news">
          <div style={{ marginRight: "10px" }}>
            <img src={item.image} className="avatar_news" alt="" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "5px" }}>
                  <div className="user_news" style={{ fontWeight: "600" }}>
                    {item.creator}
                  </div>
                  <div className="user_news">
                    {day}/{ok}/{nam}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div className="content">
                    {string_name.charAt(0).toUpperCase() + string_name.slice(1)}
                  </div>
                  <div className="cont">
                    {/* {ReactHtmlParser(item.content)} */}
                  </div>
                  {/* <div className="hastack">{item.tags.map(map_hastack)}</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const load = (i) => {
    setcurrentPage(i);
    console.log(i);
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

    getNews(i).then((res) => {
      setdata(res.data.data);
    });
    window.scrollTo(0, 0);
  };

  const wow = (item) => {
    return (
      <Pagination.Item
        onClick={() => load(item)}
        active={item === currentPage ? currentPage : null}
      >
        {item}
      </Pagination.Item>
    );
  };

  const trc = () => {
    load(currentPage - 1);
    window.scrollTo(10, 0);
  };
  const sau = () => {
    load(currentPage + 1);
    window.scrollTo(10, 0);
  };

  return (
    <div>
      <div style={{ padding: "0px 5vw" }}>
        {data.length > 0 ? data.map(pro) : whiteNews.map(pro)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Pagination>
          {currentPage > 1 ? <Pagination.Prev onClick={trc} /> : null}

          {list.map(wow)}

          {currentPage < array_product.length ? (
            <Pagination.Next onClick={sau} />
          ) : null}
        </Pagination>
      </div>
    </div>
  );
}
