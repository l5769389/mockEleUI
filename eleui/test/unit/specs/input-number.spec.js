import { createTest, destroyVM } from '../util';
import InputNumber from 'packages/input-number';

describe('InputNumber', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(InputNumber, true);
    expect(vm.$el).to.exist;
  });
});

