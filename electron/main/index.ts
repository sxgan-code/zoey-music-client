import {app, BrowserWindow, ipcMain, MessageChannelMain, shell} from 'electron'
import {release} from 'node:os'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {initMainWinIpc} from "../ipc/main-ipc";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
    ? join(process.env.DIST_ELECTRON, '../public')
    : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
    app.quit()
    process.exit(0)
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
let justChildWin: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.mjs')
const url = process.env.VITE_DEV_SERVER_URL
const indexHtml = join(process.env.DIST, 'index.html')

// 建立通道
const {port1, port2} = new MessageChannelMain()

async function createWindow() {
    win = new BrowserWindow({
        title: 'Main window',
        width: 1200,
        height: 800,
        minWidth: 1200,
        minHeight: 800,
        frame: false,
        transparent: true, // 窗口是否支持透明，如果想做高级效果最好为true,此项必须设置frame为false，且关闭DevTools，这两项会影响效果
        icon: join(process.env.VITE_PUBLIC, 'logo/logo-music-wangyiyun-red.ico'),
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // nodeIntegration: true,

            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            // contextIsolation: false,
        },
        show: false
    })
    initMainWinIpc(win)
    if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
        win.loadURL(url)
        // Open devTool if the app is not packaged
        win.webContents.openDevTools({mode: 'detach'})
    } else {
        win.loadFile(indexHtml)
        // read more on https://www.gznotes.com/how-to-protect-electron-app-source-code/
        win.webContents.on('devtools-opened', () => {
            win?.webContents.closeDevTools();
        });
    }
    win.once('ready-to-show', () => {
        win?.show()
    })
    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', new Date().toLocaleString())
    })
    // Make all links open with the browser, not with the application
    win.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })
    // win.webContents.on('will-navigate', (event, url) => { }) #344
}

async function createChildWindow(win: BrowserWindow, param: any) {
    justChildWin = new BrowserWindow({
        title: 'child window',
        parent: win,
        icon: join(process.env.VITE_PUBLIC, 'logo/logo-music-wangyiyun-red.ico'),
        width: param.width,
        height: param.height,
        modal: true,
        frame: false,
        maximizable: false,
        webPreferences: {
            preload,
            // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
            // nodeIntegration: true,

            // Consider using contextBridge.exposeInMainWorld
            // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
            // contextIsolation: false,
        },
    })

    if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
        justChildWin.loadURL(url + '#' + param.url)
        // Open devTool if the app is not packaged
        // justChildWin.webContents.openDevTools({mode: 'detach'})
    } else {
        justChildWin.loadFile(indexHtml, {hash: param.url})
        justChildWin.webContents.on('devtools-opened', () => {
            justChildWin?.webContents.closeDevTools();
        });
    }

    // Test actively push message to the Electron-Renderer
    justChildWin.webContents.on('did-finish-load', () => {
        justChildWin?.webContents.send('main-process-message', new Date().toLocaleString())
    })
    // Make all links open with the browser, not with the application
    justChildWin.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })
    // justChildWin.webContents.on('will-navigate', (event, url) => { }) #344
    justChildWin.on('closed', () => {
        // 在窗口对象被关闭时，取消订阅所有与该窗口相关的事件
        justChildWin?.removeAllListeners();
        justChildWin = null
    })
}

// 子窗口控制
ipcMain.on('child-win-controller', (event, data) => {
    if (data == 'max') {
        justChildWin?.maximize()
    } else if (data == 'unmax') {
        justChildWin?.unmaximize()
    } else if (data == 'min') {
        justChildWin?.minimize()
    } else if (data == 'close') {
        justChildWin?.close()
    }
})
// 子窗口需要发送到主窗口的消息
ipcMain.on('child-main-msg', (event, data) => {
    console.log(data)
    win?.webContents.send('user-token', data)
})
// 异步打开窗口
ipcMain.handle("renderer-open-win", (e, param: string) => {
    console.log(param)
    if (win != null && justChildWin === null) {
        console.log('创建子窗口')
        createChildWindow(win, param);
    }
});

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    win = null
    if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
    if (win) {
        // Focus on the main window if the user tried to open another
        if (win.isMinimized()) win.restore()
        win.focus()
    }
})

app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
        allWindows[0].focus()
    } else {
        createWindow()
    }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            preload,
            nodeIntegration: true,
            contextIsolation: true,
        },
    })
    console.log(`${url}#${arg.url}`)
    if (process.env.VITE_DEV_SERVER_URL) {
        childWindow.loadURL(`${url}#${arg.url}`)
    } else {
        childWindow.loadFile(indexHtml, {hash: arg.url})
    }
})