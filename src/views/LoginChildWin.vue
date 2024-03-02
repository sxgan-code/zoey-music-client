<script setup lang="ts">
import useIpc from '@/ipc/use-ipc.ts'
import {ref} from "vue";

const {sendChildWinController} = useIpc();

function sendMsgByChildWin() {
  window.ipcRenderer.invoke('child-win-controller', '哈哈哈哈哈哈哈')
}

const isLogin = ref(true)

function selectCurr(curr: string) {
  if (curr === 'login') {
    isLogin.value = true
  } else {
    isLogin.value = false
  }
}
</script>

<template>
  <div class="login-root-box">
    <div class="head-controller-close">
      <span class="icon-box-close" @click="sendChildWinController('close')"><i class="icon iconfont">&#xe68d</i></span>
    </div>
    <div class="select-win-box">
      <div :class="isLogin?'login-box bg-color':'login-box'" @click="selectCurr('login')">登录账号</div>
      <div :class="isLogin?'reg-box':'reg-box bg-color'" @click="selectCurr('reg')">注册账号</div>
    </div>
    <div v-if="isLogin" class="content-box login-content">
      <div class="box-title">
        <h4>账号登录</h4>
      </div>
      <div class="box-form">
        <form>
          <div>
            <input class="input-box" type="text" name="" id="" placeholder="请输入邮箱">
          </div>
          <div>
            <input class="input-box" type="password" name="" id="" placeholder="请输入密码">
          </div>
          <button class="but-box but-submit">登录</button>
        </form>
      </div>
    </div>
    <div v-if="!isLogin" class="content-box reg-content">
      <div class="box-title">
        <h4>账号注册</h4>
      </div>
      <div class="box-form">
        <form>
          <div>
            <input class="input-box" type="text" name="" id="" placeholder="请输入邮箱">
          </div>
          <div>
            <input class="input-box" type="password" name="" id="" placeholder="请输入密码">
          </div>
          <div>
            <input class="input-box" type="password" name="" id="" placeholder="请再次输入确认密码">
          </div>
          <div class="verify-box">
            <input class="input-box input-verify" type="password" name="" id="" placeholder="请输入密码">
            <button class="but-box but-verify">发送验证码</button>
          </div>
          <button class="but-box but-submit">注册</button>
        </form>
      </div>
    </div>
  </div>
  <!--<h1>这是子窗口</h1>-->
  <!--  <button type="button" @click="sendMsgByChildWin()">发送消息</button>-->
</template>

<style scoped lang="scss">
.login-root-box {
  width: 100vw;
  height: 100vh;

  .head-controller-close {
    height: 5rem;
    width: 100vw;
    background: #333;
    text-align: right;
    line-height: 5rem;
    -webkit-app-region: drag; // 整个菜单栏可拖拽
    span {
      margin-right: 2rem;
    }

    span i {
      font-size: 2rem;
      -webkit-app-region: no-drag; // 整个菜单栏可拖拽
      color: #fff;
    }

    span i:hover {
      color: #CC9C84;
    }
  }

  .select-win-box {
    width: 70vw;
    height: 4rem;
    background: #F4F4F4;
    margin: 2rem auto 4rem;
    border-radius: 2.5rem;
    border: 0.2rem solid #F4F4F4;
    display: flex;

    div {
      color: #696969;
      width: 35vw;
      height: 4rem;
      text-align: center;
      line-height: 4rem;
      font-size: 1.8rem;
      font-family: "HarmonyOS Sans Bold";
      border-radius: 2.5rem;
    }

    .bg-color {
      background: #ffffff;
      color: #000;
    }
  }

  .content-box {
    width: 80vw;
    height: 50vh;
    margin: 0 auto;
    text-align: center;

    .box-title h4 {
      font-size: 2.2rem;
      margin-bottom: 2rem;
      font-weight: inherit;
      font-family: "HarmonyOS Sans";
    }
    .box-form{
      width: 80vw;
      height: 30vh;
      .input-box{
        width: 30rem;
        height: 3.5rem;
        margin: 0.5rem;
        font-size: 1.4rem;
        font-family: "JetBrainsMono Bold";
        border: 0.1rem solid #cccccc;
        border-radius: 0.5rem;
        padding-left: 1.5rem;
        color: #333;
      }
      input::-webkit-input-placeholder{
        /* placeholder颜色 */
        color:#cccccc;
        /* placeholder字体大小 */
        font-size:12px
      }
      .but-box{
        width: 32rem;
        height: 3.5rem;
        background: #0099FF;
        border: none;
        border-radius: 0.5rem;
        color: #fff;
        font-family: "HarmonyOS Sans Bold";
      }
      .input-verify{
        width: 12rem;
      }
      .but-verify{
        width: 14rem;
        margin-right: 4rem;
      }
      .but-submit{
        margin: 2rem 0;
      }
    }
  }
}
</style>