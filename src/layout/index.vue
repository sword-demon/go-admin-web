<script lang='ts' setup>
  import AsideMenu from './aside/index.vue'
  import TopBar from './header/index.vue'

  defineOptions({
    name: 'Layout',
  })
</script>

<template>
  <div id='ebg'>

  </div>
  <div class='common-layout'>
    <el-container>
      <!-- 左侧菜单栏 start -->
      <el-aside width='auto'>
        <!-- 左侧菜单部分内容 -->
        <AsideMenu></AsideMenu>
      </el-aside>
      <!-- 左侧菜单栏 end -->
      <el-container>
        <!-- 顶部导航栏 start -->
        <el-header>
          <TopBar></TopBar>
        </el-header>
        <!-- 顶部导航栏 end -->
        <!-- 主要内容 start -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 主要内容 end -->
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
  /*  顶部导航栏样式 */
  .el-header {
    --el-header-padding: 0px;
    --el-header-height: auto;
    height: 80px;
    background: #F3F3F3;
  }

  .el-main {
    background: #F3F3F3;
  }

  .el-container {
    height: 100%;
  }

  .common-layout {
    width: 99vw;
    height: 98vh;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background-color: white;
    overflow: hidden;
  }

  /*背景图片的样式*/
  #ebg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    /*background-image: url("../assets/system-bg.jpg");*/
    /*background-size: cover;*/
    /*background-position: center center;*/
    /*background-repeat: no-repeat;*/
  }

  /*  scrollbar 样式*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 206px;
  }
</style>
