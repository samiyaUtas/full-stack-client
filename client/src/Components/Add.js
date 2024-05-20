import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { flightValidationSchema } from '../Validations/flightValidationSchema';
import { addFlight } from '../Features/FlightSlice';

const Add = () => {
  const flightList = useSelector((state) => state.flights.value) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(flightValidationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(addFlight(data)).unwrap();
      navigate("/AdminPage");
    } catch (error) {
      if (error === "Flight with this ID already exists.") {
        setError("flightId", { type: "manual", message: error });
      } else {
        alert("An error occurred while adding the flight. Please try again.");
      }
    }
  };

  return (
    <div className="admin-page">
      <nav className="navbar">
        <h2>Add Flight</h2>
      </nav>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="flightId">Flight ID:</label>
            <input type="text" id="flightId" name="flightId" {...register("flightId")} />
            <p className="error">{errors.flightId?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input type="text" id="destination" name="destination" {...register("destination")} />
            <p className="error">{errors.destination?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" {...register("date")} />
            <p className="error">{errors.date?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time" {...register("time")} />
            <p className="error">{errors.time?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" {...register("price")} />
            <p className="error">{errors.price?.message}</p>
          </div>
          <div className="form-group">
            <label htmlFor="airline">Airline:</label>
            <input type="text" id="airline" name="airline" {...register("airline")} />
            <p className="error">{errors.airline?.message}</p>
          </div>
          <button type="submit">Add Flight</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
