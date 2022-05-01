<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleClose">退出登录</el-dropdown-item>
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

export default defineComponent({
  components: { ArrowDown },
  setup() {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.login.userInfo.name)

    //点击退出登录
    const handleClose = () => {
      router.push('/login')
    }
    return {
      name,
      handleClose
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
