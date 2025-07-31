import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginScanner from '@/views/LoginScanner.vue'
import Dashboard from '@/views/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: '/logistics',
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: LoginScanner },
        { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } }
    ]
})