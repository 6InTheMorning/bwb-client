import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import SearchButton from "../Pages/SearchButton";
import PeoPle from "@material-ui/icons/People";
import StarRatings from "react-star-ratings";

class RestaurantMeetingList extends Component {
  render() {


    let meetingInfos = this.props.meetingsInfos;
    let restaurantInfo = this.props.clickMarkerRestaurantInfo;
    
    
    return (
      <Fragment>
        {restaurantInfo ? (
          <div id="meetingListContainer">
            <div id="meeting-box">
              <div id="restauranteInfo">
                <div className="fas fa-store"> {restaurantInfo.name}</div>
                <div>                  
                </div>
                <div style={{ fontSize: "15px", margin: "10px" }}>
                  {restaurantInfo.formatted_address}
                </div>
                <StarRatings
                  rating={restaurantInfo.rating}
                  starRatedColor="#ffd43b"
                  starDimension="30px"
                  starSpacing="10px"
                />
                <br />
                <div className="fas fa-phone">
                  {" "}
                  {restaurantInfo.formatted_phone_number}
                </div>
                <br />
                {restaurantInfo.website === undefined ? (
                  false
                ) : (
                  <a
                    className="store-url"
                    href={restaurantInfo.website}
                    style={{
                      textDecoration: "none"
                    }}
                  >
                    {restaurantInfo.website.slice(0, 30) + "..."}
                  </a>
                )}
              </div>

              <div id="meeting-state-Info">
                <div className="fas fa-user-friends"> 현재모임</div>
                {meetingInfos.activeMeetings.length > 0 ? (
                  meetingInfos.activeMeetings.map((meeting, index) => (
                    <div id="current-meeting">
                      <div
                        className="meeting-button"
                        key={meeting.meetingId}
                        index={meeting.meetingId}
                        onClick={() =>
                          this.props.getMeetingDetail(
                            meeting.placeId,
                            meeting.meetingId
                          )
                        }
                      >
                        <div>
                          <strong>{meeting.meetingName}</strong>
                        </div>
                        <div>{meeting.meetingTime}</div>
                        <div>
                          {meeting.numberOfMembers + "/" + meeting.limit}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div id="margin-fix">참여 가능한 모임이 없습니다.</div>
                )}

                <Button
                  id="meeting-create-button"
                  variant="outlined"
                  color="primary"
                  onClick={this.props.getNewMeetingModal}
                  style={{ width: "20%", margin: "0 auto" }}
                >
                  모임생성
                </Button>
                <div className="fas fa-user-times"> 지난 모임</div>
                {meetingInfos.inActiveMeetings.length > 0 ? (
                  meetingInfos.inActiveMeetings.map((meeting, index) => (
                    <div className="before-meeting">
                      <div key={meeting.meetingId} index={meeting.meetingId}>
                        <div>
                          <strong>{meeting.meetingName}</strong>
                        </div>
                        <div>{meeting.meetingTime}</div>
                        <div>
                          {meeting.numberOfMembers + "/" + meeting.limit}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div id="margin-fix">지난 모임이 없습니다.</div>
                )}
              </div>
              <Button
                id="meeting-list-backbutton"
                variant="outlined"
                color="primary"
                onClick={this.props.backToMeetingList}
                style={{ width: "25%", margin: "0 auto" }}
              >
                리스트로 이동
              </Button>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default RestaurantMeetingList;
