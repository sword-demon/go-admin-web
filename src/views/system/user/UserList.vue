<script lang='ts' setup>
  import { reactive } from 'vue'

  defineOptions({ name: 'UserList' })

  const searchForm = reactive({
    keyword: '',
  })

  const search = () => {
  }

  const handleAddUser = () => {
  }
  const exportData = () => {
  }

  const refresh = () => {
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
                <el-button type='success' plain style='width: 50%' @click='exportData'>
                  <el-icon>
                    <Download />
                  </el-icon>
                  导出
                </el-button>
              </div>
            </el-col>
            <el-col :span='3'
                    style='display: inline-flex;justify-content: center;align-content: center;cursor: pointer'>
              <el-icon style='font-size: 20px;' @click='refresh'>
                <Refresh />
              </el-icon>
            </el-col>
          </el-row>
        </div>
        <!-- 搜索区域 end -->
      </div>
    </template>
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
</style>
