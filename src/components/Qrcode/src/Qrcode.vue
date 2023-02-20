<template>
  <div ref="wrapRef"></div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { toDataURL, toCanvas } from 'qrcode'
import type { QRCodeRenderersOptions } from 'qrcode'

const emit = defineEmits(['error'])
const props = defineProps({
  value: {
    type: [String, Array] as PropType<string | any[]>,
    default: null
  },
  // 宽度
  width: {
    type: Number as PropType<number>,
    default: 200
  },
  tag: {
    type: String as PropType<'canvas' | 'img'>,
    default: 'canvas',
    validator: (v: string) => ['canvas', 'img'].includes(v)
  }
})

const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)
async function createQrcode() {
  const opts: QRCodeRenderersOptions = {
    errorCorrectionLevel: 'H',
    width: props.width,
    margin: 2
  }
  try {
    if (props.tag === 'canvas') {
      await toCanvas(props.value, opts, function (err, canvas) {
        if (err) throw err
        ;(wrapRef.value as HTMLElement).appendChild(canvas)
      })
    }

    if (props.tag === 'img') {
      await toDataURL(props.value, opts, function (error, url) {
        const img = document.createElement('img')
        img.src = url
        ;(wrapRef.value as HTMLImageElement).appendChild(img)
      })
    }
  } catch (error) {
    emit('error', error)
  }
}

watchEffect(() => {
  createQrcode()
})
</script>
