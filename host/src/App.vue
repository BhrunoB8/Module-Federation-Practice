<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/components/Navbar.vue";

import { listenRemoteRoutes } from "./router/remouteRoutes.ts";
import { useRouter } from "vue-router";

const router = useRouter();
listenRemoteRoutes(router);
</script>


<template>
  <div >
    <header>
      <div class="wrapper">
        <Navbar />
      </div>
    </header>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>