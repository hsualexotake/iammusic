import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // New home component
import TodoApp from "./components/TodoApp"; // Wrapper for your current todo layout
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import QueuePage from "./components/QueuePage";
import RoomPage from "./components/RoomPage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Define routes for different sections */}
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
      {/* UNCOMMENT THIS OUT LATER <Footer /> */}
    </Router>
  );
};

export default App;
