import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TodoApp from "./components/TodoApp";
import "./App.css";
import "./styles/global.css"; // Import the global CSS file

import Header from "./components/Header";
import Footer from "./components/Footer";
import QueuePage from "./components/QueuePage";
import RoomPage from "./components/RoomPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
      {/* UNCOMMENT THIS OUT LATER <Footer /> */}
    </Router>
  );
};

export default App;
