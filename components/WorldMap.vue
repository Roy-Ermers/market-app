<template>
  <div id="map">
    <user ref="user" class="user-marker" @click="flyTo(location, 15)" />
    <button class="fab" @click="locate">
      <crosshair v-if="!watchId" />
      <stop-circle v-else />
    </button>
  </div>
</template>

<script>
import { Map, NavigationControl, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import crosshair from '~/assets/icons/crosshair.svg?inline';
import stopCircle from '~/assets/icons/stop-circle.svg?inline';
import user from '~/assets/icons/user.svg?inline';
const MAPTILER_KEY = 'ZGTM77FZt4A7JuscDmNg';

export default {
  components: { crosshair, stopCircle, user },
  props: {
    pins: {
      type: Array,
      default: () => []
    },
    outline: {
      type: Object,
      required: false,
      default: undefined
    }
  },

  data () {
    return {
      center: [5.383195586844065, 52.36344182907241],
      location: undefined,
      watchId: undefined,
      zoom: 8,
      /**
       * @type {Map}
       */
      map: undefined,
      /**
       * @type {Marker}
       */
      userMarker: undefined,
      mapUrl:
          `https://api.maptiler.com/maps/1ddaf5d5-3c82-4839-bd37-b0df2b7b2217/style.json?key=${MAPTILER_KEY}`
    };
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
        this.mapUrl =
            `https://api.maptiler.com/maps/faf6f9b5-d95b-41f4-a196-c3089724dd3f/style.json?key=${MAPTILER_KEY}`;
      } else {
        this.mapUrl =
            `https://api.maptiler.com/maps/1ddaf5d5-3c82-4839-bd37-b0df2b7b2217/style.json?key=${MAPTILER_KEY}`;
      }

      this.map?.setStyle(this.mapUrl, { diff: true });
    },
    /**
     * @param pos {GeolocationPosition}
     */
    updatePosition (pos) {
      if (this.location === undefined) {
        this.flyTo([pos.coords.longitude, pos.coords.latitude], 15);
        this.map.setBearing(pos.coords.heading);
      }

      if (!this.userMarker) {
        this.userMarker = new Marker({ element: this.$refs.user })
          .setLngLat([0, 0])
          .addTo(this.map)
          .on('click', () => this.flyTo(this.location, 6));
      };
      this.location = [pos.coords.longitude, pos.coords.latitude];
      this.userMarker.setLngLat([...this.location]);
    },

    flyTo (center, zoom = 15) {
      this.map?.flyTo({ center, zoom });
    },

    createMap () {
      this.map = new Map({
        center: this.center,
        style: this.mapUrl,
        zoom: 8,
        container: 'map',
        attributionControl: false
      });

      this.map.addControl(new NavigationControl({ showCompass: true, visualizePitch: true, showZoom: true }));
    },

    locate () {
      if (this.watchId) {
        this.location = undefined;
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = undefined;
        return;
      }

      this.watchId = navigator.geolocation.watchPosition(
        position => this.updatePosition(position),
        () => {
          this.location = undefined;
        },
        { timeout: 5000 }
      );
    }
  }
};
</script>
<style lang="scss">
  #map {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    position: relative;

    @media (prefers-color-scheme: dark) {
      .maplibregl-ctrl-group {
        background: var(--surface1);
      }

      .maplibregl-ctrl-group button + button {
        border-top: none;
      }
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
