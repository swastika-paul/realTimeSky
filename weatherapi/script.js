const app = document.querySelector("#app");
const locationInput = document.querySelector("#locationInput");
const cities = document.querySelectorAll(".city");
const search = document.querySelector(".search");
const submit = document.querySelector(".submit");
const temp = document.querySelector(".temp");
const place = document.querySelector(".place");
const time = document.querySelector(".time");
const bgvideo = document.querySelector("#bg-video");
const weather = document.querySelector(".climate");
const description = document.querySelector(".description");
const hour = new Date().getHours();

const box = document.querySelector("#box");
setInterval(function () {
  let date = new Date();
  
  time.innerHTML = date.toLocaleTimeString();
});
const dateElement = document.querySelector(".date"); 

const today = new Date();

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

const day = days[today.getDay()];
const date = today.getDate();
const month = months[today.getMonth()];
const year = today.getFullYear();

dateElement.innerHTML = `${day}, ${date} ${month} ${year}`;
const humidity = document.querySelector(".humidity");
let cityinput ="bangalore";
cities.forEach((city)=> {
    city.addEventListener('click',(e) => {
        cityinput = e.target.innerHTML;
        fetchweatherData();
    })
});
submit.addEventListener('click',(e)=>{
if(search.value.length === 0){
    alert('please type in a city name');
}else{
    cityinput = search.value;
    fetchweatherData();
    search.value ="";
        box.style.display ="block";
    
}

e.preventDefault();
});

async function fetchweatherData(){
    const apikey = "e476b131e8392c54b47a62cafb38832d";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityinput}`;
    const response = await fetch(apiUrl + `&appid=${apikey}`);
    var data = await response.json();
    console.log(data);
    
    temp.innerHTML = data.main.temp +"&#176;";
    place.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    //  climate.innerHTML = data.weather[0].main;
    humidity.innerHTML = `Wind Speed :${data.wind.speed} m/s`;
       const weatherMain = data.weather[0].main.toLowerCase();
      weather.innerHTML = data.weather[0].main;
      const currenttime = data.dt;
      const sunrise = data.sys.sunrise;
      const sunset = data.sys.sunset;
      const isDay = currenttime >= sunrise && currenttime < sunset;

    let videoFile = "default.mp4";

    if (weatherMain.includes("clear")) {
        videoFile = isDay?"https://videos.pexels.com/video-files/854002/854002-hd_1920_1080_24fps.mp4": "https://videos.pexels.com/video-files/8477872/8477872-hd_1920_1080_30fps.mp4";
    } else if (weatherMain.includes("clouds")) {
        videoFile = isDay?"https://videos.pexels.com/video-files/1893623/1893623-uhd_2560_1440_25fps.mp4": "https://videos.pexels.com/video-files/854739/854739-hd_1920_1080_30fps.mp4";
    } else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
        videoFile = isDay?"https://videos.pexels.com/video-files/5487781/5487781-uhd_2560_1440_30fps.mp4":"https://videos.pexels.com/video-files/4323285/4323285-hd_1920_1080_30fps.mp4";
    } else if (weatherMain.includes("thunderstorm")) {
        videoFile ="https://videos.pexels.com/video-files/2657691/2657691-hd_1920_1080_30fps.mp4";
    } else if (weatherMain.includes("snow")) {
        videoFile =isDay? "https://videos.pexels.com/video-files/6933537/6933537-uhd_2732_1440_24fps.mp4": "https://videos.pexels.com/video-files/6554025/6554025-uhd_2560_1440_24fps.mp4";
    } else if (weatherMain.includes("mist") || weatherMain.includes("fog") || weatherMain.includes("haze")) {
        videoFile =isDay? "https://videos.pexels.com/video-files/6066349/6066349-uhd_2560_1440_30fps.mp4": "https://videos.pexels.com/video-files/11839648/11839648-uhd_2560_1440_25fps.mp4";
    }
    const source = bgvideo.querySelector("source");
    source.setAttribute("src", videoFile);
    bgvideo.load();
}

// Load default
fetchweatherData();







