import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("no accessToken");

  const [tokenFlag, setTokenFlag] = useState(false);
  const [colorFlag, setColorFlag] = useState(false);
  const [gradeFlag, setGradeFlag] = useState(false);
  const [regionFlag, setRegionFlag] = useState(false);
  const [yearFlag, setYearFlag] = useState(false);
  const [makeFlag, setMakeFlag] = useState(false);
  const [modelFlag, setModelFlag] = useState(false);
  const [trimFlag, setTrimFlag] = useState(false);
  const [valuationFlag, setValuationFlag] = useState(false);
  const [vinValuationFlag, setVinValuationFlag] = useState(false);

  //DB states
  const [DBRegions, setRegions] = useState([]);
  const [DBGrades, setGrades] = useState([]);
  const [DBColors, setColors] = useState([]);
  const [DByears, setYears] = useState([]);
  const [DBMakes, setMakes] = useState([]);
  const [DBModels, setModels] = useState([]);
  const [DBTrims, setTrims] = useState([]);

  //resultant states
  // const [DBretailValuation, setRetailValuation] = useState([]);
  const [DBVinDescription, setVinDescription] = useState([]);
  const [DBSearchWholesale, setSearchWholesale] = useState([]);
  const [DBVinWholesale, setVinWholesale] = useState([]);

  //inputs
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");
  const [selectedVin, setSelectedVin] = useState("");
  const [selectedOdometer, setSelectedOdometer] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  //Vis
  const [valuationVis, setValuationVis] = useState(false);
  const [vinValuationVis, setVinValuationVis] = useState(false);
  const [searchValuationVis, setSearchValuationVis] = useState(false);

  //button handlers
  const tokenButtonHandler = () => {
    setTokenFlag(true);
    console.log("token gen start");
  };

  const yearButtonHandler = () => {
    setYearFlag(true);
    console.log("year button");
  };

  const regionButtonHandler = () => {
    setRegionFlag(true);
    console.log("region button");
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
    setValuationFlag(!valuationFlag);
    console.log("search valuation in-proc");
  };

  const vinValuationButtonHandler = () => {
    setVinValuationFlag(!vinValuationFlag);
    console.log("vin valuation in-proc");
  };

  //input handlers
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

  const handleRegionChange = (event) => {
    console.log("here is selected region=>", event.target.value);
    setSelectedRegion(event.target.value);
  };

  const tokenGen = async () => {
    //POST AccessToken
    const res = await fetch("http://localhost:3001/api/token", {
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
    const resp = await fetch("http://localhost:3001/fetchColors");
    const data = await resp.json();
    const colors = data.items.map((item) => item.value);
    setColors(colors);
    console.log("colors", data);
  };

  const retrieveGrades = async () => {
    //GET Grades
    const resp = await fetch("http://localhost:3001/fetchGrades");
    const data = await resp.json();
    const grades = data.items.map((item) => item.value);
    setGrades(grades);
    console.log("grades", data);
  };

  const retrieveRegions = async () => {
    //GET Regions
    const resp = await fetch("http://localhost:3001/fetchRegions");
    const data = await resp.json();
    const regions = data.items.map((item) => item.id);
    setRegions(regions);
    console.log("regions", data);
  };

  const retrieveYears = async () => {
    //GET Years
    const resp = await fetch("http://localhost:3001/fetchYears");
    const data = await resp.json();
    const years = data.items.map((item) => item.year);
    setYears(years);
    console.log("years", data);
  };

  const retrieveMake = async () => {
    //send Year and GET make
    const resp = await fetch("http://localhost:3001/fetchMake", {
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
    const resp = await fetch("http://localhost:3001/fetchModel", {
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
    const resp = await fetch("http://localhost:3001/fetchTrim", {
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

  const getSearchValuation = async () => {
    const resp = await fetch("http://localhost:3001/getSeachValuation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trimConfirm: selectedTrim,
        colorConfirm: selectedColor,
        gradeConfirm: selectedGrade,
        regionConfirm: selectedRegion,
        odometerConfirm:selectedOdometer
      }),
    });
    const data = await resp.json();
    if (data.items) {
      const wholesale = data.items.map((item) => item.wholesale);
      // const retail = data.items.map((item) => item.retail);
      const desc = data.items.map((item) => item.description);
      setSearchWholesale(wholesale);
      setVinDescription(desc);
      console.log("searchValuation", data);
    }
  };

  const getVinValuation = async () => {
    const resp = await fetch("http://localhost:3001/getVinValuation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vinConfirm: selectedVin,
        colorConfirm: selectedColor,
        odometerConfirm: selectedOdometer,
        gradeConfirm: selectedGrade,
      }),
    });
    const data = await resp.json();

    if (data.items) {
      const desc = data.items.map((item) => item.description);
      // const retail = data.items.map((item) => item.retail);
      const wholesale = data.items.map((item) => item.wholesale);
      // setRetailValuation(retail);
      setVinDescription(desc);
      setVinWholesale(wholesale);
      console.log("Vinvaluation", data);
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
      retrieveRegions();
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
    //search valuation search
    if (valuationFlag) {
      getSearchValuation();
    }
  }, [valuationFlag]);

  useEffect(() => {
    //vin valuation search
    if (vinValuationFlag) {
      getVinValuation();
    }
  }, [vinValuationFlag]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Search Valuation</p>
      </header>
      <div className="accToken">
        <p>Click this button to Access Token(One Time)</p>
        <button onClick={tokenButtonHandler}>Get Token</button>
        <p>Access Token: {token}</p>
      </div>
      <div className="selectValuation">
        <button onClick={() => setSearchValuationVis(!searchValuationVis)}>
          Seach Valuation
        </button>
        <button onClick={() => setVinValuationVis(!vinValuationVis)}>
          Vin Valuation
        </button>
      </div>
      {searchValuationVis && (
        <div className="form">
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
            Enter Odometer:{" "}
            <input
              name="odometersearch"
              placeholder="Odometer"
              onChange={(e) => setSelectedOdometer(e.target.value)}
            />
          </label>
          <label></label>
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
            <label>
              Pick a Region:
              <select onChange={handleRegionChange} value={selectedRegion}>
                {DBRegions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={regionButtonHandler}>Select Region</button>
            <div>
              {valuationVis == true ? (
                <button onClick={valuationButtonHandler}>
                  Do Search Valuation
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {vinValuationVis && (
        <div className="vinForm">
          <label>
            Enter The VIN:{" "}
            <input
              name="vin"
              placeholder="VIN Number"
              onChange={(e) => setSelectedVin(e.target.value)}
            />
          </label>
          <label>
            Enter Odometer:{" "}
            <input
              name="odometervin"
              placeholder="Odometer"
              onChange={(e) => setSelectedOdometer(e.target.value)}
            />
          </label>
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
            Pick a Region:
            <select onChange={handleRegionChange} value={selectedRegion}>
              {DBRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
          <button onClick={regionButtonHandler}>Select Region</button>
          <div>
            {selectedVin === "" ? null : (
              <button onClick={vinValuationButtonHandler}>
                Do Vin Valuation
              </button>
            )}
          </div>
        </div>
      )}
      <div className="result">
        <ul>
          {searchValuationVis &&
            DBSearchWholesale.map((valuation) => (
              <li key={valuation}>
                Highest wholesale price: {valuation.above} and Lowest wholesale
                price: {valuation.below}
              </li>
            ))}
          {vinValuationVis &&
            DBVinWholesale.map((valuation) => (
              <li key={valuation}>
                Highest wholesale price: {valuation.above} and Lowest wholesale
                price: {valuation.below}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
