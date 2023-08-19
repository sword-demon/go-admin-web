import Exceljs from 'exceljs'

export const autoWidthAction = (val: string | null, width = 10) => {
  if (val == null) {
    width = 10
  } else if (val.toString().charCodeAt(0) > 255) {
    width = val.toString().length * 2
  } else {
    width = val.toString().length
  }

  return width
}

interface exportOptions {
  column: any,
  data: any,
  filename: string
  auto_width: boolean
  format: string
}

export const exportExcel = async ({ column, data, filename, auto_width, format }: exportOptions) => {
  // 创建 excel 工作簿
  const workBook = new Exceljs.Workbook()
  // 设置工作簿属性
  workBook.creator = '无解'
  workBook.title = filename
  workBook.created = new Date()
  workBook.modified = new Date()

  // 添加工作表
  const worksheet = workBook.addWorksheet(filename)
  // 设置列名
  const columnName: any[] = []
  column.forEach((item: any) => {
    const obj = {
      header: item.label,
      key: item.name,
      width: 0,
    }
    if (auto_width) {
      const maxArr = [autoWidthAction(item.label)]
      data.forEach((it: any) => {
        const str = it[item.name] || ''
        if (str) {
          maxArr.push(autoWidthAction(str))
        }
      })
      obj.width = Math.max(...maxArr) + 5
    }
    // 设置列表、键、宽度
    columnName.push(obj)
  })

  worksheet.columns = columnName
  // 添加行
  worksheet.addRows(data)
  // 写入文件
  const uinit8Array = format === 'xlsx' ? await workBook.xlsx.writeBuffer() : await workBook.csv.writeBuffer()
  const blob = new Blob([uinit8Array], { type: 'application/octet-binary' })
  // 判断是否允许用户在客户端上保存文件
  if ('msSaveOrOpenBlob' in window.navigator) {
    // @ts-ignore
    navigator.msSaveOrOpenBlob(blob, filename + `.${format}`)
  } else {
    // 本地保存
    // a 标签下载
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    // download 属性指定文件名
    link.download = filename + `.${format}`
    // 触发 click 事件
    link.click()
    // 释放内存
    window.URL.revokeObjectURL(link.href)
  }
}
