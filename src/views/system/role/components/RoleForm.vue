<script lang='ts' setup>
  import { reactive, ref } from 'vue'
  import { ElMessage, FormInstance, FormRules } from 'element-plus'
  import { addRoleApi } from '@/api/system/role.ts'

  defineOptions({ name: 'RoleForm' })

  const emit = defineEmits(['closeForm', 'submitSuccess'])

  const roleFormRef = ref<FormInstance>()
  const roleForm = reactive({
    id: 0,
    name: '',
    remarks: '',
    sort: 1,
    is_admin: 0,
  })

  const rules = reactive<FormRules>({
    name: [{ required: true, message: '角色名称不能为空' }],
    remarks: [{ max: 200, message: '内容最大 200 个字符' }],
  })

  const submitLoading = ref(false)
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    submitLoading.value = true
    formEl.validate(async (valid) => {
      if (valid) {
        const { code, msg } = await addRoleApi({
          name: roleForm.name,
          sort: roleForm.sort,
          is_admin: roleForm.is_admin,
          remarks: roleForm.remarks,
        })
        if (code !== 200) {
          ElMessage({
            type: 'error',
            message: msg,
          })
          return
        }

        ElMessage({
          type: 'success',
          message: msg,
        })
        submitLoading.value = false
        // 通知父组件关闭弹窗
        emit('submitSuccess')
        return
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

  const closeDialog = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    resetForm(formEl)
    // 通知父组件关闭弹窗
    emit('closeForm')
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
</script>

<template>
  <el-form ref='roleFormRef' :rules='rules' :model='roleForm' label-width='125'>
    <el-form-item label='角色名称' prop='name'>
      <el-input maxlength='30' show-word-limit v-model='roleForm.name' placeholder='请输入角色名称'
                clearable></el-input>
    </el-form-item>
    <el-form-item label='排序' prop='sort'>
      <el-input-number v-model='roleForm.sort' :min='1' :max='99999' />
    </el-form-item>
    <el-form-item label='是否是超管' prop='is_admin'>
      <el-radio-group v-model='roleForm.is_admin'>
        <el-radio :label='1'>是</el-radio>
        <el-radio :label='0'>否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label='角色备注' prop='remarks'>
      <el-input show-word-limit clearable maxlength='200' v-model='roleForm.remarks' placeholder='请输入角色备注'
                type='textarea'></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click='closeDialog(roleFormRef)'>取消</el-button>
      <el-button type='primary' :loading='submitLoading' @click='submitForm(roleFormRef)'>提交</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
