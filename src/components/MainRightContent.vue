<script setup lang="ts">
import {ref} from "vue";
import {usePlayStore} from '@/store/play-store.ts'
import {useUserStore} from '@/store/user-store.ts'
import msg, {PositionTypeEnum} from "@/components/message";
import {useRoute} from "vue-router";
import SongListBox from "@/components/common/SongListBox.vue";

const playStore = usePlayStore()
const userStore = useUserStore()
const index = ref(1)
const route = useRoute();
let listId = ref();
listId.value = route.params.listId

/*点击更改列表标题文字样式*/
function changeStyle(val: number) {
  msg.warning('开发中。。。', PositionTypeEnum.TOP)
  index.value = val;
}

</script>

<template>
  <div class='content-top'>
    <div class="song-list-pic">
      <img :src="playStore.staticBaseUrl+playStore.songList.listPic" alt="">
    </div>
    <div class="song-list-info">
      <div class="info-title">
        <div>
          <span>{{ playStore.songList.listName }}</span>
        </div>
        <div>
          <span @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe7e9;</i>编辑</span>
          <span @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xeb9e;</i>投稿</span>
        </div>
      </div>
      <div class="info-style">
        <div>
          <img src="@/assets/images/avatar.png" alt="">
          <span class="info-style-name"
                @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
            {{ userStore.userInfo.email }}
          </span>
        </div>
        <div>
          <span v-for="item in playStore.songList.listStyle?.split(',')">{{ item }}</span>
        </div>
      </div>
      <div class="info-introduction">
        <span>{{
            playStore.songList.listInfo!.length > 100 ? playStore.songList.listInfo?.substring(0, 100) + "..." : playStore.songList.listInfo
          }}</span>
      </div>
      <div class="info-btn">
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe922;</i>播放全部</div>
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xebda;</i>下载</div>
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xeb91;</i>批量操作</div>
        <div @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)"><i class="iconfont">&#xe8bf;</i>播放全部</div>
      </div>
    </div>
  </div>
  <div class="list-content-box">
    <song-list-box/>
  </div>

</template>

<style scoped lang="scss">
.content-top {
  height: 25rem;
  width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "HarmonyOS Sans", sans-serif;
  .song-list-pic {
    width: 20rem;
    img {
      display: block;
      margin: 0 auto;
      width: 16rem;
      height: 16rem;
      border-radius: 1rem;
    }
  }
  
  .song-list-info {
    flex: 1;
    height: 20rem;
    display: flex;
    flex-direction: column;
    
    .info-title {
      height: 8rem;
      display: flex;
      flex-direction: row;
      
      div:first-child {
        flex: 1;
        height: 8rem;
        
        span {
          color: var(--text-color);
          font-weight: bold;
          line-height: 8rem;
          font-size: 3.5rem;
          font-family: "HarmonyOS Sans", sans-serif;
        }
      }
      
      div:last-child {
        width: 16rem;
        height: 8rem;
        display: flex;
        align-items: center;
        
        span {
          i {
            color: var(--text-color);
            font-size: 1.2rem;
            margin-right: 0.4rem;
          }
          
          color: var(--text-color);
          width: 5rem;
          margin: 0 0.8rem;
          border-radius: 0.3rem;
          font-size: 1.2rem;
          text-align: center;
          line-height: 2.5rem;
        }
        
        span:hover {
          background: var(--text-deep-rgba-1);
        }
      }
    }
    
    .info-style {
      width: 100%;
      flex: 2;
      display: flex;
      flex-direction: row;
      
      div:first-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        img {
          display: inline-block;
          width: 3rem;
          height: 3rem;
          border-radius: 1.5rem;
          margin-right: 1rem;
        }
        
        span {
          color: var(--text-color);
          font-size: 1.4rem;
        }
        
        span:hover {
          cursor: pointer;
          color: var(--text-active-color)
        }
      }
      
      div:last-child {
        display: flex;
        flex-direction: row;
        align-items: center;
        
        span {
          font-family: 'HarmonyOS Sans', sans-serif;
          font-size: 1.4rem;
          margin-left: 2rem;
          color: var(--text-color);
        }
      }
    }
    
    .info-introduction {
      flex: 2;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 1rem 0;
      
      span {
        font-family: 'HarmonyOS Sans', sans-serif;
        font-size: 1.4rem;
        color: var(--text-color);
        height: 3rem;
      }
    }
    
    .info-btn {
      flex: 3;
      display: flex;
      flex-direction: row;
      align-items: center;
      
      div {
        font-size: 1.4rem;
        margin-right: 6rem;
        color: var(--text-color);;
        line-height: 3.2rem;
        width: 10rem;
        text-align: center;
        border-radius: 1.8rem;
        background: var(--text-deep-rgba-1);
      }
      
      div:first-child {
        background: var(--text-deep-rgba-2);
      }
      
      div:hover {
        background: var(--text-deep-rgba-2);
      }
    }
  }
  
  
}

.list-content-box {
  height: calc(100vh - 34rem);
}
</style>