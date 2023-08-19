<script lang='ts' setup>
  import useTagsStore from '@/store/modules/tags'
  import { computed, onMounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { TabsPaneContext } from 'element-plus'
  import MoreButton from '@/layout/tags/components/MoreButton.vue'

  const tagStore = useTagsStore()
  const route = useRoute()
  const router = useRouter()

  const activeTabsValue = computed({
    get: () => {
      return tagStore.activeTabsValue
    },
    set: (val) => {
      tagStore.setTabsMenuValue(val)
    },
  })
  const visitedViews = computed(() => tagStore.visitedViews)

  // 显示上一个或者下一个 tabs 标签
  const toLastViews = (activeTabPath) => {
    // 当前 tabs 标签的索引
    let index = visitedViews.value.findIndex(item => item.path === activeTabPath)
    // 获取下一个 tabs 索引或者上一个索引
    const nextTab = visitedViews.value[index + 1] || visitedViews.value[index - 1]
    // 判断是否存在
    if (!nextTab) {
      return
    }
    router.push(nextTab.path)
    // 新增 tabs 标签的函数
    tagStore.addVisitedViews(nextTab)
  }

  // 点击tabs 标签事件
  const tabClick = (tabItem: TabsPaneContext) => {
    console.log('tabItem', tabItem)
    let path = tabItem.props.name as string
    router.push(path)
  }

  // 添加 tabs 标签
  const addTabs = () => {
    const { name } = route
    if (name === 'Login') return
    if (name) {
      tagStore.addViews(route)
    }
    return false
  }

  // 判断是否删除的是当前的 tabs 标签
  const isActive = (path: string): boolean => {
    return route.path === path
  }

  // 删除 tabs 标签
  const removeTab = async (activeTabPath: string) => {
    if (isActive(activeTabPath)) {
      // 转移到上一个或下一个标签
      toLastViews(activeTabPath)
    }
    await tagStore.delView(activeTabPath)
  }

  onMounted(() => {
    addTabs()
  })

  // 监听路由是否发生变化
  watch(route, () => {
    addTabs()
  })
</script>

<template>
  <div class='main-tabs-view'>
    <div class='tabs-view'>
      <el-tabs v-model='activeTabsValue' type='card' @tabClick='tabClick' @tab-remove='removeTab'>
        <el-tab-pane v-for='item in visitedViews' :key='item.path' :name='item.path' :path='item.path'
                     :label='item.title'
                     :closable='!(item.meta && item.meta.affix)'>
          <template #label>
            <el-icon class='tabs-icon' v-if='item.icon'>
              <component :is='item.icon'></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class='right-btn'>
      <MoreButton />
    </div>
  </div>
</template>

<style scoped>
  .main-tabs-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    background: white;
  }

  .tabs-view {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
  }

  :deep(.el-tabs) {
    border-top: 1px solid #107c94;
  }

  :deep(.el-tabs .el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs .el-tabs__header .el-tabs__item ) {
    border: none;
    color: #cccccc;
  }

  :deep(.el-tabs .el-tabs__header .el-tabs__item.is-active ) {
    color: #0a119d;
    border-bottom: 2px solid #033f3f;
  }

</style>
