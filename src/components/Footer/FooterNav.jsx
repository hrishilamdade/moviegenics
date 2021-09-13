import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
const useStyles = makeStyles({
  root: {
    boxShadow:'0px 1px 6px -1px black',
    width: '100%',
    background:'rgb(31, 31, 63)',
    position:'fixed',
    bottom:0,
    color:'white',
    zIndex:100,
  },
});

export default function FooterNav() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history=useHistory();
  useEffect(() => {
      if(value===0){
          history.push("/")
      }
      else if(value===1){
          history.push("/search")
      }
      else if(value===2){
        history.push("/movies")
      }
      else{
          history.push("/shows")
      }
  }, [value,history])
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{color:'white'}} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction style={{color:'white'}} label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction style={{color:'white'}}  label="Movie" icon={<MovieIcon />} />
      <BottomNavigationAction style={{color:'white'}} label="TV Series" icon={<TvIcon />} />
    </BottomNavigation>
  );
}