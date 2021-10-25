<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled = "disabled"
    :class="[
        type ? `el-button--${type}`:'',
        size ? `el-button--${size}`:'',
        {
          'is-disabled':disabled,
          'is-loading': loading,
          'is-plain': plain,
          'is-round': round,
          'is-circle': circle
        }
    ]"
  >
    <i class="el-icon-loading" v-if="loading" v></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default">
        <slot/>
    </span>
  </button>
</template>

<script>
export default {
  name: "ElButton",
  props:{
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },

  methods:{
    handleClick(e){
      this.$emit('click',e)
    }
  }
}
</script>
