<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const todos: any = reactive([
    {
      description: 'Estudar Typescript',
      done: true,
    },
    {
      description: 'Fazer a prova online',
      done: false,
    },
    {
      description: 'Cortar a grama',
      done: false,
    }
  ]);
  const description = ref("");

  function addItem() {
    if (!description.value) return;
    if (todos.some((item: any) => item.description === description.value)) return;
    if (todos.filter((item: any) => !item.done).length > 4) return;
    todos.push({ description: description.value, done: false });
    description.value = '';
  }

  function removeItem(item: any) {
    todos.splice(todos.indexOf(item), 1);
  }

  function toggleDone(item: any) {
    item.done = !item.done;
  }
</script>

<template>
  <div v-if="todos.length === 0">No Item</div>
  <div v-for="item in todos">
    <span :style="{ 'text-decoration': (item.done) ? 'line-through': ''}">
      {{ item.description}}
    </span>
    <button @click="toggleDone(item)">Done/Undone</button>
    <button @click="removeItem(item)">x</button>
  </div>
  {{ description }}
  <input type="text" v-model="description" v-on:keyup.enter="addItem()"/>
</template>

<style scoped>

</style>
