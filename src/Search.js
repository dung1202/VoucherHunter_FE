import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Productcss.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import Fuse from 'fuse.js';
export default function Search(props) {
    const param = useParams()
    const navi = useNavigate()
    const [seaPro, setSeaPro] = useState([])
    const [seaNews, setSeaNews] = useState([])

    useEffect(() => {

        if (param.search === 'vote') {
            // setVoteN(localStorage.getItem('vote'))
            searchVote(Number(localStorage.getItem('vote')))
        }
        else if (param.search === 'money') {
            // setMoney(localStorage.getItem('money'))
            searchMoney(Number(localStorage.getItem('money')))
        }
    }, [])

    useEffect(() => {
        let mangNews = []
        let mangPro = []
        const dataProduct = async () => {
            const data = await props
            // console.log(data)
            mangNews = [...data.newsSearch]
            mangPro = [...data.proSearch]
            if (param.search !== 'vote' && param.search !== 'money')
                searchText()
            else {
                setSeaNews([])
            }
        }

        dataProduct()

        const searchText = () => {
            const optionsNews = {
                keys: ['title', 'content'],
                threshold: 0.6,
                includeScore: true,
            };
            const optionsPro = {
                keys: ['name', 'description'],
                threshold: 0.6,
                includeScore: true,
            };
            const fuseN = new Fuse(mangNews, optionsNews);
            const resultNews = fuseN.search(param.search);
            setSeaNews(resultNews)
            // console.log('tkNews ', resultNews)

            const fuseP = new Fuse(mangPro, optionsPro);
            const resultPro = fuseP.search(param.search);
            setSeaPro(resultPro)
            console.log('tkPro ', resultPro)
        }
    }, [props, param.search])

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

    const changeId = (id) => {
        props.changProductId(id)
        localStorage.setItem("product_id", id);
    };

    const phay = (x) => {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
        return x;
    };

    const pro = (e) => {
        let item = {}
        if (e.item)
            item = e.item
        else
            item = e
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
                <div className="hover1" style={{}}>
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

    function validateNiceNumber(Number) {
        return Number < 10 ? "0" + Number : Number;
        //                     true             false
    }

    const changeNewsId = async (id) => {
        await props.changeNewsId(id)
        localStorage.setItem("news_id", id);
    }

    const newsSea = (e) => {
        const item = e.item
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
    const [voteN, setVoteN] = useState(0);
    const [money, setMoney] = useState(0);

    const searchVote = (vote) => {
        let mangPro = []
        localStorage.setItem('vote', vote)
        props.proSearch.forEach(e => {
            if (e.vote >= vote) mangPro.push(e)
        });
        setVoteN(vote)
        setSeaPro(mangPro)
        setMoney(0)
        navi('/product/vote')
    }

    const searchMoney = (number) => {
        localStorage.setItem('money', number)
        let mangPro = []
        if (number === 1) {
            props.proSearch.forEach(e => {
                if (e.discountPrice < 200000)
                    mangPro.push(e)
            })
        }
        else if (number === 2) {
            props.proSearch.forEach(e => {
                if (e.discountPrice >= 200000 && e.discountPrice < 1000000)
                    mangPro.push(e)
            })
        }
        else if (number === 3) {
            props.proSearch.forEach(e => {
                if (e.discountPrice >= 1000000)
                    mangPro.push(e)
            })
        }
        setVoteN(0)
        setMoney(number)
        setSeaPro(mangPro)
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
                            checked={voteN === 5 ? true : false}>
                        </input>
                        <div style={{ marginTop: "5px" }}>{sao(5)}</div>
                        <div style={{ marginLeft: "5px" }}>từ 5 sao</div>
                    </div>
                    <div style={{ display: "flex" }} onClick={() => { searchVote(4) }}>
                        <input
                            style={{ marginRight: "10px", cursor: 'pointer' }}
                            type="checkbox"
                            checked={voteN === 4 ? true : false}>
                        </input>
                        <div style={{ marginTop: "5px" }}>{sao(4)}</div>
                        <div style={{ marginLeft: "5px" }}>từ 4 sao</div>
                    </div>
                    <div style={{ display: "flex" }} onClick={() => { searchVote(3) }}>
                        <input
                            style={{ marginRight: "10px", cursor: 'pointer' }}
                            type="checkbox"
                            checked={voteN === 3 ? true : false}>
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
                            checked={money === 1 ? true : false}>
                        </input>
                        <div style={{ fontSize: "0.85rem" }}> &lt; 200.000đ</div>
                    </div>
                    <div style={{ display: "flex" }} onClick={() => { searchMoney(2) }}>
                        <input
                            style={{ marginRight: "10px", cursor: 'pointer' }}
                            type="checkbox"
                            checked={money === 2 ? true : false}>
                        </input>
                        <div style={{ fontSize: "0.85rem" }}> 200.000đ -&gt; 1.000.000đ</div>
                    </div>
                    <div style={{ display: "flex" }} onClick={() => { searchMoney(3) }}>
                        <input
                            style={{ marginRight: "10px", cursor: 'pointer' }}
                            type="checkbox"
                            checked={money === 3 ? true : false}>
                        </input>
                        <div style={{ fontSize: "0.85rem" }}> &gt; 1.000.000đ</div>
                    </div>
                </div>
            </div>
            <div className="pro_slide_search">
                <div style={{ textAlign: 'center' }}>
                    <h6>Tìm kiếm: {param.search}</h6>
                    <hr />
                </div>
                <div style={{ display: seaPro.length === 0 ? 'none' : '' }}>
                    <h6>Sản phẩm</h6>
                    <div style={{ display: "flex", justifyContent: "space-evenly" }} className="product">
                        {seaPro.map(pro)}
                    </div>
                    <hr />
                </div>
                <div style={{ display: seaNews.length === 0 ? 'none' : '' }}>
                    <h6>Tin Tức</h6>
                    <div>
                        {seaNews.map(newsSea)}
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )

}