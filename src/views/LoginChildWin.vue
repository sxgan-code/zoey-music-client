<script setup lang="ts">
import useIpc from '@/ipc/use-ipc.ts'
import {ref} from "vue";
import {verifyCheckStr, VerifyTypeEnum} from "@/utils/verify-utils.ts";
// 登录注册相关逻辑
import {getCaptchaApi, loginApi} from "@/api/auth/index"
import {LoginData} from "@/api/auth/types.ts";

const {sendChildWinController} = useIpc();

function sendMsgByChildWin() {
  window.ipcRenderer.invoke('child-win-controller', '哈哈哈哈哈哈哈')
}

const isLogin = ref(true)
const errMsg = ref('')

function selectCurr(curr: boolean) {
  registerData.value = {
    email: 'sxgan@foxmail.com',
    password: '99999999',
    rePassword: '',
    verifyCode: ''
  }
  errMsg.value = ''
  isLogin.value = curr

}

// 表单校验
const registerData = ref<LoginData>({
  email: '',
  password: '',
  rePassword: '',
  verifyCode: ''
})

function verifyFormData() {
  console.log('regData' + registerData.value.email)
  console.log(VerifyTypeEnum.EMAIL)
  if (!verifyCheckStr(registerData.value.email, VerifyTypeEnum.EMAIL)) {
    errMsg.value = '邮箱格式错误'
    return false
  } else {
    errMsg.value = ''
    return true
  }
}


// 获取form表单引用
const verifyCode = ref(null)

// 当点击登录按钮时的函数

const signinSys = () => {
  if (verifyFormData()) {
    // 表单所有元素验证通过，可以提交了
    // loading.value = true
    console.log("登录==============")
    loginApi(registerData.value).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)

    })
  }
}
const verMsg = ref<string>('发送验证码')
const isDisabled = ref<boolean>(false)
let verifyClass = ref<string>('but-box but-verify')
const sendVerify = async () => {
  if (verifyFormData()) {
    // 设置倒计时
    isDisabled.value = true
    verifyClass.value = 'but-box but-verify but-box-click'
    // 生成一个时间
    let time = 60;
    // 生成一个自动计时的函数
    let t = setInterval(() => {
      // time 自减
      if (time > 0) {
        // 先减少，在做其他的事情，不然，等待一秒，加上网络延迟，效果不好
        --time;
        verMsg.value = `${time}秒后再获取`;
      } else {
        // 清除函数
        clearInterval(t);
        isDisabled.value = false
        verifyClass.value = 'but-box but-verify'
        verMsg.value = '获取验证码';
      }
    }, 1000)

    // 发送请求
    getCaptchaApi(registerData.value).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  } else {
    console.log('formError表单填写有误，请核对！')
    return false
  }

}

const signupSys = async () => {
  if (verifyFormData()) {
    console.log('注册');
    // 表单所有元素验证通过，可以提交了
    // loading.value = true
    // signup(registerData.value).then(res => {
    //   console.log(res)
    //   // loading.value = false
    // }).catch(err => {
    //   console.log(err)
    // })
  } else {
  }

}

</script>

<template>
  <div class="login-root-box">
    <div class="head-controller-close">
      <span class="icon-box-close" @click="sendChildWinController('close')">
        <i class="icon iconfont">&#xe68d</i>
      </span>
    </div>
    <div class="select-win-box">
      <div :class="isLogin?'login-box bg-color':'login-box'" @click="selectCurr(true)">登录账号</div>
      <div :class="isLogin?'reg-box':'reg-box bg-color'" @click="selectCurr(false)">注册账号</div>
    </div>
    <div v-if="isLogin" class="content-box login-content">
      <div class="box-title">
        <h4>账号登录</h4>
      </div>
      <div class="box-form">
        <div>
          <input class="input-box" type="text" @input="verifyFormData()" name="" v-model="registerData.email" id=""
                 placeholder="请输入邮箱">
        </div>
        <div>
          <input class="input-box" type="password" name="" id="" v-model="registerData.password" data="passworedtype"
                 placeholder="请输入密码">
        </div>
        <div class="error-tip"><span>{{ errMsg }}</span></div>
        <button class="but-box but-submit" @click="signinSys()">登录</button>
      </div>
    </div>
    <div v-if="!isLogin" class="content-box reg-content">
      <div class="box-title">
        <h4>账号注册</h4>
      </div>
      <div class="box-form">
        <div>
          <input class="input-box" type="text" @input="verifyFormData()" name="" v-model="registerData.email" id=""
                 placeholder="请输入邮箱">
        </div>
        <div>
          <input class="input-box" type="password" name="" id="" v-model="registerData.password"
                 placeholder="请输入密码">
        </div>
        <div>
          <input class="input-box" type="password" name="" id="" v-model="registerData.rePassword"
                 placeholder="请再次输入确认密码">
        </div>
        <div class="verify-box">
          <input class="input-box input-verify" type="password" name="" id="" v-model="registerData.verifyCode"
                 placeholder="请输入验证码">
          <input :disabled="isDisabled" type="button" :class="verifyClass" @click="sendVerify" :value="verMsg"/>
        </div>
        <div class="error-tip"><span>{{ errMsg }}</span></div>
        <input type="button" class="but-box but-submit" value="注册"/>
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
    margin: 2rem auto 3rem;
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

    .box-form {
      width: 80vw;
      height: 30vh;

      .input-box {
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

      input::-webkit-input-placeholder {
        /* placeholder颜色 */
        color: #cccccc;
        /* placeholder字体大小 */
        font-size: 12px
      }

      .but-box {
        width: 32rem;
        height: 3.5rem;
        background: #0099FF;
        border: none;
        border-radius: 0.5rem;
        color: #fff;
        font-family: "HarmonyOS Sans Bold";
      }

      .but-box-click {
        background: rgba(#0099FF, 0.7);
      }

      .but-box:hover {
        background: rgba(#0099FF, 0.7);
      }

      .input-verify {
        width: 12rem;
      }

      .but-verify {
        width: 14rem;
        margin-right: 4rem;
      }

      .but-submit {
        //margin: 2rem 0;
      }

      .error-tip {
        height: 3rem;
        width: 31.5rem;
        line-height: 3rem;
        font-family: "HarmonyOS Sans Bold";
        font-size: 1.2rem;
        color: red;
        text-align: left;
        margin: 0 auto;
      }
    }
  }
}
</style>