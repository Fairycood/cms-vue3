<template>
  <div>
    <HZHForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="header">高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button :icon="Refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" :icon="Search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </HZHForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HZHForm from '@/components/form/src/HZHForm.vue'
import { Refresh, Search } from '@element-plus/icons-vue'

export default defineComponent({
  components: { HZHForm },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    //动态决定formatData中的属性
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //重置搜索条件同时刷新表格数据
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    //点击搜索按钮
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return { formData, handleResetClick, handleQueryClick, Refresh, Search }
  }
})
</script>

<style scoped>
.header {
  color: rgb(96, 98, 102);
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
