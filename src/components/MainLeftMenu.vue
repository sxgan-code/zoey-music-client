<script setup lang="ts">
import {ref, watch} from "vue";
import {usePlayStore} from '@/store/play-store.ts'
import msg, {PositionTypeEnum} from "@/components/message";
import router from "@/router";
import {useUserStore} from "@/store/user-store.ts";
import {getUserMusicListApi} from "@/api/list";
import {MusicListType} from "@/api/list/type.ts";

const userStore = useUserStore()

const playStore = usePlayStore()

function openPage(songlistId: string = '1') {
  // msg.warning('开发中。。。', PositionTypeEnum.TOP)
  // songListId.value = songlistId
  let pathStr: string = '/main/list/' + songlistId;
  console.log(pathStr)
  router.push(pathStr)
}

/**
 * @Description: 查询当前用户的歌单
 * @Author: sxgan
 * @Date: 2024/4/18 17:40
 **/
const creates = ref<MusicListType[]>()
const collects = ref<MusicListType[]>()

function getSongListByUserId() {

}

watch(() => userStore.userInfo.isLogin, (newVal) => {
  if (newVal) {
    getUserMusicListApi().then(res => {
      creates.value = res.data.creates
      collects.value = res.data.collects
      console.log(creates)
      console.log(collects)
    }).catch(err => {
      msg.error()
    })
  }
})

</script>

<template>
  <div class="menu-block">
    <div class="my-music-title">在线音乐</div>
    <div class="my-music-list">
      <div class="like-music" @click="router.push('/main/recommend')">
        <i class="icon huaweiicon icon-ic_public_home"></i> <span>推荐</span>
      </div>
      <div class="local-down" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_device_earphone_roc"></i> <span>乐馆</span>
      </div>
      <div class="recent-play" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-e8067f9-fa0c-4dc2-a249-ffde979e3a5f"></i> <span>视频</span>
      </div>
      <div class="audition-list" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-a11-6e8d-4075-a5fb-773f53432fb8"></i> <span>雷达</span>
      </div>
    </div>
  </div>
  <div class="menu-block">
    <div class="my-music-title">我的音乐</div>
    <div class="my-music-list">
      <div v-if="userStore.userInfo.isLogin" class="like-music" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_public_favor"></i> <span>我喜欢</span>
      </div>
      <div class="local-down" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_gallery_move_out"></i> <span>本地和下载</span>
      </div>
      <div class="recent-play" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_public_time"></i> <span>最近播放</span>
      </div>
      <div class="audition-list" @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_device_earphone"></i> <span>试听列表</span>
      </div>
      <div v-if="userStore.userInfo.isLogin" class="purchased-music"
           @click="msg.warning('开发中。。。', PositionTypeEnum.TOP)">
        <i class="icon huaweiicon icon-ic_public_appstore"></i> <span>已购音乐</span>
      </div>
    </div>
  </div>
  <div v-if="userStore.userInfo.isLogin" class="menu-block">
    <div class="my-music-title">创建的歌单</div>
    <div class="my-music-list">
      <div :class="playStore.songInfo.songListId==item.listId?'love-collect selectNode':'love-collect'"
           v-for="(item,index) in creates"
           @click="openPage(item.listId)">
        <span>{{ item.listName.length > 6 ? item.listName.substring(0, 7) + '...' : item.listName }}</span>
        <div
            :class="playStore.songInfo.songListId==item.listId&&playStore.songPlayingInfo.isPlay?'play-img':''"></div>
      </div>
    </div>
  </div>
  <div v-if="userStore.userInfo.isLogin" class="menu-block">
    <div class="my-music-title">收藏的歌单</div>
    <div class="my-music-list">
      <div :class="playStore.songInfo.songListId==item.listId?'love-collect selectNode':'love-collect'"
           v-for="item in collects"
           @click="openPage(item.listId)">
        <span>{{ item.listName.length > 6 ? item.listName.substring(0, 7) + '...' : item.listName }}</span>
        <div
            :class="playStore.songInfo.songListId==item.listId&&playStore.songPlayingInfo.isPlay?'play-img':''"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-block {
  width: 15rem;
  margin: 0 2rem;
  color: var(--text-color-rgba);
  overflow: hidden;
  
  .my-music-title {
    font-family: 'HarmonyOS Sans';
    font-size: 1.2rem;
    width: 14rem;
    margin: 1rem 0 0.5rem 0;
    line-height: 2rem;
  }
  
  .my-music-list {
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    
    > div {
      width: 14rem;
      margin: 0.5rem 0;
      border-radius: 0.5rem;
      
      i {
        line-height: 3rem;
        font-size: 1.8rem;
        font-weight: lighter;
        margin: 0 1rem;
      }
      
      > span {
        margin: auto 0;
      }
    }
    
    .love-collect {
      height: 3rem;
      line-height: 3rem;
      width: 14rem;
      margin-left: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      
      span {
        width: 12rem;
        display: block;
        line-height: 3rem;
        margin-left: 1rem;
      }
      
      .play-img {
        display: block;
        width: 1.5rem;
        height: 0.9rem;
        line-height: 3rem;
        background: url("@/assets/images/wave.gif") repeat;
        background-size: 60%;
      }
    }
    
    div:hover {
      background: var(--bg--active-rgba);
    }
    
    .selectNode {
      color: var(--text-color);
      background: var(--bg--active-rgba);
    }
  }
}
</style>