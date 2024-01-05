import React, { useState } from "react";
import axios from "axios";
import MemberInfo from "./MemberInfo";
export default function Members() {
  const API_KEY = process.env.REACT_APP_NEXON_API_KEY;
  const guildName = "스테리";
  const worldName = "루나";
  const [oguild_id, setOguild_id] = useState(null);

  const handleFetchData = async () => {
    const urlString = `https://open.api.nexon.com/maplestory/v1/guild/id?guild_name=${guildName}&world_name=${worldName}`;

    try {
      const response = await axios.get(urlString, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      });
      console.log(response.data);
      setOguild_id(response.data.oguild_id);
    } catch (error) {
      console.error("API 요청 중 에러:", error);
      console.error("에러 응답:", error.response);
    }
  };

  return (
    <div>
      <label>닉네임</label>
      <button onClick={handleFetchData}>검색</button>
      <MemberInfo oguild_id={oguild_id} />
    </div>
  );
}
