import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../img/logo.svg'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import BookmarkIcon from '@material-ui/icons/BookmarkBorder'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BugIcon from '@material-ui/icons/BugReportOutlined';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <HomeIcon fontSize="small" />
        </ListItemIcon>
          <ListItemText primary="Главная" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <BugIcon fontSize="small" />
        </ListItemIcon>
          <ListItemText primary="Угрозы" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <BookmarkIcon fontSize="small" />
        </ListItemIcon>
          <ListItemText primary="Тикеты" />
        </MenuItem>
      </Menu>
          <Typography variant="h6" className={classes.title}>
          <img src={logo} />
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}