import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TotalDamage({ ocid }) {
  const [statInfo, setStatInfo] = useState(null);
  const API_KEY = process.env.REACT_APP_NEXON_API_KEY;

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day

    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    console.log(formattedDate);

    const urlString = `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}&date=${formattedDate}`;

    const fetchCharacterInfo = async () => {
      try {
        const response = await axios.get(urlString, {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        });
        setStatInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("API request failed:", error.message);
      }
    };

    fetchCharacterInfo();
  }, [ocid, API_KEY]);
  return (
    <div>
      {statInfo ? (
        <div>
          <div>
            <strong>Date:</strong> {statInfo.date}
          </div>
          <div>
            <strong>Character Class:</strong> {statInfo.character_class}
          </div>
          <div>
            <strong>Remain AP:</strong> {statInfo.remain_ap}
          </div>
          <div>
            <strong>Final Stat:</strong>

            {statInfo.final_stat.map((finalStat, index) => (
              <li key={index}>
                <strong>{finalStat.stat_name}:</strong> {finalStat.stat_value}
              </li>
            ))}
          </div>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
