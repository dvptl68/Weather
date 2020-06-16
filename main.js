//Import required modules
const { app, BrowserWindow } = require('electron');
const { screen } = require('electron');

//Create main window
let window;

const createWindow = () => {

  //Set height and width to be proportionate to user's screen size
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: Math.floor(width * 0.7),
    height: Math.floor(height * 0.8),
    show: false,
    icon: 'app/images/icon.png',
    webPreferences: {
      nodeIntegration: true
    }
  });

  //Load HTML and remove developer menu
  window.loadFile('app/html/index.html');
  window.removeMenu();

  //Show window and focus when app is loaded
  window.on('ready-to-show', () => {
    window.show();
    window.focus();
  });
}

//Prevent links from navigating to external websites
const URL = require('url').URL
app.on('web-contents-created', (event, contents) => contents.on('will-navigate', event => event.preventDefault()));

//Quit program when window is closed unless the OS is Mac
app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit();
  }
});

//Create window when app is laoded
app.on('ready', () => {
  if (BrowserWindow.getAllWindows().length === 0){
    createWindow();
  }
});