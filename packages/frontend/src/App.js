import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ImageRecognize from "./components/ImageRecognize";
import FaceDetection from "./components/FaceDetection";
import GenerateText from "./components/GenerateText";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* forwarder */}
            <Route
              path="/face-detection"
              element={<Navigate to="/dashboard/face-detection" replace />}
            />
            <Route
              path="/image"
              element={<Navigate to="/dashboard/image" replace />}
            />
            <Route
              path="/generate-text"
              element={<Navigate to="/dashboard/generate-text" replace />}
            />

            {/* Protected Dashboard Layout */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              {/* Nested Routes Inside Dashboard */}
              <Route index element={<h3>Welcome to Your Dashboard</h3>} />
              <Route path="image" element={<ImageRecognize />} />
              <Route path="face-detection" element={<FaceDetection />} />
              <Route path="generate-text" element={<GenerateText />} />
            </Route>

            {/* Catch-all Route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
