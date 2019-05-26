import React from "react";
import "../App.css";
import MeetingListsContainer from "./MeetingListsContainer";
import fetchHelper from "../helpers/fetch";

class LeftContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingsInfos: undefined,
      restaurantMeetingInfos: undefined,
      clickMarkerRestaurantInfo: undefined,
    };
  }
  fetchMeetingLists = (restaurantInfos) => {
    fetchHelper
      .fetchMeetingLists(restaurantInfos)
      .then(result => result.json())
      .then(fetchedMeetingLists => {
        console.log("fetched", fetchedMeetingLists);
        if (restaurantInfos === this.props.restaurantInfos) {
          this.setState({
            meetingsInfos: fetchedMeetingLists,
          });
        } else {
          this.setState({
            restaurantMeetingInfos: fetchedMeetingLists,
          });
        }
      });
  };

  shouldComponentUpdate() {
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.restaurantInfos !== this.props.restaurantInfos) {
      this.fetchMeetingLists(this.props.restaurantInfos);
    }
    if (prevProps.clickMarkerRestaurantInfo !== this.props.clickMarkerRestaurantInfo) {
      if (!this.props.clickMarkerRestaurantInfo) {
        this.fetchMeetingLists(this.props.restaurantInfos);
      } else {
        this.fetchMeetingLists(new Array(this.props.clickMarkerRestaurantInfo));
      }
    }
  }

  render() {
    return (
      <div className="MeetingListsContainer">
        {this.props.restaurantInfos.length > 0 ? (
          this.props.clickMarkerRestaurantInfo ? (
            <MeetingListsContainer
              meetingsInfos={this.state.restaurantMeetingInfos}
              restaurantInfos={this.props.restaurantInfos}
              fetchMeetingLists={this.fetchMeetingLists}
              clickMarkerRestaurantInfo={this.props.clickMarkerRestaurantInfo}
              backToMeetingList={this.props.backToMeetingList}
            />)
            :
            <MeetingListsContainer
              meetingsInfos={this.state.meetingsInfos}
              restaurantInfos={this.props.restaurantInfos}
              fetchMeetingLists={this.fetchMeetingLists}
            />
        ) :
          null
        }
      </div>
    );
  }
}

export default LeftContainer;
