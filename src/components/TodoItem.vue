<template>
  <v-card class="pa-4 rounded">
    <v-row align-content="center" class="py-3">
      <v-card-title>
        <span :class="{ 'line-through': todo.status == TodoStatus.Complete }">
          {{ todo.item }}
        </span>
      </v-card-title>
      <v-card-actions class="ml-auto">
        <v-btn
          v-if="todo.status == TodoStatus.Pending"
          density="comfortable"
          icon="mdi-check"
          color="green"
          @click="
            updateTodo({
              status: TodoStatus.Complete,
              todoItem: todo.item,
              id: todo.id,
            })
          "
        />
        <v-btn
          v-else
          density="comfortable"
          icon="mdi-close"
          color="red"
          @click="
            updateTodo({
              status: TodoStatus.Pending,
              todoItem: todo.item,
              id: todo.id,
            })
          "
        />
        <v-btn density="comfortable" icon="mdi-pencil" color="success" />
        <v-btn
          density="comfortable"
          icon="mdi-delete"
          color="red"
          @click="deleteTodo(todo.id)"
        />
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/store/todosStore";
import { Todo } from "@/types/Todo";
import { TodoStatus } from "@/types/TodoStatus";

interface Props {
  todo: Todo;
}

const props = defineProps<Props>();
const { updateTodo, deleteTodo } = useTodoStore();
</script>

<style lang="scss" scoped>
.line-through {
  text-decoration: line-through;
}
</style>