// https://alligator.io/vuejs/vue-media-queries/
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMq from 'vue-mq'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(VueMq, {
  breakpoints: {
    mobile: 450,
    tablet: 900,
    laptop: 1250,
    desktop: Infinity,
    max_power_entry_columns_1: 280,
    max_power_entry_columns_2: 560,
    max_power_entry_columns_3: 840,
    max_power_entry_columns_4: 1120
  }
})

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
