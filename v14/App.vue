<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <appOffline>
    <div slot="offline">
      <router-view></router-view>
    </div>
    </appOffline>
  </div>
</template>

<script>
/*
 * Root component
 */
import Offline from './components/Offline.vue'

export default {
  components: {
    appOffline: Offline
  }
}
</script>

<style></style>
