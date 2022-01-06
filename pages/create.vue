<template>
  <main>
    <h1>Een nieuw bedrijf toevoegen</h1>
    <p>Op deze pagina kun je nieuwe bedrijven toevoegen.</p>

    <form
      :action="action"
      method="get"
      target="_blank"
    >
      <input type="hidden" name="filename" :value="name + '.md'">

      <label for="name">Bedrijfsnaam</label>
      <textbox v-model="name" name="name" placeholder="Bijvoorbeeld “Viskraam de hengel“" />

      <button type="submit">
        Toevoegen
      </button>
    </form>
  </main>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    };
  },
  computed: {
    action () {
      const params = new URLSearchParams({
        filename: this.name + '.md'
      });
      return `https://github.com/Roy-Ermers/market-app/new/master/content?${params.toString()}`;
    }
  }
};
</script>

<style lang="scss" scoped>
  main {
    padding: 1rem;
  }

  .textbox {
    margin: 0.5rem 0 1rem;
  }
</style>
