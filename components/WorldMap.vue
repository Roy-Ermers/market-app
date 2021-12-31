<template>
  <div class="map">
    <l-map
      ref="map"
      class="leaflet-map"
      :center.sync="center"
      :zoom.sync="zoom"
      :options="{ zoomControl: false, attributionControl: false }"
    >
      <l-tile-layer :url="mapUrl" />
      <l-marker v-if="location" :lat-lng="location" @click="flyTo(location)">
        <l-icon icon-url="/user.svg" icon-size="32" />
      </l-marker>

      <l-marker v-for="pin in pins" :key="pin.name" :lat-lng="[pin.lat, pin.lon]" @click="flyTo([pin.lat, pin.lon])">
        <l-icon icon-url="/user.svg" icon-size="32" />
      </l-marker>

      <l-geo-json
        v-if="outline"
        :geojson="outline"
        :options="{ color: 'var(--brand)', opacity: 0.025, fill: 'none' }"
      />

      <l-control-zoom position="topright" />
      <l-control position="bottomright">
        <button @click="locate">
          <crosshair v-if="!watchId" />
          <stop-circle v-else />
        </button>
      </l-control>
    </l-map>
  </div>
</template>

<script>
import crosshair from '~/assets/icons/crosshair.svg?inline';
import stopCircle from '~/assets/icons/stop-circle.svg?inline';

export default {
  components: { crosshair, stopCircle },
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
      center: [52.36344182907241, 5.383195586844065],
      location: undefined,
      watchId: undefined,
      zoom: 8,
      mapUrl:
          'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=R8rAisQ0L6EL1wW8JVYQ'
    };
  },

  mounted () {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
      this.updateColorScheme(media.matches);
    });

    this.updateColorScheme(media.matches);
  },

  methods: {
    updateColorScheme (dark) {
      if (dark) {
        this.mapUrl =
            'https://api.maptiler.com/maps/b992018d-d296-4562-9e33-2f86e28d0e2c/{z}/{x}/{y}.png?key=R8rAisQ0L6EL1wW8JVYQ';
      } else {
        this.mapUrl =
            'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=R8rAisQ0L6EL1wW8JVYQ';
      }
    },

    updatePosition (pos) {
      if (this.location === undefined) {
        this.flyTo([pos.coords.latitude, pos.coords.longitude], 15);
      }

      this.location = [pos.coords.latitude, pos.coords.longitude];
    },

    flyTo (coords, zoom = 15) {
      this.$refs.map.mapObject.flyTo(coords, zoom);
    },

    locate () {
      if (this.watchId) {
        this.location = undefined;
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = undefined;
        return;
      }

      this.watchId = navigator.geolocation.watchPosition(
        this.updatePosition,
        () => {
          this.location = undefined;
        },
        { timeout: 5000 }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
  .map {
    width: 100vw;
    height: 100vh;
    position: relative;

    .leaflet-map {
      height: 100%;
      width: 100%;
      z-index: 1;
      background: inherit;

      &::v-deep {
        .leaflet-bar a {
          color: $text-color;
          background-color: $surface-2;
        }
      }
    }

    button {
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

      @include shadow;

      svg {
        width: 0.5em;
        height: 0.5em;
        stroke: $surface-1;
      }
    }
  }
</style>
