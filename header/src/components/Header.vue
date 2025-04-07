<template>
  <header class="header">
    <nav>
      <ul>
        <li><a href="#">AAbbbb</a></li>
        <li><a href="#">Volei</a></li>
        <li><a href="#">TASDASDSAh</a></li>
        <li><a href="#">Sports</a></li>
      </ul>
    </nav>
    <input type="text" placeholder="Search news..." />
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: bisque;
  color: white;
}
nav ul {
  display: flex;
  list-style: none;
}
nav ul li {
  margin-right: 1em;
}
input {
  padding: 0.5em;
}
</style>