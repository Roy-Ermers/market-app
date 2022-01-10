<template>
  <main>
    <div class="overlay">
      <header>
        <textbox
          v-model="search"
          type="search"
          placeholder="Zoek naar een plaats"
          @keydown.enter="searchCity"
        >
          <icon-button icon="menu" @click="open = !open" />
        </textbox>

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
          tabindex="0"
          @click="selectCity(result)"
        >
          {{ result.namedetails.name }}
        </li>
      </ul>
    </div>

    <panel-layout :open="open">
      <template #default>
        <map-view ref="map">
          <map-marker
            v-for="company in companies"
            :key="company.name"
            :location="[company.lon, company.lat]"
            alignment="map"
            :color="company.color"
          />
        </map-view>
      </template>
      <template #panel>
        <h1>Bedrijven in de buurt</h1>
        <ul>
          <li v-for="company in companies" :key="company.name" @click="gotoCompany(company)">
            {{ company.name }}
          </li>
        </ul>
      </template>
    </panel-layout>
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
      companies: [],
      open: false,
      selectedCompany: undefined
    };
  },

  async fetch () {
    this.companies = await this.$content('/market-stands')
      .only(['name', 'lat', 'lon', 'category', 'color'])
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
    gotoCompany (company) {
      this.$refs.map.flyTo([company.lon, company.lat], 20);
      this.open = false;
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
    z-index: 1;

    @include mobile {
      left: 0;
      right: 0;

      .textbox {
        margin: 0 0.5rem;
      }
    }

    header {
      max-width: 100vw;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;

      .textbox {
        width: 350px;

        @include mobile {
          width: 100vw;
        }
      }

      .filters {
        white-space: nowrap;
        max-width: 100vw;
        overflow: auto;
        padding-bottom: 1rem;
        scrollbar-gutter: stable;
        scrollbar-color: transparent transparent;
        padding-left: 0.5rem;
      }

      .filter {
        padding: 0.25rem 1rem;
        margin: 0 0.25rem;
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
    transition: opacity 100ms ease;
    box-sizing: border-box;

    @include mobile {
      position: fixed;
      top: 2.75rem;
      left: 0.5rem;
      right: 0.5rem;
    }

    &:empty {
      opacity: 0;
    }

    li {
      padding: 1rem;
      cursor: pointer;

      &:focus-visible {
        outline: 2px solid $surface-2;
      }

      + li {
        border-top: 1px solid $surface-2;
      }
    }
  }
</style>
