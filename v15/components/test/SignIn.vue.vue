<template>

  <q-transition enter="bounceInLeft" leave="bounceOutRight">
    <q-layout class="login-layout">

      <!-- HEADER START -->
      <div slot="header" class="toolbar_header small">
        <div class="logo">&nbsp;</div>
        <h1 class="text-center">Biddy Bids</h1>
        <h3 class="text-center black">BEST ONLINE AUCTIONS</h3>
      </div>
      <!-- HEADER END -->

      <div class="layout-view">

        <!-- CLOSE CORNER FAB -->
        <q-fixed-position corner="top-left" :offset="[40,10]">
          <q-btn round color="tertiary" icon="fa-arrow-left" @click="$router.push('test')" />
        </q-fixed-position>
        <!-- CLOSE END -->

        <!-- LOGIN FORM START -->
        <div class="layout-padding row justify-center">
          <q-card class="login-form bg-primary shadow-0">
            <q-card-main>
              <q-field label="Email" :labelWidth="2" helper="Please Enter Email">
                <q-input :error="$v.account.email.$error"  type="email"  v-model="account.email" clearable/>
              </q-field>

              <q-field label="Password" :labelWidth="2" helper="Please Enter Password">
                <q-input :error="$v.account.password.$error" type="password" v-model="account.password" clearable/>
              </q-field>

              <q-btn color="orange" class="login-btn" @click="postLogin">SUBMT</q-btn>

              <p class="text-center join-blurb">
                <span class="light-paragraph">Don't have an account?</span>
                <q-btn @click="$router.push('joinNow')" flat class="join-link text-white">JOIN NOW!</q-btn>
              </p>

            </q-card-main>
          </q-card>
        </div>

        <div class="row">
          <div class="socialMedia">OR<br>Sign In with your favorite social media</div>
        </div>

        <div class="row socialIcons justify-center">
          <a href="/login/facebook" class="facebook socialicon">facebook</a>
          <a href="/login/instagram" class="instagram socialicon">instagram</a>
          <a href="/login/twitter" class="twitter socialicon">twitter</a>
        </div>


      </div>

    </q-layout>
  </q-transition>

</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      account: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    postLogin () {
      this.$v.account.$touch()

      if (this.$v.account.$error) {
        return
      }
    }
  },
  validations: {
    account: {
      email: { required, email },
      password: { required }
    }
  }
}
</script>

<style scoped lang="stylus">
  .login-layout
    background-color #0084cc

  .login-form
    width 90%
    max-width 90vw
    margin-top 1%

  .login-btn
    margin 2% auto 0
    height 50px
    width 100%
    max-width: 70vw
    font-weight bold
    font-size 200%
    border-radius 10px
    display block

  .join-link
    color white
    font-weight bold
    font-size 100%

  .join-blurb
    margin 1rem 0 0

</style>
