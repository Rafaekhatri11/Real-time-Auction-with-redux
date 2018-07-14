import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


const styles = {
  root: {
    width: '100%',
    background :'#3f3f3f',
    height: 80
   
  },
  bottomlabel:{
      color: '#F1C40F'
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}

        
      >
        <BottomNavigationAction label="@2018 Copyright Text" style={styles.bottomlabel} />
        <BottomNavigationAction label="Privacy" style={styles.bottomlabel} />
        <BottomNavigationAction label="About Us" style={styles.bottomlabel} />

      </BottomNavigation>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);