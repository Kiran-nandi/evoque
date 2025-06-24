import React, {useEffect, useState} from 'react';
import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './main.scss';
import Swal from 'sweetalert2';

const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    let navigate = useNavigate();
    const dispatch = useDispatch(); 
    const userdata = useSelector((store) => store.userReducer.userdata);

    console.log('userdata >>', userdata);

    const handlelogin = () => {
        console.log('Hello worls')
        if(!username) {
            Swal.fire({
                title: '',
                text: 'Username cannot be empty',
                icon: 'error',
                customClass: {
                  icon: 'custom-swal-icon' // Apply the custom class
                },
                width: '350px',
                confirmButtonText: 'Ok',
            confirmButtonColor: "rgb(59, 151, 196)",
                customClass: {
                    popup: "small-icon-alert",
                  },
              });
              return;
        }
        if(!password) {
            Swal.fire({
                title: '',
                text: 'Password cannot be empty',
                icon: 'error',
                customClass: {
                  icon: 'custom-swal-icon' // Apply the custom class
                },
                width: '350px',
                confirmButtonText: 'Ok',
            confirmButtonColor: "rgb(59, 151, 196)",
                customClass: {
                    popup: "small-icon-alert",
                  },
              });
              return;
        }
        if(username == 'admin' && password=='Admin@123') {
            // user object that receives from api after successfull login.
            var userobj = { 
                firstname: "Kiran",
                lastname: "Nandi",
                type: "superadmin",
                token: "BGJ5855D5F82DF85G021G82SDFF58256" // token that can be send on headers to validate user
            } 
            dispatch({ type: "userdata", payload: userobj })
            navigate('/all-bookings');

        } else {
            Swal.fire({
                title: '',
                text: 'Incorrect Credentials',
                icon: 'error',
                customClass: {
                  icon: 'custom-swal-icon' // Apply the custom class
                },
                width: '350px',
                confirmButtonText: 'Ok',
            confirmButtonColor: "rgb(59, 151, 196)",
                customClass: {
                    popup: "small-icon-alert",
                  },
              });
              dispatch({ type: "userdata", payload: {} })
              return;
        }

    }

    return (
        <>
            <div className='mainloginpage'>
                <div className='logindiv'>
                    <p className='primaryheader'>LOGIN</p>
                    <div className='forminputdiv mt-3'>
                        <label>Username</label>
                        <input 
                        type='text'
                            value={username}
                            onChange={(t) => {
                                setusername(t.target.value);
                            }}
                            className='form-control custominputdiv'
                            placeholder='Enter Username'
                        />
                    </div>
                    <div className='forminputdiv mt-3'>
                        <label>Password</label>
                        <input 
                        type='password'
                            value={password}
                            onChange={(t) => {
                                setpassword(t.target.value);
                            }}
                            className='form-control custominputdiv'
                             placeholder='Enter Password'
                        />
                    </div>
                    <div className='forminputdiv mt-3'>
                        <button type="button" class="btn btn-success custombtn" onClick={() => {
                            handlelogin();
                        }}>
                            SUBMIT
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login