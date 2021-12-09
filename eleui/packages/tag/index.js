import Tag from './src/Tag';

/* istanbul ignore next */
Tag.install = function(Vue) {
  Vue.component(Tag.name, Tag);
};

export default Tag;
