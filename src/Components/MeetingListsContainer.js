import React, { Fragment } from "react";
import "../App.css";
import MeetingLists from "./MeetingLists";
import fetchHelper from "../helpers/fetch";
import MeetingDetailModal from "./MeetingDetailModal";
import RestaurantMeetingList from "./RestaurantMeetingList";
import NewMeetingModal from "./NewMeetingModal";
import { withRouter } from "react-router-dom";
class MeetingListsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMeetingDetailModal: false,
      fetchedDetail: undefined,
      showNewMeetingModal: false,
      nickname: null
    };
  }

  getMeetingDetail = (placeId, meetingId) => {
    fetchHelper
      .fetchMeetingDetail(placeId, meetingId)
      .then(result => result.json())
      .then(json => {
        console.log(json, "json");
        this.setfetchedDetail(json);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  };

  setfetchedDetail = data => {
    this.setState({
      fetchedDetail: data
    });
    this.toggleMeetingDetailModal();
  };

  fetchHandler = (identifier, meetingId) => {
    var resultInfo = this.props.clickMarkerRestaurantInfo
      ? new Array(this.props.clickMarkerRestaurantInfo)
      : this.props.restaurantInfos;
    if (!identifier && !localStorage.getItem("token")) {
      console.log('identifier', identifier)
      let response = window.confirm(
        "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      if (response) {
        this.props.history.push("/login");
      }
    } else if (identifier) {
      if (!localStorage.getItem("token")) {
        let response = window.confirm(
          "로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
        );
        if (response) {
          this.props.history.push("/login");
        }
      } else {
        if (identifier === "참가하기") {
          fetchHelper.addMember(meetingId).then(result => {
            this.toggleMeetingDetailModal();
            this.props.fetchMeetingLists(resultInfo);
          });
        } else if (identifier === "참가 취소") {
          fetchHelper.cancelMember(meetingId).then(result => {
            this.toggleMeetingDetailModal();
            this.props.fetchMeetingLists(resultInfo);
          });
        } else if (identifier === "모임 삭제") {
          fetchHelper.deleteMeeting(meetingId).then(result => {
            this.toggleMeetingDetailModal();
            this.props.fetchMeetingLists(resultInfo);
          });
        } else if (identifier === "모임 생성") {
          fetchHelper.createNewMeeting(meetingId).then(result => {
            alert("모임이 생성되었습니다.");
            this.toggleNewMeetingModal();
            this.props.fetchMeetingLists(
              new Array(this.props.clickMarkerRestaurantInfo)
            );
          });
        }
      }
    };
  }

  submitNewMeeting = createSubmitData => {
    if (createSubmitData.meeting_name.length === 0) {
      alert('모임명을 입력해 주세요.')
    } else {
      createSubmitData.placeId = this.props.clickMarkerRestaurantInfo.place_id;
      this.fetchHandler("모임 생성", createSubmitData);
    }
  };

  toggleMeetingDetailModal = () => {
    let app = document.getElementsByClassName("App")[0];
    if (this.state.showMeetingDetailModal) {
      app.className = "App"
    } else {
      app.className = "App is-blurred"
    }
    this.setState({
      showMeetingDetailModal: !this.state.showMeetingDetailModal
    });
  };

  toggleNewMeetingModal = async () => {
    let result = await this.getNickname();
    let app = document.getElementsByClassName("App")[0];
    if (this.state.showNewMeetingModal) {
      app.className = "App"
    } else {
      app.className = "App is-blurred"
    }
    this.setState({
      showNewMeetingModal: !this.state.showNewMeetingModal,
      nickname: result.nickname
    });
  };



  getNewMeetingModal = () => {
    if (!localStorage.getItem("token")) {
      let response = window.confirm(
        "새로운 모임을 생성하기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?"
      );
      if (response) {
        this.props.history.push("/login");
        //로그인 페이지로 이동
      }
    } else {
      this.toggleNewMeetingModal();
    }
  };

  getNickname = async () => {
    return await fetchHelper
      .fetchNickname()
      .then(result => {
        return result.json();
      })
      .then(json => {
        return json;
      });
  };

  // componentDidMount = () => {
  //     this.init();
  // };
  placeNameDefinder = meetingListArr => {
    meetingListArr.forEach(e => {
      for (let i = 0; i < this.props.restaurantInfos.length; i++) {
        if (this.props.restaurantInfos[i].place_id === e.placeId) {
          e.restaurantName = this.props.restaurantInfos[i].name;
        }
      }
    });
  };

  activationFilter = meetingListArr => {
    this.placeNameDefinder(meetingListArr);
    let result = {};
    let activeMeetings = [];
    let inActiveMeetings = [];
    meetingListArr.sort(function (a, b) {
      return (
        Number(a.meetingTime.slice(11, 13)) -
        Number(b.meetingTime.slice(11, 13))
      );
    });
    meetingListArr.forEach(e => {
      if (e.isActive) {
        activeMeetings.push(e);
      } else {
        inActiveMeetings.push(e);
      }
    });
    result.activeMeetings = activeMeetings;
    result.inActiveMeetings = inActiveMeetings;
    // console.log("filter", result);
    return result;
  };

  render() {
    // console.log(this.props.clickMarkerRestaurantInfo)
    return (
      <div className="HelloWorld">
        {this.props.meetingsInfos ? (
          this.props.clickMarkerRestaurantInfo ? (
            <Fragment>
              <div className="RestaurantMeetingList">
                <RestaurantMeetingList
                  meetingsInfos={this.activationFilter(
                    this.props.meetingsInfos.result
                  )}
                  clickMarkerRestaurantInfo={
                    this.props.clickMarkerRestaurantInfo
                  }
                  getMeetingDetail={this.getMeetingDetail}
                  getNewMeetingModal={this.getNewMeetingModal}
                  buttonHandler={this.fetchHandler}
                  backToMeetingList={this.props.backToMeetingList}
                />
              </div>
              <div className="NewMeetingModal">
                <NewMeetingModal
                  show={this.state.showNewMeetingModal}
                  closeModal={this.toggleNewMeetingModal}
                  submitNewMeeting={this.submitNewMeeting}
                  placeName={this.props.clickMarkerRestaurantInfo.name}
                  nickname={this.state.nickname}
                  buttonHandler={this.fetchHandler}
                />
              </div>
            </Fragment>
          ) : (
              <MeetingLists
                filteredMeetingLists={this.activationFilter(
                  this.props.meetingsInfos.result
                )}
                getMeetingDetail={this.getMeetingDetail}
                restaurantInfos={this.props.restaurantInfos}
              />
            )
        ) : null}
        <MeetingDetailModal
          show={this.state.showMeetingDetailModal}
          closeModal={this.toggleMeetingDetailModal}
          buttonHandler={this.fetchHandler}
          data={this.state.fetchedDetail}
        />
      </div>
    );
  }
}

export default withRouter(MeetingListsContainer);
