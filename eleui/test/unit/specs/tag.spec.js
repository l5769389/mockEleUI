import { createTest, destroyVM } from '../util';
import Tag from 'packages/tag';

describe('Tag', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Tag, true);
    expect(vm.$el).to.exist;
  });
});

