const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const pkg = require('./package.json')

let win

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})
  win.setIcon(path.join(__dirname, "./build/icon.png"));
 
  if(pkg.DEV){
    win.loadURL('http://localhost:3000/')
  }else{
    win.loadURL(url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  }

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {

  if (win === null) {
    createWindow()
  }
})
