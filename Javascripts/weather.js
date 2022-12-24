let search = document.getElementById("search");
let field = document.getElementById("field");
let date;
let res;
let currTime;
let lemo;
let timeDate=document.getElementById("time-date");
let rise = document.getElementById("riseTime");
let set = document.getElementById("setTime")
let parameter = 'mumbai';
let temperature = document.getElementById("temperature");
let temp = document.getElementById("temp");
let maxTemp = document.getElementById("max-temp");
let minTemp = document.getElementById("min-temp");
var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
var ndays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let loc = document.getElementById("loc");
let icon = document.getElementById("logo");
let weather = document.getElementById("weather")

let humidity = document.getElementById("humidity");
let hum = document.getElementById("hum");
let pressure = document.getElementById("pressure");
let precipitation = document.getElementById("precipitation")

let wind = document.getElementById("wind");
let degree = document.getElementById("degree");
let speed = document.getElementById("speed");
let direction = document.getElementById("direction")

let hourly = document.getElementById("hourly")



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'your api key here',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};

function fetchWeather(id){

fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${id}&days=3`, options)
.then(response => response.json())
.then(response => {

	var ele = document.querySelectorAll('.hourly-card');
		console.log(ele.length)
		for(let i=0 ;i < ele.length; i++){
			ele[i].remove();
		}

	currTime  = response.location.localtime.split(" ")[1].split(":")[0];

	var ele = document.querySelectorAll('.card-containt-n');
	
		//console.log(ele.length)
		for(let i=0 ;i < ele.length; i++){
			ele[i].remove();
		}

		lemo = currTime

		date = new Date(response.location.localtime.split(" ")[0])
	    console.log( date.getDay())

		if(parseInt(currTime)==0){
			timeDate.innerHTML = days[date.getDay()]+", 12:"+response.location.localtime.split(" ")[1].split(":")[0]+" am";
		}
		else if(currTime > 12){
			timeDate.innerHTML = days[date.getDay()]+", "+(parseInt(currTime)-12)+":"+response.location.localtime.split(" ")[1].split(":")[0]+" pm";
			lemo = (parseInt(currTime)-12);
		}

		else{
			timeDate.innerHTML = days[date.getDay()]+", "+response.location.localtime.split(" ")[1].replace(/^0+/, '')+" am";
		}
		

	res = response;
	loc.innerHTML = response.location.name + ", "+response.location.region
	weather.innerHTML = response.current.condition.text
	icon.setAttribute("src",response.current.condition.icon)

	temperature.innerHTML = response.current.temp_c;
	//temp.innerHTML = "Feels like ";
	maxTemp.innerHTML =response.forecast.forecastday[0].day.maxtemp_c+"&deg / "+response.forecast.forecastday[0].day.mintemp_c+"&deg Feels like "+response.current.feelslike_c+"&deg";
	//minTemp.innerHTML = "Min temperature is ";

	humidity.innerHTML = response.current.humidity+"%";
	//hum.innerHTML = "Visiblity is "+response.current.vis_km+"km";
	//pressure.innerHTML  = "Pressure is "+response.current.pressure_mb+"mb";
	//precipitation.innerHTML = "Precipitation is "+response.current.precip_mm+"mm";
	
	wind.innerHTML = response.current.wind_kph+"km/h";
	//degree.innerHTML = "Degree of wind is "+response.current.wind_degree+"&deg";
	//speed.innerHTML  = "Gust speed is "+response.current.gust_kph+"km/h";
	//direction.innerHTML = "Direction of speed is "+response.current.wind_dir;


	 

	

	console.log(currTime)


	for(var i=currTime; i<24; i++){
		if(i==currTime){
			var div = document.createElement("div");
			div.className = "hourly-card";
			div.id = i;
			div.style.backgroundColor = "rgb(243, 243, 243)"
			div.setAttribute("onclick","weatherAt(this.id)")
			var ico = document.createElement('img');
			ico.setAttribute("src",response.current.condition.icon)

			var text = document.createElement("p");
			text.innerHTML =  response.current.temp_c+"&deg";
		
			var time = document.createElement("p");
			
			if(parseInt(currTime)==0){
				time = "12:"+response.location.localtime.split(" ")[1].split(":")[0]+" am";
			}
			else if(currTime > 12){
				time.innerHTML = (parseInt(currTime)-12)+":"+response.location.localtime.split(" ")[1].split(":")[0]+" pm";
			}
	
			else{
				time.innerHTML = response.location.localtime.split(" ")[1].replace(/^0+/, '')+" am";
			}
			//time.innerHTML = t.split(" ")[1];

			div.appendChild(time)
			div.appendChild(ico)
			div.appendChild(text)
			
		

			hourly.appendChild(div)
		}

		else{
		var div = document.createElement("div");
		div.className = "hourly-card";
		div.id = i;
		div.setAttribute("onclick","weatherAt(this.id)")
		var ico = document.createElement('img');
		ico.setAttribute("src",response.forecast.forecastday[0].hour[i].condition.icon)

		var text = document.createElement("p");
		text.innerHTML = response.forecast.forecastday[0].hour[i].temp_c+"&deg";		;
		


		var time = document.createElement("p");
		var t = response.forecast.forecastday[0].hour[i].time;


		if(t.split(" ")[1].split(":")[0] > 12){
			time.innerHTML = (parseInt(t.split(" ")[1].split(":")[0])-12)+":"+t.split(" ")[1].split(":")[1]+" pm";
		}
		else{
			time.innerHTML = t.split(" ")[1].replace(/^0+/, '')+" am";
		}

		
		//time.innerHTML = ;

		div.appendChild(time)
		div.appendChild(ico)
		div.appendChild(text)
		
		

		hourly.appendChild(div)
		}

	}


	var j=0;
	console.log("le "+lemo)
	while( j<=12-parseInt(lemo)){
		
		var div = document.createElement("div");
		div.className = "hourly-card";
		div.id = j;
		div.setAttribute("onclick","weatherAt(this.id)")
		var ico = document.createElement('img');
		ico.setAttribute("src",response.forecast.forecastday[1].hour[j].condition.icon)

		var text = document.createElement("p");
		text.innerHTML = response.forecast.forecastday[1].hour[j].temp_c+"&deg";		;
		


		var time = document.createElement("p");
		var t = response.forecast.forecastday[1].hour[j].time;


		if(parseInt(t.split(" ")[1].split(":")[0]) == 0){
			time.innerHTML = "12:"+t.split(" ")[1].split(":")[1]+" am";
		}
		else if(t.split(" ")[1].split(":")[0] > 12){
			time.innerHTML = (parseInt(t.split(" ")[1].split(":")[0])-12)+":"+t.split(" ")[1].split(":")[1]+" pm";
		}
		else{
			time.innerHTML = t.split(" ")[1].replace(/^0+/, '')+" am";
		}

		
		//time.innerHTML = ;

		div.appendChild(time)
		div.appendChild(ico)
		div.appendChild(text)
		
		

		hourly.appendChild(div)
		j++;
	}


	for(var i=0; i<3; i++){

		let weekDays = new Date(response.forecast.forecastday[i].date.split(" "))

		let div = document.createElement("div");
		div.className = "card-containt-n";
		let day = document.createElement("p");
		day.className = "left-p"
		if(i == 0){
			day.innerHTML = "Today";
		}
		else{
			day.innerHTML = ndays[weekDays.getDay()]
		}

		let ico = document.createElement("img");
		ico.setAttribute("src",response.forecast.forecastday[i].day.condition.icon);

		let max = document.createElement("p");
		max.className = "center-p"
		max.innerHTML = response.forecast.forecastday[i].day.maxtemp_c+"&deg ";

		let min = document.createElement("p");
		min.className = "right-p"
		min.innerHTML = response.forecast.forecastday[i].day.mintemp_c+"&deg";
		div.appendChild(day);
		div.appendChild(ico);
		div.appendChild(max);
		div.appendChild(min);

		document.getElementById("card").appendChild(div)
	}
	
	rise.innerHTML = response.forecast.forecastday[0].astro.sunrise
	set.innerHTML = response.forecast.forecastday[0].astro.sunset

	console.log(response)})
.catch(err => console.error(err));
}


	function searchWeather(id){

		var ele = document.querySelectorAll('.hourly-card');
		console.log(ele.length)
		for(let i=0 ;i < ele.length; i++){
			ele[i].remove();
		}

		fetchWeather(id);
	}

	document.addEventListener("keyup", function(event) {
		if (event.key === 'Enter') {
			console.log(field.value)
			parameter = field.value;
			searchWeather(parameter)
		}
	});

	search.onclick = function(){
		parameter = field.value;
		searchWeather(parameter)
	}

	function weatherAt(id){
		let ele = document.getElementsByClassName('hourly-card')
		
		for(var i=0; i<ele.length; i++){
			console.log(ele[i].id)
			document.getElementById(ele[i].id).style.backgroundColor='rgba(243, 243, 243, 0)';
		}

		if(id == currTime){
			fetchWeather(parameter)
		}

		else{

			var t = res.forecast.forecastday[0].hour[id].time;


		if(t.split(" ")[1].split(":")[0] > 12){
			timeDate.innerHTML = days[new Date(t.split(" ")[0]).getDay()]+", "+(parseInt(t.split(" ")[1].split(":")[0])-12)+":"+t.split(" ")[1].split(":")[1]+" pm";
		}
		else{
			timeDate.innerHTML = t.split(" ")[1].replace(/^0+/, '')+" am";
		}

		weather.innerHTML = res.forecast.forecastday[0].hour[id].condition.text;
		icon.setAttribute("src",res.forecast.forecastday[0].hour[id].condition.icon)
		//timeDate.innerHTML =  res.forecast.forecastday[0].hour[id].time;
		temperature.innerHTML = res.forecast.forecastday[0].hour[id].temp_c;
		//temp.innerHTML = "Feels Like "+res.forecast.forecastday[0].hour[id].feelslike_c+"&deg";
		maxTemp.innerHTML = res.forecast.forecastday[0].day.maxtemp_c+"&deg / "+res.forecast.forecastday[0].day.mintemp_c+"&deg Feels Like "+res.forecast.forecastday[0].hour[id].feelslike_c+"&deg";;
		//minTemp.innerHTML = "Min temperature is "+res.forecast.forecastday[0].day.mintemp_c+"&#8451";

		humidity.innerHTML = res.forecast.forecastday[0].hour[id].humidity+"%";
		//hum.innerHTML = "Visiblity is "+res.forecast.forecastday[0].hour[id].vis_km+"km";
		//pressure.innerHTML  = "Pressure is "+res.forecast.forecastday[0].hour[id].pressure_mb+"mb";
		//precipitation.innerHTML = "Precipitation is "+res.forecast.forecastday[0].hour[id].precip_mm+"mm";
	
		wind.innerHTML = res.forecast.forecastday[0].hour[id].wind_kph+"km/h";
		//degree.innerHTML = "Degree of wind is "+res.forecast.forecastday[0].hour[id].wind_degree+"&deg";
		//speed.innerHTML  = "Gust speed is "+res.forecast.forecastday[0].hour[id].gust_kph+"km/h";
		//direction.innerHTML = "Direction of speed is "+res.forecast.forecastday[0].hour[id].wind_dir;

		document.getElementById(id).style.backgroundColor="rgb(243, 243, 243)";
		}
	}

	


	fetchWeather(parameter);
