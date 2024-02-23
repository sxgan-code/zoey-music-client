/// <reference types="vite/client" />
declare module "*.vue" {
    import {DefineComponent} from "vue"
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}
