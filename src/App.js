import React, { Component } from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";
import MyPage from "./Pages/MyPage";
import Header from "./ReactRoute/Header";
import Home from "./Pages/Home";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      searchValue: ""
    };
  }
  
  //  fadeInfadeOut 준비중
  paintImage= () =>{
    const image = new Image();
    image.src = `../img/logo.png`;
    image.classList.add("bgImage");
    let body = document.querySelector('body');
    body.prepend(image)
  }

  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.setState({
        isLogin: true
      });
    } else {
      this.setState({
        isLogin: false
      });
    }
  };

  handleClickSearch = () => {
    let data = document.querySelector('.searchSection')
    let hi = data.lastChild.lastChild.lastChild.lastChild.data
      console.log(hi)
      // this.setState({
      //   searchValue: ,
      // });
    
  }

  handleSearch = e => {
    if (e.key === "Enter") {
      if (!e.target.value.length) {
        alert(" 지역을 입력하세요! ");
      } else {
        let data = e.target.value;
        e.target.value = "";
        this.setState({
          searchValue: data
        });
      }
    }
  };

  handleClickHome = e => { };

  changeIsLogin = value => {
    this.setState({
      searchValue: "",
      isLogin: value
    });
  };

  render() {
    if (this.state.isLogin === null) {
      return <Loading />;
    }
    return (
      <div className="App">
        <div className="js-Contents Contents">
          <Router>
            <div className="Nav">
              <Header
                isLogin={this.state.isLogin}
                changeIsLogin={this.changeIsLogin}
              />
            </div>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  handleSearch={this.handleSearch}
                  handleClickSearch={this.handleClickSearch}
                  searchValue={this.state.searchValue}
                  handleClickHome={this.handleClickHome}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login
                  isLogin={this.state.isLogin}
                  changeIsLogin={this.changeIsLogin}
                />
              )}
            />
            <Route path="/signup" render={props => <Signup />} />
            <Route path="/logout" component={Logout} />
          </Router>
        </div>
        <div className="MyPageSection">
          <MyPage isLogin={this.state.isLogin} />
        </div>
      </div>
    );
  }
}

export default App;