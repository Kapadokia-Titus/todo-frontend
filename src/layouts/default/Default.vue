<template>
  <v-app>
    <v-layout>
      <navigation-drawer />
      <v-main>
        <default-bar />
        <default-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
</script>
