import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { uploadFile } from "./services/api";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider, useAuth } from "./context/authcontext";  // Import AuthProvider
 

import PrivateRoutes from "./routes/PrivateRoutes";  // Import PrivateRoutes.js

function FileSharing() {
  const [file, setFile] = useState("");
  const fileInputRef = useRef();
  const [result, setResult] = useState("");

  const url =
    "https://img.freepik.com/free-vector/video-content-creator-blogger-colorful-cartoon-character-video-editing-uploading-cutting-arrangement-video-shot-manipulation_335657-762.jpg?w=740&t=st=1713546616~exp=1713547216~hmac=c70e785d0f168e52ffc2b6774247f0f66ed18ae9f5cab51dfe5cd198f72d3dda";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <img src={url} className="img" alt="file-sharing" />
      <div className="wrapper">
        <h1>Simple File Sharing!</h1>
        <p>Upload and share the download link.</p>

        <button onClick={onUploadClick}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<FileSharing />} />
          </Route>

          {/* Redirect to Dashboard if logged in, otherwise go to login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
