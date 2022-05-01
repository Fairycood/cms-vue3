<template>
  <div class="role">
    <PageSearch
      :search-form-config="roleFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    >
    </PageSearch>
    <div class="table">
      <PageTable
        :table-config="roleTableConfig"
        page-name="role"
        ref="pageTableRef"
        btn-title="新建角色"
        @createBtnClick="handleCreateData"
        @editBtnClick="handleEditData"
      ></PageTable>
    </div>

    <PageModal
      :modal-config="roleModalConfig"
      :default-info="defaultInfo"
      :other-info="otherInfo"
      page-name="role"
      ref="pageModalRef"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import PageTable from '@/components/pageTable/src/PageTable.vue'
import PageSearch from '@/components/pageSearch/src/PageSearch.vue'
import PageModal from '@/components/page-modal/src/PageModal.vue'
import { ElTree } from 'element-plus'
import { roleTableConfig } from './config/roleTableConfig'
import { roleFormConfig } from './config/roleFormConfig'
import { roleModalConfig } from './config/roleModalConfig'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  setup() {
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch()

    //获取所有菜单权限
    const store = useStore()
    const menus = computed(() => store.state.entireMenus)

    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    //处理编辑时page-modal中菜单权限的回显
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [defaultInfo, pageModalRef, handleCreateData, handleEditData] =
      usePageModal(undefined, editCallback)

    return {
      roleTableConfig,
      roleFormConfig,
      roleModalConfig,
      defaultInfo,
      otherInfo,
      menus,
      pageTableRef,
      pageModalRef,
      elTreeRef,
      handleResetClick,
      handleQueryClick,
      handleCreateData,
      handleEditData,
      handleCheckChange
    }
  },
  components: { PageTable, PageSearch, PageModal }
})
</script>

<style scoped>
.table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
