<script setup lang="ts">

import {useUserStore} from "@/store/user-store.ts";
import {ref} from "vue";
import {usePlayStore} from "@/store/play-store.ts";

const userStore = useUserStore()

const playStore = usePlayStore()

/**
 * @Description: 头部推荐上下页
 * @Author: sxgan
 * @Date: 2024/4/22 21:14
 **/
const pageIndex = ref(1)
const scrollContentBoxRef = ref<HTMLElement>()

function scrollPage() {
  console.log("previousPage")
  if (pageIndex.value === 1) {
    pageIndex.value = 2
    scrollContentBoxRef.value!.scrollTo({
      top: 0,
      left: scrollContentBoxRef.value!.offsetWidth,
      behavior: 'smooth' // 定义缓动动画
    });
  } else {
    pageIndex.value = 1
    scrollContentBoxRef.value!.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // 定义缓动动画
    });
  }
  
}
</script>

<template>
  <div class="recommend-root-box">
    <h1 class="recommend-title">Hi {{ userStore.userInfo.isLogin ? userStore.userInfo.userName : '' }} 今日为你推荐</h1>
    <div class="recommend-head-box">
      <div class="previous-box control-box" @click="scrollPage()">
        <i class="icon iconfont">&#xe913</i>
      </div>
      <div class="head-content-box ">
        <div class="scroll-content-box scroll-box" ref="scrollContentBoxRef">
          <div class="content-item first-box">
            <div class="left-text-box">
              <h1>晚上好</h1>
              <span>尝试来点音乐提提神吧~</span>
            </div>
            <div class="right-img">
              <img :src="playStore.staticBaseUrl + '/image/list/song-list-zip-0002.jpg'" alt="">
            </div>
            <div class="bottom-text-box">
              <p>遗憾最终 - 何仟仟<br> 猜你喜欢</p>
            </div>
          </div>
          <div class="content-item">
            <img :src="playStore.staticBaseUrl + '/image/list/song-list-zip-0003.jpg'" alt="">
          </div>
          <div class="content-item">
            <img :src="playStore.staticBaseUrl + '/image/list/song-list-zip-0004.jpg'" alt="">
          </div>
          <div class="content-item">
            <img :src="playStore.staticBaseUrl + '/image/list/song-list-zip-0005.jpg'" alt="">
          </div>
          <div class="content-item">
            <img :src="playStore.staticBaseUrl + '/image/list/song-list-zip-0006.jpg'" alt="">
          </div>
          <div class="content-item">
            <img :src="playStore.staticBaseUrl + '/image/list/song-list-zip-0007.jpg'" alt="">
          </div>
          <div class="content-item">
            <img :src="playStore.staticBaseUrl + '/image/list/song-list-zip-0008.jpg'" alt="">
          </div>
        </div>
      
      </div>
      <div class="next-box control-box" @click="scrollPage()">
        <i class="icon iconfont">&#xe914</i>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.recommend-root-box {
  color: var(--text-color);
  padding: 2rem 0;
  font-family: "HarmonyOS Sans", sans-serif;
  
  .recommend-title {
    margin: 0 5rem;
  }
  
  .recommend-head-box {
    position: relative;
    height: 30rem;
    
    .control-box {
      position: fixed;
      height: 26rem;
      width: 3rem;
      margin-top: 1rem;
      text-align: center;
      line-height: 30rem;
      
      i {
        color: var(--text-color-rgba);
        font-size: 3rem;
        display: none;
      }
      
      i:hover {
        color: var(--text-active-color);
      }
    }
    
    .next-box {
      right: 0rem;
    }
    
    .head-content-box {
      position: absolute;
      left: 3rem;
      width: calc(100vw - 26rem);
      height: 30rem;
      
      .scroll-content-box {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        margin-right: 1rem;
        overflow-x: auto;
        -ms-overflow-style: none; /* IE 10+ */
        scrollbar-width: none; /* Firefox */
        .content-item {
          height: 20rem;
          width: 20rem;
          margin: 2rem 2.05rem 0;
          flex-shrink: 0;
          
          img {
            height: 20rem;
            width: 20rem;
            border-radius: 0.8rem;
          }
        }
        
        .first-box {
          display: flex;
          flex-wrap: wrap;
          width: 40rem;
          height: 28rem;
          border-radius: 0.8rem;
          background-color: #A9C9FF;
          background-image: -webkit-linear-gradient(45deg, #A9C9FF 0%, #FFBBEC 33%, #f5b4b6 66%, #ffffff 100%);
          background-image: -moz-linear-gradient(45deg, #A9C9FF 0%, #FFBBEC 33%, #f5b4b6 66%, #ffffff 100%);
          background-image: -o-linear-gradient(45deg, #A9C9FF 0%, #FFBBEC 33%, #f5b4b6 66%, #ffffff 100%);
          background-image: linear-gradient(45deg, #A9C9FF 0%, #FFBBEC 33%, #f5b4b6 66%, #ffffff 100%);
          opacity: 0.9;
          
          .left-text-box {
            width: 12rem;
            height: 8rem;
            padding: 3rem;
            color: var(--text-deep-rgba-7);
            
            h1 {
              font-size: 3rem;
            }
            
            span {
              font-size: 1.8rem;
            }
          }
          
          .right-img {
            width: 16rem;
            height: 16rem;
            margin: 2rem;
            
            img {
              box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.6);
              width: 16rem;
              height: 16rem;
              border-radius: 0.8rem;
            }
          }
          
          .bottom-text-box {
            height: 8rem;
            width: 40rem;
            
            p {
              line-height: 3rem;
              font-size: 1.2rem;
              color: var(--text-color-rgba);
            }
          }
        }
        
        
        .content-item:hover {
          transition: 0.8s;
          transform: translateY(-1.5rem);
        }
      }
      
      .scroll-content-box::-webkit-scrollbar {
        display: none; /* 针对Webkit浏览器隐藏滚动条 */
      }
    }
  }
}

.recommend-head-box:hover {
  .control-box i {
    display: block;
  }
}
</style>