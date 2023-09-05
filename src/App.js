import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [key, setKey] = useState("");

  const [token, setToken] = useState("no accessToken");

  const [tokenFlag, setTokenFlag] = useState(false);
  const [colorFlag, setColorFlag] = useState(false);
  const [gradeFlag, setGradeFlag] = useState(false);
  const [yearFlag, setYearFlag] = useState(false);
  const [makeFlag, setMakeFlag] = useState(false);
  const [modelFlag, setModelFlag] = useState(false);
  const [trimFlag, setTrimFlag] = useState(false);
  const [valuationFlag, setValuationFlag] = useState(false);

  //DB states
  const [DBGrades, setGrades] = useState([]);
  const [DBColors, setColors] = useState([]);
  const [DByears, setYears] = useState([]);
  const [DBMakes, setMakes] = useState([]);
  const [DBModels, setModels] = useState([]);
  const [DBTrims, setTrims] = useState([]);
  const [DBvaluation, setValuation] = useState([]);

  //inputs
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");

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

  const modelButtonHandler = () => {
    setModelFlag(true);
    console.log("model button");
  };

  const trimButtonHandler = () => {
    setTrimFlag(true);
    console.log("trim button");
  };

  const colorButtonHandler = () => {
    setColorFlag(true);
    console.log("color button");
  };

  const gradeButtonHandler = () => {
    setGradeFlag(true);
    console.log("grade button");
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

  const handleTrimChange = (event) => {
    console.log("here is selected trim=>", event.target.value);
    setSelectedTrim(event.target.value);
  };

  const handleColorChange = (event) => {
    console.log("here is selected color=>", event.target.value);
    setSelectedColor(event.target.value);
  };

  const handleGradeChange = (event) => {
    console.log("here is selected grade=>", event.target.value);
    setSelectedGrade(event.target.value);
  };

  const tokenGen = async () => {
    //POST AccessToken
    const res = await fetch("https://server-valuation.vercel.app/api/token", {
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

  const retrieveColors = async () => {
    //GET Colors
    const resp = await fetch("https://server-valuation.vercel.app/fetchColors");
    const data = await resp.json();
    const colors = data.items.map((item) => item.value);
    setColors(colors);
    console.log("colors", data);
  };

  const retrieveGrades = async () => {
    //GET Grades
    const resp = await fetch("https://server-valuation.vercel.app/fetchGrades");
    const data = await resp.json();
    const grades = data.items.map((item) => item.value);
    setGrades(grades);
    console.log("colors", data);
  };
  const retrieveYears = async () => {
    //GET Years
    const resp = await fetch("https://server-valuation.vercel.app/fetchYears");
    const data = await resp.json();
    const years = data.items.map((item) => item.year);
    setYears(years);
    console.log("years", data);
  };

  const retrieveMake = async () => {
    //send Year and GET make
    const resp = await fetch("https://server-valuation.vercel.app/fetchMake", {
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
    const resp = await fetch("https://server-valuation.vercel.app/fetchModel", {
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

  const retrieveTrim = async () => {
    //send data and GET Trim
    const resp = await fetch("https://server-valuation.vercel.app/fetchTrim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ modelConfirm: selectedModel }),
    });
    const data = await resp.json();
    if (data.items) {
      const trims = data.items.map((item) => item.trim);
      setTrims(trims);
    }
    console.log("trims", data);
  };

  const getValuation = async () => {
    const resp = await fetch("https://server-valuation.vercel.app/getValuation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trimConfirm: selectedTrim,
        colorConfirm: selectedColor,
        gradeConfirm: selectedGrade,
      }),
    });
    const data = await resp.json();
    if (data.items) {
      const valuation = data.items.map((item) => item.retail);
      setValuation(valuation);
      console.log("valuation", data);
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
      retrieveColors();
      retrieveGrades();
      console.log("getFunctions triggered");
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
    if (trimFlag) {
      setValuationVis(true);
    }
  }, [trimFlag]);

  useEffect(() => {
    if (modelFlag) retrieveTrim();
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
                {DByears.map((year) => (
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
            <button onClick={modelButtonHandler}>Select Model</button>
            <div>
            <label>
              Pick a Trim:
              <select onChange={handleTrimChange} value={selectedTrim}>
                {DBTrims.map((trim) => (
                  <option key={trim} value={trim}>
                    {trim}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={trimButtonHandler}>Select Trim</button>
            <label>
              Pick a Color:
              <select onChange={handleColorChange} value={selectedColor}>
                {DBColors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={colorButtonHandler}>Select Color</button>
            <label>
              Pick a Grade:
              <select onChange={handleGradeChange} value={selectedGrade}>
                {DBGrades.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={gradeButtonHandler}>Select Grade</button>
            </div>
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
