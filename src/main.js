import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import Helpers from './helpers.js'
import vueDebounce from 'vue-debounce'

Vue.use(VueRouter)
Vue.use(Meta, {
    refreshOnceOnNavigation: true
})
Vue.use(Helpers)
Vue.use(vueDebounce, {
    defaultTime: '1s',
    listenTo: ['input', 'change', 'click']
})

import Home from './components/Home.vue'
import Bottles from './components/Bottles.vue'
import './main.scss'

const routes = [
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/',
        component: Home
    },
    {
        path: '/bottles',
        name: 'bottles',
        component: Bottles
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>',
    router
})
