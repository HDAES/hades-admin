/*
 * @Descripttion: 导出execl
 * @Author: Hades
 * @Date: 2021-09-06 22:35:25
 */
import ExportJsonExcel from 'js-export-excel'

interface OptionState {
  fileName?: string
  datas?: any[]
}

interface OptionsState {
  dataIndex?: string
  title?: string
}

export default function (options: OptionsState[], data: any[], name?: string) {
  const option: OptionState = {}
  option.fileName = name

  const sheetFilter: any[] = []
  const sheetHeader: any[] = []
  const columnWidths: any[] = []
  const length = options.length

  options.forEach(item => {
    sheetFilter.push(item.dataIndex)
    sheetHeader.push(item.title)
    columnWidths.push(100 / length)
  })

  option.datas = [
    {
      sheetData: data,
      sheetName: name || '默认名字',
      sheetFilter,
      sheetHeader,
      columnWidths
    }
  ]

  const toExcel = new ExportJsonExcel(option) //new
  toExcel.saveExcel()
}
