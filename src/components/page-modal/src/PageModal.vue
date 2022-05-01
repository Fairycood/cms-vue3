<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :title="title" width="30%" center>
      <HZHForm v-bind="modalConfig" v-model="formData"></HZHForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import HZHForm from '@/components/form/src/HZHForm.vue'

export default defineComponent({
  components: { HZHForm },
  props: {
    title: String,
    modalConfig: {
      type: Object,
      require: true
    },
    //存放编辑时每个输入框里对应的信息
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dialogVisible = ref(false)

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig!.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const formData = ref<any>({})

    //确定按钮的提交
    const store = useStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          id: props.defaultInfo.id,
          editData: { ...formData.value, ...props.otherInfo }
        })
      } else {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return { dialogVisible, formData, handleConfirmClick }
  }
})
</script>

<style scoped>
.el-dialog__body {
  padding: 0px 25px 0px 25px;
}
</style>
