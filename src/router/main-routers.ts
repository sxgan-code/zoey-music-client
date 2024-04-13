import {RouteRecordRaw} from "vue-router";


const mainRouters: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'root',
        redirect: '/main',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/LoginChildWin.vue"),
    },

    {
        path: '/main',
        name: 'main',
        component: () => import('@/views/MainPage.vue'),
        redirect: '/main/list/111111111111111111111111111111111',
        children: [
            /* 歌单列表 */
            {
                path: 'list/:listId',
                name: 'list',
                component: () => import('@/components/MainRightContent.vue')
            },
            // /* 乐馆 */
            // {
            //     path: '/music-pavilion',
            //     component: () => import('@/components/MusicPavilion.vue')
            // },
        ],
    },
]
export default mainRouters

