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

//API key from my account for accessing weather data
const apiKey = 'f8abd2b386c863b278970549d4f4f4f1';

//Function that returns a promise with the acquired JSON data
const getData = async url => {
  //Return the data or log the error
  try {
    return await (await fetch(url)).json();
  }catch (error){
    console.log(error);
  }
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
  cond.innerHTML = data.current.weather[0].main;
  cond.classList.add('text');
  colTwoRowOne.appendChild(cond);
  
  //Third column, first row
  const colThreeRowOne = document.createElement('DIV');
  colThreeRowOne.classList.add('col-auto');
  //Create paragraph for clouds
  const cloud = document.createElement('P');
  cloud.innerHTML = 'Cloudiness: ' + data.current.clouds;
  cloud.classList.add('text');
  colThreeRowOne.appendChild(cloud);

  //Append all elements
  rowOne.appendChild(colOneRowOne);
  rowOne.appendChild(colTwoRowOne);
  rowOne.appendChild(colThreeRowOne);

  content.appendChild(rowOne);
};

const processMinute = data => {

};

const processHourly = data => {

};

const processDaily = data => {

};

//Fetch all weather data
const refresh = () => {
  getData(`https://api.openweathermap.org/data/2.5/onecall?lat=34.49&lon=-89.01&units=imperial&exclude=hourly,daily&appid=${apiKey}`).then(res => {
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