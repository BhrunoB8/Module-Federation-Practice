<script setup lang="ts">


import {navigateBack} from "../router/navigation.ts";

const sportNews = ["Volei", "Futebol"]

const previousState = () => {
    navigateBack()
};
</script>

<template>
  <h1>List Sport News</h1>

  <div v-for="(sportNew, index) in sportNews" :key="index">{{ sportNew }}</div>

  <button type="button" @click="previousState()">Voltar</button>
</template>