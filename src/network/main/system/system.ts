import request from '@/network'
import { IDataType } from '@/network/type'

export function getPageListData(url: string, queryInfo: any) {
  return request.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return request.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return request.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return request.patch<IDataType>({
    url: url,
    data: editData
  })
}
