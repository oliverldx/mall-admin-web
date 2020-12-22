<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import router from '@/router'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'routers',
      'menus'
    ]),
    routes() {
      // return this.$router.options.routes
      let username = this.name
      let userMenus = this.menus
      store.dispatch('GenerateRoutes', { userMenus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          })
      return this.routers
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
