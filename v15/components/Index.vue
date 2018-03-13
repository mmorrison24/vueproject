<template>
  <q-layout>
    <div slot="header" class="toolbar">

      <q-toolbar-title>
        <transition name="custom-classes-transition4" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
          <div class="landing-redibids-go_green" v-if="!showReg"></div>
        </transition>
      </q-toolbar-title>
    </div>
    <div class="layout-view">

      <transition name="custom-classes-transition" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">

        <div class="loginModal"  v-if="showLogin">
          <transition name="fade" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">   </transition>
          <div class="orientation-portrait logo_white"><img src="../dist/img/logo_white.png" height="100%" width="100%"/></div>


          <br/>
          <form>

            <div class="row reg_mail_container">
              <div class="reg_email_label">Email</div>
              <div class="reg_email"><input name="email" v-validate="'required|email'" :class="{'is-danger': errors.has('email')}" id="login_email_input" type="email" v-model="email" class="full-width no-border" ref="login_email_input" autofocus="" placeholder=""></div>
              <span v-show="errors.has('email')" class="message">{{ errors.first('email') }}</span>
            </div>
            <br/>
            <div class="row reg_password_container">
              <div class="reg_email_label">Password</div>
              <div class="reg_password"><input v-validate="'required|min:4|max:8'" :class="{'is-danger': errors.has('password')}" id="login_password_input" type="password"  v-model="password"  name="password" class="full-width no-border" ref="login_password_input" placeholder=""></div>
              <span v-show="errors.has('password')" class="message">{{ errors.first('password') }}</span>
            </div>
            <br/>
            <button @click.prevent="postLogin()" :disabled="!(email && password)" class="tertiary go_register">GO!</button>
            <div class="row">
              <div class="socialTitle">OR<br/>Sign In via</div>
            </div>

          </form>
          <div class="row socialIcons">
            <a href="/login/facebook" class="facebook">facebook</a>
            <a href="/login/twitter" class="twitter">twitter</a>
            <a href="/login/instagram" class="instagram">instagram</a>
          </div>
        </div>
      </transition>



      <transition name="custom-classes-transition" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <div class ="subtitle" v-if="!showReg">BEST ONLINE AUCTIONS</div>
      </transition>
      <div class="swiper-container">
        <div class="swiper-inner">
          <!-- swiper -->
          <swiper :options="swiperOption">
            <swiper-slide>Jerry
              Slide 1<img src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/188465_4872463495_9248_n.jpg?oh=89cb0cc24025f6a176a5b45100fe09a0&oe=59864F7E"/></swiper-slide>
            <swiper-slide>Slide 2 <img src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/29282_441838453495_7769364_n.jpg?oh=4ce3c8628c4857dbf910052e704f7083&oe=597E99C6"/></swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide>Slide 6</swiper-slide>
            <swiper-slide>Slide 7</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
      </div>
      <transition name="custom-classes-transition" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <div class="regModal"  v-if="showReg">
          <transition name="fade" enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">   </transition>
          <div class="landscape logo_white"><img src="../dist/img/logo_white.png" height="100%" width="100%"/></div>


          <br/>
          <div id="register">

            <div class="row reg_mail_container">

                <label id="reg_email_label">Email</label>
                <div class="reg_email"><input v-validate="'required|email'" :class="{'is-danger': errors.has('email')}" name="email" id="email" class="full-width no-border"type="email" v-model="email" autofocus /></div>
                <span v-show="errors.has('email')" class="message"> {{ errors.first('email') }} </span>
            </div>
            <br/>
            <div class="row reg_password_container">
              <label id="reg_password_label">Password</label>
              <div class="reg_password"><input v-validate="'required|min:4|max:8'" :class="{'is-danger': errors.has('password')}" id="reg_password_input" type="password"  v-model="password"  name="password" required="required" class="full-width no-border" placeholder="At least 4 characters"></div>
              <span v-show="errors.has('password')" class="message"> {{ errors.first('password') }} </span>
            </div>

            <br/>


 <div class ="row">

  <button :disabled="errors.any() || !(email && password)" id="btnSignup" class="tertiary go_register" v-on:click="showBidPack = !showBidPack"  @click="postPost()">Go!</button>

  <button class="tertiary go_register" v-on:click="showBidPack = !showBidPack">Skip >></button>
 </div>
          </div>

          <div class="row">
              <div class="socialTitle">OR<br/>Register via</div>
          </div>

          <div class="row socialIcons">
            <a href="/login/facebook" class="facebook">facebook</a>
            <a href="/login/twitter" class="twitter">twitter</a>
            <a href="/login/instagram" class="instagram">instagram</a>
          </div>
          
          </div>


      </transition>


    <div slot="footer" class="toolbar_footer">

 <div class="row footer_container">
<br/>

      <div class="join_now" v-on:click="showReg = !showReg">JOIN NOW <div class="landing_button_subtitle">New to Redibids Go?</div>     <div class="landing-free-bids_join-now"></div>  </div>


      <div class="sign_in"  v-on:click="showLogin = !showLogin" >SIGN IN<br/><div class="landing_button_subtitle">I already have an account</div></div>
    </div>
    </div>

    <div class="bidPackModal" v-if="showBidPack">
      <appBidpack></appBidpack>
    </div>
  </q-layout>
</template>


<script>
  import axios from 'axios'
  import Bidpack from './Bidpack.vue'
  import { Toast } from 'quasar'
  var querystring = require('querystring')
  export default {
    data () {
      return {
        types: [
          {
            label: 'Always Maximized',
            ref: 'regModal'
          }
        ],
        swiperOption: {
          pagination: '.swiper-pagination',
          effect: 'cube',
          grabCursor: true,
          cube: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94
          }
        },
        postBody: '',
        email: '',
        password: '',
        store: ['emailPresence', 'emailAddress'],
        position: 'bottom',
        showReg: false,
        showLogin: false,
        showCreditCard: false,
        showBidPack: false
      }
    },
    created: function () {
    },
    ready () {
      this.emailPresence = 'false'
    },
    events: {
      emailSaved (emailPresence) {
        this.emailPresence = emailPresence
        if (emailPresence === 'false') {
//          emailPresence = true + 'w00t!'
          console.log('val' + this.emailPresence)
        }
      }
    },
    mounted (emailPresence) {
      setTimeout(() => this.$events.fire('emailSaved', 'false'), 100)
//      setTimeout(() => this.$events.fire('test', "Now you've received another message home.vue"), 3000)
      console.log('Set emailPresence ???? ' + emailPresence)
    },
    methods: {
      notify (eventName) {
//        Toast.create(`Event "${eventName}" was triggered.`)
      },
      setEmailPresence () {
        const emailVal = document.getElementById('email').value
        if (emailVal !== '') {
          this.$store.emailPresence = 'true'
        }
        console.log('I set it' + this.$store.emailPresence)
        console.log('emailVal' + emailVal)
      },
      postPost (emailPresence) {
        console.log(emailPresence)
        const emailVal = document.getElementById('email').value
        const passwordVal = document.getElementById('reg_password_input').value
        this.$store.emailAddress = emailVal
        const vm = this
        axios.post('/signup',
          querystring.stringify({
            username: emailVal,  // gave the values directly for testing
            password: passwordVal,
            email: emailVal,
            firstname: '',
            lastname: '',
            ccType: '',
            ccName: '',
            ccExpDate: '',
            ccToken: '',
            ccZip: '',
            ccTxTag: '',
            purchasedBids: '',
            freeBids: '',
            totalPurchasedBids: '',
            totalFreeBids: '',
            amount: ''
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            console.log(response)
            if (!response.data.user) {
              vm.showBidPack = !vm.showBidPack
              console.log('User already exists')
              Toast.create('A User with that email already exists!')
            }
          })
      },
      postLogin () {
        const emailVal = this.$refs.login_email_input.value
        const pass = this.$refs.login_password_input.value
        console.log('Email: ' + emailVal)
        console.log('Password: ' + pass)
        axios.post('/login',
          querystring.stringify({
            username: emailVal,
            password: pass,
            email: emailVal
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (response) {
            console.log('Response:')
            console.log(response)
            if (!response.data.user) {
              Toast.create(response.data.info.errMsg)
            }
          })
      },
      openSpecialPosition (position) {
        this.position = position
        this.$nextTick(() => {
          this.$refs.positionModal.open()
        })
      }
    },
    components: {
      appBidpack: Bidpack
    }
  }
</script>


<style scoped lang="stylus">
  .swiper-inner
    position relative
    overflow hidden
    height 350px
    padding 15px

  .swiper-container
    width 300px!important
    height 300px
    position relative

  .swiper-slide
    background-position center
    background-size cover


  .layout
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    height 100%
    width 100%
    display flex
    flex-direction column
    flex-shrink 0
    background-image url("../dist/img/bg_white.png")

  .layout-header
    box-shadow none

  .toolbar
    min-height 112px

  input:-webkit-autofill
    -webkit-box-shadow: 0 0 0 30px white inset



</style>
