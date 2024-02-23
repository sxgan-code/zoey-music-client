import {ref, Ref} from "vue";

export default function useIPC() {
    const fromMainMsg: Ref<string> = ref<string>('默认消息')
    const maxOrUnMaxStart = ref<boolean>(true)

    /* 向主进程发送窗口控制消息，共有四种类型：min | max | unmax | close */
    const sendWinController = (controllerStr: string) => {
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
    return {
        fromMainMsg,
        sendWinController,
    };
}