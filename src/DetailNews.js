import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Detailcss.css";
import { Helmet } from "react-helmet";
import { getNewsById } from "./Axios";
import { detail_news, whiteNews } from "./whiteData";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default function DetailNews(props) {
  const [news, setNews] = useState(detail_news);
  const [listNews, setListNews] = useState(whiteNews);

  const changeId = (id) => {
    props.changeNewsId(id)
    localStorage.setItem("news_id", id);
    window.scrollTo(0, 0);
  };

  const custom_config = {
    licenseKey: 'GPL',
    toolbar: {
      items: [],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
  };

  useEffect(() => {
    setListNews(props.news);
  }, [props.news]);

  useEffect(() => {
    let id = localStorage.getItem("news_id")
    if (props.news_Id)
      id = props.news_Id
    getNewsById(id).then((res) => {
      setNews(res.data.data[0]);
    });
    window.scrollTo(0, 0);
  }, [props.news_Id]);

  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const stringDate = (string) => {
    const date = new Date(string);
    const day = validateNiceNumber(date.getDate());
    const ok = validateNiceNumber(date.getMonth() + 1);
    const nam = date.getFullYear();
    return <div>{day}/{ok}/{nam}</div>
  }

  const pro = (item, index) => {
    if (index < 5) {
      const date = stringDate(item.createdAt)

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
      return (
        <Link onClick={() => { changeId(item._id) }} to={"/detail_news/" + item.title.replaceAll(" ", "_")}>
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
                      {date}
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <div className="content">
                      {string_name.charAt(0).toUpperCase() +
                        string_name.slice(1)}
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
    }
  };

  return (
    <div>
      <div>
        <Helmet>
          <title>
            {news.title}
          </title>
        </Helmet>
      </div>
      {news ? (
        <div className="rong" style={{ height: news._id ? "auto" : "100vh", width: '90vw' }}>
          <div className="detail_sp">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: "600", fontSize: "2rem" }}>
                {news.title}
              </div>
              <div style={{ display: "flex" }}   >
                Viết ngày:
                <div style={{ marginLeft: "5px" }}>{stringDate(news.createdAt)}</div>
              </div>
            </div>
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={news.content}
                config={custom_config}
                disabled={true}
              />
            </div>
            <div style={{ marginTop: "20px" }}>Viết bài: {news.creator}</div>
          </div>
        </div>
      ) : null}
      <div className="chu_gt" id="sp_hot">
        <div className="list">
          <div>Tin tức mới nhất</div>
        </div>
        <div className="bonus" onClick={props.gotoNews}>
          Xem thêm -&gt;
        </div>
      </div>

      <div style={{ padding: "30px 5vw 0px 5vw" }}>
        {listNews.map(pro)}
      </div>
    </div>
  );
}
