import React, { Component } from "react";
import fetchHelper from "../helpers/fetch"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const styles = theme => ({
  signup: {
    backgroundColor: theme.palette.common.white,
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    borderRadius: `4px`
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: theme.spacing.unit,
  }
});

class Signup extends Component {
  id_check = false;
  nickname_check = false;
  pwCheck = false;
  isIdCheck = id => {
    var regType1 = /^[A-Za-z0-9+]{4,8}$/;
    this.id_check = false;
    if (id === "") {
      document.querySelector(".verifyId").innerHTML = "아이디를 입력해주세요";
      return false;
    } else if (!regType1.test(id)) {
      document.querySelector(".verifyId").innerHTML = "아이디는 영문 또는 숫자 포함 4-8자여야 합니다";
      return false;
    }
    fetchHelper.fetchSignup_IdCheck(id)
    .then(response => {
      return response.json();
    })
    .then(check => {
      if (check === 0) {
        // alert("사용이 가능한 아이디 입니다");
        document.querySelector(".verifyId").innerHTML = "사용가능한 아이디 입니다".fontcolor("green");
        this.id_check = true;
      } else if (check >= 1) {
        document.querySelector(".verifyId").innerHTML = "이미 사용중인 아이디 입니다";
          // alert("이미 사용중인 아이디 입니다");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  isNickNameCheck = nick_name => {
    var regType1 = /^[가-힣|ㄱ-ㅎ|ㅏ-ㅣ|a-zA-Z0-9+]{4,8}$/gi;
    this.nickname_check = false;
    if (nick_name === "") {
      document.querySelector(".verifyNickName").innerHTML = "닉네임을 입력해주세요";
      return false;
    } else if (!regType1.test(nick_name)) {
      document.querySelector(".verifyNickName").innerHTML = "닉네임은 영문 또는 숫자 포함 4-8자여야 합니다";
      return false;
    }
    fetchHelper.fetchSignup_NickNameCheck(nick_name)
      .then(response => {
        return response.json();
      })
      .then(check => {
        if (check === 0) {
          document.querySelector(".verifyNickName").innerHTML = "사용가능한 닉네임 입니다".fontcolor("green");
          this.nickname_check = true;
        } else if (check >= 1) {
          document.querySelector(".verifyNickName").innerHTML = "이미 사용중인 닉네임 입니다";
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  isPwCheck = (pw, pw_check) => {
    var regType1 = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    this.pwCheck = false;
    if (pw === "") {
      document.querySelector(".isPwCheck").innerText = "비밀번호를 입력해주세요";
      return false;
    } 
    if (!regType1.test(pw)) {
      document.querySelector(".isPwCheck").innerText = "비밀번호는 영문 대소문자 및 숫자 또는 특수문자 포함 6-20글자여야 합니다";
      return false;
    }
    if (pw === pw_check) {
      document.querySelector(".isPwCheck").innerHTML = "비밀번호가 일치합니다".fontcolor("green");
      document.querySelector(".isPwCheck").style.display = "block";
      this.pwCheck = true;
    } else {
      document.querySelector(".isPwCheck").innerHTML =
        "비밀번호가 일치하지 않습니다";
      document.querySelector(".isPwCheck").style.display = "block";
    }
  };
  verifyPwCheck = e => {
    this.pwCheck = false;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.signup}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">회원가입</Typography>
          <form
            className={classes.form}
            onSubmit={e => {
              console.log(this.id_check, this.nickname_check, this.pwCheck, e.target.gender.value)
              e.preventDefault();
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
                document.querySelector(".isPwCheck").innerText ===
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
                document.querySelector(".isPwCheck").innerText ===
                "비밀번호가 일치합니다"
              ) {
                var user = {
                  id: e.target.id.value,
                  pw: e.target.pw.value,
                  nick_name: e.target.nick_name.value,
                  gender: e.target.gender.value
                };
                fetchHelper.fetchSignup(user)
                  .then(response => {
                    console.log(response.status);
                    if (response.status === 201) {
                      window.location.href = "http://production-bwb-client.s3-website.ap-northeast-2.amazonaws.com/login";
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
            <FormControl margin="normal" required fullWidth>
              <InputLabel 
                htmlFor="id"
              >아이디</InputLabel>
              <Input 
                id="id"
                name="id"
                placeholder="4-8글자(한영,숫자)"
                onChange={e => {
                  this.isIdCheck(document.querySelector("#id").value);
                }}
                autoFocus />
            </FormControl>
            <span className="verifyId">아이디를 입력해주세요</span>
            <FormControl margin="normal" required fullWidth>
              <InputLabel 
                htmlFor="password"
              >비밀번호</InputLabel>
              <Input 
                type="password"
                id="pw"
                name="pw"
                placeholder="6-20글자(영문 대소문자 최소 1개의 숫자 혹은 특수 문자 포함)"
                onChange={e => {
                this.isPwCheck(
                  document.querySelector("#pw").value,
                  document.querySelector("#pw_check").value
                );
              }} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel 
                htmlFor="password"
              >비밀번호 확인</InputLabel>
              <Input 
                type="password"
                id="pw_check"
                name="pw_check"
                placeholder="비밀번호 재입력"
                onChange={e => {
                this.isPwCheck(
                  document.querySelector("#pw").value,
                  document.querySelector("#pw_check").value
                );
              }} />
            </FormControl>
            <span className="isPwCheck">비밀번호를 입력해주세요</span>
            <FormControl margin="normal" required fullWidth>
              <InputLabel 
                htmlFor="nick_name"
              >닉네임</InputLabel>
              <Input 
                type="text"
                id="nick_name"
                name="nick_name"
                placeholder="4-8글자이상(영문,숫자)"
                onChange={e => {
                  this.isNickNameCheck(
                    document.querySelector("#nick_name").value
                  );
                }} />
            </FormControl>
            <span className="verifyNickName">닉네임을 입력해 주세요</span>
            {/* <p>
              성별:
              <input type="radio" name="gender" value="0" />남
              <input type="radio" name="gender" value="1" />여
            </p> */}
            <RadioGroup
              aria-label="Gender"
              name="gender"
              row
            >
              <FormControlLabel value="0" control={<Radio />} label="남자" />
              <FormControlLabel value="1" control={<Radio />} label="여자" />
            </RadioGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >회원가입</Button>
          </form>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(Signup);
