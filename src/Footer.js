import React from "react";
import "./Homecss.css";
export default function Footer(props) {
    return (

        <div style={{ width: "99.2vw" }}>
            <div className="footer1">
                <div className="footer_flex">Menu</div>
                <div className="footer_flex">Thanh Toán</div>
                <div className="footer_flex">Đối tác liên kết</div>
                <div className="footer_flex">Mobile app</div>
            </div>

            <div className="footer2">
                <div style={{ flex: "1", cursor: "pointer" }}>
                    <div className="menu" onClick={props.gotoHome}>
                        Trang chủ
                    </div>
                    <div className="menu" onClick={props.gotoProduct}>
                        Sản phẩm
                    </div>
                    <div className="menu" onClick={props.gotoNews}>
                        Tin Tức
                    </div>
                </div >

                <div className="footer_flex">
                    <img src="/tt1.png" className="img_footer" alt="" />
                    <div style={{ marginTop: "5px" }}>
                        <img src="/tt2.png" className="img_footer_1" alt="" />
                    </div>
                </div>
                <div className="footer_flex"></div>
                <div className="footer_flex">
                    <img src="/app1.png" className="img_footer app" alt="" />
                    <div style={{ marginTop: "5px" }}>
                        <img src="/app2.png" className="img_footer app" alt="" />
                    </div>
                </div>
            </div >
        </div >
    );
}