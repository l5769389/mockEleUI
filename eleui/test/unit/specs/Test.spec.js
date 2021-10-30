import Vue from 'vue'
import Button from 'packages/button'
import {createTest} from "../util";

describe('Button', () => {
  let vm;
  it('create', function () {
      vm = createTest(Button,{
          type:'primary'
      },true)
  })
    let buttonElm =vm.$el;
  expect(buttonElm.classList.contains('el-button--primary')).to.be.true;
})
