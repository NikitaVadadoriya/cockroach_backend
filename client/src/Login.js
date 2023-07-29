import React, { useState } from 'react'
import './style.css'
import { message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    })
    const [qrcode, setQrcode] = useState("")
    const Navigate = useNavigate();
    const [Eerror, setEerror] = useState("");
    const [perror, setPerror] = useState("");

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
    }
    const loginHandler = (e) => {
        e.preventDefault();
        const data = axios.post(`https://cockroach-backend.vercel.app/api/user/login`, formValue)
            .then(async (res) => {
                message.success('login successfully..')
                Navigate('/home')
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
                        <h3>Login</h3></center>
                </div>
            </nav>
            <form className="form" onSubmit={loginHandler}>
                <div className="form-body" style={{ padding: "5px" }}>

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
                    <center>
                        <button type="submit" style={{ width: "100px", height: '30px', backgroundColor: "green" }}>Login</button>
                    </center>
                    <p>create Account, <Link to='/'>Sign Up</Link></p>
                </div>
            </form>
        </>
    )
}

export default Login