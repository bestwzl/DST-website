import Vue       from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/account/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/resetPassword',
        name: 'resetPassword',
        component: () => import('../views/account/resetPassword.vue'),
        meta: {
            title: '重置密码页面'
        }
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/welcome.vue'),
        meta: {
            title: '欢迎页'
        }
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../layout/baseLayout.vue'),
        children: [
            {
                path: '/overview',
                name: 'overview',
                component: () => import('../views/overview/index.vue'),
                meta: {
                    title: '概览',
                    keepAlive: true,
                    keepLog: true, // 是否被记录在面包屑中
                }
            },
            {
                path: '/user',
                name: 'baseInfo',
                component: () => import('../views/userManage/index.vue'),
                meta: {
                    title: '用户中心',
                    keepAlive: true,
                    keepLog: true,
                }
            },
        ]
    },
    {
        path: '/404',
        name: '404',
        component: () => import('../views/page404'),
        meta: {
            title: '404'
        }
    },
    {
        path: '/*',
        redirect: '/404'
    },

]


// 当前页面执行router.push()当前页面地址的时候 报错处理
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}


const router = new VueRouter({
    routes
})

export default router
