//Get welcome container
const welcome = document.getElementById('welcome');
//Get content container
const content = document.getElementById('content');

//Set appropriate heights and positions as the window resizes
const setHeight = () => {
  content.style.minHeight = (window.innerHeight - document.getElementById('header').offsetHeight) + 'px'
  welcome.style.minHeight = window.innerHeight + 'px';
  document.getElementById('title-large').style.marginTop = (Math.floor(window.innerHeight / 3)) + 'px';
  document.getElementById('title-large').style.marginBottom = '20px';
};

//Set intial heights
setHeight();

//Set minimum height of content container when the screen size is changed
window.onresize = setHeight;

//Import places autocomplete module and initialize it to the search bar
const places = require('places.js');
const placesAutocomplete = places({
  //Keys generated from my account
  appId: 'plYQ0K0FOBUF',
  apiKey: '918cd1ea57d30d4ff3e1fb60bff74dfc',
  container: document.getElementById('location')
});

//Get submit button
const submit = document.getElementById('submit');

//Add mouse hover transition
const mouseEnterTransitionSubmit = event => event.target.style.backgroundColor = '#0431CD';
const mouseLeaveTransitionSubmit = event => event.target.style.backgroundColor = '#3663FF';

//Object to store location data
let locationData = {};

//Add event listeners for places selections
placesAutocomplete.on('change', event => {
  //Store the data of the picked location
  locationData = event.suggestion;
  //Change style of button to be enabled
  submit.style.opacity = '100%';
  submit.style.cursor = 'pointer';
  submit.addEventListener('mouseenter', mouseEnterTransitionSubmit);
  submit.addEventListener('mouseleave', mouseLeaveTransitionSubmit);
});

placesAutocomplete.on('clear', () => {
  //Delete all data from the previously picked location
  for (let member in locationData) delete locationData[member];
  //Change style of button to be disabled
  submit.style.opacity = '50%';
  submit.style.cursor = 'default';
  submit.removeEventListener('mouseenter', mouseEnterTransitionSubmit);
  submit.removeEventListener('mouseleave', mouseLeaveTransitionSubmit);
});

//Change screen when the location is selected
submit.addEventListener('click', () => {
  //End event listener if no location is picked
  if (Object.keys(locationData).length === 0){ return; }
  //Hide welcome screen
  welcome.style.display = 'none';
  //Display header and content
  document.getElementById('header').style.display = 'inline-block';
  content.style.display = 'inline-block';
  //Set initial position for content
  content.style.top = document.getElementById('header').offsetHeight + 'px';
  //Set screen heights and get data
  setHeight();
  refresh();
});

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
        event.target.removeEventListener('mouseenter', mouseEnterTransitionSelector);
        event.target.removeEventListener('mouseleave', mouseLeaveTransitionSelector);
      }else{
        //Reset background of all other buttons and add hover event
        selectors.item(j).style.backgroundColor = '#3FC1FD';
        selectors.item(j).style.color = 'black';
        selectors.item(j).style.cursor = 'pointer';
        selectors.item(j).addEventListener('mouseenter', mouseEnterTransitionSelector);
        selectors.item(j).addEventListener('mouseleave', mouseLeaveTransitionSelector);
      }
    }
  });
}

//Add mouse enter color transition
const mouseEnterTransitionSelector = event => {
  event.target.style.backgroundColor = '#3663FF';
  event.target.style.color = 'white';
};

//Add mouse leave color transition
const mouseLeaveTransitionSelector = event => {
  event.target.style.backgroundColor = '#3FC1FD';
  event.target.style.color = 'black';
};

//Object to store weather data
let weatherData;

//Useful constants
const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const windDirections = ['North','North-Northeast','Northeast','East-Northeast','East','East-Southeast','Southeast','South-Southeast','South','South-Southwest','Southwest','West-Southwest','West','West-Northwest','Northwest','North-Northwest','North'];

//Display no data
const noData = () => {

  //Row of content
  const row = document.createElement('DIV');
  row.classList.add('row');
  row.classList.add('no-border-row');

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

  //Column for selected location
  const colLoc = document.createElement('DIV');
  colLoc.classList.add('col-auto');
  //Create paragraph for location
  const loc = document.createElement('P');
  loc.innerHTML = locationData.name;
  loc.classList.add('text-bold');
  colLoc.appendChild(loc);

  //Column for update information
  const colTime = document.createElement('DIV');
  colTime.classList.add('col-auto');
  //Create paragraph for current time
  const disp = document.createElement('P');
  const date = new Date(data.current.dt * 1000);
  //Array for months
  disp.innerHTML = `Last updated ${((date.getHours() % 12) === 0) ? '12' : date.getHours() % 12}:${(date.getMinutes() < 10) ? '0' : ''}${date.getMinutes()}:${(date.getSeconds() < 10) ? '0' : ''}${date.getSeconds()} ${(date.getHours() < 12) ? 'AM' : 'PM'}, ${months[date.getMonth()]} ${date.getDate()}`;
  disp.classList.add('text-bold');
  colTime.appendChild(disp);

  //Separator columns
  const colLeft = document.createElement('DIV');
  colLeft.classList.add('col');
  const colRight = document.createElement('DIV');
  colRight.classList.add('col');
  
  //Append all row elements
  row.appendChild(colLoc);
  row.appendChild(colLeft);
  row.appendChild(colTime);
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

  //Add header row
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
  icon.setAttribute('draggable', 'false');
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
  speed.innerHTML = 'Wind speed: ' + data.current.wind_speed + ' mph';
  speed.classList.add('text');
  colOneRowThree.appendChild(speed);

  //Second column, third row
  const colTwoRowThree = document.createElement('DIV');
  colTwoRowThree.classList.add('col-auto');
  //Create paragraph for wind direction
  const dir = document.createElement('P');
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
  pressure.innerHTML = 'Pressure: ' + data.current.pressure + ' hPa';
  pressure.classList.add('text');
  colOneRowFour.appendChild(pressure);

  //Second column, fourth row
  const colTwoRowFour = document.createElement('DIV');
  colTwoRowFour.classList.add('col-auto');
  //Create paragraph for pressure
  const humidity = document.createElement('P');
  humidity.innerHTML = 'Humidity: ' + data.current.humidity + '%';
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

  //Add header row
  createHeader(data);

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
    info.innerHTML = (parseInt(min.toUTCString().slice(-12, -10)) % 12) + min.toUTCString().slice(-10, -7) + ((parseInt(min.toUTCString().slice(-12, -10)) < 12) ? ' AM -' : ' PM -') + ' Precipitation: ' + Math.floor((element.precipitation * 0.0393701) * 1000)/1000 + ' inches';
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

  //Add header row
  createHeader(data);

  data.hourly.forEach(element => {

    //Main row of content
    const mainRow = document.createElement('DIV');
    mainRow.classList.add('row');

    //Column for current time
    const colTime = document.createElement('DIV');
    colTime.classList.add('col-auto');
    const pTime = document.createElement('P');
    const min = new Date(element.dt * 1000);
    pTime.innerHTML = `${((min.getHours() % 12) === 0) ? '12' : min.getHours() % 12}:${(min.getMinutes() < 10) ? '0' : ''}${min.getMinutes()} ${(min.getHours() < 12) ? 'AM' : 'PM'}, ${months[min.getMonth()]} ${min.getDate()}:`;
    pTime.classList.add('text-small');
    pTime.style.marginTop = '28px';
    colTime.appendChild(pTime);

    //Column for icon
    const colIcon = document.createElement('DIV');
    colIcon.classList.add('col-auto');
    //Create img for icon and fetch icon
    const icon = document.createElement('IMG');
    icon.src = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
    icon.setAttribute('draggable', 'false');
    icon.style.marginLeft = '-30px';
    icon.style.padding = '0px 0px';
    colIcon.appendChild(icon);

    //Column for other data
    const colOther = document.createElement('DIV');
    colOther.classList.add('col');

    //Row for other data
    const rowOther = document.createElement('DIV');
    rowOther.classList.add('row');
    rowOther.classList.add('no-border-row');

    //First column for other data
    const colOne = document.createElement('DIV');
    colOne.classList.add('col-auto');

    //Row for condition
    const rowCond = document.createElement('DIV');
    rowCond.classList.add('row');
    rowCond.classList.add('no-border-row');
    //Create paragraph for condition
    const cond = document.createElement('P');
    cond.innerHTML = element.weather[0].description.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    cond.classList.add('text-extra-small');
    rowCond.appendChild(cond);

    //Row for cloudiness
    const rowClouds = document.createElement('DIV');
    rowClouds.classList.add('row');
    rowClouds.classList.add('no-border-row');
    //Create paragraph for clouds
    const cloud = document.createElement('P');
    cloud.innerHTML = 'Clouds: ' + element.clouds + '%';
    cloud.classList.add('text-extra-small');
    rowClouds.appendChild(cloud);

    //Append all column one data
    colOne.appendChild(rowCond);
    colOne.appendChild(rowClouds);

    //Second column for other data
    const colTwo = document.createElement('DIV');
    colTwo.classList.add('col-auto');

    //Row for temperature
    const rowTemp = document.createElement('DIV');
    rowTemp.classList.add('row');
    rowTemp.classList.add('no-border-row');
    //Create paragraph for temperature
    const temp = document.createElement('P');
    temp.innerHTML = 'Temperature: ' + element.temp + '°F';
    temp.classList.add('text-extra-small');
    rowTemp.appendChild(temp);

    //Row for feels like temparature
    const rowFeels = document.createElement('DIV');
    rowFeels.classList.add('row');
    rowFeels.classList.add('no-border-row');
    //Create paragraph for feels like temperature
    const feel = document.createElement('P');
    feel.innerHTML = 'Feels like: ' + element.feels_like + '°F';
    feel.classList.add('text-extra-small');
    rowFeels.appendChild(feel);

    //Append all column two data
    colTwo.appendChild(rowTemp);
    colTwo.appendChild(rowFeels);

    //Third column for other data
    const colThree = document.createElement('DIV');
    colThree.classList.add('col-auto');

    //Row for wind speed
    const rowWind = document.createElement('DIV');
    rowWind.classList.add('row');
    rowWind.classList.add('no-border-row');
    //Create paragraph for wind speed
    const speed = document.createElement('P');
    speed.innerHTML = 'Wind speed: ' + element.wind_speed + ' mph';
    speed.classList.add('text-extra-small');
    rowWind.appendChild(speed);

    //Row for humidity
    const rowHumidity = document.createElement('DIV');
    rowHumidity.classList.add('row');
    rowHumidity.classList.add('no-border-row');
    //Create paragraph for pressure
    const humidity = document.createElement('P');
    humidity.innerHTML = 'Humidity: ' + element.humidity + '%';
    humidity.classList.add('text-extra-small');
    rowHumidity.appendChild(humidity);

    //Append all column three data
    colThree.appendChild(rowWind);
    colThree.appendChild(rowHumidity);

    //Separator columns for other data
    const colLeft = document.createElement('DIV');
    colLeft.classList.add('col');
    const colMid = document.createElement('DIV');
    colMid.classList.add('col');
    const colRight = document.createElement('DIV');
    colRight.classList.add('col');

    //Append all other row data
    rowOther.appendChild(colOne);
    rowOther.appendChild(colLeft);
    rowOther.appendChild(colTwo);
    rowOther.appendChild(colMid);
    rowOther.appendChild(colThree);
    rowOther.appendChild(colRight);

    //Append all other column data
    colOther.appendChild(rowOther);

    //Append all main row elements
    mainRow.appendChild(colTime);
    mainRow.appendChild(colIcon);
    mainRow.appendChild(colOther);

    //Append row to container
    content.appendChild(mainRow);
  });

};

//Process and output daily weather data
const processDaily = data => {

  //Display to user if needed data is unavailable
  if (data.daily === undefined){
    noData();
    return;
  }

  //Add header row
  createHeader(data);

  data.daily.forEach(element => {

    //Main row of content
    const mainRow = document.createElement('DIV');
    mainRow.classList.add('row');

    //Column for current day
    const colTime = document.createElement('DIV');
    colTime.classList.add('col-auto');
    const pTime = document.createElement('P');
    const min = new Date(element.dt * 1000);
    pTime.innerHTML = `${days[min.getDay()]}, ${months[min.getMonth()]} ${min.getDate()}: `;
    pTime.classList.add('text-small');
    pTime.style.marginTop = '70px';
    colTime.appendChild(pTime);

    //Column for icon
    const colIcon = document.createElement('DIV');
    colIcon.classList.add('col-auto');
    //Create img for icon and fetch icon
    const icon = document.createElement('IMG');
    icon.src = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
    icon.setAttribute('draggable', 'false');
    icon.style.marginLeft = '-30px';
    icon.style.marginTop = '45px';
    icon.style.padding = '0px 0px';
    colIcon.appendChild(icon);

    //Column for other data
    const colOther = document.createElement('DIV');
    colOther.classList.add('col');

    //Row for other data
    const rowOther = document.createElement('DIV');
    rowOther.classList.add('row');
    rowOther.classList.add('no-border-row');

    //First column for other data
    const colOne = document.createElement('DIV');
    colOne.classList.add('col-auto');

    //Row for condition
    const rowCond = document.createElement('DIV');
    rowCond.classList.add('row');
    rowCond.classList.add('no-border-row');
    //Create paragraph for condition
    const cond = document.createElement('P');
    cond.innerHTML = element.weather[0].description.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    cond.classList.add('text-extra-small');
    rowCond.appendChild(cond);

    //Row for cloudiness
    const rowClouds = document.createElement('DIV');
    rowClouds.classList.add('row');
    rowClouds.classList.add('no-border-row');
    //Create paragraph for clouds
    const cloud = document.createElement('P');
    cloud.innerHTML = 'Clouds: ' + element.clouds + '%';
    cloud.classList.add('text-extra-small');
    rowClouds.appendChild(cloud);

    //Row for sunrise
    const rowRise = document.createElement('DIV');
    rowRise.classList.add('row');
    rowRise.classList.add('no-border-row');
    //Create paragraph for sunrise
    const rise = document.createElement('P');
    const dateOne = new Date((element.sunrise + data.timezone_offset) * 1000);
    const timeOne = dateOne.toUTCString().slice(-12, -4)
    rise.innerHTML = 'Sunrise: ' + ((timeOne.charAt(0) === '0') ? timeOne.substr(1) : timeOne) + ' AM';
    rise.classList.add('text-extra-small');
    rowRise.appendChild(rise);

    //Row for sunset
    const rowSet = document.createElement('DIV');
    rowSet.classList.add('row');
    rowSet.classList.add('no-border-row');
    //Create paragraph for sunrise
    const set = document.createElement('P');
    const dateTwo = new Date((element.sunset + data.timezone_offset) * 1000);
    const timeTwo = dateTwo.toUTCString().slice(-12, -4)
    set.innerHTML = 'Sunset: ' + (parseInt(dateTwo.toUTCString().slice(-12, -10)) % 12) + dateTwo.toUTCString().slice(-10, -4) + ' PM';
    set.classList.add('text-extra-small');
    rowSet.appendChild(set);

    //Append all column one data
    colOne.appendChild(rowCond);
    colOne.appendChild(rowClouds);
    colOne.appendChild(rowRise);
    colOne.appendChild(rowSet);

    //Second column for other data
    const colTwo = document.createElement('DIV');
    colTwo.classList.add('col-auto');

    //Row for daily temperature
    const rowTemp = document.createElement('DIV');
    rowTemp.classList.add('row');
    rowTemp.classList.add('no-border-row');
    //Create paragraph for daily temperature
    const temp = document.createElement('P');
    temp.innerHTML = 'High: ' + element.temp.max + '°F, Low: ' + element.temp.min + '°F';
    temp.classList.add('text-extra-small');
    rowTemp.appendChild(temp);

    //Row for feels like day temparature
    const rowFeelsDay = document.createElement('DIV');
    rowFeelsDay.classList.add('row');
    rowFeelsDay.classList.add('no-border-row');
    //Create paragraph for feels like day temperature
    const feelDay = document.createElement('P');
    feelDay.innerHTML = 'Feels like (day): ' + element.feels_like.day + '°F';
    feelDay.classList.add('text-extra-small');
    rowFeelsDay.appendChild(feelDay);

    //Row for feels like night temparature
    const rowFeelsNight = document.createElement('DIV');
    rowFeelsNight.classList.add('row');
    rowFeelsNight.classList.add('no-border-row');
    //Create paragraph for feels like day temperature
    const feelNight = document.createElement('P');
    feelNight.innerHTML = 'Feels like (night): ' + element.feels_like.night + '°F';
    feelNight.classList.add('text-extra-small');
    rowFeelsNight.appendChild(feelNight);

    //Row for wind speed
    const rowWind = document.createElement('DIV');
    rowWind.classList.add('row');
    rowWind.classList.add('no-border-row');
    //Create paragraph for wind speed
    const speed = document.createElement('P');
    speed.innerHTML = 'Wind speed: ' + element.wind_speed + ' mph';
    speed.classList.add('text-extra-small');
    rowWind.appendChild(speed);

    //Append all column two data
    colTwo.appendChild(rowTemp);
    colTwo.appendChild(rowFeelsDay);
    colTwo.appendChild(rowFeelsNight);
    colTwo.appendChild(rowWind);

    //Third column for other data
    const colThree = document.createElement('DIV');
    colThree.classList.add('col-auto');

    //Row for humidity
    const rowHumidity = document.createElement('DIV');
    rowHumidity.classList.add('row');
    rowHumidity.classList.add('no-border-row');
    //Create paragraph for pressure
    const humidity = document.createElement('P');
    humidity.innerHTML = 'Humidity: ' + element.humidity + '%';
    humidity.classList.add('text-extra-small');
    rowHumidity.appendChild(humidity);

    //Row for pressure
    const rowPressure = document.createElement('DIV');
    rowPressure.classList.add('row');
    rowPressure.classList.add('no-border-row');
    //Create paragraph for pressure
    const pressure = document.createElement('P');
    pressure.innerHTML = 'Pressure: ' + element.pressure + ' hPa';
    pressure.classList.add('text-extra-small');
    rowPressure.appendChild(pressure);

    //Row for visibility
    const rowUV = document.createElement('DIV');
    rowUV.classList.add('row');
    rowUV.classList.add('no-border-row');
    //Create paragraph for visibility
    const uv = document.createElement('P');
    uv.innerHTML = 'UV Index: ' + element.uvi;
    uv.classList.add('text-extra-small');
    rowUV.appendChild(uv);

    //Row for dew point
    const rowDew = document.createElement('DIV');
    rowDew.classList.add('row');
    rowDew.classList.add('no-border-row');
    //Create paragraph for visibility
    const dew = document.createElement('P');
    dew.innerHTML = 'Dew Point: ' + element.dew_point + '°F';
    dew.classList.add('text-extra-small');
    rowDew.appendChild(dew);

    //Append all column three data
    colThree.appendChild(rowHumidity);
    colThree.appendChild(rowPressure);
    colThree.appendChild(rowUV);
    colThree.appendChild(rowDew);

    //Separator columns for other data
    const colLeft = document.createElement('DIV');
    colLeft.classList.add('col');
    const colMid = document.createElement('DIV');
    colMid.classList.add('col');
    const colRight = document.createElement('DIV');
    colRight.classList.add('col');

    //Append all other row data
    rowOther.appendChild(colOne);
    rowOther.appendChild(colLeft);
    rowOther.appendChild(colTwo);
    rowOther.appendChild(colMid);
    rowOther.appendChild(colThree);
    rowOther.appendChild(colRight);

    //Append all other column data
    colOther.appendChild(rowOther);

    //Append all main row elements
    mainRow.appendChild(colTime);
    mainRow.appendChild(colIcon);
    mainRow.appendChild(colOther);

    //Append row to container
    content.appendChild(mainRow);
  });

};

//Method to enable/disable buttons while data is loading
const enableButtons = enable => {
  if (!enable){
    for (let i = 0; i < selectors.length; i++){
      selectors.item(i).disabled = true;
      selectors.item(i).style.opacity = '50%';
      selectors.item(i).style.cursor = 'default';
    }
    document.getElementById('city').disabled = true;
    document.getElementById('city').style.opacity = '50%';
    document.getElementById('city').style.cursor = 'default';
  }else{
    for (let i = 0; i < selectors.length; i++){
      selectors.item(i).disabled = false;
      selectors.item(i).style.opacity = '100%';
      selectors.item(i).style.cursor = 'pointer';
    }
    document.getElementById('city').disabled = false;
    document.getElementById('city').style.opacity = '100%';
    document.getElementById('city').style.cursor = 'pointer';
  }
}

//Async function that returns a promise with the acquired JSON data
const getData = async url => {
  //Disable buttons
  enableButtons(false);
  //Return the data or log the error
  try {
    return await (await fetch(url)).json();
  }catch (error){
    displayText(error);
  }
};

const displayText = (text = "Fetching Data...") => {

  //Row of content
  const row = document.createElement('DIV');
  row.classList.add('row');
  row.classList.add('no-border-row');

  //Column for information
  const col = document.createElement('DIV');
  col.classList.add('col-auto');
  //Create paragraph for label
  const load = document.createElement('P');
  load.innerHTML = text;
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

//API key from my account for accessing weather data
const apiKey = 'f8abd2b386c863b278970549d4f4f4f1';

//Fetch all weather data
const refresh = () => {
  //Clear all current content
  content.innerHTML = '';
  //Display loading label
  displayText();
  //Fetch data and call appropriate method to display data
  getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.latlng.lat}&lon=${locationData.latlng.lng}&units=imperial&appid=${apiKey}`).then(res => {
    //Clear loading label
    content.innerHTML = '';
    //Stop program  and display message if there is one with the JSON response
    if (res.message !== undefined){
      displayText(res.message);
      return;
    }
    //Enable buttons
    enableButtons(true);
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

//Add event listeners to update weather screen
for (let i = 0; i < selectors.length; i++){
  //Listen for any of the buttons being clicked
  selectors.item(i).addEventListener('click', event => {
    //Clear content and call appropriate method to fill content
    content.innerHTML = '';
    selected = event.target.id;
    //Scroll back to top of page
    window.scrollTo(0, 0);
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