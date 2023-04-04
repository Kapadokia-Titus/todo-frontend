<template>
  <v-container class="h-100">
    <p class="font-weight-bold">Pending Todos</p>
    <div class="mt-4">
      <TodoItem
        v-for="todo in pendingTodos"
        :key="todo.id"
        class="mt-4"
        :todo="todo"
      />
    </div>
    <template v-if="!pendingTodos.length">
      <p class="text-center">No pending todos</p>
    </template>

    <div class="mt-4">
      <div class="mt-4">
        <p class="font-weight-bold">Complete Todos</p>
        <div class="mt-4">
          <TodoItem
            v-for="todo in completedTodos"
            :key="todo.id"
            class="mt-4"
            :todo="todo"
          />
        </div>
        <template v-if="!completedTodos.length">
          <p class="text-center">No completed todos</p>
        </template>
      </div>
    </div>
    <CreateEditTodoModal v-model="openTodoModal" />
  </v-container>
</template>

<script lang="ts" setup>
import TodoItem from "@/components/TodoItem.vue";
import CreateEditTodoModal from "@/components/CreateEditTodoModal.vue";
import { useTodoStore } from "@/store/todosStore";
import { storeToRefs } from "pinia";
import { useAuthStore } from '../store/authStore';

const todoStore = useTodoStore();
const authStore = useAuthStore()

const { pendingTodos, completedTodos, openTodoModal } = storeToRefs(todoStore);
const { fetchTodos } = todoStore
fetchTodos()
</script>

<style lang="scss" scoped>
:deep(.v-field__input::first-line) {
  font-weight: bold !important;
}
</style>