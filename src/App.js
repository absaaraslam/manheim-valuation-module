import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [key, setKey] = useState("");

  const [token, setToken] = useState("no accessToken");

  const [tokenFlag, setTokenFlag] = useState(false);
  const [yearFlag, setYearFlag] = useState(false);
  const [makeFlag, setMakeFlag] = useState(false);
  const [modelFlag, setModelFlag] = useState(false);
  const [valuationFlag, setValuationFlag] = useState(false);

  //DB states
  const [DByear, setYears] = useState([]);
  const [DBMakes, setMakes] = useState([]);
  const [DBModels, setModels] = useState([]);
  const [DBvaluation, setValuation] = useState([]);

  //inputs
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedValuation, setSelectedValuation] = useState("");

//Vis
  const [valuationVis, setValuationVis] = useState(false);

  const tokenButtonHandler = () => {
    setTokenFlag(true);
    console.log("token gen start");
  };

  const yearButtonHandler = () => {
    setYearFlag(true);
    console.log("year button");
  };

  const makeButtonHandler = () => {
    setMakeFlag(true);
    console.log("make button");
  };

  const ModelButtonHandler = () => {
    setModelFlag(true);
    console.log("model button");
  };

  const valuationButtonHandler = () => {
    setValuationFlag(true);
    console.log("valuation in-proc");
  };

  const handleYearChange = (event) => {
    console.log("here is selected year=>", event.target.value);
    setSelectedYear(event.target.value);
  };

  const handleMakeChange = (event) => {
    console.log("here is selected make=>", event.target.value);
    setSelectedMake(event.target.value);
  };

  const handleModelChange = (event) => {
    console.log("here is selected model=>", event.target.value);
    setSelectedModel(event.target.value);
  };

  const tokenGen = async () => {
    //POST AccessToken
    const res = await fetch("https://carbingo.logointellect.com/api/token", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.access_token);
      })
      .catch((error) => {
        console.error("token error", error);
      });
  };

  const retrieveYears = async () => {
    //GET Years
    const resp = await fetch("https://carbingo.logointellect.com/fetchYears");
    const data = await resp.json();
    const years = data.items.map((item) => item.year);
    setYears(years);
    console.log("years", data);
  };

  const retrieveMake = async () => {
    //send Year and GET make
    const resp = await fetch("https://carbingo.logointellect.com/fetchMake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ yearConfirm: selectedYear }),
    });
    const data = await resp.json();
    if (data.items) {
      const make = data.items.map((item) => item.make);
      setMakes(make);
    }
    console.log("make", data);
  };

  const retrieveModel = async () => {
    //send data and GET Model
    const resp = await fetch("https://carbingo.logointellect.com/fetchModel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ makeConfirm: selectedMake }),
    });
    const data = await resp.json();
    if (data.items) {
      const models = data.items.map((item) => item.model);
      setModels(models);
    }
    console.log("models", data);
  };
  

  const getValuation = async () => {
    const resp = await fetch("https://carbingo.logointellect.com/getValuation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ modelConfirm: selectedModel })
    });
    const data = await resp.json();
    if (data.items) {
      const valuation = data.items.map((item) => item.retail);
      setValuation(valuation);
      console.log("valuation", valuation);
    }
  };

  useEffect(() => {
    //accessToken useEffect
    if (tokenFlag) {
      tokenGen();
    }
  }, [tokenFlag]);

  useEffect(() => {
    //GET apidata useEffect
    if (token != "no accessToken") {
      retrieveYears();
      console.log("get them years");
    }
  }, [token]);

  useEffect(() => {
    if (yearFlag) {
      retrieveMake();
      console.log("get them makes");
    }
  }, [yearFlag]);

  useEffect(() => {
    if (makeFlag) {
      retrieveModel();
      console.log("get them model");
    }
  }, [makeFlag]);

  useEffect(() => {
    //valuation button unearthing
    if (modelFlag) {
      setValuationVis(true);
    }
  }, [modelFlag]);

  useEffect(() => {
    //valuation search
    if (valuationFlag) {
      getValuation();
    }
  }, [valuationFlag]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>Click this button to Access Token(One Time)</p>
          <button onClick={tokenButtonHandler}>Get Token</button>
          <p>Access Token: {token}</p>
          <div>
            <label>
              Pick a Year:
              <select onChange={handleYearChange} value={selectedYear}>
                {DByear.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={yearButtonHandler}>Select Year</button>
            <label>
              Pick Make:
              <select onChange={handleMakeChange} value={selectedMake}>
                {DBMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={makeButtonHandler}>Select Make</button>
            <label>
              Pick a Model:
              <select onChange={handleModelChange} value={selectedModel}>
                {DBModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={ModelButtonHandler}>Select Model</button>
          </div>
          {valuationVis == true ? (
            <button onClick={valuationButtonHandler}>Do Valuation</button>
          ) : null}
        </div>
        <ul>
          {DBvaluation.map((valuation) => (
            <li key={valuation}>
              Highest retail price: {valuation.above} and Lowest retail price:{" "}
              {valuation.below}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
