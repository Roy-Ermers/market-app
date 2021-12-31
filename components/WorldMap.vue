<template>
  <div class="map">
    <l-map class="leaflet-map" :center="center" :zoom.sync="zoom" :options="{ zoomControl: false, attributionControl: false }">
      <!-- http://a.tile.openstreetmap.fr/hot/8/76/113.png -->
      <!-- https://api.maptiler.com/maps/4ddf8bef-b1db-41e7-910e-fc81947cb829/{z}/{x}/{y}.png?key=R8rAisQ0L6EL1wW8JVYQ -->
      <l-tile-layer url="https://api.maptiler.com/maps/bright/{z}/{x}/{y}.png?key=R8rAisQ0L6EL1wW8JVYQ" />
      <l-marker v-if="locatingUser" :lat-lng="center">
        <l-icon
          icon-url="/user.svg"
          icon-size="32"
        />
      </l-marker>

      <l-control-zoom position="topright" />
      <l-control position="bottomright">
        <button @click="locate">
          <crosshair v-if="!locatingUser" />
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
      default: () => ([])
    }
  },

  data () {
    return {
      center: [52.36344182907241, 5.383195586844065],
      locatingUser: false,
      watchId: undefined,
      zoom: 8
    };
  },

  methods: {
    async updatePosition (pos) {
      this.center = [pos.coords.latitude, pos.coords.longitude];

      await new Promise(resolve => setTimeout(resolve, 250));

      if (!this.locatingUser) {
        this.zoom = 15;
        this.locatingUser = true;
      }
    },

    locate () {
      if (this.watchId) {
        this.locatingUser = false;
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = undefined;
        return;
      }

      this.watchId = navigator.geolocation.watchPosition(this.updatePosition, () => { this.locatingUser = false; }, { timeout: 5000 });
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
