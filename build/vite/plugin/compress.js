/*
 * @Descripttion: 压缩文件
 * @Author: Hades
 * @Date: 2021-09-14 10:00:35
 * https://github.com/anncwb/vite-plugin-compression
 */
import compressPlugin from 'vite-plugin-compression'
export function configCompressPlugin(compress, deleteOriginFile = false, disable = false) {
  const compressList = compress.split(',')
  const plugins = []
  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        disable,
        deleteOriginFile
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        disable,
        algorithm: 'brotliCompress',
        deleteOriginFile
      })
    )
  }
  return plugins
}
//# sourceMappingURL=compress.js.map
