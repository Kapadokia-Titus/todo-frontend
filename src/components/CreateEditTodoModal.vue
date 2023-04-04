<template>
  <v-dialog
    :model-value="open"
    @update:model-value="$emit('update:model-value', $event)"
    persistent
    width="560"
  >
    <v-card class="pa-4 pb-0">
      <div class="ma-4">
        <v-text-field
          label="Todo"
          variant="underlined"
          color="primary"
          required
          v-model="item"
        />
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="$emit('update:model-value', false)"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="modalAction">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useTodoStore } from "@/store/todosStore";
import { Todo } from "@/types/Todo";
import { ref } from "vue";

interface Props {
  open?: boolean;
  todo?: Todo;
}

const props = withDefaults(defineProps<Props>(), {
  open: true,
});

const emits = defineEmits(["update:model-value"]);

const item = ref("");

if (props.todo) item.value = props.todo?.item;

const todoStore = useTodoStore();

const modalAction = async () => {
  if (!item.value) return;
  await todoStore.saveTodo(item.value);
  emits("update:model-value", false);
};
</script>