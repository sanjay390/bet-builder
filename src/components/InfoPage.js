import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Info = () => {
  const { state } = useLocation();
  const { pageId } = state;

  const [sportData, setSportData] = useState();
  const [legData, setLegData] = useState();
  const [selectionData, setSelectionData] = useState();
  const [selectionValue, setSelectionValue] = useState(1);
  const [leg, setLeg] = useState(1);
  const [detailData, setDetailData] = useState();

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

  useEffect(() => {
    const baseUrl = `http://cms.bettorlogic.com/api/BetBuilder/GetBetBuilderBets?sports=1&matchId=${pageId}&marketId=${selectionValue}&legs=${leg}&language=en`;
    axios.get(`${baseUrl}`).then((response) => {
      setDetailData(response.data);
    });
  }, [selectionValue, leg]);



  const handleMarket = (e) => {
    setSelectionValue(e.target.value);
  };

  const handleLeg = (e) => {
    setLeg(e.target.value);
  };
const odds =  detailData && detailData.TotalOdds

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
          <label className="pl-4 leg text-dark">Selection </label>
          <select onChange={handleMarket} value={selectionValue}>
            {selectionData &&
              selectionData.map((data, index) => {
                return (
                  <option key={index} value={data.MarketId}>
                    {data.MarketName}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-6 mt-5 ">
          <label className="pl-4 leg text-dark">LEGS: </label>
          <select onChange={handleLeg} value={leg}>
            {legData &&
              legData.map((data, index) => {
                return <option  key={data.selectionId} value={data.selectionId}>{data.selectionId}</option>;
              })}
          </select>
        </div>
      </div>
      <div className="col-6 mt-5">
          <p className="pl-4 leg text-dark">Odds:<span className="text-danger m-4">{odds}</span>  </p>
          <p></p>
        </div>

      <div className="row m-4">
        <table className="mt-5 ml-3">
          <thead>
            <tr>
              <th className="text-danger"> Key Stats</th>
              <th className="text-danger"> Market</th>
              <th className="text-danger">Outcome</th>
            </tr>
          </thead>
          <tbody>
            {detailData &&
              detailData.BetBuilderSelections.map((data, index) => {
                return (
                  
                  <tr key={data.MarketId}>
                    <td>{data.RTB}</td>
                    <td>{data.Market}</td>
                    <td>{data.Selection}</td>
                    
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
