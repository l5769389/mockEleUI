<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容"></el-input>

    <el-input
        placeholder="请输入内容"
        v-model="input"
        :disabled="true">
    </el-input>


    <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
    </el-input>
  </div>
</template>

<script>
import ElInput from "../../packages/input";
export default {
  name: "TestInput",
  components:{
    ElInput,
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>

