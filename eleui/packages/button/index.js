import ElButton from './src/button'
console.log(ElButton.name);
ElButton.install =function (Vue) {
    Vue.component(ElButton.name,ElButton);
}

export default ElButton;
