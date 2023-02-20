<template>
  <component :is="name" class="h-6 w-6 cursor-pointer" style="font-size: 24px" />
</template>

<script lang="ts">
export default defineComponent({
  props: {
    name: {
      type: String,
      default: 'ArrowsExpandIcon'
    }
  }
})
</script>
