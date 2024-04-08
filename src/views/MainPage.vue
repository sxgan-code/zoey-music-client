<script setup lang="ts">
import useIPC from "@/ipc/use-ipc.ts";
import {useUserStore} from "@/store/user-store.ts";
import MainLeftMenu from "@/components/MainLeftMenu.vue";
import MainRightContent from "@/components/MainRightContent.vue";

const {sendWinController} = useIPC()
/* 打开一个子窗口*/
const openChildWin = (path: string) => {
  let data = {
    width: 600,
    height: 520,
    url: path
  }
  console.log(path)
  window.ipcRenderer.invoke('renderer-open-win', data);
}

var userStore = useUserStore();
</script>

<template>
  <div class="main-box-root">
    <backgroud-mask/>
    <div class="globe-mask" v-if="userStore.isMask">
      <div class="globe-rotating-element icon-box">
        <i class="icon myiconfont my-spinner9 "><span
            class="path1"></span><span class="path2"></span><span class="path3"></span></i>
      </div>
    </div>
    <div class="head-box">
      <div class="head-logo">
        <i class="icon myiconfont my-music-qqmusic-logo"><span class="path1"></span><span class="path2"></span><span
            class="path3"></span></i>
      </div>
      <div class="head-person">
        <button class="login-btn" type="button" @click="openChildWin('/login')">请登录</button>
      </div>
      <div class="head-sys-click">
        <span class="icon-box-min" @click="sendWinController('min')"><i class="icon iconfont">&#xe972</i></span>
        <span class="icon-box-max" @click="sendWinController('max-unmax')"><i class="icon iconfont">&#xe751</i></span>
        <span class="icon-box-close" @click="sendWinController('close')"><i class="icon iconfont">&#xe68d</i></span>
      </div>
    </div>
    <div class="content-box">
      <div class="left-menu">
        <main-left-menu/>
      </div>
      <div class="right-box">
        <main-right-content/>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.main-box-root {
  width: 100vw;
  height: 100vh;

  .head-box {
    height: 8rem;
    width: 100vw;
    -webkit-app-region: drag; // 整个菜单栏可拖拽
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .head-logo {
      width: 25rem;
      //border: 0.1rem solid red;
      text-align: center;

      i {
        line-height: 8rem;
        font-size: 5rem;
        //margin: 0 3rem;
      }
    }

    .head-person {
      .login-btn {
        -webkit-app-region: no-drag; // 点击元素去除拖拽，不然后面无法实现点击事件
      }
    }

    .head-sys-click {
      width: 13rem;
      height: 8rem;

      span i {
        margin: 0 1rem;
        -webkit-app-region: no-drag; // li点击元素去除拖拽，不然后面无法实现点击事件
        color: #fff;
        font-size: 1.8rem;
        line-height: 6rem;
      }

      .icon-box-min, .icon-box-max {
        margin-top: 0.15rem;
      }

      .icon-box-max i {
        font-weight: bold;
        font-size: 1.9rem;
      }

      .icon-box-close i {
        font-weight: bold;
        font-size: 2.2rem;
      }

    }

    div:hover {
      i:hover {
        color: #8ec5fc;
      }
    }
  }

  .content-box {
    width: 100vw;
    height: calc(100vh - 8rem);
    display: flex;

    .left-menu {
      width: 24rem;
      height: 100%;
      overflow-y: auto;
    }

    .right-box {
      width: calc(100vw - 24rem);
      height: 100%;
      background: rgba(#000, 0.27);
    }
  }
}

</style>