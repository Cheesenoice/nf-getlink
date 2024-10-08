import React, { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MailtmChecker = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Define the two API URLs
  const apiUrl1 = import.meta.env.VITE_API_URL1;
  const apiUrl2 = import.meta.env.VITE_API_URL2;

  const getLink = async () => {
    setLoading(true);
    setResult("");

    // Choose the API URL based on the email input
    const selectedApiUrl = email.includes("@yandex.com") ? apiUrl1 : apiUrl2;

    try {
      const response = await fetch(selectedApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.link) {
        setResult(
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            {data.link}
          </a>
        );
      } else {
        setResult(data.error || "Error fetching the link");
      }
    } catch (error) {
      console.error("Error contacting the server:", error);
      setResult("Error contacting the server.");
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getLink();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mailtm-container">
        <h1 className="title">HỖ TRỢ XÁC NHẬN</h1>
        <div className="instruction">
          CÁCH DÙNG <br />
          1. Chọn "Send Mail" từ TV/điện thoại trước <br />
          2. Sau đó lên web nhấn "Get Link" <br />
          3. Bấm vào link và nhận mã <br />
          **làm đúng thứ tự nha ko là sai mã**
        </div>
        <input
          type="text"
          placeholder="Vui lòng nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          className="email-input"
        />
        <button
          onClick={getLink}
          className="get-link-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Link"}
        </button>
        <div className="result-container">
          <strong>Result:</strong>
          <div className="result-box">{result}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MailtmChecker;
