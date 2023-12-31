import "./App.css";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Container, Row, Col } from "react-bootstrap";
import Logo from "./assets/logo.webp";
function App() {
  const base=`https://server-valuation.vercel.app`;
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
  const [searchNext, setSearchNext] = useState(false);
  const [vinNext, setVinNext] = useState(false);

  //DB states
  const [DBRegions, setRegions] = useState([]);
  const [DBGrades, setGrades] = useState([]);
  const [DBColors, setColors] = useState([]);
  const [DByears, setYears] = useState([]);
  const [DBMakes, setMakes] = useState([]);
  const [DBModels, setModels] = useState([]);
  const [DBTrims, setTrims] = useState([]);

  //resultant states
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
  const [activeTab, setActiveTab] = useState(false);

  //tab handler

  const tabHandler = (selection) => {
    console.log("which tab open", selection);
    setActiveTab(selection);
    dataCleanse();
  };

  const dataCleanse = () => {
    if (activeTab === "vin") {
      setSearchValuationVis(false);
      setValuationVis(false);
      setSearchWholesale([]);
      setMakes([]);
      setModels([]);
      setTrims([]);
      setSelectedColor("");
      setSelectedGrade("");
      setSelectedMake("");
      setSelectedModel("");
      setSelectedTrim("");
      setSelectedYear("");
      setSelectedOdometer("");
      setSelectedRegion("");
      setSearchNext(false);
    }
    if (activeTab === "search") {
      setVinValuationVis(false);
      setVinWholesale([]);
      setSelectedVin("");
      setSelectedGrade("");
      setSelectedOdometer("");
      setSelectedColor("");
      setSelectedRegion("");
      setVinNext(false);
    }
  };

  const dataClearing = (flag) => {
    switch (flag) {
      case "year":
        setSearchWholesale([]);
        setSelectedMake("");
        setSelectedModel("");
        setSelectedTrim("");
        setMakes([]);
        setModels([]);
        setTrims([]);
        break;
      case "make":
        setSearchWholesale([]);
        setSelectedModel("");
        setSelectedTrim("");
        setModels([]);
        setTrims([]);
        break;
      case "model":
        setSearchWholesale([]);
        setSelectedTrim("");
        setTrims([]);
        break;
      case "trim":
        setSearchWholesale([]);
        break;
      default:
        break;
    }
  };
  //button handlers
  const valuationButtonHandler = () => {
    setValuationFlag(true);
    console.log("search valuation in-proc");
  };

  const vinValuationButtonHandler = () => {
    setVinValuationFlag(true);
    console.log("vin valuation in-proc");
  };

  //input handlers
  const handleYearChange = (event) => {
    console.log("here is selected year=>", event.target.value);
    setSelectedYear(event.target.value);
    dataClearing('year');
  };

  const handleMakeChange = (event) => {
    console.log("here is selected make=>", event.target.value);
    setSelectedMake(event.target.value);
    dataClearing('make');
  };

  const handleModelChange = (event) => {
    console.log("here is selected model=>", event.target.value);
    setSelectedModel(event.target.value);
    dataClearing('model');
  };

  const handleTrimChange = (event) => {
    console.log("here is selected trim=>", event.target.value);
    setSelectedTrim(event.target.value);
    setValuationVis(true);
    dataClearing('trim');
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

  const capitalizeFirstLetter = (str) => {
    //since we need
    console.log("str is", str);
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const tokenGen = async () => {
    //POST AccessToken
    const res = await fetch(`${base}/api/token`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setToken(data.access_token);
        setToken(capitalizeFirstLetter(data.access_token));
      })
      .catch((error) => {
        console.error("token error", error);
      });
  };

  const retrieveColors = async () => {
    //GET Colors
    const resp = await fetch(`${base}/fetchColors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ yearConfirm: selectedYear, accessToken: token }),
    });
    const data = await resp.json();
    const colors = data.items.map((item) => item.value);
    setColors(colors);
    console.log("colors", data);
  };

  const retrieveGrades = async () => {
    //GET Grades
    const resp = await fetch(`${base}/fetchGrades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: token }),
    });
    const data = await resp.json();
    const grades = data.items.map((item) => item.value);
    setGrades(grades);
    console.log("grades", data);
  };

  const retrieveRegions = async () => {
    //GET Regions
    const resp = await fetch(`${base}/fetchRegions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: token }),
    });
    const data = await resp.json();
    const regions = data.items.map((item) => item.id);
    setRegions(regions);
    console.log("regions", data);
  };

  const retrieveYears = async () => {
    //GET Years
    const resp = await fetch(`${base}/fetchYears`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: token }),
    });
    const data = await resp.json();
    const years = data.items.map((item) => item.year);
    setYears(years);
    console.log("years", data);
  };

  const retrieveMake = async () => {
    //send Year and GET make
    const resp = await fetch(`${base}/fetchMake`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ yearConfirm: selectedYear, accessToken: token }),
    });
    const data = await resp.json();
    if (data.items) {
      const make = data.items.map((item) => item.make);
      console.log("the make inside", make);
      if (make.length == 1) {
        console.log("what is first", make[0]);
        setSelectedMake(make[0]);
        setMakes(make);
      } else {
        setMakes(make);
      }
    }
    console.log("make", data);
  };

  const retrieveModel = async () => {
    //send data and GET Model
    const resp = await fetch(`${base}/fetchModel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yearConfirm: selectedYear,
        makeConfirm: selectedMake,
        accessToken: token,
      }),
    });
    const data = await resp.json();
    if (data.items) {
      const models = data.items.map((item) => item.model);
      console.log("the model inside", models);
      if (models.length == 1) {
        console.log("what is first", models[0]);
        setSelectedModel(models[0]);
        setModels(models);
      } else {
        setModels(models);
      }
    }
    console.log("models", data);
  };

  const retrieveTrim = async () => {
    //send data and GET Trim
    const resp = await fetch(`${base}/fetchTrim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yearConfirm: selectedYear,
        makeConfirm: selectedMake,
        modelConfirm: selectedModel,
        accessToken: token,
      }),
    });
    const data = await resp.json();
    if (data.items) {
      const trims = data.items.map((item) => item.trim);
      console.log("the trim inside", trims);
      if (trims.length == 1) {
        console.log("what is first", trims[0]);
        setSelectedTrim(trims[0]);
        setTrims(trims);
      } else {
        setTrims(trims);
      }
    }
    console.log("trims", data);
  };

  const getSearchValuation = async () => {
    const resp = await fetch(`${base}/getSeachValuation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        yearConfirm: selectedYear,
        makeConfirm: selectedMake,
        modelConfirm: selectedModel,
        trimConfirm: selectedTrim,
        colorConfirm: selectedColor,
        gradeConfirm: selectedGrade,
        regionConfirm: selectedRegion,
        odometerConfirm: selectedOdometer,
        accessToken: token,
      }),
    });
    const data = await resp.json();
    console.log("bahar", data.items);
    if (data.items) {
      console.log("andar");
      const wholesale = data.items.map((item) => item.wholesale);
      // const retail = data.items.map((item) => item.retail);
      const desc = data.items.map((item) => item.description);
      setSearchWholesale(wholesale);
      setVinDescription(desc);
      console.log("searchValuation", data);
    }
  };

  const getVinValuation = async () => {
    const resp = await fetch(`${base}/getVinValuation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vinConfirm: selectedVin,
        colorConfirm: selectedColor,
        odometerConfirm: selectedOdometer,
        gradeConfirm: selectedGrade,
        accessToken: token,
      }),
    });
    const data = await resp.json();

    if (data.items) {
      const bestMatchItem = data.items.find((item) => item.bestMatch === true);

      console.log("if bestMatch exist:", bestMatchItem);
      if (bestMatchItem) {
        console.log("it does exist", bestMatchItem.wholesale);

        setVinWholesale(bestMatchItem.wholesale);
      }
      // const desc = data.items.map((item) => item.description);
      // const retail = data.items.map((item) => item.retail);
      // const wholesale = data.items.map((item) => item.wholesale);
      // setRetailValuation(retail);
      // setVinDescription(desc);
      console.log("Vinvaluation", data);
    }
  };

  const getOptionalFunction = async () => {
    //all optional get Requests
    console.log("getting optional gets");
    retrieveColors();
    retrieveGrades();
    retrieveRegions();
  };

  useEffect(() => {
    //accessToken useEffect
    tokenGen();
  }, []);

  useEffect(() => {
    //GET year useEffect
    if (token !== "no accessToken") {
      retrieveYears();
      console.log("getYear triggered");
    }
  }, [token]);

  useEffect(() => {
    //GET apidata useEffect
    console.log("useEffect da trigger");

    if (vinNext) {
      getOptionalFunction();
    }
    if (selectedTrim !== "") {
      getOptionalFunction();
    }
  }, [vinNext, selectedTrim]);

  useEffect(() => {
    if (selectedYear !== "") {
      retrieveMake();
      console.log("get them makes");
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedMake) {
      retrieveModel();
      console.log("get them model");
    }
  }, [selectedMake]);

  useEffect(() => {
    //valuation button unearthing
    if (selectedTrim) {
      setValuationVis(true);
    }
  }, [selectedTrim]);

  useEffect(() => {
    if (selectedModel) {
      console.log("selectedModel is:", selectedModel);
      retrieveTrim();
    }
  }, [selectedModel]);

  useEffect(() => {
    //search valuation search
    if (
      valuationFlag &&
      selectedYear !== "" &&
      selectedMake !== "" &&
      selectedModel !== "" &&
      selectedTrim !== ""
    ) {
      getSearchValuation();
      setValuationFlag(false);
    }
  }, [valuationFlag]);

  useEffect(() => {
    //vin valuation search
    if (vinValuationFlag) {
      getVinValuation();
      setVinValuationFlag(false);
    }
  }, [vinValuationFlag]);

  return (
    <div className="App">
      <Container>
        <Row className="firsstrow">
          <Col>
            <h1 className="text-black">Sell Your Car</h1>
            <p>
              We want to buy your car. No tricks, no trades, just money in your
              pocket!
            </p>
          </Col>
        </Row>
        <Row className="secondrow">
          <Col md={3} className="firstcol">
            <h4 className="heading">Get an offer for your car today!</h4>
            <p className="heading-desc">
              Sell your car to Carbingo for a hassle-free and haggle-free
              experience. Enter your license plate, VIN or provide us with your
              vehicle year, make, & model to get an offer from our team. We
              promise a stress-free, straightforward process, and will do
              everything we can to exceed your expectations.{" "}
            </p>
            <h4 className="subhead">why sell with us?</h4>
            <h6>Extra $$$ to dropoff your car</h6>
            <h6>Home Pick-up Available</h6>
            <h6>Get Paid Today</h6>
            {/* <img src={Logo} /> */}
          </Col>
          <Col md={9} className="py-4">
            <Row>
              <Col>
                <h1>Tell us about your car</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tabs
                  defaultActiveKey="search"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                  onSelect={(e) => tabHandler(e)}
                >
                  <Tab eventKey="vin" title="Vin Valuation">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="vin">Enter The VIN:</label>
                            <input
                              type="text"
                              className="form-control"
                              id="vin"
                              name="vin"
                              placeholder="VIN Number"
                              onChange={(e) => setSelectedVin(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            {selectedVin === "" ? null : (
                              <button
                                className="btn btn-primary"
                                onClick={() => setVinNext(true)}
                              >
                                Next
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {vinNext === true ? (
                        <div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="grade">Pick a Grade:</label>
                                <select
                                  className="form-control"
                                  id="grade"
                                  onChange={handleGradeChange}
                                  value={selectedGrade}
                                >
                                  {DBGrades.map((grade) => (
                                    <option key={grade} value={grade}>
                                      {grade}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="odometervin">
                                  Enter Odometer:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="odometervin"
                                  name="odometervin"
                                  placeholder="Odometer"
                                  onChange={(e) =>
                                    setSelectedOdometer(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="region">Pick a Region:</label>
                                <select
                                  className="form-control"
                                  id="region"
                                  onChange={handleRegionChange}
                                  value={selectedRegion}
                                >
                                  {DBRegions.map((region) => (
                                    <option key={region} value={region}>
                                      {region}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="color">Pick a Color:</label>
                                <select
                                  className="form-control"
                                  id="color"
                                  onChange={handleColorChange}
                                  value={selectedColor}
                                >
                                  {DBColors.map((color) => (
                                    <option key={color} value={color}>
                                      {color}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            {selectedVin === "" ? null : (
                              <button
                                className="btn btn-primary"
                                onClick={vinValuationButtonHandler}
                              >
                                Get Valuation
                              </button>
                            )}

                            {DBVinWholesale.length > 0 ? (
                              DBVinWholesale.map((valuation) => (
                                <h1 className="subhead mt-3">
                                  ${valuation.below} - ${valuation.above}
                                </h1>
                              ))
                            ) : DBVinWholesale.length === 0 ? null : (
                              <h1 className="subhead mt-3">
                                ${DBVinWholesale.below} - $
                                {DBVinWholesale.above}
                              </h1>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Tab>
                  <Tab eventKey="search" title="Search Valuation">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="year">Pick a Year:</label>
                            <select
                              className="form-control"
                              id="year"
                              onChange={handleYearChange}
                              value={selectedYear}
                            >
                              {DByears.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="make">Pick Make:</label>
                            <select
                              className="form-control"
                              id="make"
                              onChange={handleMakeChange}
                              value={selectedMake}
                            >
                              {DBMakes.map((make) => (
                                <option key={make} value={make}>
                                  {make}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="model">Pick a Model:</label>
                            <select
                              className="form-control"
                              id="model"
                              onChange={handleModelChange}
                              value={selectedModel}
                            >
                              {DBModels.map((model) => (
                                <option key={model} value={model}>
                                  {model}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="trim">Pick a Trim:</label>
                            <select
                              className="form-control"
                              id="trim"
                              onChange={handleTrimChange}
                              value={selectedTrim}
                            >
                              {DBTrims.map((trim) => (
                                <option key={trim} value={trim}>
                                  {trim}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          {selectedTrim === "" ? null : (
                            <button
                              className="btn btn-primary"
                              onClick={() => setSearchNext(true)}
                            >
                              Next
                            </button>
                          )}
                        </div>
                      </div>
                      {searchNext === true ? (
                        <div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="odometersearch">
                                  Enter Odometer:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="odometersearch"
                                  name="odometersearch"
                                  placeholder="Odometer"
                                  onChange={(e) =>
                                    setSelectedOdometer(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="color">Pick a Color:</label>
                                <select
                                  className="form-control"
                                  id="color"
                                  onChange={handleColorChange}
                                  value={selectedColor}
                                >
                                  {DBColors.map((color) => (
                                    <option key={color} value={color}>
                                      {color}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="grade">Pick a Grade:</label>
                                <select
                                  className="form-control"
                                  id="grade"
                                  onChange={handleGradeChange}
                                  value={selectedGrade}
                                >
                                  {DBGrades.map((grade) => (
                                    <option key={grade} value={grade}>
                                      {grade}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="region">Pick a Region:</label>
                                <select
                                  className="form-control"
                                  id="region"
                                  onChange={handleRegionChange}
                                  value={selectedRegion}
                                >
                                  {DBRegions.map((region) => (
                                    <option key={region} value={region}>
                                      {region}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              {valuationVis === true ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={valuationButtonHandler}
                                >
                                  Get Valuation
                                </button>
                              ) : null}

                              {DBSearchWholesale.map((valuation) => (
                                <h1 className="subhead mt-3" key={valuation}>
                                  ${valuation.below} - ${valuation.above}
                                </h1>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/* {vinValuationVis && (
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
      )}  */}
      {/* <div className="result">
        <ul>
          {searchValuationVis &&
            DBSearchWholesale.map((valuation) => (
              <li key={valuation}>
                {valuation.above} - {valuation.below}
              </li>
            ))}
          {vinValuationVis &&
            DBVinWholesale.map((valuation) => (
              <li key={valuation}>
                {valuation.above} - {valuation.below}
              </li>
            ))}
        </ul>
      </div> */}
    </div>
  );
}

export default App;
