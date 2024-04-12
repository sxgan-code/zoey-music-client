<script setup lang="ts">
import useIPC from "@/ipc/use-ipc.ts";
import {useUserStore} from "@/store/user-store.ts";
import {onBeforeMount} from "vue";
import msg, {PositionTypeEnum} from "@/components/message";
import {getUserInfo} from "@/api/auth";

const userStore = useUserStore();
const {sendWinController} = useIPC()
let sa = userStore.maxOrUnMaxStart ? '最大化' : '最小化'
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
/* 换肤 */
const changeSkins = () => {
  document.documentElement.style.setProperty('--text-color', 'rgb(246, 190, 200)');
  document.documentElement.style.setProperty('--text-color-rgba', 'rgba(246, 190, 200,0.7)');
  document.documentElement.style.setProperty('--text-active-color', 'rgb(232, 211, 252)');
}
/* 自动登录配置参数 */
const autoLogin = () => {
  /* 每次启动判断是否登录 */
  msg.warning('正在登录中。。。。', PositionTypeEnum.TOP, 2, () => {
    getUserInfo().then(res => {
      if (res.status === 200) {
        userStore.setUserInfo(res.data, true)
        msg.success('登录成功')
      } else {
        msg.warning('账户登录已过期，请重新登录。。。', PositionTypeEnum.TOP, 2, () => {
          openChildWin('/login')
        })
      }
    }).catch(err => {
      msg.error('服务器端异常，请稍后再试', PositionTypeEnum.TOP, 2, () => {
      })
    });
  })
}

/*每次启动调用*/
onBeforeMount(() => {
  /* 先自动登录 */
  autoLogin()
  /* 手动登录触发 */
  window.ipcRenderer.on('user-token', (_event, args) => {
    localStorage.setItem("token", args)
    getUserInfo().then(res => {
      if (res.status === 200) {
        userStore.setUserInfo(res.data, true)
        msg.success('登录成功')
      }
    })
  })

})
</script>

<template>
  <div class="head-container">
    <div class="head-logo">
      <i class="icon myiconfont my-music-qqmusic-logo"><span class="path1"></span><span class="path2"></span><span
          class="path3"></span></i>
    </div>
    <div class="head-person">

    </div>
    <div class="head-sys-click">
      <div class="head-user-avatar">
        <img @click="openChildWin('/login')"
             v-tooltip="{text:'请登录'}"
             v-if="!userStore.userInfo.isLogin"
             src="@/assets/images/not_login.png">
        <img v-if="userStore.userInfo.isLogin"
             src="@/assets/images/avatar.png">
      </div>
      <div v-if="userStore.userInfo.isLogin" class="head-user-name">{{ userStore.userInfo.name }}</div>
      <div class="head-icon-box">
        <span class="icon-box-btn icon-box-user">
          <i class="icon iconfont"
             @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"
             v-tooltip="{text:'用户信息'}">&#xe705</i>
        </span>
        <span class="icon-box-btn icon-btn-skins">
          <i class="icon iconfont"
             @click="changeSkins()"
             v-tooltip="{text:'换肤'}">&#xe78d</i>
        </span>
        <span class="icon-box-btn icon-btn-options">
          <i class="icon iconfont"
             @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"
             v-tooltip="{text:'主菜单'}">&#xebcf</i>
        </span>
        <span class="icon-box-btn icon-btn-simple">
          <i class="icon iconfont"
             @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"
             v-tooltip="{text:'开启精简模式'}">&#xea58</i>
        </span>
        <span class="icon-box-min" @click="sendWinController('min')">
          <i class="icon iconfont" v-tooltip="{text:'最小化'}">&#xe972</i>
        </span>
        <span class="icon-box-max" @click="sendWinController('max-unmax')">
          <i class="icon iconfont" v-if="userStore.maxOrUnMaxStart" v-tooltip="{text:'最大化'}">&#xe751</i>
          <i class="icon iconfont" v-if="!userStore.maxOrUnMaxStart" v-tooltip="{text:'最小化'}">&#xeb21</i>
        </span>
        <span class="icon-box-close" @click="sendWinController('close')">
          <i class="icon iconfont" v-tooltip="{text:'关闭'}">&#xe68d</i>
        </span>
      </div>

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
    text-align: center;

    i {
      line-height: 8rem;
      font-size: 5rem;
    }
  }

  .head-person {
    width: 5rem;
  }

  .head-sys-click {
    height: 8rem;
    display: flex;

    .head-user-avatar {
      display: flex;
      width: 4rem;
      height: 4rem;
      margin: 1.2rem;

      img {
        -webkit-app-region: no-drag;
        background: var(--el-color-white);
        border-radius: 1.8rem;
        width: 3.6rem;
        height: 3.6rem;
      }

    }

    .head-user-name {
      -webkit-app-region: no-drag;
      line-height: 6rem;
      font-size: 1.4rem;
      font-family: "HarmonyOS Sans", "sans-serif";
      color: var(--text-color);
    }

    .head-icon-box {
      .icon-btn-simple {
        margin-right: 2rem;
      }

      span i {
        margin: 0 1rem;
        -webkit-app-region: no-drag; // li点击元素去除拖拽，不然后面无法实现点击事件
        color: var(--text-color);
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

      .icon-box-close {
        margin-right: 1rem;
      }
    }
  }

  div:hover {
    i:hover {
      color: var(--text-active-color);
    }
  }
}

</style>