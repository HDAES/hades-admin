<template>
  <el-select v-model="statusData" popper-class="select-tree">
    <el-option :value="statusData" :label="statusValueData" style="height: auto">
      <el-tree
        node-key="id"
        :default-checked-keys="[statusData]"
        :data="options"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
const emit = defineEmits(['update:parentId'])
const props = defineProps({
  parentId: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  defaultProps: {
    type: Object,
    default: () => ({
      children: 'children',
      label: 'name'
    })
  }
})

const statusData = ref(props.parentId)
const statusValueData = ref<string>('')

onMounted(() => {
  deepOptions(props.parentId, props.options)
})
const deepOptions = (id, options) => {
  options.forEach(item => {
    if (item.children.length > 0) {
      deepOptions(id, item.children)
    }
    if (item.id == id) {
      statusValueData.value = item.name
    }
  })
}
const handleNodeClick = data => {
  statusValueData.value = data.name
  statusData.value = data.id
  emit('update:parentId', data.id)
}
</script>
