<template>
  <div class="main-content ofh">
    <el-row>
      <el-col :span="24">
        <div class="wrapper">
          <div class="pageContent">
            <el-row>
              <el-col :span="24">
                <slot></slot>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/javascript">
  import hSection from './headerSection'

  export default{
    name: 'content',
    components: {
      hSection,
    }
  }
</script>
