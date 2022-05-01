<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Expand v-if="isFold" />
      <Fold v-else />
    </el-icon>
    <div class="content">
      <BreadCrumb :bread-crumbs="breadCrumbs" />
      <UserInfo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { Fold, Expand } from '@element-plus/icons-vue'
import UserInfo from './UserInfo.vue'
import BreadCrumb from '@/components/breadCrumb/src/BreadCrumb.vue'
import { pathMapBreadcrumbs } from '@/utils/map-menus'

export default defineComponent({
  components: {
    Fold,
    Expand,
    UserInfo,
    BreadCrumb
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)

    //点击图标使isFold取反并传给main.vue
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    //处理面包屑
    const breadCrumbs = computed(() => {
      const route = useRoute()
      const path = route.path
      const store = useStore()
      const userMenus = store.state.login.userMenus
      return pathMapBreadcrumbs(userMenus, path)
    })

    return {
      isFold,
      breadCrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
