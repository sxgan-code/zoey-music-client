/* 监听主线程消息 */
window.ipcRenderer.on('main-process-message', (_event, ...args) => {
    console.log('[Receive Main-process message]:', ...args)
})
window.ipcRenderer.on('user-token', (_event, args) => {
    localStorage.setItem("token", args)
})
