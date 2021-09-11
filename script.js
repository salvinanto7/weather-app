
console.log('script linked');
const todayTemp = document.getElementById('today-temp');
const todayHumid = document.getElementById('today-humid');

const timeEl  = document.getElementById('time');
const dateEl = document.getElementById('date');
const tmrwDayEl  = document.getElementById('tmrw-day');
const tmrwDateEl = document.getElementById('tmrw-date');
const dayEl = document.getElementById('day');

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const days=['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];

const api_key  = '6bb449106dbdfcb581bbb045970d53ea';

setInterval(()=>{
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const year = time.getFullYear();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const ampm  = hour<12 ? 'AM': 'PM';

    // for tmrw date and day 
    
    const tmrwtime = new Date(new Date().getTime()+24*60*60*1000);
    const tmrwMonth = tmrwtime.getMonth();
    const tmrwDay = tmrwtime.getDay();
    const tmrwDate = tmrwtime.getDate();
    const tmrwYear = tmrwtime.getFullYear();

    const newminute = minute<=9? '0'+minute : minute
    const newhour = hour<=9? '0'+hour : hour
    timeEl.innerHTML = newhour+':'+newminute+' '+ `<span>${ampm}</span>`;
    dateEl.innerHTML = date+'th '+months[month]+' '+year+'&nbsp;';
    dayEl.innerHTML  = ' &nbsp;&nbsp;'+days[day];
    tmrwDateEl.innerHTML = tmrwDate +'th'+months[tmrwMonth]+' '+tmrwYear;
    tmrwDayEl.innerHTML = days[tmrwDay];

},1000);

get_weather_data();

function get_weather_data(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let {latitude,longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,miutelys&units=metric&appid=${api_key}`).then(res => res.json()).then(data=>{
        
        console.log(data);
        updateWeatherData(data);
        })
    })
}

function updateWeatherData(data){
    let{humidity,pressure,temp,visibility,wind_speed}=data.current;
    const temp1 = document.getElementById('temp-1');
    const pressure1 = document.getElementById('pressure-1');
    const humidity1 = document.getElementById('humidity-1');
    const visibility1 = document.getElementById('visibility-1');
    const windSpeed1 = document.getElementById('wind-speed-1');
    const location = document.getElementById('location');
    
    temp1.innerHTML = `<span>Temperature</span>  &nbsp; &nbsp; ${temp}&#176C`;
    pressure1.innerHTML = `<span>Pressure</span>  &nbsp; &nbsp; ${pressure} mb`;
    humidity1.innerHTML = `<span>Humidity</span>  &nbsp; &nbsp; ${humidity}%`;
    windSpeed1.innerHTML = `<span>Wind Speed</span> &nbsp; &nbsp; ${wind_speed} km/h`
    location.innerHTML = data.timezone;
    
    let otherforecast='';
    let tmrwWeatherForecast='';
    data.daily.forEach((day,idx) => {
        if(idx==0 || idx==7){

        }
        else if(idx==1){
            
            const tmrwtime = new Date(new Date().getTime()+24*60*60*1000);
            const tmrwMonth = tmrwtime.getMonth();
            const tmrwDay = tmrwtime.getDay();
            const tmrwDate = tmrwtime.getDate();
            const tmrwYear = tmrwtime.getFullYear();

            tmrwWeatherForecast+=`
            <div class="tmrw-temp" id="tmrw-temp">
                <div class="temp">
                    <p class="temp"> ${day.temp.day}&#176C</p>
                    <img src="./images/rainy-day.png" alt="">
                </div>
                <div class="date">
                    <p id=tmrw-date>${tmrwDate}th ${months[tmrwMonth]} ${tmrwYear}</p>
                    <p id="tmrw-day">${days[tmrwDay]} &nbsp; Tomorrow</p>
                </div>
            </div>
            <div class="tmrw-info weather">
                <p id="pressure"> <span>Pressure</span> &nbsp; &nbsp; 1010mb</p>
                    <p id="humidity"><span>Humidity</span>  &nbsp; &nbsp; ${day.humidity}%</p>
                    <p id="aiq"><span>Wind Speed</span> &nbsp; &nbsp; 3 km/h</p>
            </div>
            `
        }
        else{
            otherforecast+=`
            <div class="week-day">
                <h3>${days[idx]}</h3>
                <div class="tmrw-temp">
                    <p class="temp"> ${day.temp.day}&#176C</p>
                    <img src="./images/rainy-day.png" alt="">
                </div>
                <div class="tmrw-info weather">
                    <p id="pressure"> <span>Pressure</span> &nbsp; &nbsp; ${day.pressure}mb</p>
                    <p id="humidity"><span>Humidity</span>  &nbsp; &nbsp; ${day.humidity}%</p>
                    <p id="aiq"><span>Wind Speed</span> &nbsp; &nbsp; ${day.wind_speed} km/h</p>
                </div>
            </div>
            `
        }
        
    });
    const weeekForecast = document.getElementById('week-foreccast');

    weeekForecast.innerHTML=otherforecast;

    const tmrwForecast = document.getElementById('tmrw-forecast');
    tmrwForecast.innerHTML = tmrwWeatherForecast;
}

const themeBtn = document.getElementById('theme-btn');
const themeSec = document.getElementById('themes');
const themeBtnSecond = document.getElementById('theme-btn-2');

themeBtn.addEventListener('click',()=>{
        themeSec.style.display = 'block';
        themeSec.style.transition = '0.5s ease-in-out';
        themeBtn.style.opacity = '0';
        themeBtn.style.transition = '0.25s ease-in-out';
    });

themeBtnSecond.addEventListener('click',()=>{
    themeSec.style.display = 'none';
    themeSec.style.transition = '0.5s ease-in-out';
    themeBtn.style.opacity = '100';
    themeBtn.style.transition = '0.25s ease-in-out';
    
})

const theme1 = document.getElementById('opt-1');
const theme2 = document.getElementById('opt-2');
const theme3 = document.getElementById('opt-3');
const theme4 = document.getElementById('opt-4');
const theme5 = document.getElementById('opt-5');

theme1.addEventListener('click',()=>{
    document.body.style.background = '#fff url(./images/forest.jpg) no-repeat fixed left';
    body.style.objectFit = 'cover';
});
theme2.addEventListener('click',()=>{
    document.body.style.background = '#fff url(./images/sea.jpg) no-repeat fixed left';
});
theme3.addEventListener('click',()=>{
    document.body.style.background = '#fff url(./images/space.jpg) no-repeat fixed left';
});
theme4.addEventListener('click',()=>{
    document.body.style.background = '#fff url(./images/dogs.jpg) no-repeat fixed left';
});
theme5.addEventListener('click',()=>{
    document.body.style.background = '#fff url(./images/cat.jpg) no-repeat fixed left';
});