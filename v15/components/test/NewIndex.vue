<template>
  <q-layout class="main-layout" view="hHh LpR fFf">

    <!-- HEADER START -->
    <div slot="header" class="toolbar_header hero">
      <div class="logo"></div>
      <h1 class="text-center">Biddy Bids</h1>
      <h3 class="text-center black ">"The Real Deal"</h3>
    </div>
    <!-- HEADER END -->

    <!-- MAIN START -->
    <div class="layout-view no-scroll">
      <div class="landing-text_get-ready-to-win-big"></div>
    </div>
    <!-- MAIN END -->


    <!-- FOOTER START -->
    <div slot="footer" class="toolbar_footer">
      <div class="row footer_container">
        <br/>

        <div class="join_now" @click="$router.push('joinNow')">
          JOIN NOW
          <div class="landing_button_subtitle">New to Redibids Go?</div>
          <div class="landing-free-bids_join-now"></div>
        </div>

        <div class="sign_in" @click="$router.push('signIn')">
          SIGN IN
          <div class="landing_button_subtitle">I already have an account</div>
        </div>

      </div>
    </div>
    <!-- FOOTER END -->

  </q-layout>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="stylus">
  .toolbar_header
    min-height 112px
    //padding 4px 112px
    width 100%
    margin-top 2%

  .main-layout
    background-color #0084cc



  .landing-text_get-ready-to-win-big
    max-width 492px
    max-height 212px
    display block
    margin 4vw auto 0
    &::after
      content ' '
      display inline-block
      width 100%
      height 232px
      padding 0
      background-size contain
      background-repeat no-repeat
    @media (orientation: landscape) and (max-width: 768px)
      margin-top 10px
      display none

  .landing-free-bids_join-now
    width 13vw
    height 13vw
    max-width 200px
    position absolute
    top -9vw
    left -19%
    &::after
      content ' '
      display inline-block
      width 100%
      height 100%
      padding 0
      background-size contain
      background-repeat no-repeat
    @media (orientation: landscape) and (max-width: 768px)
      left -12%
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)
      width 22vw
      height 22vw
      top -16vw

  .join_btn, .sign_btn
    border-radius 10px
    background #73AD21
    height 65px
    width 40%
    font-family "Trebuchet MS"
    font-weight bold
    font-size 120%

  .sign_btn
    background #FFF
    color #73AD21
</style>
