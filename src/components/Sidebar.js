import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faUser, faGear, faClipboardList, faSquarePlus, faBookmark, faChartColumn, faChartLine, faAnglesRight, faAnglesLeft, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Drawer, List} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({currentvalue}) => {
    let navigate = useNavigate();
    const dispatch = useDispatch(); 
    const userdata = useSelector((store) => store.userReducer.userdata);

    const [open, setOpen] = useState(false);
    const toggleDrawer = (state) => {
        setOpen(state);
      };

      const handlelogout = () => {
        dispatch({ type: "userdata", payload: {} })
            navigate('/');
      }

    return (
      <div className="sidebarmaindiv">
        <div className="sidebarsliderdiv">
            <div className="sidebaropenicondiv" onClick={() => {toggleDrawer(!open)}}>
                <FontAwesomeIcon icon={faAnglesRight} className="sidebaricons sidebaricons1 active" />
            </div>
          <div className="logo-image-div">
            <img src={logo} className="logo-image" />
          </div>
          <div className="sidebar-icons-maindiv">
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faChartSimple} className="sidebaricons" />
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faUser} className="sidebaricons" />
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faGear} className="sidebaricons" />
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faClipboardList} className="sidebaricons" />
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faSquarePlus} className="sidebaricons" />
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faBookmark} className="sidebaricons active" />
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faChartColumn} className="sidebaricons" />
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faChartLine} className="sidebaricons" />
            </div>
            <div className="logo-image-div sidebar-icons-div" onClick={() => {handlelogout()}}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebaricons" />
            </div>
          </div>
        </div>
        {/* Drawer */}
        <Drawer
            anchor="left"
            open={open}
            onClose={() => {
              toggleDrawer(false);
            }}
            className={!currentvalue ? "sidebartogglediv lightbg" : "sidebartogglediv"}
          >
            <List className={"listdivdrawer"} sx={{ width: 250 }}>
            <div className="sidebarsliderdiv opened">
            <div className="sidebaropenicondiv" onClick={() => {toggleDrawer(!open)}}>
                <FontAwesomeIcon icon={faAnglesLeft} className="sidebaricons sidebaricons1 active" />
            </div>
          <div className="logo-image-div">
            <img src={logo} className="logo-image" />
            <p className="sidebarlefttext">Evoque Admin</p>
          </div>
          <div className="sidebar-icons-maindiv">
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faChartSimple} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Dashboard</p>
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faUser} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Profile</p>
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faGear} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Settings</p>
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faClipboardList} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Notes</p>
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faSquarePlus} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Latest</p>
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faBookmark} className="sidebaricons active" />
              <p className="sidebarlefttext sidebarlefticontext active">All Bookings</p>
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faChartColumn} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Reports</p>
            </div>
            <div className="logo-image-div sidebar-icons-div">
              <FontAwesomeIcon icon={faChartLine} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Analytics</p>
            </div>
            <div className="logo-image-div sidebar-icons-div" onClick={() => {handlelogout()}}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="sidebaricons" />
              <p className="sidebarlefttext sidebarlefticontext">Logout</p>
            </div>
          </div>
        </div>
            </List>
            </Drawer>
      </div>
    );
}

export default Sidebar