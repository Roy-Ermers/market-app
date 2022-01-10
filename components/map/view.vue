<template>
  <div id="map">
    <slot />
  </div>
</template>

<script>
import { Map, NavigationControl, GeolocateControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAPTILER_KEY = 'ZGTM77FZt4A7JuscDmNg';

export default {
  provide () {
    return {
      view: this.view,
      map: this.map
    };
  },

  props: {
    pins: {
      type: Array,
      default: () => []
    },

    center: {
      type: Array,
      default: () => [5.383195586844065, 52.36344182907241]
    },

    zoom: {
      type: Number,
      default: 8
    }
  },

  data () {
    return {
      location: undefined,

      view: {
        center: this.center,
        zoom: this.zoom
      },

      /**
         * @type {Map}
         */
      map: undefined,
      mapUrl: `https://api.maptiler.com/maps/1ddaf5d5-3c82-4839-bd37-b0df2b7b2217/style.json?key=${MAPTILER_KEY}`
    };
  },

  watch: {
    center () {
      this.map?.easeTo({ center: this.center });
    },
    zoom () {
      this.map?.easeTo({ zoom: this.zoom });
    }
  },

  mounted () {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
      this.updateColorScheme(media.matches);
    });

    this.updateColorScheme(media.matches);

    this.createMap();
  },

  methods: {
    updateColorScheme (dark) {
      if (dark) {
        this.mapUrl = `https://api.maptiler.com/maps/faf6f9b5-d95b-41f4-a196-c3089724dd3f/style.json?key=${MAPTILER_KEY}`;
      } else {
        this.mapUrl = `https://api.maptiler.com/maps/1ddaf5d5-3c82-4839-bd37-b0df2b7b2217/style.json?key=${MAPTILER_KEY}`;
      }

      this.map?.setStyle(this.mapUrl, { diff: true });
    },

    flyTo (center, zoom = 15) {
      console.log('flying to ', center, zoom);
      this.map?.flyTo({ center, zoom, essential: true });
    },

    createMap () {
      this.map = new Map({
        center: this.center,
        style: this.mapUrl,
        zoom: this.zoom,
        container: 'map',
        attributionControl: false
      });

      if (!this.$device.isMobile) {
        this.map.addControl(
          new NavigationControl({
            showCompass: true,
            visualizePitch: true,
            showZoom: true
          })
        );
      }

      this.map.addControl(
        new GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }).on('geolocate', (position) => {
          this.location = [position.coords.longitude, position.coords.latitude];
        }),
        'bottom-right'
      );

      this.map.on('move', () => {
        this.view.center = this.map.getCenter().toArray();
        this.$emit('update:center', this.view.center);
      });

      this.map.on('zoom', () => {
        this.view.zoom = this.map.getZoom();
        this.$emit('update:zoom', this.view.zoom);
      });
    }
  }
};
</script>
<style lang="scss">
  #map {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;

    .maplibregl-user-location-dot,
    .maplibregl-user-location-dot::before {
      background-color: $color;
    }

    .maplibregl-user-location-dot::after {
      border-color: $surface-4;
    }

    .maplibregl-ctrl-zoom-in,
    .maplibregl-ctrl-zoom-out,
    .maplibregl-ctrl-compass {
      background: $surface-1;
      border-radius: 0;
    }

    .maplibregl-ctrl button.maplibregl-ctrl-geolocate {
      background-color: $surface-1;
      padding: 1rem;
      height: 3rem;
      width: 3rem;
      border-radius: 3rem;
    }

    .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-active .maplibregl-ctrl-icon,
    .maplibregl-ctrl button.maplibregl-ctrl-geolocate.maplibregl-ctrl-geolocate-background .maplibregl-ctrl-icon {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%23ff9500'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
    }

    .maplibregl-ctrl-group {
      background: none;
    }

    .maplibregl-user-location-accuracy-circle {
      background-color: $surface-4;
      opacity: 0.2;
    }

    @media (prefers-color-scheme: dark) {
      .maplibregl-ctrl-group button + button {
        border-top: none;
      }
    }

    .marker {
      cursor: pointer;
    }

    button.fab {
      font-size: 4rem;
      width: 1em;
      height: 1em;
      background-color: $color;
      border: none;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1em;
      cursor: pointer;
      padding: 0;
      position: absolute;
      bottom: 1rem;
      right: 1rem;

      @include shadow;

      svg {
        width: 0.5em;
        height: 0.5em;
        stroke: $surface-1;
      }
    }
  }
</style>
