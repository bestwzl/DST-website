import Vue       from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/main',
        name: 'main',
        component: () => import('../layout/baseLayout.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../views/home/index.vue'),
                meta: {
                    title: '首页',
                    keepAlive: true,
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
