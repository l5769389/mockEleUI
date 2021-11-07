<template>
  <div class="container">
      <el-input v-model="val" />
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
  data(){
    return {
      val:''
    }
  }
}
</script>

