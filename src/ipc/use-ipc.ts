import {ref, Ref} from "vue";

export default function useIPC() {
    const fromMainMsg: Ref<string> = ref<string>('默认消息')
    const maxOrUnMaxStart = ref<boolean>(true)

    /* 向主进程发送窗口控制消息，共有四种类型：min | max | unmax | close */
    const sendWinController = (controllerStr: string) => {
        console.log(localStorage.getItem('token'))
        let sendController = controllerStr
        if (controllerStr === 'max-unmax' && maxOrUnMaxStart.value) {
            sendController = 'max'
            maxOrUnMaxStart.value = false
        } else if (controllerStr === 'max-unmax') {
            sendController = 'unmax'
            maxOrUnMaxStart.value = true
        }
        window.ipcRenderer.send('win-controller', sendController)
    }
    /* 向主进程发送窗口控制消息，共有四种类型：min | max | unmax | close */
    const sendChildWinController = (controllerStr: string) => {
        window.ipcRenderer.send('child-win-controller', controllerStr)
    }
    /* 向子窗口发送到主窗口消息，token*/
    const sendChildMsgToMain = (msg: any) => {
        window.ipcRenderer.send('child-main-msg', msg)
    }
    return {
        fromMainMsg,
        sendWinController,
        sendChildWinController,
        sendChildMsgToMain
    };
}