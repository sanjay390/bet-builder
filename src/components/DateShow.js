import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Info from "./InfoPage";

const DateShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState();
  const [dateValue, setDateValue] = useState();

  const baseUrl =
    "http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1";
  useEffect(() => {
    axios.get(`${baseUrl}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleDate = (MatchId) => {
    setDateValue(MatchId);
  };

  const info = (id) => {
    navigate(`/info/${id}`, { state: { pageId: id } });
  };

  //   const next = () => {
  //       setCount2(count + 1)
  //       setCount(count + 1)
  //   }

  const Date = data && data.map((res) => res.MatchDate);
  const League =
    data &&
    data.map((res) => (res.MatchDate == dateValue ? res.LeagueName : ""));
  const uniqueDates = Array.from(new Set(Date));
  const uniqueDLeague = Array.from(new Set(League));

  return (
    <>
      <div className="">
        <div className="row bg-dark mb-3 text-white">
          <h1>Bet Builder Fixture</h1>
        </div>
        <div className="row d-flex justify-content-center">
          {uniqueDates.splice(0, 5).map((data) => {
            return (
              <button
                type="submit"
                onClick={() => handleDate(data)}
                className="date date-button"
                key={data}
              >
                {data}
              </button>
            );
          })}
        </div>
        {dateValue && (
          <div className="container border border-dark rounded mt-5 ">
            {uniqueDLeague.map((data1) => {
              return (
                <div className="mt-5 border border-solid">
                  {data1 !== "" ? (
                    <p className="bg-danger text-white p-2">{data1}</p>
                  ) : (
                    ""
                  )}

                  {data &&
                    data.map((res) => {
                      return dateValue == res.MatchDate &&
                        data1 == res.LeagueName ? (
                        <div className="d-flex justify-content-center border border-none bg-white list" onClick={() => info(res.MatchId)}>
                          <p className="time ">{res.Team1Name}</p>
                          <p className="text-muted time ">{res.KickOffUtc}</p>
                          <p className=" ">{res.Team2Name}</p>
                        </div>
                      ) : (
                        ""
                      );
                    })}
                </div>
              );
            })}

            {/* <table className="mt-5" style={{ width: "100%" }}>
            <thead>
              {dateValue && (
                <tr className="bg-danger text-white">
                  <th>Match Id</th>
                  <th>Country</th>
                  <th>League Name</th>
                  <th>Teams</th>
                  <th>Kicks Off</th>
                  <th>Actions</th>
                </tr>
              )}
            </thead>
            <tbody>
              {data &&
                data.map((res) => {
                  return dateValue == res.MatchDate ? (
                    <tr key={res.MatchId}>
                      <td>{res.MatchId}</td>
                      <td>{res.Country}</td>
                      <td>{res.LeagueName}</td>
                      <td>{res.MatchName}</td>
                      <td>{res.KickOffUtc}</td>
                      <td>
                        <button
                          className="info-button"
                          onClick={() => info(res.MatchId)}
                        >
                          Info
                        </button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  );
                })}
            </tbody>
          </table> */}
            <h5>{location.dataId}</h5>
          </div>
        )}
      </div>
    </>
  );
};
export default DateShow;
