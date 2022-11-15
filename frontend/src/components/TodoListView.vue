<script setup lang="ts">
  import { inject, onMounted, reactive } from 'vue';
  import Observer from '../entities/Observer';
  import TodoList from '../entities/TodoList';
  import TodoGateway from '../gateways/TodoGateway';
  import TodoListComponent from './TodoListComponent.vue';

  const data: any = reactive({ todoList: new TodoList() });

  const todoGateway = inject('todoGateway') as TodoGateway;

  onMounted(async () => {
    const todoList = await todoGateway.getTodos();

    todoList.register(new Observer('addItem', async (item: any) => {
      await todoGateway.addItem(item);
    }));

    todoList.register(new Observer('removeItem', async (item: any) => {
      await todoGateway.removeItem(item.id);
    }));

    todoList.register(new Observer('toggleDone', async (item: any) => {
      await todoGateway.updateItem(item);
    }));
    
    data.todoList = todoList;   
  })
</script>

<template>
  <TodoListComponent :todo-list="data.todoList"></TodoListComponent>
</template>

<style scoped>

</style>
