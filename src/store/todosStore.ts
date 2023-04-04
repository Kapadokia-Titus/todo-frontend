import { Todo } from "@/types/Todo";
import { defineStore, storeToRefs } from "pinia";
import { ref, computed, Ref } from "vue";
import { TodoStatus } from "@/types/TodoStatus";
import { axiosInstance } from "@/plugins/axios";
import { useAuthStore } from "./authStore";
import { AxiosResponse } from "axios";

interface UpdateTodo {
  todoItem: string;
  status: TodoStatus;
  id: number;
}

export const useTodoStore = defineStore("todo", () => {
  // state
  const todos: Ref<Todo[]> = ref([]);
  const openTodoModal = ref(false);

  const completedTodos = computed(() =>
    todos.value.filter(({ status }) => status == TodoStatus.Complete)
  );

  const pendingTodos = computed(() =>
    todos.value.filter(({ status }) => status == TodoStatus.Pending)
  );

  const fetchTodos = async () => {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    const { data }: AxiosResponse<{ data: Todo[] }> = await axiosInstance.get(
      "/todos",
      {
        headers: { Authorization: `Bearer ${token.value}` },
      }
    );
    todos.value = data.data;
  };

  const saveTodo = async (todo: string) => {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    const { data }: AxiosResponse<{ data: Todo }> = await axiosInstance.post(
      "/todos",
      { item: todo },
      {
        headers: { Authorization: `Bearer ${token.value}` },
      }
    );
    todos.value.push(data.data);
  };

  const updateTodo = async ({ status, todoItem, id }: UpdateTodo) => {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    const { data }: AxiosResponse<{ data: Todo }> = await axiosInstance.put(
      `/todos/${id}/`,
      {
        status,
        item: todoItem,
      },
      {
        headers: { Authorization: `Bearer ${token.value}` },
      }
    );
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) return data.data;
      return todo;
    });
  };

  const deleteTodo = async (todoId: number) => {
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);

    const { data }: AxiosResponse<{ data: Todo }> = await axiosInstance.delete(
      `/todos/${todoId}/`,
      {
        headers: { Authorization: `Bearer ${token.value}` },
      }
    );
    todos.value = todos.value.filter(({ id }) => id !== todoId);
  };

  return {
    todos,
    openTodoModal,
    completedTodos,
    pendingTodos,
    saveTodo,
    updateTodo,
    fetchTodos,
    deleteTodo,
  };
});
