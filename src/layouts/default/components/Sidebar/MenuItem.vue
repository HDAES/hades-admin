<template>
  <el-sub-menu :index="route.path" v-if="route?.children && route.children.length > 0">
    <template #title>
      <Icon :name="route?.meta.icon" size="18" />
      <span style="margin-left: 5px">{{ route.meta.title }}</span>
    </template>
    <MenuItem
      v-for="(item, index) in route.children"
      :key="index"
      :route="item"
      :path="route.path"
      :havecChildren="havecChildren"
    />
  </el-sub-menu>
  <el-menu-item
    :index="(havecChildren ? path : '') + '/' + route?.path"
    :key-data="(havecChildren ? path : '') + '/' + route?.path"
    v-else
  >
    <Icon :name="route?.meta.icon" size="18" />

    <slot name="title">
      <span class="pl-1">{{ route?.meta.title }}</span>
    </slot>
  </el-menu-item>
</template>

<script lang="ts" setup>
import { defineComponent, PropType } from 'vue'
import type { SidebarItem } from 'types/store'
interface MenuItemState {
  route: Object
  path: string
  havecChildren: Boolean
  collapse: Boolean
}

const props = defineProps({
  route: {
    type: Object as PropType<SidebarItem>
  },
  path: {
    type: String
  },
  havecChildren: {
    type: Boolean
  }
})

toRefs(props)
</script>
