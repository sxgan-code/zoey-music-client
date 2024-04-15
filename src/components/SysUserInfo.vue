<script setup lang="ts">

import {useUserStore} from "@/store/user-store.ts";
import router from "@/router";

const userStore = useUserStore()
</script>

<template>
  <div class="user-root-box">
    <div class="user-info-top">
      <div class="user-avatar">
        <img src="@/assets/images/avatar.png" alt=" ">
      </div>
      <div class="user-info">
        <div class="user-name">
          <span class="name">{{ userStore.userInfo.userName }}</span>
          <i class="icon myiconfont my-music-logo-3 text"><span class="path1"></span><span class="path2"></span><span
              class="path3"></span></i>
          <span class="active-year text">Lv{{ 1 }}年</span>
        </div>
        <div class="account-info">
          <div class="email">邮箱: {{ userStore.userInfo.email }}</div>
          <div class="concern">关注: {{ 10 }}</div>
          <div class="fans">粉丝: {{ 10 }}</div>
        </div>
        <div class="personal-signature">
          <div>个性签名: {{ userStore.userInfo.personalSign }}
          </div>
        </div>
      </div>
      <div class="user-update" @click="router.push('/main/settings')">
        <i class="icon huaweiicon icon-ic_public_edit"></i>
        <div>编辑</div>
      </div>
    </div>
    <div class="user-info-bottom">
    
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-info-top {
  width: 100%;
  height: 26rem;
  display: flex;
  
  .user-avatar {
    width: 20rem;
    height: 20rem;
    padding: 2.5rem;
    
    img {
      width: 20rem;
      height: 20rem;
      border-radius: 10rem;
    }
  }
  
  .user-info {
    height: 25rem;
    
    .user-name {
      width: 40rem;
      height: 10rem;
      line-height: 10rem;
      font-family: "HarmonyOS Sans", sans-serif;
      font-size: 3rem;
      display: flex;
      color: var(--text-color);
      
      .name {
        margin: 0 1rem;
      }
      
      i {
        line-height: 10rem;
        font-size: 2rem;
      }
      
      .active-year {
        line-height: 10rem;
        font-size: 1rem;
        font-family: "JetBrains Mono", sans-serif;
        font-weight: bold;
        
      }
      
      .text {
        background-image: -webkit-linear-gradient(left, #1ECD95,
            rgb(102, 255, 255) 0%,
            rgb(125, 195, 222) 20%,
            rgb(225, 216, 17) 40%,
            rgb(225, 175, 102) 60%,
            rgb(125, 195, 222) 80%,
            rgb(102, 255, 255) 100%);
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-background-size: 200% 100%;
        -webkit-animation: masked-animation 4s linear infinite;
        background-clip: text;
        background-size: 200% 100%;
        animation: masked-animation 4s linear infinite;
      }
      
      @keyframes masked-animation {
        0% {
          background-position: 0 0;
        }
        50% {
          background-position: -100% 0;
        }
        100% {
          background-position: 0 0;
        }
      }
    }
    
    .account-info {
      display: flex;
      
      div {
        margin: 0 1rem;
        font-family: "HarmonyOS Sans", sans-serif;
        font-weight: bold;
        color: var(--text-color-rgba);
        font-size: 1.2rem;
      }
    }
    
    .personal-signature {
      width: 60rem;
      height: 10rem;
      overflow: hidden;
      padding: 2rem 0;
      line-height: 2.4rem;
      margin: 0 1rem;
      font-family: "HarmonyOS Sans", sans-serif;
      font-weight: bold;
      color: var(--text-color-rgba);
      font-size: 1.2rem;
    }
  }
  
  .user-update {
    display: flex;
    color: var(--text-color);
    height: 3rem;
    line-height: 3rem;
    margin: 4rem 1rem;
    padding: 0 1rem;
    border-radius: 0.3rem;
    font-size: 1.3rem;
    text-align: center;
    
    i {
      font-size: 1.4rem;
      margin-right: 0.6rem;
    }
  }
  
  .user-update:hover {
    color: var(--text-active-color);
    background: var(--text-deep-rgba-2);
  }
}
</style>