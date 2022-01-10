<template>
  <component :is="iconComponent" :style="{ color }" class="marker" @click="goto" />
</template>
<script>
import { Marker } from 'maplibre-gl';

export default {
  inject: ['view', 'map'],
  props: {
    location: {
      type: Array,
      default: () => []
    },

    icon: {
      type: String,
      default: 'user'
    },

    color: {
      type: String,
      default: 'var(--brand)'
    },

    alignment: {
      type: String,
      default: 'auto',
      validator: value => ['auto', 'map', 'viewport'].includes(value)
    },
    maximumZoom: {
      type: [Number, String],
      default: 12
    }
  },

  data () {
    return {
      marker: undefined
    };
  },

  computed: {
    iconComponent () {
      return require(`@/assets/icons/${this.icon}.svg?inline`);
    }
  },

  watch: {
    'view.zoom' () {
      if (this.view.zoom >= this.maximumZoom) {
        this.createMarker();
      } else {
        this.marker?.remove();
        this.marker = undefined;
      }
    },

    location () {
      this.marker?.setLngLat(this.location);
    },

    '$parent.map' () {
      if (this.view.zoom >= this.maximumZoom) {
        this.createMarker();
      }
    }
  },

  methods: {
    goto () {
      this.$parent?.flyTo(this.location, Number(this.maximumZoom));
      this.$emit('click');
    },

    createMarker () {
      if (!this.$parent.map || !!this.marker) { return; }

      this.marker = new Marker({
        element: this.$el,
        pitchAlignment: this.alignment
      })
        .setLngLat(this.location)
        .addTo(this.$parent.map);
    }
  }
};
</script>

<style lang="scss" scoped>
  .marker {
    cursor: pointer;
    opacity: 0;
    transition: opacity 100ms ease;

    &.maplibregl-marker {
      opacity: 1;
    }
  }
</style>
