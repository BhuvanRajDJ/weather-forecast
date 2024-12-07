var data = [];
var weather_dataarray = [];
var filterarray = [];
var cityname = "";
var logo = "";
var country = "";
var population = "";
var sunrise = "";
var sunset = "";
var lat = "";
var lon = "";
var sunrise1 = "";
var sunset1 = "";
var Temperature = "";
var Description = "";
var date = "";
var Humididty = "";
var Wind_Speed = "";
var Weather_Icon = "";
var date1 = "";
var time1 = "";

let weather_dtls = document.getElementById("weather_dtls");
let city_detail = document.getElementById("city_detail");
let filter = document.getElementById("filter");
let filterd_data = document.getElementById("filterd_data");

weather_dtls.innerHTML = "";
city_detail.innerHTML = "";
filter.innerHTML = "";
filterd_data.innerHTML = "";

var today = new Date();
var day2 = new Date(today);
var day3 = new Date(today);
var day4 = new Date(today);
var day5 = new Date(today);

today.setDate(today.getDate() + 0);
day2.setDate(today.getDate() + 1);
day3.setDate(today.getDate() + 2);
day4.setDate(today.getDate() + 3);
day5.setDate(today.getDate() + 4);

today = today.toISOString().split("T")[0];
day2 = day2.toISOString().split("T")[0];
day3 = day3.toISOString().split("T")[0];
day4 = day4.toISOString().split("T")[0];
day5 = day5.toISOString().split("T")[0];

console.log("day1: " + today);
console.log("day2: " + day2);
console.log("day3: " + day3);
console.log("day4: " + day4);
console.log("day5: " + day5);

function showdilter() {
  let form = document.createElement("form");
  form.id = "filterform";
  form.innerHTML = `
 
   <select name="datefilter" id="datefilter" required>
    
    <option value="" selected disabled>Select the date
    </option>
    <option value="${today}">${today}</option>
    <option value="${day2}">${day2}</option>
    <option value="${day3}">${day3}</option>
    <option value="${day4}">${day4}</option>
    <option value="${day5}">${day5}</option>

   </select>

   <select name="timefilter" id="timefilter" value="" >
    
    <option value="" selected >Select the time
    </option>
    <option value="00:00:00">00:00:00</option>
    <option value="03:00:00">03:00:00</option>
    <option value="06:00:00">06:00:00</option>
    <option value="09:00:00">09:00:00</option>
    <option value="12:00:00">12:00:00</option>
    <option value="15:00:00">15:00:00</option>
    <option value="18:00:00">18:00:00</option>
    <option value="21:00:00">21:00:00</option>
    <option value="24:00:00">24:00:00</option>

   </select>
  
  <button type="submit" id="filterbtn">Filter</button>
  
  <button type="button" id="clear">Clear</button>

  
  `;

  filter.appendChild(form);
}
showdilter();

document
  .getElementById("serachform")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    city_detail.innerHTML = "";
    weather_dtls.innerHTML = "";
    cityname = document.getElementById("city_name").value;
    console.log(cityname);
    if (cityname != "" && cityname.length > 2) {
      Weather();
    } else if (cityname.length <= 2) {
      alert("please enter the city with atleast 3 letters");
    } else {
      alert("please enter city name");
    }
  });

class weathercalss {
  constructor(
    Temperature,
    Description,
    date,
    time,
    Humididty,
    Wind_Speed,
    Weather_Icon
  ) {
    this.Temperature = Temperature;
    this.Description = Description;
    this.date = date;
    this.time1 = time;
    this.Humididty = Humididty;
    this.Wind_Speed = Wind_Speed;
    this.Weather_Icon = Weather_Icon;
  }
}

function add_data() {
  let daydata = new weathercalss(
    Temperature,
    Description,
    date1,
    time1,
    Humididty,
    Wind_Speed,
    Weather_Icon
  );
  weather_dataarray.push(daydata);
}

async function Weather() {
  try {
    console.log(cityname);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=ef6e8c52a2a35d99f867de737bf11733`
    );
    if (!response.ok) {
      // throw new Error(
      //   "Could not find the city, please enter different one" + response.status
      // );
      document.getElementById(
        "weather_dtls"
      ).innerHTML = `<h1>Could not find the city</h1> <h4>Please try entering a different city.</h4>
      <p>${response.status} (Not Found)</p>
      `;
    }
    data = await response.json();
    add_data();
    weather_details();
  } catch (error) {
    console.error(error.stack);
  }
}

function weather_details() {
  // console.log("data" + JSON.stringify(data));
  cityname = data.city.name;
  country = data.city.country;
  population = data.city.population;
  sunrise = data.city.sunrise;
  sunset = data.city.sunset;
  lat = data.city.coord.lat;
  lon = data.city.coord.lon;
  sunrise1 = new Date(sunrise * 1000);
  sunset1 = new Date(sunset * 1000);
  display_city_details();

  data.list.forEach(function (item) {
    Temperature = item.main.temp;
    Description = item.weather[0].description;
    date = item.dt_txt;
    Humididty = item.main.humidity;
    Wind_Speed = item.wind.speed;
    Weather_Icon = item.weather[0].icon;
    logo = `https://openweathermap.org/img/wn/${Weather_Icon}@2x.png`;
    date1 = new Date(date);
    date1 = date1.toISOString().split("T")[0];

    time1 = new Date(date);
    time1 = time1.toTimeString().split(" ")[0];
    add_data();
    display_card();
    // console.log("Temperature: " + item.main.temp + "°K");
    // console.log("Description: " + item.weather[0].description);
    // console.log("Date: " + item.dt_txt);
    // console.log("Humididty: " + item.main.humidity + "%");
    // console.log("Wind Speed: " + item.wind.speed + "kMPH");
    // console.log("Weather Icon: " + item.weather[0].icon);
  });

  // console.log("city name: " + cityname);
  // console.log("country: " + country);
  // console.log("population: " + population);
  // console.log("sunrise: " + sunrise1.toLocaleTimeString());
  // console.log("sunset: " + sunset1.toLocaleTimeString());
  // console.log("lat: " + lat);
  // console.log("lon: " + lon);
  // console.log("weather data: " + JSON.stringify(weather_dataarray));
}

function display_city_details() {
  let citydetaile = document.createElement("div");

  if (cityname == "") {
    citydetaile.innerHTML = `<h1>No Result Found</h1>`;
  } else {
    citydetaile.innerHTML = `
    <h3>${cityname}, ${country} </h3> 
    <h5>population: ${population} </h5>
    <h5>Sunrise: ${sunrise1} </h5>
    <h5>Sunset: ${sunset1} </h5>
    <h5>lat: ${lat} </h5>
    <h5>lon: ${lon} </h5>
    `;
  }
  city_detail.appendChild(citydetaile);
}

function display_card() {
  let daycard = document.createElement("div");

  daycard.className = "daycard";
  if (
    date1 == "" &&
    time1 == "" &&
    logo == "" &&
    Description == "" &&
    Temperature == "" &&
    Humididty == "" &&
    Wind_Speed == ""
  ) {
    daycard.innerHTML = `<h1>No Result Found</h1>`;
  }
  daycard.innerHTML = `
<h4>Date: ${date1}</h4>
<h4>Time: ${time1}</h4>
<img src="${logo}" alt="weather icon">
<h5>Description: ${Description}</h5>
<h5>Temperature: ${Temperature}</h5>
<h5>Humididty: ${Humididty}</h5>
<h5>Wind_Speed: ${Wind_Speed}</h5>

`;

  weather_dtls.appendChild(daycard);
}

let filtertoggle = 0;

document
  .getElementById("filterform")
  .addEventListener("submit", function (event) {
    filterd_data.innerHTML = "";
    filtertoggle = 0;
    event.preventDefault();
    filterarray = [];
    if (filtertoggle == 0) {
      // filtertoggle = 1;

      document.getElementById("weather_dtls").style.display = "none";
      document.getElementById("filterd_data").style.display = "grid";
      const fdate = document.getElementById("datefilter").value;
      console.log("fdate: " + fdate);
      const ftime = document.getElementById("timefilter").value;
      console.log("ftime: " + ftime);
      if (fdate != "") {
        if (ftime == "") {
          filterarray = weather_dataarray.filter(function (item) {
            console.log("item.date: " + fdate);
            return item.date == fdate;
          });
          document.getElementById("filterform").reset();
        } else {
          filterarray = weather_dataarray.filter(function (item) {
            console.log("item.time1: " + item.time1);
            return item.date == fdate && item.time1 === ftime;
          });
        }
      } else {
        alert("please select the date");
        document.getElementById("filterform").reset();
      }

      filterarray.forEach(function (item) {
        let daycard = document.createElement("div");
        daycard.className = "daycard";
        logo = `https://openweathermap.org/img/wn/${item.Weather_Icon}@2x.png`;
        daycard.innerHTML = `
          <h4>Date: ${item.date}</h4>
          <h4>Time: ${item.time1}</h4>
          <img src="${logo}" alt="weather icon">
          <h5>Description: ${item.Description}</h5>
          <h5>Temperature: ${item.Temperature}</h5>
          <h5>Humididty: ${item.Humididty}</h5>
          <h5>Wind_Speed: ${item.Wind_Speed}</h5>

          `;
        if (filterarray == []) {
          daycard.innerHTML = `<h1>No Result Found</h1>`;
        }
        filterd_data.appendChild(daycard);
      });
    }
  });

document.getElementById("clear").addEventListener("click", function (event) {
  if (event.target.tagName == "BUTTON") {
    document.getElementById("weather_dtls").style.display = "grid";
    document.getElementById("filterd_data").style.display = "none";
    document.getElementById("filterform").reset();
  }
});
