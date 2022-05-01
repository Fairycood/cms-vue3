<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="userFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />

    <div class="table">
      <PageTable
        :tableConfig="userTableConfig"
        page-name="users"
        ref="pageTableRef"
        btn-title="新建用户"
        @createBtnClick="handleCreateData"
        @editBtnClick="handleEditData"
      ></PageTable>
    </div>

    <PageModal
      ref="pageModalRef"
      page-name="users"
      :modalConfig="modalConfigRef"
      :default-info="defaultInfo"
    ></PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { userFormConfig } from './config/userForm.config'
import { userTableConfig } from './config/userTable.config'
import { userModalConfig } from './config/userModal.config'
import PageSearch from '@/components/pageSearch/src/PageSearch.vue'
import PageTable from '@/components/pageTable/src/PageTable.vue'
import PageModal from '@/components/page-modal/src/PageModal.vue'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  components: { PageSearch, PageTable, PageModal },
  setup() {
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch()

    //处理密码框是否显示的逻辑
    const createCallback = () => {
      const passwordItem = userModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = userModalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    //动态添加部门和角色列表
    const store = useStore()

    const modalConfigRef = computed(() => {
      const departmentItem = userModalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map(
        (item: any) => {
          return { title: item.name, value: item.id }
        }
      )
      const roleItem = userModalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      return userModalConfig
    })
    const [defaultInfo, pageModalRef, handleCreateData, handleEditData] =
      usePageModal(createCallback, editCallback)

    return {
      userFormConfig,
      userTableConfig,
      userModalConfig,
      modalConfigRef,
      defaultInfo,
      pageTableRef,
      pageModalRef,
      handleResetClick,
      handleQueryClick,
      handleCreateData,
      handleEditData
    }
  }
})
</script>

<style scoped>
.table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
