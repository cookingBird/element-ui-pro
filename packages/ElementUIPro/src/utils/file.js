export function fileToObjectUrl(file) {
  return URL.createObjectURL(file)
}

export function revokeObjectURL(blobUrl) {
  return URL.revokeObjectURL(blobUrl)
}

export async function urlToFile(blobUrl, fileName) {
  const response = await fetch(blobUrl) // 获取 Blob 数据
  const blob = await response.blob() // 转换为 Blob
  return new File([blob], fileName, { type: blob.type }) // 创建 File
}
