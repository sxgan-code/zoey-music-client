<script setup lang="ts">
import {ref} from "vue";
import {usePlayStore} from '@/store/play-store.ts'
import {useUserStore} from '@/store/user-store.ts'
import songsData from '@/assets/mock/songs-mock-data.ts'

const songs = ref(songsData)
const playStore = usePlayStore()
const userStore = useUserStore()
const index = ref(1)


/*点击更改列表标题文字样式*/
function changeStyle(val: number) {
  index.value = val;
}

/*更改歌曲喜欢状态*/
function isLikeSong(songId: string) {
  var flag = ''
  songs.value.forEach(item => {
    if (item.songId == songId) {
      if (item.isLike == '0') {
        item.isLike = '1'
        flag = '1'
      } else {
        item.isLike = '0'
        flag = '0'
      }
      if (item.songId == playStore.songInfo.songId) {
        playStore.songInfo.isLike = flag
      }
    }
  })
}

/*点击控件播放音乐*/
function playMusic(id: string) {
  console.log('播放歌曲')
}

</script>

<template>
  <div class='content-top'>
    <div class="song-list-pic">
      <img src="@/assets/images/2024040001.jfif" alt="">
    </div>
    <div class="song-list-info">
      <div class="info-title">
        <div>
          <span>{{ playStore.songList.songlistName }}</span>
        </div>
        <div>
          <span><i class="iconfont">&#xe7e9;</i>编辑</span>
          <span><i class="iconfont">&#xeb9e;</i>投稿</span>
        </div>
      </div>
      <div class="info-style">
        <div>
          <img src="@/assets/images/avatar.png" alt="">
          <span>{{ userStore.userInfo.name }}</span>
        </div>
        <div>
          <span v-for="item in playStore.songList.songlistStyle">{{ item }}</span>
        </div>
      </div>
      <div class="info-introduction">
        <span>{{ playStore.songList.songlistInfo }}</span>
      </div>
      <div class="info-btn">
        <div><i class="iconfont">&#xe922;</i>播放全部</div>
        <div><i class="iconfont">&#xebda;</i>下载</div>
        <div><i class="iconfont">&#xeb91;</i>批量操作</div>
        <div><i class="iconfont">&#xe8bf;</i>播放全部</div>
      </div>
    </div>
  </div>
  <div class="content-list">
    <div class="list-top">
      <div>
        <span :class="index==1?'sel-title-span':''" @click="changeStyle(1)">歌曲{{ playStore.songList.count }}</span>
        <span :class="index==2?'sel-title-span':''" @click="changeStyle(2)">最近收藏</span>
        <span :class="index==3?'sel-title-span':''" @click="changeStyle(3)">评论</span>
      </div>
      <div>
        <span><i class="iconfont">&#xe8bb;</i>搜索</span>
        <span><i class="iconfont">&#xe69e;</i>排序</span>
      </div>
    </div>
    <div class="list-content">
      <div class="list-title">
        <div><span>歌曲</span></div>
        <div><span>歌手</span></div>
        <div><span>专辑</span></div>
      </div>
      <div class="song-list">
        <div class="item-list" v-for="item in songs">
          <div class="song-clo-1">
            <div class="song-name">
              <i :class="item.isLike=='1'?'iconfont song-like':'iconfont'" :id="'item-'+index"
                 @click="isLikeSong(item.songId)">{{ item.isLike == '1' ? '&#xeaab;' : '&#xe8fe;' }}</i>
              <span>{{ item.songName.length > 12 ? item.songName.substring(0, 12) + '...' : item.songName }}</span>
            </div>
            <div class="song-control">
              <i class="iconfont"
                 @click="playMusic(item.songId)">{{
                  item.songId == playStore.songInfo.songId && playStore.songPlayingInfo.isPlay ? '&#xeb99;' : '&#xeb98;'
                }}</i>
              <i class="iconfont">&#xebaa;</i>
              <i class="iconfont">&#xe77b;</i>
              <i class="iconfont">&#xe760;</i>
            </div>
          </div>
          <div class="song-clo-2"><span>{{
              item.singer.singerName.length > 8 ? item.singer.singerName.substring(0, 8) + '...' : item.singer.singerName
            }}</span></div>
          <div class="song-clo-3">
            <span>{{
                item.album.albumName.length > 12 ? item.album.albumName.substring(0, 12) + '...' : item.album.albumName
              }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-top {
  height: 28vh;
  width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: center;

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
    height: 28vh;
    display: flex;
    flex-direction: column;

    .info-title {
      height: 10vh;
      display: flex;
      flex-direction: row;

      div:first-child {
        flex: 1;
        height: 10vh;

        span {
          color: var(--el-color-white);
          font-weight: bold;
          line-height: 10vh;
          font-size: 3.5rem;
          font-family: "HarmonyOS Sans";
        }
      }

      div:last-child {
        width: 16rem;
        height: 10vh;
        display: flex;
        align-items: center;

        span {
          i {
            color: var(--text--light);
            font-size: 1.2rem;
            margin-right: 0.4rem;
          }

          color: var(--el-color-white);
          width: 5rem;
          margin: 0 0.8rem;
          border-radius: 0.3rem;
          font-size: 1.2rem;
          text-align: center;
          line-height: 2.5rem;
        }

        span:hover {
          background: var(--bg--rgba);
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
          color: var(--text--color);
          font-size: 1.4rem;
        }

        span:hover {
          cursor: pointer;
          color: var(--el-color-primary)
        }
      }

      div:last-child {
        display: flex;
        flex-direction: row;
        align-items: center;

        span {
          font-family: '微软雅黑';
          font-size: 1.4rem;
          margin-left: 2rem;
          color: var(--text--color);
        }
      }
    }

    .info-introduction {
      flex: 2;
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        font-family: '微软雅黑';
        font-size: 1.4rem;
        color: var(--text--color);
      }
    }

    .info-btn {
      flex: 3;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;

      div {
        font-size: 1.4rem;
        color: var(--text--color);;
        line-height: 3.6rem;
        width: 12rem;
        text-align: center;
        border-radius: 1.8rem;
        background: var(--bg--rgba);
      }

      div:first-child {
        background: var(--el-color-primary);
      }

      div:hover {
        background: var(--el-color-primary);
      }
    }
  }
}

.content-list {
  height: 52vh;
  width: 80vw;
  display: flex;
  flex-direction: column;

  .list-top {
    height: 6vh;
    width: 100%;
    display: flex;
    flex-direction: row;

    div:first-child {
      flex: 8;
      display: flex;

      span {
        display: inline-block;
        width: 8rem;
        color: var(--el-color-white);
        text-align: center;
        font-size: 1.4rem;
        line-height: 3rem;
        margin: 0 1.5rem;

      }

      span:hover {
        color: var(--my-dark-light-1);
      }

      .sel-title-span {
        color: var(--my-dark-light-1);
      }

      .sel-title-span::after {
        display: block;
        content: '';
        width: 2.5rem;
        margin: 0 auto;
        border-bottom: 3px solid var(--my-dark-light-1);
      }
    }

    div:last-child {
      margin-top: 0.5rem;
      flex: 2;

      span {
        i {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }

        display: inline-block;
        width: 5rem;
        color: var(--el-color-white);
        text-align: center;
        font-size: 1.2rem;
        line-height: 2.5rem;
        border-radius: 0.3rem;
        margin: 0 1rem;
      }

      span:hover {
        background: var(--bg--rgba);
      }
    }
  }

  .list-content {
    height: 46vh;
    width: 100%;
    display: flex;
    flex-direction: column;

    .list-title {
      height: 4vh;
      width: 90%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;

      span {
        color: var(--text--light-rgba);
        font-size: 1.2rem;
      }

      div:first-child {
        flex: 5;
        padding-left: 1rem;
      }

      div:nth-child(2) {
        flex: 3;
      }

      div:last-child {
        flex: 4;
      }

    }

    .song-list {
      height: 42vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: auto;

      .item-list {
        display: flex;
        flex-direction: row;
        line-height: 4rem;
        width: 90%;
        margin: 0 auto;

        .song-clo-1 {
          flex: 5;
          line-height: 4rem;
          display: flex;
          flex-direction: row;

          .song-name {
            flex: 12;
            line-height: 4rem;

            span {
              color: var(--el-color-white);
              font-size: 1.4rem;
            }

            .song-like {
              color: var(--text-color-light-red);
            }

            i {
              cursor: pointer;
              margin: 0 1rem;
              color: var(--el-color-white);
              font-size: 1.6rem;
            }
          }

          .song-control {
            flex: 6;
            line-height: 4rem;
            display: flex;
            justify-content: space-around;

            i {
              display: none;
              color: var(--el-color-white);
              font-size: 1.8rem;
            }

            i:hover {
              color: var(--my-dark-light-1);
            }
          }
        }

        .song-clo-2 {
          flex: 3;
        }

        .song-clo-3 {
          flex: 4;
        }

        .song-clo-2, .song-clo-3 {
          span {
            font-size: 1.4rem;
            margin-left: 1rem;
            color: var(--el-color-white);
          }
        }
      }

      .item-list:hover {
        .song-clo-1 .song-control i {
          display: block;
        }

        background: var(--bg--rgba);
      }
    }
  }

}
</style>