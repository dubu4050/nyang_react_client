import React from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Link,
} from '@material-ui/core';
import nyangImg from '../../images/nyangImg.png';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Login from '../Member/Login';
import axios from 'axios';
import ListItemText from '@material-ui/core/ListItemText';
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  muiAppBar: {
    color: 'black',
    backgroundColor: 'white',
  },
  nyangImg: {
    marginRight: theme.spacing(2),
    width: '35px',
    height: '35px',
  },
  title: {
    fontWeight: '600',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuItem: {
    width: '120px',
    '&:hover': {
      backgroundColor: '#49D7F0',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}));

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // ip address
  const ip = process.env.REACT_APP_API_IP;
  //로그인 확인
  console.log('---------------토큰: ' + localStorage.getItem('token'));
  console.log('---------------직책: ' + localStorage.getItem('roleName'));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const memberInfo = () => {
    window.location.href = '/memberInfo';
  };
  const activeMemberInfo = () => {
    window.location.href = '/activeMemberInfo';
  };
  const membersInfo = () => {
    window.location.href = '/admin';
  };
  const logout = () => {
    localStorage.clear();
    handleMenuClose();
    window.location.href = '/';
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {localStorage.getItem('token') != null ? (
        <>
          <MenuItem onClick={memberInfo} className={classes.menuItem}>
            <ListItemText primary="내 정보" />
          </MenuItem>
          <MenuItem onClick={activeMemberInfo} className={classes.menuItem}>
            <ListItemText primary="활동 조회" />
          </MenuItem>
          {localStorage.getItem('roleName') == 'admin' && (
            <MenuItem onClick={membersInfo} className={classes.menuItem}>
              <ListItemText primary="회원 조회" />
            </MenuItem>
          )}
          <MenuItem onClick={logout} className={classes.menuItem}>
            <ListItemText primary="로그 아웃" />
          </MenuItem>
        </>
      ) : (
        <MenuItem onClick={handleMenuClose} component={Login} />
      )}
    </Menu>
  );

  //모바일일때
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        {localStorage.getItem('token') != null ? (
          <>
            <MenuItem onClick={memberInfo}>내 정보</MenuItem>
            <MenuItem onClick={activeMemberInfo}>활동 조회</MenuItem>
            <MenuItem onClick={logout}>로그아웃</MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleMobileMenuClose} component={Login} />
        )}
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar className={classes.muiAppBar} position="static">
        <Toolbar>
          <Link href="/">
            <img src={nyangImg} className={classes.nyangImg}></img>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/" color="inherit">
              개아프냥
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default Header;
