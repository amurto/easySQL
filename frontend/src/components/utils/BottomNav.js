import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import HistoryIcon from '@material-ui/icons/History';

const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    position: "fixed",
    bottom: "0",
    width: "100vw",
    color: "#352961"
  },
});

const BottomNav = () => {
  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={() => {history.push("/")}} style={{ color: "#352961" }} label="Dashboard" icon={<DashboardIcon />} />
      <BottomNavigationAction onClick={() => {history.push("/visual")}} style={{ color: "#352961" }} label="Visualization" icon={<AssessmentIcon />} />
      <BottomNavigationAction onClick={() => {history.push("/history")}} style={{ color: "#352961" }} label="History" icon={<HistoryIcon />} />
    </BottomNavigation>
  );
}

export default BottomNav;