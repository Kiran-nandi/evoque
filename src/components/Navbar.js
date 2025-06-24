import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faWallet, faLightbulb, faDownload } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({title, currentvalue, darkmoderesp, onIconClick}) => {
    // console.log('props >>', props)
    const handlemodetoggle = () => {
        darkmoderesp(!currentvalue);
    }
    return (
      <div className="navbarmaindiv">
        <div className="bookingicondiv">
          <FontAwesomeIcon
            icon={faWallet}
            className="navbaricon"
          />
        </div>
        <p className="page-title">{title}</p>
        <div className="bookingicondiv lightbulbdiv" onClick={() => {handlemodetoggle()}}>
          <FontAwesomeIcon
            icon={faLightbulb}
            className="navbaricon lighbulbicon"
          />
        </div>
        <div className="bookingicondiv lightbulbdiv downloadicon" onClick={onIconClick}>
          <FontAwesomeIcon
            icon={faDownload}
            className="navbaricon lighbulbicon"
          />
        </div>
      </div>
    );
}

export default Navbar