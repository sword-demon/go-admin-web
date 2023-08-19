<!--<script lang='ts' setup>-->
<!--  import { reactive } from 'vue'-->

<!--  const userForm = reactive({-->
<!--    id: 0,-->
<!--    username: '',-->
<!--    password: '',-->
<!--    email: '',-->
<!--    phone: '',-->
<!--    remarks: '',-->
<!--  })-->
<!--</script>-->

<!--<template>-->
<!--  <el-form :model='userForm' label-width='120px'>-->
<!--    <el-row>-->
<!--      <el-col :span='12'>-->
<!--        <el-form-item label='用户名' prop='username'>-->
<!--          <el-input v-model='userForm.username' placeholder='请输入用户名'></el-input>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span='12'>-->
<!--        <el-form-item label='密码' prop='password'>-->
<!--          <el-input v-model='userForm.password' placeholder='请输入密码' show-password type='password'></el-input>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span='12'>-->
<!--        <el-form-item label='手机号码' prop='phone'>-->
<!--          <el-input v-model='userForm.phone' placeholder='请输入手机号码'></el-input>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span='12'>-->
<!--        <el-form-item label='邮箱' prop='email'>-->
<!--          <el-input v-model='userForm.email' placeholder='请输入邮箱'></el-input>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--      <el-col :span='24'>-->
<!--        <el-form-item label='备注' prop='remarks'>-->
<!--          <el-input v-model='userForm.remarks' placeholder='请输入备注' type='textarea'></el-input>-->
<!--        </el-form-item>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </el-form>-->

<!--  <div class='dialog-button-wrap'>-->
<!--    <el-button @click='closeDialog(userFormRef)'>取消</el-button>-->
<!--    <el-button type='primary' :loading='submitLoading' @click='submitUser(userFormRef)'>保存</el-button>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped></style>-->
