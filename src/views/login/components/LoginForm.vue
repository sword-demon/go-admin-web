<script lang='ts' setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { loginApi } from '@/api/login'
  import useUserStore from '@/store/modules/user.ts'

  defineOptions({ name: 'LoginForm' })

  const router = useRouter()
  const userStore = useUserStore()
  // 表单实例对象
  const ruleFormRef = ref<FormInstance>()
  // 表单数据对象 设置默认值
  const ruleForm = reactive({
    username: 'admin',
    password: '123456',
  })
  // 登录表单验证规则
  const rules = reactive<FormRules>({
    username: [
      { required: true, trigger: 'blur', message: '用户名不能为空' },
    ],
    password: [
      { required: true, trigger: 'blur', message: '密码不能为空' },
    ],
  })
  // 提交表单后的状态
  const loading = ref(false)

  const submitForm = (formRef) => {
    if (!formRef) return
    loading.value = true
    formRef.validate(async (valid) => {
      // 前端验证通过
      if (valid) {
        const { data } = await loginApi({ ...ruleForm })
        console.log('data', data)
        if (data.code === 200) {
          // 设置 token
          userStore.setToken(data.data.token)
          userStore.setRefreshToken(data.data.refresh_token)
          // userStore.setUserInfo(data.userInfo)
          setTimeout(() => {
            router.push({ path: '/home' })
          }, 1500)

          ElNotification.success({
            title: '登录成功',
            message: '欢迎登录后台管理系统',
            duration: 3000,
          })
        } else {
          ElNotification.error({
            message: data.msg,
            title: '温馨提示',
            duration: 3000,
          })
        }
      } else {
        ElNotification({
          title: '温馨提示',
          message: '提交表单失败，你还有未填写的项！',
          type: 'error',
          duration: 3000,
        })
        return false
      }
    })
    loading.value = false
  }
</script>

<template>
  <el-form ref='ruleFormRef' :model='ruleForm' :rules='rules'>
    <el-form-item prop='username'>
      <el-input placeholder='请输入用户名' clearable style='position: relative;'
                v-model='ruleForm.username'>
        <template #prefix>
          <el-icon class=''>
            <UserFilled />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop='password'>
      <el-input type='password' clearable show-password placeholder='请输入密码' v-model='ruleForm.password'>
        <template #prefix>
          <el-icon>
            <GoodsFilled />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button :loading='loading' class='login-btn' type='primary'
                 @click='submitForm(ruleFormRef)'>
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
  .login-btn {
    margin-top: 20px;
    width: 100%;
    height: 47px;
  }

  /*::v-deep(.svg-icon) {*/
  /*  vertical-align: 0;*/
  /*}*/
</style>
