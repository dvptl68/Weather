const { app, BrowserWindow, webContents } = require('electron');
const { screen } = require('electron');

let window;

function createWindow(){

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  window = new BrowserWindow({
    width: Math.floor(width * 0.8),
    height: Math.floor(height * 0.9),
    icon: 'app/images/icon.png',
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile('app/html/index.html');
  // window.removeMenu();

  window.on('ready-to-show', function(){
    window.show();
    window.focus();
  });
}

app.on('windows-all-closed', function(){
  if (process.platform !== 'darwin'){
    app.quit();
  }
});

app.on('ready', function(){
  if (BrowserWindow.getAllWindows().length === 0){
    createWindow();
  }
});