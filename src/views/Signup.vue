<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="">
        <v-text-field v-model="name" label="Name" required />

        <v-text-field v-model="email" label="Email" required type="email" />

        <v-text-field
          v-model="password"
          label="password"
          required
          type="password"
        />

        <v-btn
          type="submit"
          variant="outlined"
          color="primary"
          block
          class="mt-2"
          @click="register"
        >
          Sign up
        </v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          Already have an account?
          <router-link :to="{ name: 'login' }">Login</router-link>
        </p>
      </div>
    </v-sheet>
    <v-snackbar
      :timeout="5000"
      elevation="24"
      color="red"
      :model-value="showError"
    >
      There was an error creating your account
    </v-snackbar>
  </div>
</template>
  
  <script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");

const authStore = useAuthStore();
const router = useRouter();
const showError = ref(false);

const { isAuthenticated } = storeToRefs(authStore);

const register = async () => {
  //   const { authenticate } = authStore;
  try {
    if (email.value && password.value && name.value) {
      await authStore.register(name.value, email.value, password.value);
      if (isAuthenticated) router.push({ name: "Home" });
    }
  } catch (error) {
    showError.value = true;
    name.value = "";
    email.value = "";
    password.value = "";
  }
};
</script>