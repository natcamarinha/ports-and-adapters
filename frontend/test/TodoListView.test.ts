import { mount } from '@vue/test-utils';
import TodoListViewVue from '../src/components/TodoListView.vue';
import TodoMemoryGateway from '../src/gateways/TodoMemoryGateway';

function sleep(mili: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, mili);
  });
}

test('Deve testar a tela de todo list', async () => {
  const todoGateway = new TodoMemoryGateway();
  const wrapper = mount(TodoListViewVue, {
    global: {
      provide: {
        todoGateway
      }
    }
  });
  await sleep(100);
  expect(wrapper.get(".completed").text()).toBe('33%');
})
