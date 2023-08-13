<script lang='ts' setup>
  import { useRoute, useRouter } from 'vue-router'
  import { computed } from 'vue'

  defineOptions({ name: 'BreadCrumb' })
  const route = useRoute()
  const router = useRouter()
  const matched = computed(() => route.matched.filter(item => item.meta && item.meta.title))

  const handleLink = (item) => {
    router.push({
      path: item.path,
    })
  }
</script>

<template>
  <el-breadcrumb>
    <!-- 动态展示路由属性 这里不能使用 v-if 因为和 v-for 优先级来说 v-if 比极高，所以使用 v-show -->
    <el-breadcrumb-item
      v-for='(item, index) in route.matched'
      :key='index'
      v-show='item.meta.title'
      :to='item.path'
    >
      <el-icon style='vertical-align: middle'>
        <component :is='item.meta.icon'></component>
      </el-icon>
      <span style='margin: 0 5px; vertical-align: middle'>
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped></style>
