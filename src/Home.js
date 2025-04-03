import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Carousel,
} from "react-bootstrap";
import "./Homecss.css";
export default function Home(props) {
    useEffect(() => { window.scrollTo(0, 0); }, []);
    const [array, setarray] = useState([]);
    const [news, setnews] = useState([]);
    const [Product_is_hot, setProduct_is_hot] = useState([]);
    const [Product_uu_dai, setProduct_uu_dai] = useState([]);

    useEffect(() => {
        const data = () => {
            try {
                const dataArray = props
                setarray([...dataArray.array])
                setProduct_is_hot([...dataArray.Product_is_hot])
                setProduct_uu_dai([...dataArray.Product_uu_dai])
                setnews([...dataArray.news])
            } catch (e) { }
        }
        data()
    }, [props])

    const changeProductId = (id) => {
        props.changProductId(id)
        localStorage.setItem("product_id", id);
    }

    const changeNewsId = (id) => {
        props.changeNewsId(id)
        localStorage.setItem("news_id", id);
    }

    const slideProduct = (item) => {
        return (
            <Carousel.Item>
                <Link onClick={() => { changeProductId(item._id) }} to={"/detail_product/" + item.name.replaceAll(" ", "_")}>
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
            let o = item.sold / 1000;
            o = o.toFixed(1);
            q = `${o}k`;
        } else {
            q = `${item.sold}`;
        }

        return (
            <Link onClick={() => { changeProductId(item._id) }} to={"/detail_product/" + item.name.replaceAll(" ", "_")}>
                <div className="hover1">
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
                    <div className="listedPrice">
                        {phay(item.listedPrice)}
                        <div className="d">đ</div>
                    </div>
                </div>
            </Link>
        );
    };

    const duct = (item) => {
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
            <Link onClick={() => { changeProductId(item._id) }} to={"/detail_product/" + item.name.replaceAll(" ", "_")}>
                <div className="hover1">
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
                    <div className="listedPrice" style={{ color: item.discountPrice > 0 ? "red" : "black" }}>
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
            </Link>
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
                <img src={anh} className="sao" alt=""></img>
                <img src={anh1} className="sao" alt=""></img>
                <img src={anh2} className="sao" alt=""></img>
                <img src={anh3} className="sao" alt=""></img>
                <img src={anh4} className="sao" alt=""></img>
            </div>
        );
    };
    function validateNiceNumber(Number) {
        return Number < 10 ? "0" + Number : Number;
        //                     true             false
    }
    //
    //
    const map_news = (item, index) => {
        // getUserById(item.creator_id).then((res) => {
        //   item.avater = res.data.avatar;
        // });
        const date = new Date(item.createdAt);
        const day = validateNiceNumber(date.getDate());
        const ok = validateNiceNumber(date.getMonth() + 1);
        const nam = date.getFullYear();

        let string_name = "";
        let d = 0;
        for (let i = 0; i < item.title.length; i++) {
            if (d <= 5) {
                if (item.title[i] === " ") d++;
                if (d < 11) string_name += item.title[i];
            } else {
                string_name += "...";
                break;
            }
        }
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

    // const map_hastack = (item) => {
    //   return <div className="map_hastack">{item}</div>;
    // };

    return (
        <div>
            <div className="slider_container">
                <Carousel>{array.map(slideProduct)}</Carousel>
            </div>

            <div className="chu_gt" id="sp_hot">
                <div className="list">
                    <div>Sản phẩm nổi bật</div>
                </div>
                <div className="bonus" onClick={props.gotoProduct}>
                    {/* thay &gt; == >, vi hien thi > bi loi*/}
                    Xem thêm -&gt;
                </div>
            </div>

            <div className="product1">{Product_is_hot.map(pro)}</div>

            <div className="chu_gt" id="uu_dai">
                <div className="list">
                    <div>Ưu đãi dành cho bạn</div>
                </div>
                <div className="bonus" onClick={props.gotoProduct}>
                    {/* thay &gt; == >, vi hien thi > bi loi*/}
                    Xem thêm -&gt;
                </div>
            </div>

            <div className="product1">{Product_uu_dai.map(duct)}</div>

            <div className="chu_gt" id="top_news">
                <div className="list">
                    <div>Tin Tức</div>
                </div>
                <div className="bonus" onClick={props.gotoNews}>
                    {/* thay &gt; == >, vi hien thi > bi loi*/}
                    Xem thêm -&gt;
                </div>
            </div>
            <div className="news-moom">{news.map(map_news)}</div>
        </div>
    );
}