import ElContainer from './src/container'
ElContainer.install =function (Vue) {
    Vue.component(ElContainer.name,ElContainer);
}

export default ElContainer;
