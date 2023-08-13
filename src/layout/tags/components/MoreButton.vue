<script lang='ts' setup>
  import useSettingStore from '@/store/modules/setting'
  import useTagsStore from '@/store/modules/tags'
  import { useRoute, useRouter } from 'vue-router'
  import { computed } from 'vue'

  const settingStore = useSettingStore()
  const tagStore = useTagsStore()
  const route = useRoute()
  const router = useRouter()

  const visitedViews = computed(() => tagStore.visitedViews)

  // 关闭其他标签
  const closeOtherTab = async () => {
    tagStore.delOtherViews(route.path)
  }

  // 关闭所有标签
  const closeAllTab = async () => {
    await tagStore.delAllViews()
    tagStore.goHome()
  }
</script>

<template>
  <el-dropdown trigger='hover'>
    <el-button size='small' color='#e99d53'>
      <span class='more'>更多</span>
      <el-icon>
        <ArrowDown />
      </el-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-item @click='closeOtherTab'>
        <el-icon size='14'>
          <Close />
        </el-icon>
        关闭其他
      </el-dropdown-item>
      <el-dropdown-item @click='closeAllTab'>
        <el-icon size='14'>
          <FolderDelete />
        </el-icon>
        关闭所有
      </el-dropdown-item>
    </template>
  </el-dropdown>
</template>

<style scoped>
  .more {
    color: white;
  }
</style>
