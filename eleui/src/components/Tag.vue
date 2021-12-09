
<template>
  <div class="container">
          <div class="list">
              <div class="item" v-for="(item,index) in list"  :key="index">

                  <div class="suffix"></div>
              </div>
          </div>
  </div>
</template>

<script>

export default {
  name: "TestElTag",
  components:{

  },
  data() {
    return {
        list:new Array(10)
    };
  },
  methods: {

  }
}
</script>

<style>
  .container{
    width: 100%;
    height: 100%;
  }
  .list{
    height: 300px;
    width: 100px;
    overflow: auto;
  }
  .item{
    width: 100%;
    height: 50px;
    position: relative;
  }
  .item:nth-child(odd){
    background-color: black;
  }
  .item:nth-child(even){
    background-color: #606266;
  }
  .suffix{
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    background-color: red;
    transform: translateX(100px);
  }
</style>
