<template>
  <div
      :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    inputSize ? 'el-input--' + inputSize : '',
    {
      'is-disabled': inputDisabled,
      // 'is-exceed': inputExceed,
      'el-input-group': $slots.prepend || $slots.append,
      'el-input-group--append': $slots.append,
      'el-input-group--prepend': $slots.prepend,
      'el-input--prefix': $slots.prefix || prefixIcon,
      'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
    }
    ]"
  >
   <!--    正常input-->
  <template v-if="type !=='textarea'">
        <!-- 前置元素 -->
        <div class="el-input-group__prepend" v-if="$slots.prepend">
          <slot name="prepend"/>
        </div>
    <!-- 前置内容 -->
    <span class="el-input__prefix" v-if="$slots.prefix || prefixIcon">
        <slot name="prefix"></slot>
        <i class="el-input__icon"
           v-if="prefixIcon"
           :class="prefixIcon">
        </i>
      </span>

    <input
      class="el-input__inner"
      :disabled="inputDisabled"
      v-bind="$attrs"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      ref="input"
      :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
    >
    <!-- 后置内容 -->
    <span
        class="el-input__suffix"
        v-if="getSuffixVisible">
        <span class="el-input__suffix-inner">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i class="el-input__icon"
               v-if="suffixIcon"
               :class="suffixIcon">
            </i>
          </template>
          <i v-if="showClear"
             class="el-input__icon el-icon-circle-close el-input__clear"
             @mousedown.prevent
             @click="clear"
          ></i>
          <i v-if="showPwdVisible"
             class="el-input__icon el-icon-view el-input__clear"
             @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" class="el-input__count">
            <span class="el-input__count-inner">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
        </span>
        <i class="el-input__icon"
           v-if="validateState"
           :class="['el-input__validateIcon', validateIcon]">
        </i>
      </span>
    <!-- 后置元素 -->
    <div class="el-input-group__append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </template>
    <!--    textarea-->
    <template v-else>
      <textarea
          class="el-textarea__inner"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          ref="textarea"
          v-bind="$attrs"
          :disabled="inputDisabled"
          :style="textareaStyle"
      >

      </textarea>
  </template>
       <!--   字数信息 -->
    <span></span>
  </div>
</template>

<script>
import calcTextareaHeight from "./calcTextareaHeight";

export default {
  name: 'ElInput',
  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      // eslint-disable-next-line no-unused-vars
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
        console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    tabindex: String
  },
  data(){
    return {
      textareaCalcStyle:{},
      hovering: false,
      focused: false,
      passwordVisible: false
    }
  },
  computed:{
    inputSize:function () {
      return this.size;
    },
    inputDisabled:function () {
      return this.disabled;
    },
    nativeInputValue() {
      return this.value === null || this.value === undefined ? '' : String(this.value);
    },
    showClear() {
      return this.clearable &&
          !this.inputDisabled &&
          !this.readonly &&
          this.nativeInputValue &&
          (this.focused || this.hovering);
    },
    showPwdVisible() {
      return this.showPassword &&
          !this.inputDisabled
    },
    isWordLimitVisible() {
      return this.showWordLimit &&
          this.$attrs.maxlength &&
          (this.type === 'text' || this.type === 'textarea') &&
          !this.inputDisabled &&
          !this.readonly &&
          !this.showPassword;
    },
    getSuffixVisible() {
      return this.$slots.suffix ||
          this.suffixIcon ||
          this.showClear ||
          this.showPassword ||
          this.isWordLimitVisible
    },
    validateState() {
      return '';
    },
    textareaStyle(){
      return Object.assign({},this.textareaCalcStyle,{
        resize:this.resize
      })
    }
  },
  watch:{
    value(){
      this.$nextTick(this.resizeTextarea);
    },
    nativeInputValue() {
      this.setNativeInputValue();
    },
  },
  methods:{
    resizeTextarea(){
      const { autosize, type } = this;
      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;
      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(() => {
        this.focus();
      });
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handleInput(e){
      this.$emit('input', e.target.value);
      this.$nextTick(this.setNativeInputValue);
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
  }
};
</script>
