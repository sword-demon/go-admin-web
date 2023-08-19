<script lang='ts' setup>
  import { onMounted, reactive, ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { getUserListApi } from '@/api/system/user.ts'

  defineOptions({ name: 'UserList' })

  const searchForm = reactive({
    // 搜索关键字
    keyword: '',
    // 当前页码
    currentPage: 1,
    // 每页多少
    pageSize: 10,
  })

  // 表格数据加载
  const loading = ref(false)
  // 表格数据
  const tableData = ref([])
  // 表格总数
  const total = ref(0)
  // 导出加载 loading
  const exportLoading = ref(false)

  const search = async () => {
    loading.value = true
    // 清空表数据
    tableData.value = []
    const { code, data, msg } = await getUserListApi({
      keyword: searchForm.keyword,
      page: searchForm.currentPage,
      size: searchForm.pageSize,
    })
    if (code !== 200) {
      ElMessage({
        type: 'error',
        message: msg,
      })
      loading.value = false
      return
    }
    ElMessage({
      type: 'success',
      message: msg,
      duration: 500,
    })
    total.value = data.count
    tableData.value = data.list
    loading.value = false
  }

  // 挂在后里面加载列表数据
  onMounted(() => {
    search()
  })

  const handleAddUser = () => {
  }
  const exportData = () => {
    exportLoading.value = true

    exportLoading.value = false
  }

  const refresh = () => {
    search()
  }

  const handleEdit = (id: number) => {

  }

  const handleDelete = (id: number) => {
    ElMessageBox.confirm('确认删除用户?', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      // 调用删除接口
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
  }

  const handleSizeChange = (val) => {
    searchForm.pageSize = val
    search()
  }

  const handleCurrentChange = (val) => {
    searchForm.currentPage = val
    search()
  }
</script>

<template>
  <el-card class='box-card'>
    <!-- 头部布局 -->
    <template #header>
      <div class='card-header'>
        <h3>
          <el-icon style='margin-right: 10px'>
            <UserFilled />
          </el-icon>
          用户管理
        </h3>

        <!-- 搜索区域 start -->
        <div class='card-search'>
          <el-row :gutter='10'>
            <el-col :span='11'>
              <el-input prefix-icon='Search' v-model='searchForm.keyword' @keyup.enter.native='search'
                        placeholder='关键字搜索'></el-input>
            </el-col>
            <el-col :span='10'>
              <div class='my-button'>
                <el-button type='primary' plain style='width: 50%' @click='handleAddUser'>
                  <el-icon>
                    <Plus />
                  </el-icon>
                  添加用户
                </el-button>
                <el-button :loading='exportLoading' type='success' plain style='width: 50%' @click='exportData'>
                  <el-icon>
                    <Download />
                  </el-icon>
                  导出
                </el-button>
              </div>
            </el-col>
            <el-col :span='3'
                    style='display: inline-flex;justify-content: center;align-items: center;cursor: pointer'>
              <el-icon style='font-size: 20px;' @click='refresh'>
                <Refresh />
              </el-icon>
            </el-col>
          </el-row>
        </div>
        <!-- 搜索区域 end -->
      </div>
    </template>

    <!-- 表格区域 start -->
    <div class='table-box'>
      <el-table element-loading-text='数据加载中...' v-loading='loading' :data='tableData'
                style='width: 100%;text-align: center' :cell-style='{textAlign: "center"}'
                :header-cell-style='{fontSize: "15px", textAlign: "center"}'>
        <el-table-column label='序号' width='100' type='index' prop='id'></el-table-column>
        <el-table-column label='头像'>
          <template #default='scope'>
            <el-tooltip v-if='scope.row.avatar !== ""' :content='scope.row.avatar' placement='top'
                        effect='light'>
              <img :src='scope.row.avatar' style='width: 64px;height: 40px;' />
            </el-tooltip>
            <el-tag v-else type='warning'>未上传头像</el-tag>
          </template>
        </el-table-column>
        <el-table-column label='用户名称' prop='username'></el-table-column>
        <el-table-column label='手机号码' prop='phone'></el-table-column>
        <el-table-column label='创建时间' prop='created_at'></el-table-column>
        <el-table-column label='更新时间' prop='updated_at'></el-table-column>
        <el-table-column label='操作'>
          <template #default='scope'>
            <el-button type='primary' @click='handleEdit(scope.row.id)'>编辑</el-button>
            <el-button type='danger' @click='handleDelete(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 start -->
      <el-pagination
        v-model:current-page='searchForm.currentPage'
        v-model:page-size='searchForm.pageSize'
        :page-sizes='[10, 50, 100, 200]'
        small
        background
        layout='total, sizes, prev, pager, next, jumper'
        :total='total'
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
      />
      <!-- 分页组件 end -->
    </div>
    <!-- 表格区域 end -->
  </el-card>
</template>

<style scoped>
  .el-card {
    border-radius: 0;
    border: none;
  }

  .box-card {

  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .card-header h3 {
    display: inline-flex;
    justify-content: center;
    align-content: center;
  }

  .my-button {
    display: flex;
    justify-content: space-between;
  }

  /*自定义分页样式*/
  .el-pagination {
    margin-top: 20px;
    justify-content: center;
  }

  :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
    background-color: #053346;
  }
</style>
