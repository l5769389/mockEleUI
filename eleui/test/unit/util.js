import Vue from "vue";
let id =0;
const createElm = () => {
  const ele = document.createElement('div');
  ele.id='app'+ ++id;
  document.appendChild(ele);
  return ele;
}

export const createTest = (Comp,propsData,mounted = false) => {
    const ele =createElm();
    const Ctor =Vue.extend(Comp);
    return new Ctor({propsData}).$mount(mounted ===false ?null: ele);
}
