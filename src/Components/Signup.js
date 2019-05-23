import React, { Component } from "react";
import fetchHelper from "../helpers/fetch";
import "../App.css";
class Signup extends Component {
  id_check = false;
  nickname_check = false;
  pwCheck = false;
  isIdCheck = id => {
    if (id === "") {
      alert("아이디를 입력해주세요!");
      return false;
    }
    fetchHelper
      .fetchSignup_IdCheck(id)
      .then(response => {
        return response.json();
      })
      .then(check => {
        if (check === 0) {
          alert("사용이 가능한 아이디 입니다");
          this.id_check = true;
        } else if (check >= 1) {
          alert("이미 사용중인 아이디 입니다");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  isNickNameCheck = nick_name => {
    if (nick_name === "") {
      alert("닉네임을 입력해주세요!");
      return false;
    }
    fetchHelper
      .fetchSignup_NickNameCheck(nick_name)
      .then(response => {
        return response.json();
      })
      .then(check => {
        if (check === 0) {
          alert("사용이 가능한 닉네임 입니다");
          this.nickname_check = true;
        } else if (check >= 1) {
          alert("이미 사용중인 닉네임 입니다");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  isPwCheck = (pw, pw_check) => {
    if (pw === "" || pw_check === "") {
      alert("비밀번호를 입력해주세요!");
      return false;
    }
    if (pw === pw_check) {
      document.querySelector(".isPwCheck").innerHTML = "비밀번호가 일치합니다";
      document.querySelector(".isPwCheck").style.display = "block";
      this.pwCheck = true;
    } else {
      document.querySelector(".isPwCheck").innerHTML =
        "비밀번호가 일치하지 않습니다";
      document.querySelector(".isPwCheck").style.display = "block";
    }
  };
  verifyId = e => {
    this.id_check = false;
    var regType1 = /^[A-Za-z0-9+]{4,8}$/;

    if (regType1.test(e.target.value)) {
      document.querySelector(".verifyId").style.display = "none";
    } else {
      document.querySelector(".verifyId").style.display = "block";
    }
  };
  verifyNickName = e => {
    this.nickname_check = false;
    var regType1 = /^[가-힣|ㄱ-ㅎ|ㅏ-ㅣ|a-zA-Z0-9+]{4,8}/gi;

    if (regType1.test(e.target.value)) {
      document.querySelector(".verifyNickName").style.display = "none";
    } else {
      document.querySelector(".verifyNickName").style.display = "block";
    }
  };
  verifyPw = e => {
    this.pwcheck = false;
    var regType1 = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;

    if (regType1.test(e.target.value)) {
      document.querySelector(".verifyPw").style.display = "none";
    } else {
      document.querySelector(".verifyPw").style.display = "block";
    }
  };
  verifyPwCheck = e => {
    this.pwCheck = false;
  };
  render() {
    return (
      <div className="signup">
        <h2>회원가입</h2>
        <form
          className="signup-form"
          onSubmit={e => {
            e.preventDefault();
            console.log(
              document.querySelector(".isPwCheck").innerHTML ===
                "비밀번호가 일치하지 않습니다"
            );
            if (this.id_check === false) {
              alert("아이디 중복확인을 해주세요!");
              return false;
            }
            if (this.nickname_check === false) {
              alert("닉네임 중복확인을 해주세요!");
              return false;
            }
            if (this.pwCheck === false) {
              alert("비밀번호 확인을 해주세요!");
              return false;
            }
            if (e.target.id.value === "") {
              alert("아이디를 입력해주세요!");
              return false;
            } else if (e.target.pw.value === "") {
              alert("비밀번호를 입력해주세요!");
              return false;
            } else if (
              document.querySelector(".isPwCheck").innerHTML ===
              "비밀번호가 일치하지 않습니다"
            ) {
              alert("비밀번호가 일치하지 않습니다!");
              return false;
            } else if (e.target.nick_name.value === "") {
              alert("닉네임을 입력해주세요!");
              return false;
            } else if (e.target.gender.value === "") {
              alert("성별을 체크해주세요!");
              return false;
            } else if (
              this.id_check === true &&
              this.pwCheck === true &&
              this.nickname_check === true &&
              document.querySelector(".isPwCheck").innerHTML ===
                "비밀번호가 일치합니다"
            ) {
              var user = {
                id: e.target.id.value,
                pw: e.target.pw.value,
                nick_name: e.target.nick_name.value,
                gender: e.target.gender.value
              };
              fetchHelper
                .fetchSignup(user)
                .then(response => {
                  console.log(response.status);
                  if (response.status === 201) {
                    // this.props.changeIsLogin(false);
                    window.location.href = "/login";
                    // history.push("/");
                    // alert("정상적으로 회원가입 되었습니다!");
                    return response;
                  }

                  return response;
                })
                .catch(err => {
                  alert("회원가입에 실패하였습니다!");
                  console.log(err);
                  return err;
                });
            }
          }}
        >
          <p>
            아이디:
            <input
              type="text"
              id="id"
              name="id"
              placeholder="아이디"
              onChange={this.verifyId}
            />
            <input
              type="button"
              name="id_check"
              value="중복확인"
              onClick={e => {
                this.isIdCheck(document.querySelector("#id").value);
              }}
            />
            <span className="verifyId">4-8글자(한영,숫자)</span>
          </p>
          <p>
            비밀번호:
            <input
              type="password"
              id="pw"
              name="pw"
              placeholder="비밀번호"
              onChange={this.verifyPw}
            />
            <span className="verifyPw">
              6-20글자(영문 대소문자 최소 1개의 숫자 혹은 특수 문자 포함)
            </span>
          </p>

          <p>
            비밀번호 확인:
            <input
              type="password"
              id="pw_check"
              name="pw_check"
              placeholder="비밀번호 재입력"
              onChange={this.verifyPwCheck}
            />
            <input
              type="button"
              name="pw_check_button"
              value="비밀번호 확인"
              onClick={e => {
                this.isPwCheck(
                  document.querySelector("#pw").value,
                  document.querySelector("#pw_check").value
                );
              }}
            />
          </p>
          <span className="isPwCheck" />
          <p>
            닉네임:
            <input
              type="text"
              id="nick_name"
              name="nick_name"
              placeholder="닉네임"
              onChange={this.verifyNickName}
            />
            <input
              type="button"
              name="nickname_check"
              value="중복확인"
              onClick={e => {
                this.isNickNameCheck(
                  document.querySelector("#nick_name").value
                );
              }}
            />
            <span className="verifyNickName">4-8글자이상(영문,숫자)</span>
          </p>
          <p>
            성별:
            <input type="radio" name="gender" value="0" />남
            <input type="radio" name="gender" value="1" />여
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </div>
    );
  }
}
export default Signup;
