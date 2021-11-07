<template>
  <div class="el-input-number"
       :class="[
      inputNumberSize ? 'el-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]"
    >
    <span
        class="el-input-number__decrease"
        role="button"
        v-if="controls"
        :class="{'is-disabled': minDisabled}"
        @click="decrease"
        @keydown.enter="decrease">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>

    <span
        class="el-input-number__increase"
        role="button"
        v-if="controls"
        :class="{'is-disabled': maxDisabled}"
        @click="increase"
        @keydown.enter="increase">
      <i :class="`el-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>

    <el-input
        ref="input"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="inputNumberDisabled"
        :size="inputNumberSize"
        :max="max"
        :min="min"
        :name="name"
        :label="label"
            @keydown.up.native.prevent="increase"
            @keydown.down.native.prevent="decrease"
            @blur="handleBlur"
            @focus="handleFocus"
            @input="handleInput"
            @change="handleInputChange"
        >


    </el-input>

  </div>
</template>

<script>
import ElInput from '../../input'
export default {
  name: 'ElInputNumber',
  components:{
    ElInput,
  },
  props: {
    step: {
      type: Number,
      default: 1
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {},
    disabled: Boolean,
    size: String,
    controls: {
      type: Boolean,
      default: true
    },
    controlsPosition: {
      type: String,
      default: ''
    },
    name: String,
    label: String,
    placeholder: String,
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && val === parseInt(val, 10);
      }
    }
  },
  computed: {
    minDisabled() {
      return this._decrease(this.value, this.step) < this.min;
    },
    maxDisabled() {
      return this._increase(this.value, this.step) > this.max;
    },
    numPrecision() {
      const { value, step, getPrecision, precision } = this;
      const stepPrecision = getPrecision(step);
      if (precision !== undefined) {
        if (stepPrecision > precision) {
          console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
        }
        return precision;
      } else {
        return Math.max(getPrecision(value), stepPrecision);
      }
    },
    controlsAtRight() {
      return this.controls && this.controlsPosition === 'right';
    },

    inputNumberSize() {
      return this.size
    },
    inputNumberDisabled() {
      return this.disabled
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }

      let currentValue = this.currentValue;

      if (typeof currentValue === 'number') {
        if (this.stepStrictly) {
          const stepPrecision = this.getPrecision(this.step);
          const precisionFactor = Math.pow(10, stepPrecision);
          currentValue = Math.round(currentValue / this.step) * precisionFactor * this.step / precisionFactor;
        }

        if (this.precision !== undefined) {
          currentValue = currentValue.toFixed(this.precision);
        }
      }

      return currentValue;
    }
  },
  data() {
    return {
      currentValue: 0,
      userInput: null
    };
  },
  watch:{
    value: {
      immediate: true,
      handler(value) {
        let newVal = value === undefined ? value : Number(value);
        console.log(1)
        if (newVal !== undefined) {
          if (isNaN(newVal)) {
            return;
          }
          if (this.stepStrictly) {
            const stepPrecision = this.getPrecision(this.step);
            const precisionFactor = Math.pow(10, stepPrecision);
            newVal = Math.round(newVal / this.step) * precisionFactor * this.step / precisionFactor;
          }
          if (this.precision !== undefined) {
            newVal = this.toPrecision(newVal, this.precision);
          }
        }
        if (newVal >= this.max) newVal = this.max;
        if (newVal <= this.min) newVal = this.min;
        this.currentValue = newVal;
        this.userInput = null;
        this.$emit('input', newVal);
      }
    }
  },
  methods:{
    increase(){
      if (this.inputNumberDisabled || this.maxDisabled) return;
      const value = this.value || 0;
      const newVal = this._increase(value, this.step);
      this.setCurrentValue(newVal);
    },
    decrease(){
      if (this.inputNumberDisabled || this.minDisabled) return;
      const value = this.value || 0;
      const newVal = this._decrease(value, this.step);
      this.setCurrentValue(newVal);
    },
    _increase(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;

      const precisionFactor = Math.pow(10, this.numPrecision);
      // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
      return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
    },
    _decrease(val, step) {
      if (typeof val !== 'number' && val !== undefined) return this.currentValue;

      const precisionFactor = Math.pow(10, this.numPrecision);

      return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
    },
    toPrecision(num, precision) {
      if (precision === undefined) precision = this.numPrecision;
      return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision));
    },
    getPrecision(value) {
      if (value === undefined) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf('.');
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    handleInputChange(value) {
      const newVal = value === '' ? undefined : Number(value);
      if (!isNaN(newVal) || value === '') {
        this.setCurrentValue(newVal);
      }
      this.userInput = null;
    },
    setCurrentValue(newVal) {
      const oldVal = this.currentValue;
      if (typeof newVal === 'number' && this.precision !== undefined) {
        newVal = this.toPrecision(newVal, this.precision);
      }
      if (newVal >= this.max) newVal = this.max;
      if (newVal <= this.min) newVal = this.min;
      if (oldVal === newVal) return;
      this.userInput = null;
      this.$emit('input', newVal);
      this.$emit('change', newVal, oldVal);
      this.currentValue = newVal;
    },
    handleBlur(event) {
      this.$emit('blur', event);
    },
    handleFocus(event) {
      this.$emit('focus', event);
    },
    handleInput(value) {
      this.userInput = value;
    },
  }
};
</script>
