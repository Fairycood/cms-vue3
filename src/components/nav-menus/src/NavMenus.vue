<template>
  <div class="nav-menu">
    <!-- 菜单上的logo -->
    <div class="logo">
      <img src="~@\assets\img\logo.svg" alt="logo" class="img" />
      <span class="title" v-show="!collapse">Vue3+Ts</span>
    </div>
    <!-- 菜单列表 -->
    <el-menu
      :default-active="defaultItemId"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 一级菜单 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon><caret-right /></el-icon>
            <h4 v-show="!collapse">{{ item.name }}</h4>
          </template>
          <template v-for="childMenu in item.children" :key="childMenu.id">
            <el-menu-item
              :index="childMenu.id + ''"
              @click="handleMenuItemClick(childMenu)"
            >
              {{ childMenu.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { CaretRight } from '@element-plus/icons-vue'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  components: { CaretRight },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const userMenus = computed(() => store.state.login.userMenus)

    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? 'not-found'
      })
    }

    //设置菜单栏默认活跃的item
    const menuPath = route.path
    const menu = pathMapToMenu(userMenus.value, menuPath)
    const defaultItemId = ref(menu.id + '')

    return {
      userMenus,
      defaultItemId,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep(.el-sub-menu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
