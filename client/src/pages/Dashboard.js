

import axios from "axios";
import { useAuth } from "../context/authcontext";
import { useState } from "react";
import '../Dashboard.css';
import dotenv from 'dotenv'


const Dashboard = () => {
    const { token } = useAuth();
    const [fileId, setFileId] = useState("");
    const [fileName, setFileName] = useState("file.zip");
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/file/${fileId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();

            setToastMessage("🎉 File downloaded successfully!");
        } catch (err) {
            console.error("Download error:", err);
            setToastMessage("❌ Download failed. Try again!");
        }
        setIsLoading(false);
        setTimeout(() => setToastMessage(""), 3000);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h2 className="dashboard-title">Secure File Download</h2>
                <input
                    type="text"
                    placeholder="Enter File ID"
                    value={fileId}
                    onChange={(e) => setFileId(e.target.value)}
                    className="dashboard-input"
                />
                <button onClick={handleDownload} className="dashboard-button" disabled={isLoading}>
                    {isLoading ? <span className="loader"></span> : "Download File"}
                </button>
            </div>

            {toastMessage && <div className="toast">{toastMessage}</div>}
        </div>
    );
};

export default Dashboard;
