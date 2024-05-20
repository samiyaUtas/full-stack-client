// Removed unused imports
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home1 from './Components/Home1';
import Home2 from './Components/Home2';
import Home3 from './Components/Home3';
import Login from './Components/Login';
import Register from './Components/Register';
import Add from './Components/Add';
import Search from './Components/Search';
import Delete from './Components/Delete';
import Update from './Components/Update';
import Book from './Components/Book';
import Payment from './Components/Payment';
import AdminPage from './Components/AdminPage';
import UserPage from './Components/UserPage';
import './App.css';
import { Provider } from "react-redux";
import { store } from "./store";
import { Container, Row } from "reactstrap";


function App() {
  return (
    <Provider store={store}>
    <>
      <Container fluid>
        <BrowserRouter>
          <Row className="main">
            <Routes>
            <Route path="/" element={<Home1 />} />
            <Route path="/Home2" element={<Home2 />} />
            <Route path="/Home3" element={<Home3 />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/Add" element={<Add />} />
            <Route path="/Update" element={<Update />} />
            <Route path="/Delete" element={<Delete />} />
            <Route path="/UserPage" element={<UserPage />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/Book" element={<Book />} />
            <Route path="/Payment" element={<Payment />} />

            
            
            </Routes>
          </Row>
        </BrowserRouter>
      </Container>
    </>
  </Provider>
  );
}

export default App;
