<script lang='ts' setup>
  import { useRoute } from 'vue-router'
  import useMenuStore from '@/store/modules/menu'
  import { ref } from 'vue'

  defineOptions({
    name: 'Aside',
  })

  const route = useRoute()
  const menuStore = useMenuStore()

  // 获取菜单数据
  const { routers } = menuStore.routers
  const menuData = ref()
  menuData.value = routers

</script>

<template>
  <el-menu text-color='#67879b' router :default-active='route.path' :unique-opened='false'
           :default-openeds='[route.path]' class='el-menu-vertical-demo'>
    <!-- logo start -->
    <div class='imageBox'>
      <img src='@/assets/logo01.png' alt='logo'>
    </div>
    <!-- logo end -->

    <!-- 遍历菜单 -->
    <template v-for='(v, index) in menuData' :key='index'>
      <el-sub-menu v-if='v.sub_menus.length > 0' :index='v.path'>
        <template #title>
          <el-icon>
            <component :is='v.web_icon'></component>
          </el-icon>
          <span>{{ v.name }}</span>
        </template>

        <el-menu-item v-for='child in v.sub_menus' :key='child.path' :index='child.path'>
          <el-icon>
            <component :is='child.web_icon'></component>
          </el-icon>
          <span>{{ child.name }}</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 没有子菜单 -->
      <el-menu-item v-if='v.sub_menus.length === 0' :key='v.path' :index='v.path'>
        <el-icon>
          <component :is='v.web_icon'></component>
        </el-icon>
        <span>{{ v.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style scoped>
  .imageBox {
    width: 100%;
    height: 70px;
  }

  .imageBox img {
    margin: 1%;
  }

  .el-menu {
    height: 100%;
    border: none;
  }

  :deep(.el-menu-item.is-active) {
    color: white;
    background: linear-gradient(to right, #e99d53, #a39a32, #3263a3);
  }
</style>
