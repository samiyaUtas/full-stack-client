import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidationSchema } from "../Validations/RegisterValidation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Features/UserSlice";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const { isSuccess, isError, errorMessage } = useSelector(
    (state) => state.users
  ); // Added errorMessage to useSelector
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerValidationSchema) });

  useEffect(() => {
    if (isSuccess) {
      navigate("/Login");
    }
    if (isError && errorMessage) {
      alert(errorMessage);
    }
  }, [isSuccess, isError, errorMessage, navigate]);

  const handleSubmit = (formData) => {
    const data = {
      email,
      password,
      phoneNumber,
    };
    dispatch(registerUser(data));
  };

  return (
    <div className="login-container">
      <div className="background"></div>
      <div className="login-form">
        <h2>Register</h2>
        <form onSubmit={submitForm(handleSubmit)}>
          {" "}
          {/* Added onSubmit attribute */}
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              {...formRegister("email")}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              {...formRegister("password")}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Your Password"
              {...formRegister("confirmPassword")}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Your Phone Number"
              {...formRegister("phoneNumber")}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <p className="error">{errors.phoneNumber.message}</p>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="register-link">
          <p>
            Already have an account? <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
