import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import axios from "axios";

function App() {
  const [URL, setURL] = useState("");

  const handleInput = (e) => {
    e.preventDefault();
    setURL(e.target.value);
  };

  const downloadVideo = async (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://youtube-data8.p.rapidapi.com/video/streaming-data/",
      params: { id: URL },
      headers: {
        "x-rapidapi-key": "08de0cc688msh077919d7f1c57c0p1f40fajsn282bfdf9f6de",
        "x-rapidapi-host": "youtube-data8.p.rapidapi.com",
        "content-type": "application/json",
      },
    };

    try {
      const rspn = await axios.request(options);
      console.log(rspn?.data?.formats[Number(0)]?.url);
      window.location.href = rspn?.data?.formats[Number(0)]?.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8">
        {/* Youtube logo, text */}
        <div className="flex items-center justify-center mb-6">
          <FaYoutube size={60} className="text-red-600" />
          <p className="text-3xl font-bold text-red-500 ml-4">Video Downloader</p>
        </div>

        {/* Input and Button */}
        <div className="flex flex-col gap-y-4">
          <input
            type="url"
            className="h-12 w-full px-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter YouTube Video URL"
            onChange={handleInput}
          />
          <button
            className="h-12 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition-all duration-200"
            onClick={downloadVideo}
          >
            Download Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
