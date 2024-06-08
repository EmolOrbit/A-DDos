const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { exec } = require('child_process');
const os = require('os');
const path = require('path');

// Function to install required modules
function installModules() {
    console.log("Installing required modules...");
    const command = (process.platform === 'win32') ? 'npm install' : 'npm install --save-dev';
    const installProcess = exec(command, { cwd: __dirname });

    installProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    installProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    installProcess.on('close', (code) => {
        if (code === 0) {
            console.log("Required modules installed successfully.");
            createWindow();
        } else {
            console.error("Failed to install required modules.");
            dialog.showErrorBox('Error', 'Failed to install required modules. Please check your internet connection and try again.');
        }
    });
}

// Function to check if required modules are installed
function checkModules() {
    try {
        require('electron');
        require('child_process');
        require('os');
        require('path');
        createWindow();
    } catch (error) {
        installModules();
    }
}

// Function to start DDoS attack
function startDDoSAttack(url) {
    // Dummy code for simulating DDoS attack
    console.log(`Attacking ${url}...`);

    // Dummy code to hide user's IP strongly
    console.log("Hiding IP strongly...");

    // Dummy code to show random IPs
    setInterval(() => {
        const randomIP = generateRandomIP();
        console.log(`Sending request to ${url} from IP: ${randomIP}`);
    }, 100);
}

// Function to generate random IP address
function generateRandomIP() {
    const ipParts = [];
    for (let i = 0; i < 4; i++) {
        ipParts.push(Math.floor(Math.random() * 256));
    }
    return ipParts.join('.');
}

// Function to create GUI window
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 400,
        height: 200,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('index.html');

    ipcMain.on('start-attack', (event, url) => {
        startDDoSAttack(url);
    });
}

// Event listener for app ready
app.whenReady().then(checkModules);
