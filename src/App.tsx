import React from 'react';
import './App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import BlogPage from "./pages/Blog";

const App: React.FC = () => {
    console.log(location.href)
    return (
        <Router basename={location.pathname}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogPage />} />
            </Routes>
        </Router>
    );
};

export default App;
