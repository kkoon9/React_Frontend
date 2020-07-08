import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./style/LoginForm.scss";
import { userApi } from "../../Api/api";
import { useDispatch } from "react-redux";
import { startLogin } from "../../Reducer/userInfoReducer";

const LoginForm = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const dispatch = useDispatch();

  return (
    <div className={["popupWrap"].join(" ")}>
      <div
        className={["popupBox", "notice"].join(" ")}
        style={{
          width: "427px",
          height: "489px",
        }}
      >
        <h2>로그인</h2>
        {/* <button
          className={["btn", "xSmall", "closed"].join(" ")}
          onClick={() => {
            // dispatch(closeModal());
            console.log("닫기");
          }}
        >
          {" "}
          <span className={["icon", "closed"].join(" ")}></span>
        </button> */}
        <div className="popupContent">
          <label className="a11yHidden" htmlFor="userId">
            아이디
          </label>
          <input
            className={["input", "large"].join(" ")}
            type="text"
            id="userId"
            placeholder="아이디"
            onChange={(e) => setInputId(e.target.value)}
          />
          <label className="a11yHidden" htmlFor="userPw">
            비밀번호
          </label>
          <input
            className={["input", "large"].join(" ")}
            type="password"
            id="userPw"
            placeholder="비밀번호"
            onChange={(e) => setInputPw(e.target.value)}
          />
          <div className="inputWrap saveIdWrap">
            <input type="checkbox" id="saveId" />
            <label htmlFor="saveId">
              <span className="inputIcon" />
              아이디 저장
            </label>
          </div>
          <button
            className={["btnLogin", "btn", "large"].join(" ")}
            type="submit"
            onClick={async () =>
              dispatch(
                startLogin({
                  id: inputId,
                  pw: inputPw,
                })
              )
            }
          >
            로그인
          </button>
          <Link to="/membersignup" className="btnSignUp">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
