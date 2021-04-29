<template>
  <div id="dark">
  <header class="dark-bb">
    <section id="header">
      <navbar/>
    </section>
  </header>

  <section id="app">
    <router-view></router-view>
  </section>
  </div>
</template>

<style>

</style>
<script>
import Navbar from "./views/layouts/Navbar";
export default {
  components: {Navbar},
  mounted() {
    document.querySelector('body').id = 'dark';
  }
}
</script>
