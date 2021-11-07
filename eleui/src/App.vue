<template>
  <div id="app">
    <Button/>
    <Row/>
    <TestInput/>
    <TestInputNumber/>
  </div>
</template>

<script>
import Button from "./components/Button";
import Row from "./components/Row";
import TestInput from "./components/Input";
import TestInputNumber from './components/InputNumber'
export default {
  name: 'App',
  components: {
    TestInput,
    Button,
    Row,
    TestInputNumber
  }
}
</script>

