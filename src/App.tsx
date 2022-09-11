import React, { useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";

import YTSHomepage from "./Components/YTSHomepage";
import ChannelSearch from "./Components/ChannelSearch";
import "antd/dist/antd.css";
import "./App.css";

function App(props:any) {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const searchYTS = async(data:any) => {
    const response = await fetch(`http://137.184.202.24:8000/scrap`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelName: data.channnelName,
        videoCount: Number(data.videoCount),
      }),
    });
    if (response.status !== 200) throw Error(data.message);
    const resData = await response.json();
    if (resData.status === true) {
      const searchResponse = await fetch(
        `http://137.184.202.24:8000/fetch/video_details?channel_id=${resData.id}`
      );
      if (searchResponse.status !== 200) throw Error(data.message);
      const searchResData = await searchResponse.json();
      if (searchResData.status === true) {
        setSearchResults(searchResData.data);
        navigate("/ytssearchResults", { replace: true });
      }
      return resData;
    }
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/ytshomepage" />} />
        <Route
          path="/ytshomepage"
          element={<YTSHomepage searchYTS={searchYTS} />}
        />
        <Route
          path="/ytssearchResults"
          element={<ChannelSearch tableData={searchResults} />}
        />
      </Routes>
    </div>
  );
}

export default App;
