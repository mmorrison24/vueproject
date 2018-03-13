<template>
  <q-layout ref="layout">
    
    <!-- TOOLBAR -->
    <q-toolbar slot="header" color="blue">
      <q-btn flat>
        <q-icon name="fa-bars" />
      </q-btn>
      <q-toolbar-title>
        Toolbar
        <span slot="subtitle">Toolbar Title</span>
      </q-toolbar-title>
      <q-select
        v-model="wsUp.user.id"
        :options="users"
        @change="greetUser"
      />
      <q-btn flat>
        <q-icon name="fa-bars" />
      </q-btn>
    </q-toolbar>
    <!-- TOOLBAR END -->

    <div class="parent bg-secondary full-height">
      <div class="row justify-around full-height">

        <!-- SECONDARY AUCTION -->
        <div class="col bg-deep-orange">

          <secondary-auction ref="secondary"></secondary-auction>

        </div>
        <!-- SECONDARY END -->

        <!-- PRIMARY AUCTION -->
        <div class="col bg-warning primary">
          
          <primary-auction :auction="wsDown.data.auction || undefined" @btnClick="sendMessage"></primary-auction>

        </div>
        <!-- PRIMARY AUCTION END -->

      </div>

    </div>

  </q-layout>
</template>

<script>
import SecondaryAuction from './Secondary.vue'
import PrimaryAuction from './Primary.vue'

import crypto from 'crypto'
import v4 from 'aws-signature-v4'
import MqttClient from '../../node_modules/mqtt/lib/client'
import websocket from 'websocket-stream'

import { Toast } from 'quasar'

export default {
  data () {
    return {
      client: undefined,
      MQTT_TOPIC: '/myTopic',
      auction: {
        item: '',
        desc: '',
        pics: []
      },
      wsDown: {
        data: {}
      },
      wsUp: {
        auction: {
          id: '5a01ef407f2e0b0f02fbe5e2',
          auctionID: 'myTopic'
        },
        bid: {
          amount: 0.25,
          auto: false
        },
        // timestamp: '123456778990999', This is generated on the other end of the websocket
        user: {
          id: '59ca571cd8d82c15a123fb0d'
        },
        connStatus: 1,
        proto: false
      },
      users: [
        {
          label: 'Moondog',
          value: '59ca571cd8d82c15a123fb0d'
        },
        {
          label: 'qwerty',
          value: '59a6cd8a2e87e711b55f5d69'
        }
      ]
    }
  },
  components: {
    SecondaryAuction,
    PrimaryAuction
  },
  created: function () {
    const me = this
    this.client = new MqttClient(() => {
      var url = v4.createPresignedURL(
        'GET',
        process.env.AWS_IOT_ENDPOINT_HOST.toLowerCase(),
        '/mqtt',
        'iotdevicegateway',
        crypto.createHash('sha256').update('', 'utf8').digest('hex'),
        {
          'key': process.env.AWS_ACCESS_KEY,
          'secret': process.env.AWS_SECRET_ACCESS_KEY,
          'protocol': 'wss',
          'expires': 15
        }
      )

      console.log('Connecting to URL: ' + url)
      return websocket(url, [ 'mqttv3.1' ])
    })

    this.client.on('connect', () => {
      console.log('Successfully connected to AWS IoT Broker! :D')
      this.client.subscribe(this.MQTT_TOPIC)
    })

    this.client.on('close', () => {
      console.log('Failed to connect :c')
      this.client.end()
      this.client = undefined
    })

    this.client.on('message', (topic, message, packet) => {
      try {
        var obj = JSON.parse(message.toString())
        if (obj.proto) {
          console.log(obj)

          if (obj.init) {
            // me.auction.item = obj.auction.item.name
            // me.auction.desc = obj.auction.item.description
            // me.auction.pics = obj.auction.item.pics
            me.$set(me.wsDown, 'data', obj)
          }
          else {
            if (obj.user.id === me.wsUp.user.id) {
              Toast.create('Thanks ' + obj.user.username + '! ' + 'Your balance is ' + obj.user.balance)
              me.$refs.secondary.trigger(obj.winners)
            }
            // me.auction.item = obj.auction.item.name
            // me.auction.desc = obj.auction.item.description
            // me.auction.pics = obj.auction.item.pics
            // me.auction.bidHistory = obj.auction.topBidders
            me.$set(me.wsDown, 'data', obj)
          }
        }
      }
      catch (error) {
        console.log(message.toString())
      }
    })
  },
  methods: {
    sendMessage: function () {
      console.log('Output message: ' + this.wsUp)
      this.client.publish(this.MQTT_TOPIC, JSON.stringify(this.wsUp))
    },
    greetUser: function (newValue) {
      var u = this.users.find(element => {
        return element.value === newValue
      })
      Toast.create.positive('Greetings ' + u.label + '!')
    }
  }
}
</script>

<style scoped lang="stylus">
.parent
  padding 1rem
  margin auto
  position absolute
</style>
