import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterInfo from "./CharacterInfo";
import TotalDamage from "./TotalDamage";
import { Link } from "react-router-dom";

export default function Info({ nickName }) {
  const API_KEY = process.env.REACT_APP_NEXON_API_KEY;
  // const [characterName, setCharacterName] = useState("");
  const [ocid, setOcid] = useState(null);

  useEffect(() => {
    const handleFetchData = async () => {
      const urlString =
        "https://open.api.nexon.com/maplestory/v1/id?character_name=" +
        encodeURIComponent(nickName);

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

    // nickName이 변경될 때마다 fetchData 호출
    if (nickName) {
      handleFetchData();
    }
  }, [nickName, API_KEY]);

  return (
    <div>
      {ocid && <CharacterInfo ocid={ocid} />}

      {/* Link 컴포넌트를 사용하여 TotalDamage 페이지로 이동하는 버튼 추가 */}
      {ocid && (
        <Link to={`/totalinfo/`}>
          Go to Total Damage
          <TotalDamage ocid={ocid} />
        </Link>
      )}
    </div>
  );
}
