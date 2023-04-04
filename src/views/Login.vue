<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field v-model="email" label="Email" required type="email" />

        <v-text-field
          v-model="password"
          label="password"
          required
          type="password"
        />
        <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

        <v-btn
          type="submit"
          variant="outlined"
          color="primary"
          block
          class="my-4"
          @click="login"
        >
          Sign in
        </v-btn>
      </v-form>
      <div class="mt-3">
        <p class="text-body-2">
          Don't have an account?
          <router-link :to="{ name: 'signup' }">Sign Up</router-link>
        </p>
      </div>
    </v-sheet>
    <v-snackbar
      :timeout="5000"
      elevation="24"
      color="red"
      :model-value="showError"
    >
      Wrong credentials
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const email = ref("");
const password = ref("");
const showError = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const { isAuthenticated } = storeToRefs(authStore);

const login = async () => {
//   const { authenticate } = authStore;
  try {
    if (email.value && password.value) {
      await authStore.authenticate(email.value, password.value);
      if (isAuthenticated) router.push({ name: "Home" });
    }
  } catch (error) {
    showError.value = true;
    email.value = "";
    password.value = "";
  }
};
</script>