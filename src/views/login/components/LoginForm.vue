<script lang='ts' setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElNotification } from 'element-plus'
  import { useRouter } from 'vue-router'

  defineOptions({ name: 'LoginForm' })

  const router = useRouter()
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

    ElNotification.success({ message: 'ok' })
    loading.value = false
  }
</script>

<template>
  <el-form ref='ruleFormRef' :model='ruleForm' :rules='rules'>
    <el-form-item label='用户名' prop='username'>
      <el-input placeholder='请输入用户名' autocomplete='off' style='position: relative;'
                v-model='ruleForm.username'>
        <template #prefix>
          <el-icon class=''>
            <UserFilled />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop='password'>
      <el-input type='password' show-password placeholder='请输入密码' v-model='ruleForm.password'>
        <template #prefix>
          <el-icon>
            <GoodsFilled />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item style='width: 100%'>
      <el-button :loading='loading' class='login-btn' color='#e99d63' @click='submitForm(ruleFormRef)'>
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
