<template>
  <main>
    <div class="filters">
      <textbox type="search" placeholder="Zoek naar een plaats" />
    </div>
    <world-map />
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
  .map {
    width: 100vw;
    height: 100vh;
  }

  .filters {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 99;
  }
</style>
