const { app, BrowserWindow, webContents } = require('electron');
const { screen } = require('electron');

let window;

const createWindow = () => {

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

  window.loadFile('app/html/index.html');
  window.removeMenu();

  window.on('ready-to-show', () => {
    window.show();
    window.focus();
  });
}

app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit();
  }
});

app.on('ready', () => {
  if (BrowserWindow.getAllWindows().length === 0){
    createWindow();
  }
});