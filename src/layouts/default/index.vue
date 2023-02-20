<template>
  <el-container style="height: 100%">
    <Feature />
    <Sidebar />
    <el-container>
      <el-header class="navbar-wrapper">
        <Header />
      </el-header>
      <AppMain />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain/index.vue'
import Header from './components/Header/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Feature from './feature/index.vue'
</script>
<style lang="scss" scoped>
.navbar-wrapper {
  border-bottom: 1px solid var(--el-border-color);
}
</style>
