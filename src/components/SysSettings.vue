<script setup lang="ts">
import {ref} from "vue";
import msg, {PositionTypeEnum} from "@/components/message";
import {useUserStore} from "@/store/user-store.ts";
import {updateUserInfoApi} from "@/api/auth";
import {SysUserVO} from "@/api/auth/types";
import {isEmpty} from "@/utils/common-utils.ts";

const index = ref(1)

/**
 * @Description: 更改菜单样式
 * @Author: sxgan
 * @Date: 2024/4/14 23:49
 **/
/*点击更改列表标题文字样式*/
function changeStyle(val: number) {
  if (val !== 1) {
    msg.warning('开发中。。。', PositionTypeEnum.TOP)
  }
  index.value = val;
}

/**
 * @Description: 账户信息
 * @Author: sxgan
 * @Date: 2024/4/15 11:18
 **/
const userStore = useUserStore()
const userInfo = ref<SysUserVO>({
  email: userStore.getUserInfo.email,
  userName: userStore.getUserInfo.userName,
  personalSign: userStore.getUserInfo.personalSign,
})
const updateUserInfo = () => {
  let userName = userInfo.value.userName
  if (isEmpty(userName)) {
    msg.warning('用户名不能为空', PositionTypeEnum.TOP)
    return
  } else if (userName != undefined && userName.length > 10) {
    msg.warning('用户名不得超过10个字符', PositionTypeEnum.TOP)
    return
  }
  updateUserInfoApi(userInfo.value).then(res => {
    if (res.status === 200) {
      msg.success(res.message, PositionTypeEnum.TOP, 2, () => {
        userStore.setUserInfo(userInfo.value, true)
      })
      console.log(userStore.getUserInfo)
    }
  }).catch(err => {
  
  })
}
</script>

<template>
  <div class="setting-root-boot">
    <h1>设置</h1>
    <div class="setting-menu">
      <span :class="index==1?'sel-title-span':''" @click="changeStyle(1)">账户信息</span>
      <span :class="index==2?'sel-title-span':''" @click="changeStyle(2)">下载与缓存</span>
      <span :class="index==3?'sel-title-span':''" @click="changeStyle(3)">快捷键</span>
    </div>
    <div class="setting-content">
      <div class="setting-box">
        <div class="title">
          <h2>账户信息</h2>
          <button class="operation" @click="updateUserInfo()">保存修改</button>
        </div>
        
        <hr>
        <div class="setting-account">
          <span>用户名</span>
          <input type="text" v-model="userInfo.userName">
        
        </div>
        <div class="setting-account">
          <span>个性签名</span>
          <textarea class="personal-sign" rows="5" cols="100" maxlength="200"
                    v-model="userInfo.personalSign"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.setting-root-boot {
  height: calc(100vh - 16rem);
  overflow: hidden;
  
  h1 {
    font-size: 2.5rem;
    margin: 3.5rem 2rem;
    color: var(--text-color);
  }
  
  .setting-menu {
    height: 6rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    
    span {
      display: inline-block;
      width: 8rem;
      color: var(--text-color);
      text-align: center;
      font-size: 1.4rem;
      line-height: 3rem;
      margin: 0 1.5rem;
    }
    
    span:hover {
      color: var(--text-active-color);
    }
    
    .sel-title-span {
      color: var(--text-active-color);
    }
    
    .sel-title-span::after {
      display: block;
      content: '';
      width: 2.5rem;
      margin: 0 auto;
      border-bottom: 3px solid var(--text-active-color);
    }
  }
  
  .setting-content {
    overflow-y: auto;
    width: 100%;
    margin: 0 2rem;
    height: calc(100vh - 32.5rem);
    
    .setting-box {
      .title {
        display: flex;
        justify-content: space-between;
        width: 90%;
        
        h2 {
          font-size: 1.6rem;
          font-family: "HarmonyOS Sans", sans-serif;
          color: var(--text-color);
        }
        
        button {
          background: var(--bg-light-rgba-1);
          color: var(--text-color);
          border-radius: 0.3rem;
          border: none;
          padding: 0.5rem;
        }
        
        button:hover {
          color: var(--text-active-color);
        }
      }
      
      hr {
        margin: 2rem 0;
        width: 90%;
        height: 0.2rem;
        border: none;
        border-radius: 0.1rem;
        background: var(--bg-light-rgba-1);
      }
    }
    
    .setting-box .setting-account {
      display: flex;
      //height: 6rem;
      margin: 3rem 0;
      width: 90%;
      
      span {
        line-height: 3rem;
        font-size: 1.3rem;
        width: 16rem;
        color: var(--text-color-rgba);
      }
      
      input {
        background: none;
        height: 2rem;
        width: 30rem;
        color: var(--text-color);
        border: solid 0.15rem var(--bg-light-rgba-2);
        padding: 0.5rem;
      }
      
      .operation-box {
        width: 40rem;
        text-align: right;
      }
      
      .personal-sign {
        color: var(--text-color);
        background: none;
        border: solid 0.15rem var(--bg-light-rgba-2);
        padding: 0.5rem;
        resize: none;
        font-family: "HarmonyOS Sans", sans-serif;
      }
    }
  }
}

</style>