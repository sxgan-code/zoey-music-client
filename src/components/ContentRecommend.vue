<script setup lang="ts">

import {useUserStore} from "@/store/user-store.ts";
import {onBeforeMount, ref} from "vue";
import {usePlayStore} from "@/store/play-store.ts";
import {getPrivateRecommendListApi, getTodayRecommendApi} from "@/api/online";
import {RecommendType} from "@/api/online/type.ts";
import {MusicListType, MusicSongType} from "@/api/list/type.ts";
import router from "@/router";

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

const getTimeScopeStr = () => {
  var hours = new Date().getHours();
  if (hours >= 6 && hours < 12) {
    return '早上好'
  } else if (hours >= 12 && hours < 18) {
    return '下午好'
  } else {
    return '晚上好'
  }
}

function openListPage(item: MusicListType) {
  playStore.setSongList(item)
  router.push('/main/list/' + item.listId?.toString())
}

function playRecommendSong(item: MusicSongType) {
  playStore.setSongInfo(item)
  playStore.songPlayingInfo.isPlay = true
}

const recommend = ref<RecommendType>()
const privateList = ref<MusicListType[]>()
onBeforeMount(() => {
  getTodayRecommendApi().then(res => {
    recommend.value = res.data
    console.log("res", recommend.value)
  })
  
  getPrivateRecommendListApi().then(res => {
    privateList.value = res.data
    console.log("privateList", privateList.value)
  })
})


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
            <div class="top-content" @click="playRecommendSong(recommend?.musicSongVO)">
              <div class="left-text-box">
                <h1>{{ getTimeScopeStr() }}</h1>
                <span>尝试来点音乐提提神吧~</span>
              </div>
              <div class="right-img">
                <img :src="playStore.staticBaseUrl + recommend?.musicSongVO.songPic" alt="">
              </div>
            </div>
            <div class="bottom-content">
              <p>{{ recommend?.musicSongVO.songName }} - {{ recommend?.musicSongVO.musicSinger.singerName }}<br> 猜你喜欢
              </p>
            </div>
          </div>
          <div class="content-item" v-for="(item, index) in recommend?.musicListVOS" :key="index">
            <div class="item-top-content" @click="openListPage(item)">
              <img :src="playStore.staticBaseUrl + item.listPic" alt="">
            </div>
            <div class="item-bottom-content">
              <p>{{ item.listInfo?.substring(0, 11) }}...</p>
              <p>播放量{{ Math.floor(item.playCount / 10000) }}万</p>
            </div>
          </div>
        </div>
      
      </div>
      <div class="next-box control-box" @click="scrollPage()">
        <i class="icon iconfont">&#xe914</i>
      </div>
    </div>
    <h1 class="recommend-title">你的私荐歌单</h1>
    <div class="private-list-box">
      <div class="private-list" v-for="(item, index) in privateList" :key="index">
        <div class="list-item-top" @click="openListPage(item)">
          <img :src="playStore.staticBaseUrl + item.listPic" alt="">
        </div>
        <div class="list-item-bottom">
          <p>{{ item.listInfo.length > 30 ? item.listInfo?.substring(0, 30) + '...' : item.listInfo }}</p>
        </div>
      </div>
    </div>
  
  </div>

</template>

<style scoped lang="scss">
.recommend-root-box {
  color: var(--text-color);
  padding: 2rem 0;
  font-family: "HarmonyOS Sans", sans-serif;
  height: calc(100vh - 20rem);
  overflow: auto;
  
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
      right: 0;
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
          height: 28rem;
          width: 20rem;
          margin: 2rem 2rem 0;
          
          .item-top-content {
            width: 20rem;
            height: 20rem;
            
            img {
              height: 20rem;
              width: 20rem;
              border-radius: 0.8rem;
            }
          }
          
          .item-bottom-content {
            width: 20rem;
            height: 8rem;
            
            p {
              white-space: nowrap;
              line-height: 3rem;
              color: var(--text-color-rgba);
              font-family: "HarmonyOS Sans", sans-serif;
              font-size: 1.6rem;
              width: 20rem;
              overflow: hidden;
            }
          }
          
          
        }
        
        .first-box {
          display: flex;
          flex-wrap: wrap;
          width: 40rem;
          height: 28rem;
          opacity: 0.9;
          
          .top-content {
            display: flex;
            flex-wrap: wrap;
            width: 40rem;
            height: 20rem;
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
          }
          
          
          .bottom-content {
            height: 8rem;
            width: 40rem;
            padding: 0 1rem;
            
            p {
              line-height: 3rem;
              font-size: 1.6rem;
              color: var(--text-color-rgba);
            }
          }
        }
        
        .item-top-content:hover, .top-content:hover {
          transition: 0.8s;
          transform: translateY(-1.5rem);
        }
      }
      
      .scroll-content-box::-webkit-scrollbar {
        display: none; /* 针对Webkit浏览器隐藏滚动条 */
      }
    }
  }
  
  .private-list-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    
    .private-list:nth-child(4n-3) {
      margin-left: 5rem;
    }
    
    .private-list {
      margin: 2rem 0 0 3rem;
      
      .list-item-top {
        width: 20rem;
        height: 20rem;
        
        img {
          border-radius: 1rem;
          width: 20rem;
          height: 20rem;
        }
      }
      
      .list-item-top:hover {
        transition: 0.8s;
        transform: translateY(-1.5rem);
      }
      
      .list-item-bottom {
        width: 20rem;
        height: 8rem;
        
        p {
          font-family: "HarmonyOS Sans", sans-serif;
          font-size: 1.2rem;
          line-height: 2.5rem;
          color: var(--text-color-rgba);
        }
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