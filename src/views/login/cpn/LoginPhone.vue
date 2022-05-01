<template>
  <div class="login-phone">
    <el-form label-width="60px" :rules="phoneTules" hide-required-asterisk>
      <el-form-item label="手机号" prop="num" :model="phone">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码" prop="primary">
        <div class="get-code">
          <el-input v-model="phone.primary" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { phoneTules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      num: '',
      primary: ''
    })
    return {
      phone,
      phoneTules
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
