const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const ipcMain = electron.ipcMain;
const entries = require('./entries.json');
const config = require('./config.json');
const fs = require("fs");

require('electron-debug')();

let mainWindow;
let crypterInstance;

function createWindow(){
  mainWindow = new BrowserWindow({ width: config.width, height: config.height });
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile('./app/index.html');
 }
/* Evenements application */
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('addEvent', function(event, datas){
  console.log('addEvent catch');
  applyListe();
});

ipcMain.on('requestList', function(){
  applyListe();
});

ipcMain.on('requestAdd', function(){
  applyAdd();
});

/* Actions menu */

function applyListe(){
  mainWindow.loadFile('./app/index.html');
}

function applyAdd(){
  console.log('applyadd');
  mainWindow.loadFile('./app/add.html');
}

function applyTranslate(){

}

/* Menu application */
const template = [
  {
      label: 'Dico',
      submenu: [
          {
              label: 'Ajouter',
              click: applyAdd,
          },
          {
              label: 'Liste',
              click: applyListe,
          }
      ]
  }
];
console.log('build menu');
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);