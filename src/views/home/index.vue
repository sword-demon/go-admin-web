<script lang='ts' setup>
  import useMenuStore from '@/store/modules/menu.ts'
  import { ref } from 'vue'

  const menuStore = useMenuStore()
  const menuData = ref()

  const { routers } = menuStore.routers
  menuData.value = routers
</script>

<template>
  <div class='main-page'>
    <el-card>
      <h2>首页</h2>
    </el-card>
  </div>
</template>

<style scoped></style>
