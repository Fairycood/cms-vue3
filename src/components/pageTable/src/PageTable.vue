<template>
  <div class="page-table">
    <CmsTable
      :dataList="dataList"
      :dataCount="dataCount"
      v-bind="tableConfig"
      v-model:page="pageInfo"
    >
      <!-- 顶部的插槽 -->
      <template #headerHandler>
        <el-button
          type="primary"
          size="default"
          v-if="isCreate"
          @click="handleCreateClick"
          >{{ btnTitle }}</el-button
        >
      </template>
      <!-- 列表表格中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            :icon="Edit"
            size="small"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            :icon="Delete"
            size="small"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </CmsTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import CmsTable from '@/components/cmsTable/src/CmsTable.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { usePermission } from '@/hooks/usePermission'

export default defineComponent({
  props: {
    btnTitle: String,
    tableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: { CmsTable },
  setup(props, { emit }) {
    const store = useStore()

    //获取操作的权限
    const isCreate = usePermission(props.pageName!, 'create')
    const isUpdate = usePermission(props.pageName!, 'update')
    const isDelete = usePermission(props.pageName!, 'delete')
    const isQuery = usePermission(props.pageName!, 'query')

    //双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    //获发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (isQuery) {
        store.dispatch('system/getPageListAction', {
          pageName: props.pageName,
          queryInfo: {
            offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
            size: pageInfo.value.pageSize,
            ...queryInfo
          }
        })
      }
    }
    getPageData()

    //从vuex中获取数据
    const dataList = computed(() =>
      store.getters['system/pageListData'](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters['system/pageListCount'](props.pageName)
    )
    //获取其他的动态插槽名称
    const otherPropSlots = props.tableConfig?.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    //删除，编辑，新建用户操作
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleCreateClick = () => {
      emit('createBtnClick')
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      Edit,
      Delete,
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      handleDeleteClick,
      handleCreateClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
