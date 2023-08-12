<script lang='ts' setup>
</script>

<template>
  <h1>登录页面</h1>
  <el-row span='8'></el-row>
  <el-row span='8'>
    <el-form>
      <el-form-item>
        <el-input placeholder='请输入账号' clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder='请输入密码' show-password type='password' clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary'>登录
          <svg-icon iconClass='eye'></svg-icon>
          <svg-icon iconClass='eye-open'></svg-icon>
        </el-button>
      </el-form-item>
    </el-form>
  </el-row>
  <el-row span='8'></el-row>

</template>

<style scoped></style>
