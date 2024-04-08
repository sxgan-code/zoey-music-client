<script setup lang="ts">
import useIPC from "@/ipc/use-ipc.ts";

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
</script>

<template>
  <div class="head-container">
    <div class="head-logo">
      <i class="icon myiconfont my-music-qqmusic-logo"><span class="path1"></span><span class="path2"></span><span
          class="path3"></span></i>
    </div>
    <div class="head-person">
      <button class="login-btn" type="button" @click="openChildWin('/login')">请登录</button>
    </div>
    <div class="head-sys-click">
      <span class="icon-box-min" @click="sendWinController('min')"><i class="icon iconfont">&#xe972</i></span>
      <span class="icon-box-min" @click="sendWinController('min')"><i class="icon iconfont">&#xe972</i></span>
      <span class="icon-box-min" @click="sendWinController('min')"><i class="icon iconfont">&#xe972</i></span>
      <span class="icon-box-min" @click="sendWinController('min')"><i class="icon iconfont">&#xe972</i></span>
      <span class="icon-box-min" @click="sendWinController('min')"><i class="icon iconfont">&#xe972</i></span>
      <span class="icon-box-max" @click="sendWinController('max-unmax')"><i class="icon iconfont">&#xe751</i></span>
      <span class="icon-box-close" @click="sendWinController('close')"><i class="icon iconfont">&#xe68d</i></span>
    </div>
  </div>

</template>

<style scoped lang="scss">
.head-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .head-logo {
    width: 25rem;
    border: 0.1rem solid red;
    text-align: center;

    i {
      line-height: 8rem;
      font-size: 5rem;
      //margin: 0 3rem;
    }
  }

  .head-person {
    border: 0.1rem solid red;

    .login-btn {
      -webkit-app-region: no-drag; // 点击元素去除拖拽，不然后面无法实现点击事件
    }
  }

  .head-sys-click {
    border: 0.1rem solid red;
    //width: 13rem;
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

</style>