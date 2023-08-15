<script lang='ts' setup>
  import LoginForm from './components/LoginForm.vue'
</script>

<template>
  <div class='login-container'>
    <div class='login-box'>
      <!-- 左边背景图 start -->
      <div class='login-left'>
        <img src='@/assets/login/side-logo.png' alt=''>
      </div>
      <!-- 左边背景图 end -->

      <!-- 登录表单 start -->
      <div class='login-form'>
        <!-- 标题和 logo start -->
        <div class='login-title'>
          <img src='@/assets/logo2.png' alt=''>
        </div>
        <!-- 标题和 logo end -->
        <h2 class='title'>后台管理系统</h2>

        <!-- 登录表单组件 start -->
        <LoginForm />
        <!-- 登录表单组件 end -->
      </div>
      <!-- 登录表单 end -->
    </div>
  </div>
</template>

<style scoped></style>
