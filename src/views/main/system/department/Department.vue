<template>
  <div class="department">
    <div class="table">
      <PageTable
        page-name="department"
        :table-config="departmentTableConfig"
        @createBtnClick="handleCreateData"
        @editBtnClick="handleEditData"
        btn-title="新建部门"
      ></PageTable>
    </div>
    <PageModal
      page-name="department"
      :default-info="defaultInfo"
      :modal-config="departmentModalConfig"
      ref="pageModalRef"
    ></PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageTable from '@/components/pageTable/src/PageTable.vue'
import PageModal from '@/components/page-modal/src/PageModal.vue'
import { departmentTableConfig } from './config/departmentTable.config'
import { departmentModalConfig } from './config/departmentModal.config'
import { usePageModal } from '@/hooks/usePageModal'

export default defineComponent({
  setup() {
    const [defaultInfo, pageModalRef, handleCreateData, handleEditData] =
      usePageModal(undefined, undefined)
    return {
      departmentTableConfig,
      departmentModalConfig,
      defaultInfo,
      pageModalRef,
      handleCreateData,
      handleEditData
    }
  },
  components: { PageTable, PageModal }
})
</script>

<style scoped>
.table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
