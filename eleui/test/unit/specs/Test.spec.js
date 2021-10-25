import Vue from 'vue'
import Test from '@/components/Test.vue'

describe('Test.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Test)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
