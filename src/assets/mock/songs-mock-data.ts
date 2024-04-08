interface SongType {
    songId: string,
    songName: string,
    songUrl: string,
    songPic: string,
    lyricUrl: string,
    songStyle: string,
    releaseDate: string,
    isLike: string,
    album: AlbumType,
    singer: SingerType,
}

interface AlbumType {
    albumId: string,
    albumName: string,
    albumPic: string,
    releaseDate: string
}

interface SingerType {
    singerId: string,
    singerName: string,
    singerPic: string,
    address: string,
}

const songs: SongType[] = [
    {
        songId: "SONG-493C1277-291B-45DB-8333-3DE0ABDCA19A",
        songName: "我好像在哪见过你1",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0005",
        songName: "我好像在哪见过你5555555",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "SONG-493C1277-291B-45DB-8333-3DE0ABDCA17A",
        songName: "我好像在哪见过你3",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "SONG-493C1277-291B-45DB-8333-3DE0ABDCA16A",
        songName: "我好像在哪见过你4",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    },
    {
        songId: "0001",
        songName: "我好像在哪见过你5",
        songUrl: "/Resource/songs/薛之谦 - 我好像在哪见过你.mp3",
        songPic: "/Resource/image/songImg/我好像在哪见过你.png",
        lyricUrl: "",
        songStyle: "#流行，#怀旧",
        releaseDate: "2022-10-16T12:27:08.000+00:00",
        isLike: '1',
        album: {
            albumId: "ALBUM-22B5409F-104E-4E4D-A0C3-962A2221DF39",
            albumName: "初学者",
            albumPic: "/Resource/image/songImg/我好像在哪见过你.png",
            releaseDate: "2022-10-16T12:27:08.000+00:00"
        },
        singer: {
            singerId: "SINGER-9A28AC91-A949-42B2-804E-AB847130A933",
            singerName: "薛之谦",
            singerPic: "/Resource/image/singerImg/薛之谦.png",
            address: "中国上海"
        }
    }
]
export default songs