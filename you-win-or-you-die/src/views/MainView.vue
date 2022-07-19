<script>
import { RouterLink } from "vue-router";
</script>
<template>
  <main class="home">
    <h1>You Win or You Die</h1>
    <img src="../assets/images/throne.png" alt="iron throne vector" />
    <RouterLink to="/quiz" class="quiz-start" target="_self">
      <span>Shall We Begin</span>
    </RouterLink>
    <a
      class="vector-credit"
      href="https://www.vecteezy.com/free-vector/pen-line"
    >
      Pen Line Vectors by Vecteezy
    </a>
  </main>
</template>
