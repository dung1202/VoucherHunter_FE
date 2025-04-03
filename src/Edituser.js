import React, { useState, useEffect } from "react";
import "./user.css";
// import { storage } from "./uploadFireBase";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  Button,
} from "react-bootstrap";
import { checkToken } from "./Axios";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import { updateUser, changePwd } from "./Axios";

export default function Edituser(props) {

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

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newPasswordRepeat, setnewPasswordRepeat] = useState("");
  const [ttsp_moi, setttsp_moi] = useState("");
  const [token, setToken] = useState("");
  const [Avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [id, setid] = useState("");
  const [city, setcity] = useState("");
  const [district, setdistrict] = useState("");
  const [ward, setward] = useState("");
  const [detail, setdetail] = useState("");
  const [ten, setten] = useState("");
  const [gmail, setgmail] = useState("");
  const [sinhNhat, setsinhNhat] = useState("");
  const [dienThoai, setdienThoai] = useState("");
  const [diaChi, setdiaChi] = useState("");
  const [anh, setanh] = useState("");
  const [passwordShown1, setPasswordShown1] = useState(false);
  const togglePasswordVisibility1 = () =>
    setPasswordShown1(!passwordShown1 ? true : false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const togglePasswordVisibility2 = () =>
    setPasswordShown2(!passwordShown2 ? true : false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  const togglePasswordVisibility3 = () =>
    setPasswordShown3(!passwordShown3 ? true : false);
  const [err, seterr] = useState("");

  const [showPass, setShowPass] = useState(false);

  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);

  useEffect(() => {
    const data = async () => {
      const user = await props.userData;
      if (user) {
        setid(user._id);
        setAvatar(user.photoUrl);
        setPhone(user.phone);
        setgender(user.gender);
        const Address =
          user.address.detail +
          " " +
          user.address.ward +
          " " +
          user.address.district +
          " " +
          user.address.city;
        setcity(user.address.city);
        setdistrict(user.address.district);
        setward(user.address.ward);
        setdetail(user.address.detail);
        setdob(user.dob);
        setToken(token);
        setten(user.username);
        setgmail(user.email);
        setsinhNhat(user.dob);
        setdienThoai(user.phone);
        setdiaChi(Address);
        setanh(user.photoUrl);
        setttsp_moi(user.subscribeToNewsLetter);
      }
    }
    data()
  }, [props, token]);

  const updatedata = (e) => {
    // chong gui khi chua du thong tin
    e.preventDefault();
    let body = {
      photoUrl: anh,
      id,
      phone,
      address: {
        city,
        detail,
        ward,
        district,
      },
      dob,
      gender,
      subscribeToNewsLetter: ttsp_moi,
      email: gmail,
      username: ten,
    };
    updateUser(body).then((res) => {
      props.gotoProfile()
      props.changeDataUser(body)
      console.log(res.data);
    });
  };

  function validateNiceNumber(Number) {
    return Number < 10 ? "0" + Number : Number;
    //                     true             false
  }

  const submit = () => {
    const body = {
      oldPassword,
      newPassword,
    };
    console.log(body, newPasswordRepeat);
    if (
      oldPassword.length === 0 ||
      newPassword === 0 ||
      newPasswordRepeat === 0
    ) {
      seterr("Phải nhập đủ 3 mật khẩu");
    } else if (
      oldPassword.length < 8 ||
      oldPassword.length > 30 ||
      newPassword.length > 30 ||
      newPassword.length < 8
    ) {
      seterr("Mật khẩu không hợp lệ");
    } else if (newPassword !== newPasswordRepeat) {
      seterr("Mật khẩu mới không khớp");
    } else {
      changePwd(body).then((res) => {
        if (res.data.message === "Wrong password") {
          seterr("Mật khẩu sai");
        } else if (res.data.message === "Change password successfully") {
          seterr("Đổi mật khẩu thành công");
          setTimeout(() => {
            handleClosePass();
            props.gotoProfile()
          }, 2000);
        }
      });
    }
  };

  const date = new Date(sinhNhat);
  const day = validateNiceNumber(date.getDate());
  const month = validateNiceNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  const ngay = (item) => {
    const a = new Date(item);
    const b = validateNiceNumber(a.getDate());
    const c = validateNiceNumber(a.getMonth() + 1);
    const d = a.getFullYear();
    const ok = `${d}-${c}-${b}`;
    return ok;
  };

  const upanh = (e) => {
    // const ok = e.target.files[0];
    // console.log(ok);
    // let storageRef = ref(storage, `anh/${ok.name}`);
    // let uploadTask = uploadBytesResumable(storageRef, ok);
    // uploadTask.on(
    //   (error) => console.log(error),
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log(downloadURL);
    //       setanh(downloadURL);
    //     });
    //   }
    // );

    const file = e.target.files[0];
    // console.log(file)
    const apiKey = "903c15c56da1802d9afc5abb8eab43b6"

    const uploadImgBB = async (file) => {
      const formData = new FormData();
      // Thêm file hình ảnh vào FormData để gửi lên server
      formData.append("image", file);
      // console.log(file)

      try {
        // Gửi yêu cầu POST đến API ImgBB với đường dẫn endpoint và apiKey
        const response = await fetch(`https://api.imgbb.com/1/upload?name=${ten.concat('_', file.name)}&key=${apiKey}`, {
          method: "POST", // Phương thức POST để tải file lên
          body: formData, // Dữ liệu gửi đi là FormData chứa file ảnh
        });

        // Chuyển đổi phản hồi từ dạng JSON thành object JavaScript
        const data = await response.json();
        // Trả về URL của hình ảnh sau khi tải lên thành công
        // console.log(data.data.url)
        setanh(data.data.url)
      } catch (error) {
        // Bắt lỗi nếu có vấn đề xảy ra trong quá trình tải lên
        console.log(error);
        return null; // Trả về null nếu gặp lỗi
      }
    }
    uploadImgBB(file)
  };

  return (
    <div>
      {token ? (
        <div>
          <div>
            <div className="user">
              <div className="userTitleContainer">
                <h1 className="userTitle">Chỉnh sửa thông tin người dùng</h1>
              </div>
              <div className="userContainer">
                <div className="userShow">
                  <div className="userShowTop">
                    <img src={Avatar} alt="" className="userShowImg" />
                    <div className="userShowTopTitle">
                      <span className="userShowUsername">{ten}</span>
                    </div>
                  </div>
                  <div className="userShowBottom">
                    <span className="userShowTitle">Thông tin người dùng</span>
                    <div className="userShowInfo">
                      <PermIdentity className="userShowIcon" />
                      <span className="userShowInfoTitle">{ten}</span>
                    </div>
                    <div className="userShowInfo">
                      <CalendarToday className="userShowIcon" />
                      <span className="userShowInfoTitle">{`${day}/${month}/${year}`}</span>
                    </div>
                    <span className="userShowTitle">Thông tin liên hệ</span>
                    <div className="userShowInfo">
                      <PhoneAndroid className="userShowIcon" />
                      <span className="userShowInfoTitle">{dienThoai}</span>
                    </div>
                    <div className="userShowInfo">
                      <MailOutline className="userShowIcon" />
                      <span className="userShowInfoTitle">{gmail}</span>
                    </div>
                    <div className="userShowInfo">
                      <LocationSearching className="userShowIcon" />
                      <span className="userShowInfoTitle">{diaChi}</span>
                    </div>
                    <button
                      className="userUpdateButton"
                      onClick={handleShowPass}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
                <div className="userUpdate">
                  <span className="userUpdateTitle">Thông tin chỉnh sửa</span>
                  <form className="userUpdateForm">
                    <div>
                      <div className="userUpdateItem">
                        <label>Thành phố/Tỉnh</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setcity(e.target.value)}
                          placeholder="Thành phố/Tỉnh"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Quận/Huyện</label>
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setdistrict(e.target.value)}
                          placeholder="Quận/Huyện"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Phường/Xã</label>
                        <input
                          type="text"
                          value={ward}
                          onChange={(e) => setward(e.target.value)}
                          placeholder="Phường/Xã"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Số nhà</label>
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) => setdetail(e.target.value)}
                          placeholder="Số nhà"
                          className="userUpdateInput"
                        />
                      </div>
                    </div>
                    <div className="userUpdateLeft">
                      <div className="userUpdateItem">
                        <label>Giới tính</label>
                        <select
                          className="userUpdateInput"
                          value={gender}
                          onChange={(e) => {
                            setgender(e.target.value);
                            console.log(e.target.value);
                          }}
                        >
                          <option>Nam</option>
                          <option>Nữ</option>
                          <option>LGBT</option>
                        </select>
                        {/* <input
                          type="test"
                          value={gender}
                          
                          placeholder="Giới tính"
                          className="userUpdateInput"
                        /> */}
                      </div>
                      <div className="userUpdateItem">
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 123 456 67"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem">
                        <label>Sinh nhật</label>
                        <input
                          type="date"
                          value={ngay(dob)}
                          max={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            setdob(new Date(e.target.value));
                          }}
                          placeholder="Sinh Nhật"
                          className="userUpdateInput"
                        />
                      </div>
                      <div className="userUpdateItem1">
                        <input
                          style={{ marginRight: "10px" }}
                          type="checkbox"
                          checked={ttsp_moi}
                          onChange={() => {
                            setttsp_moi(!ttsp_moi);
                          }}
                        />
                        <label>Nhận thông tin sản phẩm mới</label>
                      </div>
                    </div>
                    <div className="userUpdateRight">
                      <div className="userUpdateUpload">
                        <img alt="" className="userShowImg1" src={anh} />
                        <label htmlFor="file">
                          <Publish className="userUpdateIcon" />
                        </label>
                        <input
                          type="file"
                          id="file"
                          style={{ display: "none" }}
                          onChange={upanh}
                        />
                      </div>
                      <button className="userUpdateButton" onClick={updatedata}>
                        Cập nhật
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <Modal show={showPass} onHide={handleClosePass}>
            <Modal.Header closeButton>
              <Modal.Title>Đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text_login">Mật khẩu hiện tại: </div>
              <label className="signup-password">
                <input
                  className="login"
                  type={passwordShown1 ? "text" : "password"}
                  onChange={(e) => {
                    setoldPassword(e.target.value);
                  }}
                  placeholder="Mật khẩu"
                />
                <FontAwesomeIcon
                  className="fa-icons"
                  icon={faEye}
                  onClick={togglePasswordVisibility1}
                />
              </label>
              <div className="text_login">Mật khẩu mới: </div>
              <label className="signup-password">
                <input
                  className="login"
                  type={passwordShown2 ? "text" : "password"}
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                  placeholder="Mật khẩu"
                />
                <FontAwesomeIcon
                  className="fa-icons"
                  icon={faEye}
                  onClick={togglePasswordVisibility2}
                />
              </label>
              <div className="text_login">Lặp lại mật khẩu mới </div>
              <label className="signup-password">
                <input
                  className="login"
                  type={passwordShown3 ? "text" : "password"}
                  onChange={(e) => {
                    setnewPasswordRepeat(e.target.value);
                  }}
                  placeholder="Mật khẩu"
                />
                <FontAwesomeIcon
                  className="fa-icons"
                  icon={faEye}
                  onClick={togglePasswordVisibility3}
                />
              </label>
              <div className="check_loi">{err}</div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={submit}>
                Đổi mật khẩu
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : null}
    </div>
  );
}
