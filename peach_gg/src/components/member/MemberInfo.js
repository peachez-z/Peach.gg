import React, { useState, useEffect } from "react";
import axios from "axios";
import Info from "../Info";

const MemberInfo = ({ oguild_id }) => {
  const [guildInfo, setGuildInfo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage] = useState(6);
  const [ocidFromInfo, setOcidFromInfo] = useState(null);
  const API_KEY = process.env.REACT_APP_NEXON_API_KEY;
  const [cachedGuildInfo, setCachedGuildInfo] = useState(null);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day

    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    const urlString = `https://open.api.nexon.com/maplestory/v1/guild/basic?oguild_id=${oguild_id}&date=${formattedDate}`;

    const fetchGuildInfo = async () => {
      try {
        const response = await axios.get(urlString, {
          headers: {
            "x-nxopen-api-key": API_KEY,
          },
        });
        setGuildInfo(response.data);
      } catch (error) {
        console.error("API request failed:", error.message);
      }
    };

    fetchGuildInfo();
  }, [oguild_id, API_KEY]);

  const handleOcidFromInfo = (ocid) => {
    setOcidFromInfo(ocid);
  };

  const renderNestedObject = (obj) => {
    if (obj === null || typeof obj !== "object") {
      return obj;
    }

    return (
      <div>
        {Object.entries(obj || {}).map(([key, value]) => (
          <div key={key}>
            {key === "guild_skill" || key === "guild_noblesse_skill" ? null : (
              <>
                {key === "guild_member" ? (
                  <>
                    <strong>{key}:</strong>
                    {Array.isArray(value) ? (
                      <div>
                        {value
                          .slice(
                            (currentPage - 1) * charactersPerPage,
                            currentPage * charactersPerPage
                          )
                          .map((member, index) => (
                            <div key={index}>
                              <Info
                                nickName={renderNestedObject(member)}
                                onOcidChange={handleOcidFromInfo}
                              />
                            </div>
                          ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <label>Guild Information:</label>
      {guildInfo && renderNestedObject(guildInfo)}
      {ocidFromInfo && <div>OCID from Info: {ocidFromInfo}</div>}
      {/* 페이지네이션 UI */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Array.from({
          length: Math.ceil(
            (guildInfo?.guild_member?.length || 0) / charactersPerPage
          ),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>{" "}
    </div>
  );
};

export default MemberInfo;
