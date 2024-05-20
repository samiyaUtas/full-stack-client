import * as yup from "yup";

export const flightValidationSchema = yup.object().shape({
  flightId: yup.string().required("Flight ID is required"),
  destination: yup.string().required("Destination is required"),
  date: yup.date()
    .required("Date is required")
    .min(new Date(), "Date cannot be in the past"),
  time: yup.string().required("Time is required"),
  price: yup.number().required("Price is required"),
  airline: yup.string().required("Airline is required"),
});
