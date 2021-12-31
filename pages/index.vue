<template>
  <main>
    <div class="overlay">
      <header>
        <textbox
          v-model="search"
          type="search"
          placeholder="Zoek naar een plaats"
          @keydown.enter="searchCity"
        />

        <div class="filters">
          <button class="filter active">
            Kramen die nu open zijn
          </button>
          <button v-for="category in categories" :key="category" class="filter">
            {{ category }}
          </button>
        </div>
      </header>
      <ul class="results">
        <li
          v-for="result in results"
          :key="result.osm_id"
          @click="selectCity(result)"
        >
          {{ result.namedetails.name }}
        </li>
      </ul>
    </div>

    <world-map ref="map" :outline="outline" :pins="companies" />
  </main>
</template>

<script>
import debounce from '~/mixins/debounce';

export default {
  data () {
    return {
      search: '',
      outline: undefined,
      results: [],
      companies: []
    };
  },

  async fetch () {
    this.companies = await this.$content('/')
      .only(['name', 'lat', 'lon', 'category'])
      .fetch();
  },

  computed: {
    categories () {
      return [...new Set(this.companies.flatMap(x => x.category))];
    }
  },

  watch: {
    search: debounce(function () {
      this.searchCity();
    }, 250)
  },

  methods: {
    selectCity (city) {
      this.search = '';
      this.outline = city.geojson;
      this.$refs.map.flyTo([Number(city.lat), Number(city.lon)], 15);
    },

    async searchCity () {
      if (this.search.length < 3) {
        this.results = [];
        return;
      }

      this.results = await this.$axios.$get(
        `https://nominatim.openstreetmap.org/search/?q=${this.search}&format=json&countrycodes=nl&polygon_geojson=1&namedetails=1`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
  .map {
    width: 100vw;
    height: 100vh;
  }

  .overlay {
    position: fixed;
    top: 1rem;
    left: 1rem;
    right: 1rem;
    z-index: 99;

    header {
      max-width: 100vw;
      display: flex;
      align-items: center;

      .textbox {
        width: 350px;
      }

      .filter {
        padding: 0.25rem 1rem;
        margin: 0 0.5rem;
        border-radius: 1rem;
        background: $surface-2;
        color: inherit;
        font: inherit;
        border: 1px solid $surface-1;

        &.active {
          background-color: $color;
          border-color: $color;
          color: $text-shade;
        }
      }
    }
  }

  .results {
    list-style: none;
    background-color: $surface-1;
    border-radius: 0.5rem;
    padding: 0.25rem;
    width: 100%;
    transition: opacity 100ms ease;

    &:empty {
      opacity: 0;
    }

    li {
      padding: 0.5rem 1rem;

      + li {
        border-top: 1px solid $surface-2;
      }
    }
  }
</style>
