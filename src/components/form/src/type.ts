type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  placeholder?: string
  rules?: []
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  //针对是否隐藏密码输入框等
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
  itemLayout?: any
}
