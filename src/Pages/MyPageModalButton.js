import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MyPageContents from "../Components/MyPageContents";

const styles = {
  list: {
    width: 400,
    margin:50,
    font:'bold',
    // color:'white',
  },
  fullList: {
    width: 'auto',
  },
};

class MyPageModalButton extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.props.openMyPageList();
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
        <MyPageContents
            closeMyPageList={this.props.closeMyPageList}
            currentItem={this.props.currentItem}
          />
        </List>
        <Divider />
        <List>
         
        </List>
      </div>
    );

    return (
      <div>
        
        <Button className="my-page-button" onClick={this.toggleDrawer('right', true)} style={{color:'primary', backgroundColor: 'white'}} > MyPage </Button>
        
        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MyPageModalButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyPageModalButton);
