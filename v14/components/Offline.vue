<template lang="pug">
#offline
    transition(name="custom-classes-transition",enter-active-class="animated bounceInDown", leave-active-class="animated bounceOutUp")
      #status(:class="onlineClass" v-if="onlineStatus !== ''") {{ onlineStatus.toUpperCase() }}
    slot(name="offline")
</template>

<script>
export default {
  name: 'offline',
  data () {
    return {
      onlineStatus: ''
    }
  },
  computed: {
    onlineClass () {
      return {
        online: this.onlineStatus === 'online',
        offline: this.onlineStatus === 'offline'
      }
    }
  },
  watch: {
    onlineStatus: function (status) {
      if (status === 'online') {
        var vm = this
        setTimeout(function () {
          vm.onlineStatus = ''
        }, 2000)
      }
    }
  },
  methods: {
    updateOnlineStatus (event) {
      this.onlineStatus = navigator.onLine ? 'online' : 'offline'
    }
  },
  created: function () {
    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)
  }
}
</script>
<style scoped lang="stylus">
#status
  position fixed
  width 100%
  font bold 1em sans-serif
  color #fff
  padding 0.5em
  z-index 99
  text-align center

#log
  position fixed
  padding 2.5em 0.5em 0.5em
  font 1em sans-serif
  color #000
  z-index 99

.online
  background green

.offline
  background red
</style>
