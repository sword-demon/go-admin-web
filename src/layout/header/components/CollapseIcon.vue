<script lang='ts' setup>
  import useSettingStore from '@/store/modules/setting'

  const settingStore = useSettingStore()
  const handleCollapse = () => {
    settingStore.toggleCollapse()
  }
</script>

<template>
  <div class='hamburger-container' @click='handleCollapse'>
    <el-icon class='icon' color='#e99d53' v-if='settingStore.isCollapse'>
      <Expand />
    </el-icon>
    <el-icon class='icon' color='#e99d53' v-else>
      <Fold />
    </el-icon>
  </div>
</template>

<style scoped>
  .hamburger-container {
    padding: 0 15px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .hamburger-container .icon {
    font-size: 24px;
    cursor: pointer;
  }
</style>
