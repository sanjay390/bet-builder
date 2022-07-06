import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Info from "./InfoPage";

const DateShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [count2, setCount2] = useState(0);
  const [count, setCount] = useState(5);
  const [data, setData] = useState();
  const [dateValue, setDateValue] = useState();
  const [dataId, setDataId] = useState();
  const baseUrl =
    "http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1";
  useEffect(() => {
    axios.get(`${baseUrl}`).then((response) => {
      setData(response.data);
    });
  }, []);

  const handleDate = (value) => {
    setDateValue(value);
  };

  const info = (id) => {
    navigate(`/info/${id}`, { state: { pageId: id } });
  };

  //   const next = () => {
  //       setCount2(count + 1)
  //       setCount(count + 1)
  //   }

  const Date = data && data.map((res) => res.MatchDate);
  const uniqueDates = Array.from(new Set(Date));

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

        <table className="mt-5" style={{ width: "100%" }}>
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
        </table>
        <h5>{location.dataId}</h5>
      </div>
    </>
  );
};
export default DateShow;
