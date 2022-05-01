<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="span"
            ><el-icon class="icon"><UserFilled /></el-icon>账号登陆</span
          >
        </template>
        <LoginAccountVue ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="span"
            ><el-icon class="icon"><Iphone /></el-icon>手机登录</span
          >
        </template>
        <LoginPhoneVue />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccountVue from './LoginAccount.vue'
import LoginPhoneVue from './LoginPhone.vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    LoginAccountVue,
    LoginPhoneVue,
    UserFilled,
    Iphone
  },
  setup() {
    const isKeepPassword = ref(true)
    const currentTab = ref('account')
    const accountRef = ref<InstanceType<typeof LoginAccountVue>>()

    //调用子组件中的登陆方法
    const handleLoginClick = () => {
      //判断用户是以何种方式登陆
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        //调用LoginPhone中的登陆方法
        // accountRef.value?.loginAction(isKeepPassword.value)[暂时还没定义]
      }
    }
    return {
      isKeepPassword,
      accountRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 280px;

  .title {
    text-align: center;
  }
  .span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    margin-right: 3px;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
