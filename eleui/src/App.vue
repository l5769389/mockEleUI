<template>
  <div id="app">
    <Button/>
    <Row/>
    <TestInput/>
  </div>
</template>

<script>
import Button from "./components/Button";
import Row from "./components/Row";
import TestInput from "./components/Input";
export default {
  name: 'App',
  components: {
    TestInput,
    Button,
    Row
  }
}
</script>

