import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MemberInfo({ oguild_id }) {
  const [guildInfo, setGuildInfo] = useState(null);
  const API_KEY = process.env.REACT_APP_NEXON_API_KEY;

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day

    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    console.log(formattedDate);

    const urlString = `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${oguild_id}&date=${formattedDate}`;

    const fetchCharacterInfo = async () => {
      try {
        const response = await axios.get(urlString, {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        });
        setGuildInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("API request failed:", error.message);
      }
    };

    fetchCharacterInfo();
  }, [oguild_id, API_KEY]);

  const renderNestedObject = (obj) => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    return (
      <ul>
        {Object.entries(obj || {}).map(([key, value]) => (
          <li key={key}>
            {key === "guild_skill" || key === "guild_noblesse_skill" ? null : (
              <>
                <strong>{key}:</strong>{" "}
                {key === "guild_mark_custom" ? (
                  <img
                    src={`data:image/png;base64,${value}`}
                    alt="Guild Mark Custom"
                  />
                ) : typeof value === "object" ? (
                  renderNestedObject(value)
                ) : (
                  value
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <label>Guild Information:</label>
      {guildInfo && renderNestedObject(guildInfo)}
    </div>
  );
}
