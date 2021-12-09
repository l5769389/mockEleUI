<template>
  <div id="app">
    <Button/>
    <Row/>
    <TestInput/>
    <TestInputNumber/>
    <TestElTag/>
    <Test/>
  </div>
</template>

<script>
import Button from "./components/Button";
import Row from "./components/Row";
import TestInput from "./components/Input";
import TestInputNumber from './components/InputNumber'
import TestElTag from "./components/Tag";
import Test from "./components/Test";
export default {
  name: 'App',
  components: {
    TestElTag,
    TestInput,
    Button,
    Row,
    TestInputNumber,
    Test,
  }
}
</script>

