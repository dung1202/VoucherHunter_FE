import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { getCart, checkToken, getProduct, getNews, getUserById } from "./Axios";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import * as Scroll from "react-scroll";
import { slider, Pro_is_hot, whiteNews } from "./whiteData.js"
import { jwtDecode } from "jwt-decode";
import {
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Heading from "./Heading";
import Footer from "./Footer";
import Home from "./Home";
import Product from "./Product"
import Register from "./Register";
import Cart from "./Cart.js";
import Proflie from "./Profile";
import DetailProduct from "./DetailProduct";
import Edituser from "./Edituser.js";
import CheckOut from "./CheckOut.js";
import CheckOutDetail from "./CheckOutDetail.js";
import News from "./News.js"
import DetailNews from "./DetailNews.js";
import Search from "./Search.js";
function App() {
  // tk: tiendung
  // emali: tiendung123.456.789@gmail.com
  // mk: tiendung12345

  // Don gian hoa ham chuyen doi trang
  const navigate = useNavigate();
  //
  // Don gian hoa ham lay data tren link
  const location = useLocation();
  //
  const [myLocation, setMyLocation] = useState('');
  //
  // Bien luu id san pham, tin tuc
  const [product_Id, setproduct_Id] = useState('');
  const [news_Id, setNews_Id] = useState('');
  //
  const changProductId = (id) => {
    setproduct_Id(id)
    // console.log(product_Id, id)/
  }
  const changeNewsId = (id) => {
    setNews_Id(id)
  }
  // ham lay data san pham 
  const [array, setarray] = useState(slider);
  const [news, setnews] = useState(whiteNews);
  const [newsMax, setNewsMax] = useState([]);
  const [productMax, setProductMax] = useState([]);
  const [Product_is_hot, setProduct_is_hot] = useState(Pro_is_hot);
  const [Product_uu_dai, setProduct_uu_dai] = useState(Pro_is_hot);
  const [soTrang, setSoTrang] = useState("");
  const [dem, setDem] = useState('10');
  // const [sl, setsl] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [dn, setDn] = useState(false)
  const [productSearch, setProductSearch] = useState([])
  const [newsSearch, setNewsSearch] = useState([])
  //
  // Lay data
  useEffect(() => {
    const fetchData = async () => {
      let mang = [];
      let d1 = 0, d2 = 0, d3 = 0;
      let mangis = [];
      let manguu = [];
      let mangA = [];
      let mangNews = [];
      let mangProduct = [];
      let mangNewsSearch = [];
      // Đợi cả hai promise hoàn thành
      try {
        const newsRes = await getNews(1);
        const dataNews = async (res) => {
          res.data.data.forEach(element => {
            mangNewsSearch.push(element)
          });
          for (let i = 2; i <= res.data.totalPage; i++) {
            await getNews(i).then((res) => {
              res.data.data.forEach(element => {
                mangNewsSearch.push(element)
              });
            })
          }
          setNewsSearch(mangNewsSearch)
        }
        dataNews(newsRes)

        // Xử lý dữ liệu từ getNews
        for (let i = 0; i < newsRes.data.data.length; i++) {
          if (i <= 5) {
            mang.push(newsRes.data.data[i]);
            mangNews.push(newsRes.data.data[i]);
          } else {
            mangNews.push(newsRes.data.data[i]);
          }
        }
        // console.log(newsRes.data.totalNews % 10)
        if (newsRes.data.totalNews % 10 === 0) {
          // console.log(newsRes.data.totalNews / 10)
          setSoTrang(newsRes.data.totalNews/ 10)
        } else setSoTrang((newsRes.data.totalNews / 10) + 1)


        const productRes = await getProduct();
        setProductSearch(productRes.data)
        // Xử lý dữ liệu từ getProduct
        for (let i = 0; i < productRes.data.length; i++) {
          mangProduct.push(productRes.data[i])
          if (productRes.data[i].is_hot && d1 <= 4) {
            mangis.push(productRes.data[i]);
            d1++;
          }
          if (productRes.data[i].discountPrice && d2 <= 4) {
            manguu.push(productRes.data[i]);
            d2++;
          }
          if (productRes.data[i].in_slider && d3 <= 4) {
            mangA.push(productRes.data[i]);
            d3++;
          }
        }

        // Cập nhật state sau khi cả hai promise hoàn thành
        setnews([...mang]);
        setProduct_is_hot([...mangis]);
        setProduct_uu_dai([...manguu]);
        setarray([...mangA]);
        setNewsMax([...mangNews]);
        setProductMax([...mangProduct])

      } catch (error) { }
    };

    fetchData();

  }, []);
  //
  // ham kiem tra vi tri trang web dang o
  useEffect(() => {
    setMyLocation(location.pathname)
  }, [location])
  //
  // Bien luu tru token cua nguoi dung
  const [cart, setcart] = useState(0);
  const [Avatar, setAvatar] = useState("");
  const [user, setUser] = useState('');
  const [token, setToken] = useState();

  // Kiem tra xem co ai dang nhap chua
  useEffect(() => {
    let Token = localStorage.getItem("accessToken");
    setToken(Token)
    const checkID = async () => {
      try {
        const check = await checkToken()
        // console.log(check.data.message)
        if (check.status !== 200) {
          setDn(false);
          setAvatar("");
          setcart(0);
          return;
        } else if (check.data.message === "Token is valid") {
          setDn(true)
          const userID = jwtDecode(Token)._id;
          const userProfile = await getUserById(userID)
          setUser(userProfile.data)
          setAvatar(userProfile.data.photoUrl);
          const dataCart = await getCart()
          setcart(dataCart.data.cart.items.length);
          dataCart.data.cart.items.map((item) => {
            item.checkbox = false
            return (<div></div>);
          })
          setCartItems(dataCart.data.cart.items);
          // console.log(dataCart.data.cart.items)
        } else {
          setAvatar("");
          setcart(0);
        }
      } catch (error) {
        setDn(false)
        setAvatar("");
        setcart(0);
      }
    }
    if (Token) {
      checkID()
    } else {
      setAvatar("");
      setcart(0);
    }
  }, [token])
  //
  const [checkOut, setcheckOut] = useState([]);

  // Ham su kien lan chuot
  const [scrollTop, setScrollTop] = useState();

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  //

  // Ham di den trang chu
  const gotoHome = () => {
    navigate("/");
  };
  //
  // Ham di dan trang dang ky tai khoan
  const gotoRegister = () => {
    navigate("/register");
  };
  // 
  // Ham di den trang san pham
  const gotoProduct = () => {
    navigate("/product");
  };
  //
  // Ham di den trang gio han
  const gotoCart = () => {
    navigate("/cart");
  };
  //
  // Ham di den trang tin tuc
  const gotoNews = () => {
    navigate("/news");
  };
  //
  // Ham di den trang thong tin ca nhan khach hang
  const gotoProfile = () => {
    navigate("/profile");
  };
  //
  // Ham di den chinh sua thong tin khach hang
  const gotoEdit = () => {
    navigate("/edit");
  };

  const gotoCheckOut = () => {
    navigate("/checkout");
  }

  // Dang xuat thi de gio hang = 0
  const logout = () => {
    localStorage.setItem("accessToken", "");
    setToken("")
    setAvatar("")
    setcart(0);
    navigate("/");
  };

  const logIn = () => {
    setToken(localStorage.getItem("accessToken"))
  }

  // Them so luong vao gio hang
  const cartAdd = () => {
    getCart().then((res) => {
      setcart(res.data.cart.items.length);
      res.data.cart.items.map((item) => {
        item.checkbox = false
        return (<div></div>);
      })
      setCartItems([...res.data.cart.items])
    });
  };


  // Tao hoa don moi
  const check = (add) => {
    setcheckOut(add);
    // console.log(add);
  };

  const changeDataUser = (data) => {
    setUser(data)
    setAvatar(data.photoUrl)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDem('9')
    }, 20000);  // Đợi 2 giây
    // let Token = localStorage.getItem("accessToken");
    // if (!Token) setDem('10')
    return () => clearTimeout(timer);
  }, [dn]);

  return (
    <div>
      <div className="layer2" style={{ zIndex: 2 }} id="header_top">
        <div style={{ position: "fixed", zIndex: "10" }}>
          <Heading
            soluong={cart}
            them={cartAdd}
            gotoHome={gotoHome}
            gotoRegister={gotoRegister}
            gotoProduct={gotoProduct}
            gotoCart={gotoCart}
            gotoNews={gotoNews}
            gotoProfile={gotoProfile}
            avatar={Avatar}
            logIn={logIn}
          />
        </div>
        <div onClick={() => { setDem('9') }} style={{ position: "fixed", zIndex: dn ? dem : "9", cursor: "pointer", width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div className="accessSuccess">Bạn đã đăng nhập thành công!!!</div>
          </div>
        </div>
      </div>
      <div className="layer1" style={{ backgroundColor: "rgb(251, 38, 38)" }}>
        <div style={{ marginTop: "15vh" }}
        // footer luon o duoi cung style={{ height: "100%", display: "grid", gridTemplateRows: " 1fr auto", }}
        >
          <div>
            <Routes>
              <Route path="/" element={
                <div>
                  <Helmet>
                    <title>Trang chủ</title>
                  </Helmet>
                  <Home
                    gotoProduct={gotoProduct}
                    gotoNews={gotoNews}
                    array={array}
                    Product_is_hot={Product_is_hot}
                    Product_uu_dai={Product_uu_dai}
                    news={news}
                    changProductId={changProductId}
                    changeNewsId={changeNewsId}
                  />
                </div>
              } />
              <Route path="/register" element={
                <div>
                  <Helmet>
                    <title>Đăng ký</title>
                  </Helmet>
                  <Register
                    gotoRegister={gotoRegister}
                    gotoHome={gotoHome}
                    them={cartAdd}
                    logIn={logIn}
                  />
                </div>
              } />
              <Route path="/profile" element={
                <div>
                  <Helmet>
                    <title>Thông tin</title>
                  </Helmet>
                  <Proflie
                    soluong={cart}
                    userData={user}
                    dangxuat={logout}
                    gotoEdit={gotoEdit}
                    gotoHome={gotoHome}
                  />
                </div>
              } />
              <Route path="/edit" element={
                <div>
                  <Helmet>
                    <title>Sửa thông tin</title>
                  </Helmet>
                  <Edituser
                    userData={user}
                    soluong={cart}
                    gotoProfile={gotoProfile}
                    changeDataUser={changeDataUser}
                  />
                </div>
              } />
              <Route path="/news" element={
                <div>
                  <Helmet>
                    <title>Tin tức</title>
                  </Helmet>
                  <News
                    news={newsMax}
                    changeNewsId={changeNewsId}
                    soTrang={soTrang}
                  />
                </div>
              } />
              <Route path="/product" element={
                <div>
                  <Helmet>
                    <title>Sản phẩm</title>
                  </Helmet>
                  <Product
                    changProductId={changProductId}
                    product={productMax}
                    array={array}
                  />
                </div>
              } />
              <Route path="/product/:search" element={
                <div>
                  <Helmet>
                    <title>Tìm kiếm</title>
                  </Helmet>
                  <Search
                    proSearch={productSearch}
                    newsSearch={newsSearch}
                    changProductId={changProductId}
                    changeNewsId={changeNewsId}
                  />
                </div>
              } />
              <Route path="/detail_product/:name/" element={
                <DetailProduct
                  gotoProduct={gotoProduct}
                  Product_uu_dai={Product_uu_dai}
                  avatar={Avatar}
                  gotoRegister={gotoRegister}
                  gotoHome={gotoHome}
                  them={cartAdd}
                  changProductId={changProductId}
                  product_Id={product_Id}
                  logIn={logIn}
                />
              } />
              <Route path="/detail_news/:title/" element={
                <DetailNews
                  gotoNews={gotoNews}
                  changeNewsId={changeNewsId}
                  news={news}
                  news_Id={news_Id}
                />
              } />
              <Route path="/cart" element={
                <div>
                  <Helmet>
                    <title>Giỏ hàng</title>
                  </Helmet>
                  <Cart
                    soluong={cart}
                    them={cartAdd}
                    out={check}
                    gotoCheckOut={gotoCheckOut}
                    cartItems={cartItems}
                    changProductId={changProductId}
                  />
                </div>
              } />
              <Route path="/checkout" element={
                <div>
                  <Helmet>
                    <title>Hóa đơn</title>
                  </Helmet>
                  <CheckOut
                    soluong={cart}
                    them={cartAdd}
                    muaDo={checkOut}
                    cartItems={cartItems}
                    gotoProduct={gotoProduct}
                    gotoCart={gotoCart}
                    gotoProfile={gotoProfile}
                    userData={user}
                  />
                </div>
              } />
              <Route path="/detail_checkout/:id/" element={
                <div>
                  <Helmet>
                    <title>{`Chi tiết đơn hàng`}</title>
                  </Helmet>
                  <CheckOutDetail
                    soluong={cart}
                    gotoHome={gotoHome}
                    changProductId={changProductId}
                  /></div>
              } />
            </Routes >
          </div>
          <div>
            <Footer
              gotoHome={gotoHome}
              gotoProduct={gotoProduct}
              gotoNews={gotoNews}
            />
          </div>
        </div>
      </div>
      <div className="layer2" style={{ zIndex: scrollTop > 100 ? "2" : "0" }}>
        <div className="on_top" style={{ marginTop: myLocation === "/" ? "80.7vh" : "92vh" }}>
          <Scroll.Link activeClass="active" to="header_top">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">Lên đầu trang</Tooltip>}
              >
                <img src="/onTop.png" alt="" />
              </OverlayTrigger>
            </div>
          </Scroll.Link>
          {myLocation === "/" ? <div> <Scroll.Link activeClass="active" to="sp_hot">
            <div className="img_left">
              <OverlayTrigger
                key="right"
                placement="right"
                overlay={<Tooltip id="tooltip-right">Sản phẩm nổi bật</Tooltip>}
              >
                <img src="/pie.png" alt="" />
              </OverlayTrigger>
            </div>
          </Scroll.Link>
            <Scroll.Link activeClass="active" to="uu_dai">
              <div className="img_left">
                <OverlayTrigger
                  key="right"
                  placement="right"
                  overlay={
                    <Tooltip id="tooltip-right">Ưu đãi dành cho bạn</Tooltip>
                  }
                >
                  <img src="/fire.png" alt="" />
                </OverlayTrigger>
              </div>
            </Scroll.Link>
            <Scroll.Link activeClass="active" to="top_news">
              <div className="img_left">
                <OverlayTrigger
                  key="right"
                  placement="right"
                  overlay={<Tooltip id="tooltip-right">Tin Tức</Tooltip>}
                >
                  <img src="/newspaper.png" alt="" />
                </OverlayTrigger>
              </div>
            </Scroll.Link> </div> : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
