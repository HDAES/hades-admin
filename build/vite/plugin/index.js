import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { visualizer } from 'rollup-plugin-visualizer'
import { configCompressPlugin } from './compress'
import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'
import { configSvgIconsPlugin } from './svgSprite'
import { configAutoImportPlugin } from './autoImport'
export function createVitePlugins(viteEnv, isBuild) {
  const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } =
    viteEnv
  const vitePlugins = [vue(), vueJsx(), VueSetupExtend()]
  // vite-plugin-windicss
  vitePlugins.push(WindiCSS())
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))
  //vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))
  //unplugin-auto-import
  vitePlugins.push(configAutoImportPlugin())
  if (isBuild) {
    //vite-plugin-compression
    vitePlugins.push(configCompressPlugin('brotli', false, false))
    //Packaging Analysis
    vitePlugins.push(
      visualizer({
        filename: './node_modules/.cache/visualizer/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true
      })
    )
  }
  return vitePlugins
}
//# sourceMappingURL=index.js.map
