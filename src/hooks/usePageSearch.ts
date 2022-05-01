import { ref } from 'vue'
import PageTable from '@/components/pageTable/src/PageTable.vue'

export function usePageSearch() {
  const pageTableRef = ref<InstanceType<typeof PageTable>>()
  const handleResetClick = () => {
    pageTableRef.value?.getPageData()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageTableRef.value?.getPageData(queryInfo)
  }
  return [pageTableRef, handleResetClick, handleQueryClick]
}
