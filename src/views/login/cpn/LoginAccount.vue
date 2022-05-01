<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="accountTules"
      :model="account"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import LocalCache from '@/utils/cache'
import { accountTules } from '../config/account-config'
import { ElForm } from 'element-plus'

export default defineComponent({
  setup() {
    const account = reactive({
      name: LocalCache.getCache('name') ?? '',
      password: LocalCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const store = useStore()

    //验证登陆逻辑是否正确
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //判断是否需要记住密码
          if (isKeepPassword) {
            LocalCache.setCache('name', account.name)
            LocalCache.setCache('password', account.password)
          } else {
            LocalCache.deleteCache('name')
            LocalCache.deleteCache('password')
          }
        }
        //进行登录验证
        store.dispatch('login/accountLoginAction', { ...account })
      })
    }
    return {
      accountTules,
      account,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
