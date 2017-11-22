<template>
  <el-tabs type="border-card">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-upload"></i>导入客户</span>
      <el-form :model="importForm" :rules="rules" ref="ruleForm" class="import-form">
        <el-row>
          <el-col :span="8">
            <el-upload
              class="upload-demo"
              name="imageFile"
              action="http://vue-storeapi-web.dev.com/import/excel"
              :headers="uploadHeader"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传.csv格式文件，且文件大小不超过5M(限100000条以内)</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="import-tips">
              <ul>
                <li v-for="tip in tips" :key="tip" class="import-item import-text">{{tip}}</li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="import-submit">
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-document"></i>导入日志</span>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="导入文件名称"
          width="220">
        </el-table-column>
        <el-table-column
          prop="name"
          label="总记录数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="成功">
        </el-table-column>
        <el-table-column
          prop="address"
          label="失败">
        </el-table-column>
        <el-table-column
          prop="address"
          label="导入时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="address"
          label="下载">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-upload" plain>导入文件</el-button>
            <el-button type="warning" size="mini" icon="el-icon-info" plain>失败记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .import-form {
    margin-left: 24px;
    margin-top: 16px;
  }

  .import-tips {
    margin-top: 48px;
  }

  .import-text {
    font-size: 13px;
    color: #5a5e66;
  }

  .import-item {
    margin-bottom: 8px;
  }

  .import-submit {
    margin: 26px auto;
    text-align: center;
  }
</style>
<script type="text/javascript">
  import {getAuthorization} from 'common/authorization'

  export default {
    data() {
      return {
        importForm: {},
        rules: {},
        uploadHeader: {
          'Authorization': getAuthorization()
        },
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        tips: ['请按固定格式导入文件', '若手机号码存在，导入的数据会覆盖原有的数据;', '每次最多只能导入5M内，100000条数据'],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      }
    }
  }
</script>
