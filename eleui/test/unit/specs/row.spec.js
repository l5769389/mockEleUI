import { createTest, destroyVM } from '../util';
import Row from 'packages/row';

describe('Row', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Row, true);
    expect(vm.$el).to.exist;
  });
});

