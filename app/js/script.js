//Get content container
const content = document.getElementById('content');

//Set minimum height for content container
const setHeight = () => content.style.minHeight = (window.innerHeight - document.getElementById('header').offsetHeight) + 'px';

//Set minimum height of content container initially
setHeight();

//Set minimum height of content container when the screen size is changed
window.onresize = setHeight;

//Set initial position for content container
content.style.top = document.getElementById('header').offsetHeight + 'px';

//Get all selector buttons
const selectors = document.getElementsByClassName('selector');
let selected = 'cur';

//Make first selector button the selected one
selectors.item(0).style.backgroundColor = '#3663FF';
selectors.item(0).style.color = 'white';
selectors.item(0).style.cursor = 'default';

//Change color of clicked selector
for (let i = 0; i < selectors.length; i++){
  //Listen for any of the buttons being clicked
  selectors.item(i).addEventListener('click', event => {
    //Set the currently selected button
    selected = event.target.id;
    for (let j = 0; j <selectors.length; j++){
      if (event.target.isSameNode(selectors.item(j))){
        //Change background of clicked button and remove hover event
        event.target.style.backgroundColor = '#3663FF';
        event.target.style.color = 'white';
        event.target.style.cursor = 'default';
        event.target.removeEventListener('mouseenter', addEnterTransition);
        event.target.removeEventListener('mouseleave', addLeaveTransition);
      }else{
        //Reset background of all other buttons and add hover event
        selectors.item(j).style.backgroundColor = '#3FC1FD';
        selectors.item(j).style.color = 'black';
        selectors.item(j).style.cursor = 'pointer';
        selectors.item(j).addEventListener('mouseenter', addEnterTransition);
        selectors.item(j).addEventListener('mouseleave', addLeaveTransition);
      }
    }
  });
}

//Add mouse enter color transition
const addEnterTransition = event => {
  event.target.style.backgroundColor = '#3663FF';
  event.target.style.color = 'white';
};

//Add mouse leave color transition
const addLeaveTransition = event => {
  event.target.style.backgroundColor = '#3FC1FD';
  event.target.style.color = 'black';
};

//Object to store data
let weatherData;

//Display no data
const noData = () => {

  //Row of content
  const row = document.createElement('DIV');
  row.classList.add('row');
  row.id = 'header-row';

  //Column for information
  const col = document.createElement('DIV');
  col.classList.add('col-auto');
  //Create paragraph for label
  const disp = document.createElement('P');
  disp.innerHTML = 'No data available.';
  disp.classList.add('text');
  disp.style.marginTop = (Math.floor(content.clientHeight / 2.5)) + 'px';
  col.appendChild(disp);

  //Separator columns
  const colLeft = document.createElement('DIV');
  colLeft.classList.add('col');
  const colRight = document.createElement('DIV');
  colRight.classList.add('col');
  
  //Append all row elements
  row.appendChild(colLeft);
  row.appendChild(col);
  row.appendChild(colRight);

  //Append row to content container
  content.appendChild(row);
};

const createHeader = data => {

  //Row of content
  const row = document.createElement('DIV');
  row.classList.add('row');

  //Column for information
  const col = document.createElement('DIV');
  col.classList.add('col-auto');
  //Create paragraph for current time
  const disp = document.createElement('P');
  const date = new Date(data.current.dt * 1000);
  //Arrays for days of week and months
  const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  disp.innerHTML = `Last updated: ${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}, ${date.getHours() % 12}:${date.getMinutes()}:${date.getSeconds()} ${(date.getHours() < 12) ? 'AM' : 'PM'}`;
  // disp.innerHTML = date.toUTCString();
  disp.classList.add('text');
  col.appendChild(disp);

  //Separator columns
  const colLeft = document.createElement('DIV');
  colLeft.classList.add('col');
  const colRight = document.createElement('DIV');
  colRight.classList.add('col');
  
  //Append all row elements
  row.appendChild(colLeft);
  row.appendChild(col);
  row.appendChild(colRight);

  //Append row to content container
  content.appendChild(row);
};

//Process and output current weather data
const processCurrent = data => {

  //Display to user if needed data is unavailable
  if (data.current === undefined){
    noData();
    return;
  }

  createHeader(data);

  //First row of content
  const rowOne = document.createElement('DIV');
  rowOne.classList.add('row');

  //First column, first row
  const colOneRowOne = document.createElement('DIV');
  colOneRowOne.classList.add('col-auto');
  //Create img for icon and fetch icon
  const icon = document.createElement('IMG');
  icon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
  colOneRowOne.appendChild(icon);

  //Second column, first row
  const colTwoRowOne = document.createElement('DIV');
  colTwoRowOne.classList.add('col-auto');
  //Create paragraph for condition
  const cond = document.createElement('P');
  cond.innerHTML = data.current.weather[0].description.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  cond.classList.add('text');
  colTwoRowOne.appendChild(cond);
  
  //Third column, first row
  const colThreeRowOne = document.createElement('DIV');
  colThreeRowOne.classList.add('col-auto');
  //Create paragraph for clouds
  const cloud = document.createElement('P');
  cloud.innerHTML = 'Cloudiness: ' + data.current.clouds + '%';
  cloud.classList.add('text');
  colThreeRowOne.appendChild(cloud);

  //Separator columns for first row
  const colLeftRowOne = document.createElement('DIV');
  colLeftRowOne.classList.add('col');
  const colMidRowOne = document.createElement('DIV');
  colMidRowOne.classList.add('col');
  const colRightRowOne = document.createElement('DIV');
  colRightRowOne.classList.add('col');

  //Append all first row elements
  rowOne.appendChild(colLeftRowOne);
  rowOne.appendChild(colOneRowOne);
  rowOne.appendChild(colTwoRowOne);
  rowOne.appendChild(colMidRowOne);
  rowOne.appendChild(colThreeRowOne);
  rowOne.appendChild(colRightRowOne);

  //Second row of content
  const rowTwo = document.createElement('DIV');
  rowTwo.classList.add('row');

  //First column, second row
  const colOneRowTwo = document.createElement('DIV');
  colOneRowTwo.classList.add('col-auto');
  //Create paragraph for temperature
  const temp = document.createElement('P');
  temp.innerHTML = 'Temperature: ' + data.current.temp + '°F';
  temp.classList.add('text');
  colOneRowTwo.appendChild(temp);

  //Second column, second row
  const colTwoRowTwo = document.createElement('DIV');
  colTwoRowTwo.classList.add('col-auto');
  //Create paragraph for feels like temperature
  const feel = document.createElement('P');
  feel.innerHTML = 'Feels like: ' + data.current.feels_like + '°F';
  feel.classList.add('text');
  colTwoRowTwo.appendChild(feel);

  //Third column, second row
  const colThreeRowTwo = document.createElement('DIV');
  colThreeRowTwo.classList.add('col-auto');
  //Create paragraph for dew point
  const dew = document.createElement('P');
  dew.innerHTML = 'Dew point: ' + data.current.dew_point + '°F';
  dew.classList.add('text');
  colThreeRowTwo.appendChild(dew);

  //Separator columns for second row
  const colLeftRowTwo = document.createElement('DIV');
  colLeftRowTwo.classList.add('col');
  const colMid1RowTwo = document.createElement('DIV');
  colMid1RowTwo.classList.add('col');
  const colMid2RowTwo = document.createElement('DIV');
  colMid2RowTwo.classList.add('col');
  const colRightRowTwo = document.createElement('DIV');
  colRightRowTwo.classList.add('col');

  //Append all second row elements
  rowTwo.appendChild(colLeftRowTwo);
  rowTwo.appendChild(colOneRowTwo);
  rowTwo.appendChild(colMid1RowTwo);
  rowTwo.appendChild(colTwoRowTwo);
  rowTwo.appendChild(colMid2RowTwo);
  rowTwo.appendChild(colThreeRowTwo);
  rowTwo.appendChild(colRightRowTwo);

  //Third row of content
  const rowThree = document.createElement('DIV');
  rowThree.classList.add('row');

  //First column, third row
  const colOneRowThree = document.createElement('DIV');
  colOneRowThree.classList.add('col-auto');
  //Create paragraph for wind speed
  const speed = document.createElement('P');
  speed.innerHTML = 'Wind speed: ' + data.current.wind_speed + " mph";
  speed.classList.add('text');
  colOneRowThree.appendChild(speed);

  //Second column, third row
  const colTwoRowThree = document.createElement('DIV');
  colTwoRowThree.classList.add('col-auto');
  //Create paragraph for wind direction
  const dir = document.createElement('P');
  //Array to store wind direction values
  const windDirections = ['North','North-Northeast','Northeast','East-Northeast','East','East-Southeast','Southeast','South-Southeast','South','South-Southwest','Southwest','West-Southwest','West','West-Northwest','Northwest','North-Northwest','North'];
  dir.innerHTML = 'Wind direction: ' + windDirections[Math.floor(data.current.wind_deg/22.5)];
  dir.classList.add('text');
  colTwoRowThree.appendChild(dir);

  //Separator columns for third row
  const colLeftRowThree = document.createElement('DIV');
  colLeftRowThree.classList.add('col');
  const colMidRowThree = document.createElement('DIV');
  colMidRowThree.classList.add('col');
  const colRightRowThree = document.createElement('DIV');
  colRightRowThree.classList.add('col');

  //Append all third row elements
  rowThree.appendChild(colLeftRowThree);
  rowThree.appendChild(colOneRowThree);
  rowThree.appendChild(colMidRowThree);
  rowThree.appendChild(colTwoRowThree);
  rowThree.appendChild(colRightRowThree);

  //Fourth row of content
  const rowFour = document.createElement('DIV');
  rowFour.classList.add('row');

  //First column, fourth row
  const colOneRowFour = document.createElement('DIV');
  colOneRowFour.classList.add('col-auto');
  //Create paragraph for pressure
  const pressure = document.createElement('P');
  pressure.innerHTML = 'Pressure: ' + data.current.pressure + " hPa";
  pressure.classList.add('text');
  colOneRowFour.appendChild(pressure);

  //Second column, fourth row
  const colTwoRowFour = document.createElement('DIV');
  colTwoRowFour.classList.add('col-auto');
  //Create paragraph for pressure
  const humidity = document.createElement('P');
  humidity.innerHTML = 'Humidity: ' + data.current.humidity + "%";
  humidity.classList.add('text');
  colTwoRowFour.appendChild(humidity);

  //Separator columns for fourth row
  const colLeftRowFour = document.createElement('DIV');
  colLeftRowFour.classList.add('col');
  const colMidRowFour = document.createElement('DIV');
  colMidRowFour.classList.add('col');
  const colRightRowFour = document.createElement('DIV');
  colRightRowFour.classList.add('col');

  //Append all fourth row elements
  rowFour.appendChild(colLeftRowFour);
  rowFour.appendChild(colOneRowFour);
  rowFour.appendChild(colMidRowFour);
  rowFour.appendChild(colTwoRowFour);
  rowFour.appendChild(colRightRowFour);

  //Fifth row of content
  const rowFive = document.createElement('DIV');
  rowFive.classList.add('row');

  //First column, fifth row
  const colOneRowFive = document.createElement('DIV');
  colOneRowFive.classList.add('col-auto');
  //Create paragraph for UV index
  const uv = document.createElement('P');
  uv.innerHTML = 'UV Index: ' + data.current.uvi;
  uv.classList.add('text');
  colOneRowFive.appendChild(uv);

  //Second column, fifth row
  const colTwoRowFive = document.createElement('DIV');
  colTwoRowFive.classList.add('col-auto');
  //Create paragraph for visibility
  const visibility = document.createElement('P');
  visibility.innerHTML = 'Visibility: ' + Math.floor(data.current.visibility * 3.28084) + ' ft';
  visibility.classList.add('text');
  colTwoRowFive.appendChild(visibility);

  //Separator columns for fifth row
  const colLeftRowFive = document.createElement('DIV');
  colLeftRowFive.classList.add('col');
  const colMidRowFive = document.createElement('DIV');
  colMidRowFive.classList.add('col');
  const colRightRowFive = document.createElement('DIV');
  colRightRowFive.classList.add('col');

  //Append all fifth row elements
  rowFive.appendChild(colLeftRowFive);
  rowFive.appendChild(colOneRowFive);
  rowFive.appendChild(colMidRowFive);
  rowFive.appendChild(colTwoRowFive);
  rowFive.appendChild(colRightRowFive);

  //Sixth row of content
  const rowSix = document.createElement('DIV');
  rowSix.classList.add('row');

  //First column, sixth row
  const colOneRowSix = document.createElement('DIV');
  colOneRowSix.classList.add('col-auto');
  //Create paragraph for sunrise
  const zone = document.createElement('P');
  zone.innerHTML = 'Timezone: ' + data.timezone.replace(/_/g, ' ').substr(data.timezone.indexOf('/') + 1);
  zone.classList.add('text');
  colOneRowSix.appendChild(zone);

  //Second column, sixth row
  const colTwoRowSix = document.createElement('DIV');
  colTwoRowSix.classList.add('col-auto');
  //Create paragraph for sunrise
  const rise = document.createElement('P');
  const dateOne = new Date((data.current.sunrise + data.timezone_offset) * 1000);
  const timeOne = dateOne.toUTCString().slice(-12, -4)
  rise.innerHTML = 'Sunrise: ' + ((timeOne.charAt(0) === '0') ? timeOne.substr(1) : timeOne) + ' AM';
  rise.classList.add('text');
  colTwoRowSix.appendChild(rise);

  //Third column, sixth row
  const colThreeRowSix = document.createElement('DIV');
  colThreeRowSix.classList.add('col-auto');
  //Create paragraph for set
  const set = document.createElement('P');
  const dateTwo = new Date((data.current.sunset + data.timezone_offset) * 1000);
  set.innerHTML = 'Sunset: ' + (parseInt(dateTwo.toUTCString().slice(-12, -10)) % 12) + dateTwo.toUTCString().slice(-10, -4) + ' PM';
  set.classList.add('text');
  colThreeRowSix.appendChild(set);

  //Separator columns for sixth row
  const colLeftRowSix = document.createElement('DIV');
  colLeftRowSix.classList.add('col');
  const colMid1RowSix = document.createElement('DIV');
  colMid1RowSix.classList.add('col');
  const colMid2RowSix = document.createElement('DIV');
  colMid2RowSix.classList.add('col');
  const colRightRowSix = document.createElement('DIV');
  colRightRowSix.classList.add('col');

  //Append all sixth row elements
  rowSix.appendChild(colLeftRowSix);
  rowSix.appendChild(colOneRowSix);
  rowSix.appendChild(colMid1RowSix);
  rowSix.appendChild(colTwoRowSix);
  rowSix.appendChild(colMid2RowSix);
  rowSix.appendChild(colThreeRowSix);
  rowSix.appendChild(colRightRowSix);

  //Append all rows to content container
  content.appendChild(rowOne);
  content.appendChild(rowTwo);
  content.appendChild(rowThree);
  content.appendChild(rowFour);
  content.appendChild(rowFive);
  content.appendChild(rowSix);
};

//Process and output minutely weather data
const processMinute = data => {

  //Display to user if needed data is unavailable
  if (data.minutely === undefined){
    noData();
    return;
  }

  //Iterate through all minute forecasts
  data.minutely.forEach(element => {

    //Row of content
    const row = document.createElement('DIV');
    row.classList.add('row');

    //Column for information
    const col = document.createElement('DIV');
    col.classList.add('col-auto');
    //Create paragraph for time
    const info = document.createElement('P');
    //Get time of forecast and precipitation amount
    const min = new Date((element.dt + data.timezone_offset) * 1000);
    info.innerHTML = (parseInt(min.toUTCString().slice(-12, -10)) % 12) + min.toUTCString().slice(-10, -7) + ((parseInt(min.toUTCString().slice(-12, -10)) < 12) ? " AM -" : " PM -") + " Precipitation: " + (element.precipitation * 0.0393701) + " inches";
    info.classList.add('text-small');
    col.appendChild(info);

    //Separator columns
    const colLeft = document.createElement('DIV');
    colLeft.classList.add('col');
    const colRight = document.createElement('DIV');
    colRight.classList.add('col');
    
    //Append all row elements
    row.appendChild(colLeft);
    row.appendChild(col);
    row.appendChild(colRight);

    //Append row to content container
    content.appendChild(row);
  });
};

//Process and output hourly weather data
const processHourly = data => {

  //Display to user if needed data is unavailable
  if (data.hourly === undefined){
    noData();
    return;
  }
};

//Process and output daily weather data
const processDaily = data => {

  //Display to user if needed data is unavailable
  if (data.daily === undefined){
    noData();
    return;
  }
};

//Async function that returns a promise with the acquired JSON data
const getData = async url => {
  //Return the data or log the error
  try {
    return await (await fetch(url)).json();
  }catch (error){
    console.log(error);
  }
};

//API key from my account for accessing weather data
const apiKey = 'f8abd2b386c863b278970549d4f4f4f1';

const displayLoading = () => {

  //Row of content
  const row = document.createElement('DIV');
  row.classList.add('row');
  row.id = 'header-row';

  //Column for information
  const col = document.createElement('DIV');
  col.classList.add('col-auto');
  //Create paragraph for label
  const load = document.createElement('P');
  load.innerHTML = 'Fetching Data...';
  load.classList.add('text');
  load.style.marginTop = (Math.floor(content.clientHeight / 2.5)) + 'px';
  col.appendChild(load);

  //Separator columns
  const colLeft = document.createElement('DIV');
  colLeft.classList.add('col');
  const colRight = document.createElement('DIV');
  colRight.classList.add('col');
  
  //Append all row elements
  row.appendChild(colLeft);
  row.appendChild(col);
  row.appendChild(colRight);

  //Append row to content container
  content.appendChild(row);
}

//Fetch all weather data
const refresh = () => {
  //Clear all current content
  content.innerHTML = '';
  //Display loading label
  displayLoading();
  //Fetch data and call appropriate method to display data
  getData(`https://api.openweathermap.org/data/2.5/onecall?lat=40.095613&lon=-82.800351&units=imperial&exclude=hourly,daily&appid=${apiKey}`).then(res => {
    //Clear loading label
    content.innerHTML = '';
    //Call appropriate method to fill content
    weatherData = res;
    if (selected === 'cur'){
      processCurrent(weatherData);
    }else if (selected === 'min'){
      processMinute(weatherData);
    }else if (selected === 'hour'){
      processHourly(weatherData);
    }else{
      processDaily(weatherData);
    }
  });
};

refresh();

//Add event listeners to update weather screen
for (let i = 0; i < selectors.length; i++){
  //Listen for any of the buttons being clicked
  selectors.item(i).addEventListener('click', event => {
    //Clear content and call appropriate method to fill content
    content.innerHTML = '';
    selected = event.target.id;
    if (selected === 'cur'){
      processCurrent(weatherData);
    }else if (selected === 'min'){
      processMinute(weatherData);
    }else if (selected === 'hour'){
      processHourly(weatherData);
    }else{
      processDaily(weatherData);
    }
  });
}

//Add event listener for refresh button
document.getElementById('refresh').addEventListener('click', refresh);