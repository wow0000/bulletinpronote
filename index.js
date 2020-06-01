const {app, BrowserWindow} = require('electron')

function createWindow() {
	// Cree la fenetre du navigateur.
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		title: "Bulletins Pronote",
		webPreferences: {
			nodeIntegration: true
		}
	})

	win.loadFile('src/index.html')
	//win.removeMenu();
}

app.whenReady().then(createWindow)

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

