<template>
  <Suspense>
    <Home />
  </Suspense>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Home from "../src/views/Home.vue";

export default defineComponent({
  components: {Home}
})
</script>