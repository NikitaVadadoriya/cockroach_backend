import React, { useState } from 'react'
import './style.css'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Registration = () => {
    const [formValue, setFormValue] = useState({
        userName: "",
        fullName: "",
        email: "",
        password: "",
        address: "",
        phoneNo: ""
    })
    const Navigate = useNavigate();
    const [Eerror, setEerror] = useState("");
    const [perror, setPerror] = useState("");
    const [Uerror, setUerror] = useState("")
    const [Ferror, setFerror] = useState("")
    const [Aerror, setAerror] = useState("")
    const [Pherror, setPherror] = useState("")

    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value })
        if (e.target.name == 'email') {
            const checkEmail = /^\S+@\S+\.\S+$/
            if (!checkEmail.test(formValue.email)) {
                setEerror('email is not valid')
            }
            else {
                setEerror('')
            }
            if (!e.target.value) {
                setEerror('email is required')
            }
        }
        if (e.target.name == 'password') {
            const checkPass = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
            if (!checkPass.test(formValue.password)) {
                setPerror('password is not valid')
            }
            else {
                setPerror('')
            }
            if (!e.target.value) {
                setPerror('password is required')
            }
        }
        if (e.target.name == 'userName') {
            const checkPass = /^[A-Za-z]\\w{5, 29}$/
            if (!e.target.value) {
                setUerror('username is required')
            }
            else {
                setUerror('')
            }
        }
        if (e.target.name == 'fullName') {
            const checkPass = /^[A-Za-z]\\w{5, 29}$/
            if (!e.target.value) {
                setFerror('fullname is required')
            }
            else {
                setFerror('')
            }
        }
        if (e.target.name == 'address') {

            if (!e.target.value) {
                setAerror('address is required')
            }
            else {
                setAerror('')
            }
        }
        if (e.target.name == 'phoneNo') {
            const checkPass = /^\d{9}$/;
            if (!checkPass.test(formValue.phoneNo)) {
                setPherror('phoneno is not valid')
            }
            else {
                setPherror('')
            }
            if (!e.target.value) {
                setPherror('phone No is required')
            }
        }
    }

    const addUserhandler = (e) => {
        e.preventDefault();

        const data = axios.post(`https://cockroach-backend.vercel.app/api/user/addUser`, formValue)
            .then(async (res) => {
                message.success("registration successfully....")
                Navigate('/login')
            })
            .catch(() => {
                message.error('something are wrong..')
            })
    }
    return (
        <>
            <nav class="bg-dark navbar-dark navbar">
                <div className="row col-12 d-flex justify-content-center text-white">
                    <center>
                        <h3>Registration</h3></center>
                </div>
            </nav>
            <form className="form" onSubmit={addUserhandler}>
                <div className="form-body" style={{ padding: "5px" }}>
                    <div className="username">
                        <label className="form__label" for="firstName">User Name </label>
                        <input className="form__input" type="text" name="userName" placeholder="User Name" onChange={handleChange} style={{ width: '250px' }} />
                        <div style={{ color: "red", marginLeft: "200px" }}>{Uerror}</div>

                    </div>
                    <div className="fullName">
                        <label className="form__label" for="lastName">Full Name </label>
                        <input type="text" name="fullName" className="form__input" placeholder="LastName" onChange={handleChange} style={{ width: '250px' }} />
                        <div style={{ color: "red", marginLeft: "200px" }}>{Ferror}</div>

                    </div>
                    <div className="email">
                        <label className="form__label" for="email">Email </label>
                        <input type="email" name="email" className="form__input" placeholder="Email" onChange={handleChange} style={{ width: '250px' }} />
                        <div style={{ color: "red", marginLeft: "200px" }}>{Eerror}</div>

                    </div>
                    <div className="password">
                        <label className="form__label" for="password">Password </label>
                        <input className="form__input" type="password" name="password" placeholder="Password" onChange={handleChange} style={{ width: '250px' }} />
                        <div style={{ color: "red", marginLeft: "200px" }}>{perror}</div>

                    </div>
                    <div className="Address">
                        <label className="form__label" for="confirmPassword">Address </label>
                        <input className="form__input" type="text" name="address" placeholder="address" onChange={handleChange} style={{ width: '250px' }} />
                        <div style={{ color: "red", marginLeft: "200px" }}>{Aerror}</div>

                    </div>
                    <div className="PhoneNo">
                        <label className="form__label" for="confirmPassword">Phone No</label>
                        <input className="form__input" type="text" name="phoneNo" placeholder="phone No" onChange={handleChange} style={{ width: '250px' }} />
                        <div style={{ color: "red", marginLeft: "200px" }}>{Pherror}</div>
                    </div>
                    <center>
                        <button type="submit" style={{ width: "100px", height: '30px', backgroundColor: "green" }}>Register</button>
                    </center>
                    <p>You have already create Account, <Link to='/login'>Sign in</Link></p>
                </div>


            </form>
        </>
    )
}

export default Registration