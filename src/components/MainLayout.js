import React, {useEffect, useState, useCallback, useRef} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const MainLayout = (props) => {
    const [darkmode, setdarkmode] = useState(true);
    const childRef = useRef();
    const handleTrigger = () => {
        if (childRef.current?.triggerChildFunction) {
          childRef.current.triggerChildFunction();
        }
      };

    const darkmoderesp = useCallback((t) => {
        console.log('t >>', t);
        setdarkmode(t);
    }, []);

    return (
        <div className={darkmode ? "mainlayout-maindiv-admin" : "mainlayout-maindiv-admin lightbg"}>
            <div className="mainlayout-leftdiv">
                <Sidebar currentvalue={darkmode} />
            </div>
            <div className="mainlayout-rightdiv">
            <div className="mainlayout-navbar">
                    <Navbar title={props?.title} currentvalue={darkmode} darkmoderesp={darkmoderesp} onIconClick={handleTrigger} />
                </div>
                <div className="mainpage">
                {React.cloneElement(props.children, { ref: childRef })}
                </div>
            </div>
        </div>
    )
}

export default MainLayout
