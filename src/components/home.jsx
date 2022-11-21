import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [input, setInput] = useState("Kathmandu");
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    getData();
  }, [input]);
  const getData = () => {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=4424d1c2acb60db681a35eb861fe8480`;
    axios
      .get(api)
      .then(function (response) {
        console.log(response.data);
        setDisplay(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setDisplay(null);
      });
    // console.log(display);
  };
  const convertToCelcius = (num) => `${1 * (num - 273.15).toFixed(2)}`;

  // toFixedWithoutZeros(1.001, 2); // '1'
  // toFixedWithoutZeros(1.500, 2); // '1.5'
  return (
    <div className="box">
      <div className="inputData">
        <input
          type="search"
          className="inputField"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      {!display ? (
        <p>No data found</p>
      ) : (
        <div>
          <div className="info">
            <h2 className="location">
              <i className="fas fa-street-view"></i> {input}
            </h2>
            <h1 className="temp">{convertToCelcius(display.main.temp)}°C</h1>
            <h1 className="condition">{display.weather[0].main} </h1>
            <img
              className="icon-condition"
              src={`http://openweathermap.org/img/wn/${display.weather[0].icon}@2x.png`}
              alt=""
            />

            <h3 className="tempmin_max">
              {" "}
              Min :{convertToCelcius(display.main.temp_min)}°C | Max :
              {convertToCelcius(display.main.temp_max)}°C
            </h3>
          </div>
          <div className="wave -one"></div>
          <div className="wave -two"></div>
          <div className="wave -three"></div>
        </div>
      )}
    </div>
  );
};

export default Home;
