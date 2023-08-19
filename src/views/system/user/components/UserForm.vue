<script lang='ts' setup>
  import { reactive, ref, watch } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { addUserApi, updateUserApi, UpdateUserRequest } from '@/api/system/user'

  const props = defineProps<{
    userInfo: UpdateUserRequest
  }>()

  // 表单提交内容
  const userForm = reactive({
    id: 0,
    username: '',
    // 默认密码
    password: '123456',
    phone: '',
    remarks: '',
    email: '',
  })

  watch(() => props.userInfo, (newValue) => {
    // console.log('newValue', newValue)
    Object.assign(userForm, newValue)
  }, { immediate: true })

  // 表单提交实例
  const userFormRef = ref<FormInstance>()
  // 表单提交规则
  const rules = reactive<FormRules>({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  })

  // 调用父组件的关闭弹窗事件
  // 调用父组件的关闭弹窗事件后刷新列表页
  const emit = defineEmits(['closeUserForm', 'submitSuccess'])

  // 提交 loading
  const submitLoading = ref(false)

  // 提交用户信息
  const submitUser = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    submitLoading.value = true
    formEl.validate(async (valid) => {
      if (valid) {
        if (userForm.id > 0) {
          // 无 data 返回值
          const { code, msg } = await updateUserApi({ ...userForm })
          if (code !== 200) {
            ElMessage({
              type: 'error',
              message: msg,
            })
            submitLoading.value = false
            return
          }

          ElMessage({
            type: 'success',
            message: msg,
            duration: 2000,
          })
          submitLoading.value = false
          // 通知父组件关闭弹窗
          emit('submitSuccess')
          return
        } else {
          // 无 data 返回值
          const { code, msg } = await addUserApi({
            username: userForm.username,
            password: userForm.password,
            phone: userForm.phone,
            remarks: userForm.remarks,
            email: userForm.email,
          })
          if (code !== 200) {
            ElMessage({
              type: 'error',
              message: msg,
            })
            submitLoading.value = false
            return
          }

          ElMessage({
            type: 'success',
            message: msg,
            duration: 2000,
          })
          submitLoading.value = false
          // 通知父组件关闭弹窗
          emit('submitSuccess')
          return
        }
      } else {
        ElMessage({
          type: 'error',
          message: '表单内容参数不符合提交规定',
        })
        submitLoading.value = false
        return
      }
    })
  }

  /**
   * 重置表单
   * @param formEl
   */
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

  /**
   * 关闭父组件弹窗
   * @param formEl
   */
  const closeDialog = (formEl: FormInstance | undefined) => {
    // 清空表单
    resetForm(formEl)
    // 通知父组件关闭弹窗
    emit('closeUserForm')
  }
</script>

<template>
  <el-form ref='userFormRef' :rules='rules' :model='userForm' label-width='125'>
    <el-row>
      <el-col :span='12'>
        <el-form-item label='用户名' prop='username'>
          <el-input v-model='userForm.username' placeholder='请输入用户名'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item label='密码' prop='password'>
          <el-input v-model='userForm.password' placeholder='请输入密码' show-password type='password'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item label='手机号码' prop='phone'>
          <el-input v-model='userForm.phone' placeholder='请输入手机号码'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span='12'>
        <el-form-item label='邮箱' prop='email'>
          <el-input v-model='userForm.email' placeholder='请输入邮箱'></el-input>
        </el-form-item>
      </el-col>
      <el-col :span='24'>
        <el-form-item label='备注' prop='remarks'>
          <el-input v-model='userForm.remarks' placeholder='请输入备注' type='textarea'></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>

  <div class='dialog-button-wrap'>
    <el-button @click='closeDialog(userFormRef)'>取消</el-button>
    <el-button type='primary' :loading='submitLoading' @click='submitUser(userFormRef)'>保存</el-button>
  </div>
</template>

<style scoped>
  .dialog-button-wrap {
    text-align: center;
    margin-top: 20px;
  }
</style>
