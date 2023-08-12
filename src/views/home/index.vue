<script lang='ts' setup>
  import useMenuStore from '@/store/modules/menu.ts'
  import { ref } from 'vue'

  const menuStore = useMenuStore()
  const menuData = ref()

  const { routers } = menuStore.routers
  menuData.value = routers
</script>

<template>
  <div>首页</div>
</template>

<style scoped></style>
