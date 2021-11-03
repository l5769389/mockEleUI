import { createTest, destroyVM } from '../util';
import Icon from 'packages/icon';

describe('Icon', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Icon, true);
    expect(vm.$el).to.exist;
  });
});

