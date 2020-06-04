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

//Get content container
const content = document.getElementById('content');

//Process and output the current weather data
const processCurrent = data => {

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
  //Create paragraph for sunrise
  const rise = document.createElement('P');
  rise.innerHTML = 'Sunrise: ' + data.current.sunrise;
  rise.classList.add('text');
  colOneRowThree.appendChild(rise);

  //Second column, third row
  const colTwoRowThree = document.createElement('DIV');
  colTwoRowThree.classList.add('col-auto');
  //Create paragraph for sunrise
  const set = document.createElement('P');
  set.innerHTML = 'Sunset: ' + data.current.sunset;
  set.classList.add('text');
  colTwoRowThree.appendChild(set);

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

  //Append all rows to content container
  content.appendChild(rowOne);
  content.appendChild(rowTwo);
  content.appendChild(rowThree);
};

const processMinute = data => {

};

const processHourly = data => {

};

const processDaily = data => {

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

//Fetch all weather data
const refresh = () => {
  getData(`https://api.openweathermap.org/data/2.5/onecall?lat=40.095613&lon=-82.800351&units=imperial&exclude=hourly,daily&appid=${apiKey}`).then(res => {
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
}

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