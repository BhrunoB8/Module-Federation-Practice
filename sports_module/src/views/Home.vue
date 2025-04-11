<template>
  <h1>Sports</h1>
  <img src="https://img.freepik.com/fotos-gratis/ferramentas-esportivas_53876-138077.jpg?semt=ais_country_boost&w=740">
<!--  <router-link to="/sports/create">-->
<!--    <button>Sports Create</button>-->
<!--  </router-link>-->
  <button type="button" @click="navigateToCreate()">Create New</button>
  <button type="button" @click="navigateToView()">View</button>
</template>

<script setup>
import {navigateTo} from "../router/index.ts";
const navigateToCreate = () => {
  navigateTo({
    path: `/create`,
  });
};

const navigateToView = () => {
  navigateTo({
    path: `/sports`,
    query: { id: 20, nome: "Cassio" },
  });
};
</script>