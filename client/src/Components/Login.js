import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../Validations/LoginValidation';
import google from "../Images/google.png";
import facebook from "../Images/facebook.png";
import { login } from "../Features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  let [email, setEmail] = useState("");
  let [password, setPass] = useState("");

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidationSchema) });

  useEffect(() => {
    if (user && isSuccess) {
      if (email === "Admin@gmail.com" && password === "Admin123") {
        navigate("/AdminPage");
      } else {
        navigate("/UserPage");
      }
    }
    if (isError) {
      alert("Invalid User..");
    }
  }, [user, isSuccess, isError, email, password, navigate]); // automatic function

  const handleSubmit = (formData) => {
    const data = {
      // sending the data
      email: email, // from the state variable
      password: password
    }
    dispatch(login(data))
  };

  return (
    <div className="login-container">
      <div className="background"></div>
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder='Enter Your Email' {...register('email')}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder='Enter Your Password' {...register('password')}
              onChange={(e) => setPass(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>
          <button type="submit" onClick={submitForm(handleSubmit)}>Login</button>
        </form>
        <div className="social-login">
          <h3>Or Login With</h3>
          <div className="social-icons">
            <img src={google} alt="Google" />
            <img src={facebook} alt="Facebook" />
          </div>
        </div>
        <div className="register-link">
          <p>Don't have an account? <Link to="/Register">Register new account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
