
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

function get_weather_data(){
    navigator.geolocation.getCurrentPosition((success)=>{
        let (lat,long) = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,miutely&appid=${api_key}`).then(res = res.json).then()
    })
}