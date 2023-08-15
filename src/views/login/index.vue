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
          <img class='icon' src='@/assets/logo2.png' alt=''>
          <h2 class='title'>后台管理系统</h2>
        </div>
        <!-- 标题和 logo end -->

        <!-- 登录表单组件 start -->
        <LoginForm />
        <!-- 登录表单组件 end -->
      </div>
      <!-- 登录表单 end -->
    </div>
  </div>
</template>

<style scoped>
  .login-container {
    background-color: #f0f2f5;
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding: 25px 25px;
    box-sizing: border-box;
    background-image: url("@/assets/login/login_bg.svg");
  }

  .login-box {
    border-radius: 8px;
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-left {
    width: 50%;
  }

  .login-title img {
    width: 100%;
  }

  .login-form {
    max-width: 480px;
    padding: 40px;
    width: 50%;
    border-radius: 10px;
    box-shadow: 0 2px 12px rgb(0 0 0 /10%);
    box-sizing: border-box;
  }

  .login-title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 30px;
  }

  .login-title .title {
    margin: 0;
    font-size: 30px;
    white-space: nowrap;
  }

  .login-title .icon {
    width: 60px;
  }
</style>
