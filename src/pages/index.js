import React, { useEffect } from "react"; // Import React because page won't work if it is not.
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Helmet from "react-helmet";
import "./css/grid.css";

// Page Style Variables.

const titleStyle = {

  textAlign: "center",
  fontFamily: "'Nunito', sans-serif",
  fontSize: "56px"

}

const centreElement = {

  display: "flex",
  alignItems: "center",
  justifyContent: "center"

}

const buttonStyle = {

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "10px"

}

// Weather Card Style Variables

const townName = {

  textAlign: "center",
  fontFamily: "'Nunito', sans-serif",
  userSelect: "none"

}

const cardEntryStyle = {

  marginLeft: "15px",
  marginTop: "0px",
  marginBottom: "10px",
  fontSize: "14px",
  userSelect: "none"

}

const conditionStyle = {

  width: "128px",
  height: "128px",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "auto",
  marginBottom: "auto"

}

// Page code.

const IndexPage = () => { // Define the index page variable.

  // Define body styles here.
  var bodyStyle = document.body.style
  bodyStyle.backgroundColor = "aliceblue";

  function changeToCelcius(){

    var response = document.getElementById("queryField").value;

    if (response === ""){

      alert("No response.");
      return;

    }

    var apiUrl = "https://api.weatherapi.com/v1/current.json?key=06aa6a359bf1453a9c4195807221302&q=" + response;

    fetch(apiUrl).then(response => response.json()).then(data => {

      document.getElementById("temperature").innerHTML = "Temperature (C): " + data["current"]["temp_c"];
      document.getElementById("feelslike").innerHTML = "Feels Like (C): " + data["current"]["feelslike_c"];

    });

    console.log("Changed to Celsius");

  }

  function changeToFahrenheit(){

    var response = document.getElementById("queryField").value;

    if (response === ""){

      alert("No response.");
      return;

    }

    var apiUrl = "https://api.weatherapi.com/v1/current.json?key=06aa6a359bf1453a9c4195807221302&q=" + response;

    fetch(apiUrl).then(response => response.json()).then(data => {

      document.getElementById("temperature").innerHTML = "Temperature (F): " + data["current"]["temp_f"];
      document.getElementById("feelslike").innerHTML = "Feels Like (F): " + data["current"]["temp_f"];

    });

    console.log("Changed to Fahrenheit.");

  }

  // Functions go here.
  function UpdateWeather(){

    var response = document.getElementById("queryField").value;

    if (response === ""){

      alert("No response.");
      return;

    }

    var apiUrl = "https://api.weatherapi.com/v1/current.json?key=06aa6a359bf1453a9c4195807221302&q=" + response;

    try{ // HTTP Request Code.

      fetch(apiUrl).then(response => response.json()).then(data => {
        
        document.getElementById("temperature").innerHTML = "Temperature (C): " + data["current"]["temp_c"];
        document.getElementById("condition").innerHTML = "Condition: " + data["current"]["condition"]["text"];
        document.getElementById("wind").innerHTML = "Wind (MPH/KPH): " + data["current"]["wind_mph"] + "/" + data["current"]["wind_kph"];
        document.getElementById("windDirection").innerHTML = "Wind Direction: " + data["current"]["wind_dir"];
        document.getElementById("humidity").innerHTML = "Humidity: " + data["current"]["humidity"] + "%";
        document.getElementById("feelslike").innerHTML = "Feels Like (C): " + data["current"]["feelslike_c"];
        document.getElementById("visibility").innerHTML = "Visibility (KM): " + data["current"]["vis_km"] + "km";
        document.getElementById("pressure").innerHTML = "Pressure (MB/IN): " + data["current"]["pressure_mb"] + "/" + data["current"]["pressure_in"]
        document.getElementById("uv").innerHTML = "UV: " + data["current"]["uv"] + "/10";
        document.getElementById("localTime").innerHTML = "Local Time: " + data["location"]["localtime"];
        document.getElementById("townName").innerHTML = data["location"]["name"];
        document.getElementById("conditionImage").src = data["current"]["condition"]["icon"].replace("64x64", "128x128");

      });

    }catch(exception){

      alert(exception);
      return;

    }

  }

  useEffect( () =>{

    document.addEventListener("keydown", function(event){

      if(event.which === 13){

        UpdateWeather();

      }

    });

  });

  // HTML Stuff goes here.
  return(

    <>

      <Helmet>

        <title>Weather App</title>
        
      </Helmet>

      <div id="fonts">

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />

      </div>

      <h1 style={ titleStyle }>Weather</h1>

      <div id="textfield" style={centreElement}>

        <TextField style={ centreElement } id="queryField" label="Query" variant="outlined" />

      </div>

      <div id="button" style={buttonStyle}>

        <Button onClick={ UpdateWeather } variant="contained" >Get Weather</Button>

      </div>

      <div id="box" style={centreElement}>

        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '25px',
          fontFamily: '"Nunito", sans-serif',
          '& > :not(style)': {
            m: 1,
            width: 550,
           height: 450,
          },
        }}
      >
        <Paper elevation={3}>

        <h1 id="townName" style={ townName }>Town Name</h1>

        <div class="weatherGrid">

          <div class="areaOne">
            
            <h5 id="condition" style={ cardEntryStyle }>Condition: </h5>
            <h5 id="temperature" style={ cardEntryStyle }>Temperature (C/F): </h5>
            <h5 id="feelslike" style={ cardEntryStyle }>Feels Like (C/F): </h5>
            <h5 id="wind" style={ cardEntryStyle }>Wind (MPH/KPH): </h5>
            <h5 id="windDirection" style={ cardEntryStyle }>Wind Direction: </h5>
            <h5 id="humidity" style={ cardEntryStyle }>Humidity: </h5>
            <h5 id="visibility" style={ cardEntryStyle }>Visibility (KM): </h5>
            <h5 id="pressure" style={ cardEntryStyle }>Pressure (MB/IN): </h5>
            <h5 id="uv" style={ cardEntryStyle }>UV: </h5>
            <h5 id="localTime" style={ cardEntryStyle }>Local Time: </h5>

          </div>

          <div class="areaTwo">

              <img id="conditionImage" style={ conditionStyle } src="https://cdn.weatherapi.com/weather/128x128/day/116.png"/>

          </div>

        </div>

        </Paper>
      </Box>

    </div>

    <div style={ centreElement }>

      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button onClick={ changeToCelcius }>Celsius</Button>
        <Button onClick={ changeToFahrenheit }>Fahrenheit</Button>
      </ButtonGroup>

    </div>

    </>

  )

}

export default IndexPage // Export indexpage by default.