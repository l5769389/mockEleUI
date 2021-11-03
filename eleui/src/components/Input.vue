<template>
  <div class="container">
<!--    普通-->
<!--    <el-input v-model="input" placeholder="请输入内容"></el-input>-->
<!--    disable-->
<!--    <el-input-->
<!--        placeholder="请输入内容"-->
<!--        v-model="input"-->
<!--        :disabled="true">-->
<!--    </el-input>-->

    clear
    <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
    </el-input>

    password
    <el-input placeholder="请输入密码" v-model="input" show-password></el-input>


    属性方式：
    <el-input
        placeholder="请选择日期"
        suffix-icon="el-icon-date"
        v-model="input1">
    </el-input>
    <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input2">
    </el-input>

  <div class="demo-input-suffix">
    slot 方式：
    <el-input
        placeholder="请选择日期"
        v-model="input3">
      <i slot="suffix" class="el-input__icon el-icon-date"></i>
    </el-input>
    <el-input
        placeholder="请输入内容"
        v-model="input4">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>



    <div style="margin-top: 20px">
      <el-input
          type="textarea"
          :autosize="{ minRows: 2, }"
          placeholder="请输入内容"
          v-model="textarea2">
      </el-input>
    </div>
  </div>
</template>
<style>
  .container{
    width: 500px;
  }
</style>
<script>
import ElInput from "../../packages/input";
export default {
  name: "TestInput",
  components:{
    ElInput,
  },
  data() {
    return {
      input: '',
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      textarea2: ''
    }
  }
}
</script>

