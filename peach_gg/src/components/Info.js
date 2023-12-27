import React, { useState } from "react";
import axios from "axios";
import CharacterInfo from "./CharacterInfo";
import TotalDamage from "./TotalDamage";

export default function Info() {
  const API_KEY = process.env.REACT_APP_NEXON_API_KEY;
  const [characterName, setCharacterName] = useState("");
  const [ocid, setOcid] = useState(null);

  const handleCharacterNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleFetchData = async () => {
    const urlString =
      "https://open.api.nexon.com/maplestory/v1/id?character_name=" +
      encodeURIComponent(characterName);

    try {
      const response = await axios.get(urlString, {
        headers: {
          "x-nxopen-api-key": API_KEY,
        },
      });
      console.log(response.data);
      setOcid(response.data.ocid);
    } catch (error) {
      console.error("API 요청 중 에러:", error);
    }
  };

  return (
    <div>
      <label>
        닉네임
        <input
          type="text"
          value={characterName}
          onChange={handleCharacterNameChange}
        />
      </label>
      <button onClick={handleFetchData}>검색</button>
      {ocid && <CharacterInfo ocid={ocid} />}
      {ocid && <TotalDamage ocid={ocid} />}
    </div>
  );
}
