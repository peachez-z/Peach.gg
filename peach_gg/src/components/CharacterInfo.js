import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CharacterInfo({ ocid }) {
  const [characterInfo, setCharacterInfo] = useState(null);
  const API_KEY = process.env.REACT_APP_NEXON_API_KEY;

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day

    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    console.log(formattedDate);

    const urlString = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}&date=${formattedDate}`;

    const fetchCharacterInfo = async () => {
      try {
        const response = await axios.get(urlString, {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        });
        console.log(response.data);
        setCharacterInfo(response.data);
      } catch (error) {
        console.error("API request failed:", error.message);
      }
    };

    fetchCharacterInfo();
  }, [ocid, API_KEY]);

  const keyMapping = {
    character_name: "닉네임",
    world_name: "서버",
    character_class: "직업",
    character_level: "레벨",
    character_exp_rate: "퍼센트",
    character_guild_name: "길드",
  };

  return (
    <div>
      {characterInfo ? (
        <div>
          {/* Display image at the top */}
          {characterInfo.character_image && (
            <div>
              <img
                src={characterInfo.character_image}
                alt="Character"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}

          {/* Display the selected keys with mapped names */}
          {Object.entries(keyMapping).map(
            ([originalKey, displayName]) =>
              characterInfo[originalKey] && (
                <div key={originalKey}>
                  <strong>{displayName}:</strong> {characterInfo[originalKey]}
                </div>
              )
          )}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
