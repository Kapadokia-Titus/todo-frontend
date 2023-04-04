<template>
  <router-view />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { useAuthStore } from "./store/authStore";

onBeforeMount(async () => {
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);
  const localToken = localStorage.getItem("token");
  if (localToken) token.value = localToken;
});
</script>
