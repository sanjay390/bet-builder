import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Info = () => {
  const { state } = useLocation();
  const { pageId } = state;

  const [sportData, setSportData] = useState();
  const [legData, setLegData] = useState();
  const [selectionData, setSelectionData] = useState();

  useEffect(() => {
    const baseUrl =
      "http://cms.bettorlogic.com/api/BetBuilder/GetFixtures?sports=1";

    axios.get(`${baseUrl}`).then((response) => {
      setSportData(response.data);
    });
  }, []);

  useEffect(() => {
    const legUrl =
      "http://cms.bettorlogic.com/api/BetBuilder/GetSelections?sports=1";

    axios.get(`${legUrl}`).then((response) => {
      setLegData(response.data);
    });
  }, []);

  useEffect(() => {
    const selectionUrl =
      "http://cms.bettorlogic.com/api/BetBuilder/GetMarkets?sports=1";

    axios.get(`${selectionUrl}`).then((response) => {
      setSelectionData(response.data);
    });
  }, []);

  const detailData = sportData && sportData.map((data) => data.MatchId);

  return (
    <div className="">
      <div className="row bg-dark">
        <h2 className=" pt-4 text-white">Bet Builder Fixture</h2>
      </div>
      {sportData &&
        sportData.map((res) => {
          return pageId == res.MatchId ? (
            <>
              <div className="row bg-danger mt-5  p-3">
                <h3 className="text-white title">
                  {" "}
                  Make It a Better Builder ?
                </h3>
              </div>

              <div className="row">
                <div className="bg-danger mt-4 text-white p-3 col-6 info-font">
                  {res.MatchDate}
                </div>
                <div className="bg-dark mt-4 text-white p-3 col-6">
                  <p className="info-font">{res.MatchName}</p>
                  
                  {res.LeagueName}
                </div>
              </div>
            </>
          ) : (
            ""
          );
        })}
      <div className="row">
        <div className="col-6 mt-5">
          <label className="pl-4 leg text-success">Selection </label>
          <select>
            {selectionData &&
              selectionData.map((data) => {
                return <option>{data.MarketName}</option>;
              })}
          </select>
        </div>
        <div className="col-6 mt-5 ">
          <label className="pl-4 leg text-success">LEG: </label>
          <select>
            {legData &&
              legData.map((data) => {
                return <option>{data.selectionId}</option>;
              })}
          </select>
        </div>
      </div>
      <div className="row m-4">
    

        <table className="mt-5 ml-3">
          <thead>
            <tr className="">
              <th className="text-danger"> Market</th>
              <th className="text-danger">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {selectionData &&
              selectionData.map((data) => {
                return (
                  <tr key={data.MatchId}>
                    <td>{data.MasterMarketName}</td>
                    <td>{data.MarketName}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Info;
