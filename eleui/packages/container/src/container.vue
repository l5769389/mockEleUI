<template>
  <section class="el-container" :class="{'is-vertical':isVertical}"></section>
</template>

<script>
export default {
  name: "ElContainer",
  props:{
    direction:String,
  },
  computed:{
    isVertical:function () {
        if (this.direction === 'vertical'){
          return true;
        }
      if (this.direction === 'horizontal'){
        return false;
      }
      if (this.$slots && this.$slots.default){
          console.log(this.$slots.default)
      }
      return  true;
    }
  }
}
</script>

<style scoped>

</style>
