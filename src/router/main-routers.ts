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
        redirect: '/main/recommend',
        children: [
            /* 左侧导航栏 */
            /* 推荐 */
            {
                path: 'recommend',
                name: 'recommend',
                component: () => import('@/components/ContentRecommend.vue')
            },
            /* 歌单列表 */
            {
                path: 'list/:listId',
                name: 'list',
                component: () => import('@/components/MainRightContent.vue')
            },
            /* 乐馆 */
            // {
            //     path: '/music-pavilion',
            //     component: () => import('@/components/ContentRecommend.vue')
            // },

            /* 顶部导航栏 */
            /* 用户详情页 */
            {
                path: 'user-info',
                name: 'userInfo',
                component: () => import('@/components/SysUserInfo.vue')
            },
            /* 换肤 */
            {
                path: 'skins',
                name: 'skins',
                component: () => import('@/components/SysSkins.vue')
            },
            /* 换肤 */
            {
                path: 'settings',
                name: 'settings',
                component: () => import('@/components/SysSettings.vue')
            },
        ],
    },
]
export default mainRouters

