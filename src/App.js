import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DateShow from "./components/DateShow";
import InfoPage from "./components/InfoPage";

function App() {
  return (
    <div className="App">
      
      {/* <DateShow /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DateShow />} />
          <Route path="info" >
          <Route path=":id" element={<InfoPage />} />
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
