<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
  <!-- <el-button type="primary" size="default"> ok</el-button> -->
</template>

<style lang="scss" scoped></style>
