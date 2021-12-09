
<template>
  <div>
    <el-input-number
        v-model="num"
        @change="handleChange"
        :min="1" :max="10"
        :step="0.1"
        :precision="2"
        step-strictly
        controls-position="right"
        label="描述文字">

    </el-input-number>
  </div>
</template>
<script>
import ElInputNumber from '../../packages/input-number'

export default {
  name:"TestInputNumber",
  components:{
    ElInputNumber,
  },
  data() {
    return {
      num: 1
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },

  }
};
</script>
