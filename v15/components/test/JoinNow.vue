<template>
  <q-transition enter="bounceInLeft" leave="bounceOutRight">
    <q-layout class="join-layout">

      <!-- HEADER START -->
      <div slot="header" class="toolbar_header small">
        <div class="logo">&nbsp;</div>
        <h1 class="text-center">Biddy Bids</h1>
        <h3 class="text-center black">BEST ONLINE AUCTIONS</h3>
      </div>
      <!-- HEADER END -->

      <div class="layout-view">

        <!-- CLOSE CORNER FAB -->
        <q-fixed-position corner="top-left" :offset="[0,20]"  style="z-index: 10">
          <q-btn round color="tertiary" icon="fa-arrow-left" @click="$router.push('test')" />
        </q-fixed-position>
        <!-- CLOSE END -->

        <!-- SIGN UP START -->
        <div class="layout-padding row justify-center">

          <!-- REGISTRATION WIZARD BEGIN -->
          <q-stepper
            class="reg-wizard bg-primary shadow-0"
            alternative-labels
            contractable
            ref="stepper"
            v-model="currentStep">

            <!-- STEP 1 -->
            <q-step default name="account" title="Account" :order="1">
              <q-field dark label="Email" :labelWidth="2" helper="Please Enter Email">
                <q-input :error="$v.account.email.$error" type="email" v-model="account.email" clearable/>
              </q-field>

              <q-field dark label="Password" :labelWidth="2" helper="Please Enter Password">
                  <q-input :error="$v.account.password.$error" type="password" v-model="account.password"/>
              </q-field>

              <q-stepper-navigation>
                <q-btn color="tertiary" @click="toBidpack">GO!</q-btn>
                <q-btn color="tertiary" @click="skipAccount">Skip >></q-btn>
              </q-stepper-navigation>
            </q-step>
            <!-- STEP 1 END -->

            <!-- STEP 2 -->

            <q-step name="credits" title="Credits" :order="2">
              <q-field dark
                icon="fa-usd"
                label="Purchase Biddy Bids Packs!"
                helper="# of bids for initial purchase"
                :label-width="3"
              >
                <div class="row no-wrap xs-gutter">
                  <div class="col-10">
                    <q-slider color="blue" v-model="credits" :min="1" :max="200" label />
                  </div>
                  <div class="col-2">
                    <q-input dark type="number" v-model="credits" :min="1" :max="200"/>
                  </div>
                </div>
              </q-field>

              <div class="row justify-center">
                <div class="col-auto">
                  <q-card inline id="biddybidcard" class="shadow-3 align-center text-center orientation-portrait" color="orange">
                    <q-card-title>
                      <h3 class="no-margin no-padding text-bold">{{ credits }} BIDS!</h3>
                      +XX FREE BIDS
                    </q-card-title>
                    <q-card-main class="justify-center">
                      <q-card inline class="shadow-3 align-center text-center biddy-bid-main-display" color="white">
                                <h5 class="text-center">Bids: <span class="text-bold">{{ credits }}</span></h5>
                                <h4 class="text-center no-margin">Total: <span class="text-bold">${{ computedPrice }}</span></h4>
                      </q-card>
                    </q-card-main>
                    <q-card-separator />
                    <q-card-actions text-center>
                      <q-btn flat round small><q-icon name="trending_flat" /></q-btn>
                      <q-btn flat  @click="$refs.stepper.next()">purchase now</q-btn>
                    </q-card-actions>
                  </q-card>
                  <q-card inline id="biddybidcard" class="shadow-3 align-center text-center orientation-landscape" color="orange">
                    <div class="row">
                      <div class="col-6 self-center">
                        <h3 class="no-margin no-padding text-bold">{{ credits }} BIDS!</h3>
                        +XX FREE BIDS
                      </div>
                      <div class="col-6">
                        <q-card inline class="shadow-3 align-center text-center biddy-bid-main-display" color="white">
                        <h5 class="text-center">Bids: <span class="text-bold">{{ credits }}</span></h5>
                        <h4 class="text-center no-margin">Total: <span class="text-bold">${{ computedPrice }}</span></h4>
                      </q-card>
                      </div>
                    </div>
                    <q-card-separator />
                    <q-card-actions text-center>
                      <q-btn flat round small><q-icon name="trending_flat" /></q-btn>
                      <q-btn flat  @click="$refs.stepper.next()">purchase now</q-btn>
                    </q-card-actions>
                  </q-card>
                </div>

              </div>



              <q-stepper-navigation>
                <q-btn color="tertiary" @click="$refs.stepper.next()">Next</q-btn>
              </q-stepper-navigation>
            </q-step>

            <!-- STEP 2 END -->


            <!-- STEP 3 START -->

            <q-step name="billing" title="Billing" :order="3" style="margin-bottom: 120px">

                <q-field dark label="Email" :labelWidth="2" helper="Please Enter Email">
                  <q-input
                    :error="$v.account.email.$error"
                    float-label="Email"
                    type="email"
                    v-model="account.email"
                    :readonly="!skipped"
                    :clearable="skipped"
                    @blur="$v.account.email.$touch"/>
                </q-field>

                <q-field dark v-if="skipped" label="Password" :labelWidth="2" helper="Please Enter Password">
                  <q-input
                    :error="$v.account.password.$error"
                    float-label="Password"
                    type="password"
                    v-model="account.password"
                    @blur="$v.account.password.$touch"/>
                </q-field>

              <q-field dark label="Name" :labelWidth="2" helper="Enter Your Full Name On Card">
                <q-input
                  :error="$v.billing.name.$error"
                  type="text"
                  v-model="billing.name"
                  clearable
                  @blur="$v.billing.name.$touch"/>
              </q-field>

              <q-field dark label="CC Info" :labelWidth="2" helper="Enter Card Number and Security Code">
                <div class="row no-wrap xs-gutter">
                  <div class="col-8">
                    <q-input
                      :error="$v.billing.ccNum.$error"
                      type="tel"
                      v-model="billing.ccNum"
                      :max-length="ccMaxLen"
                      :after="[{ icon: ccIcon, handler () {}, content: true }]"
                      @keydown="isNumber($event)"
                      @keydown.space="$event.preventDefault()"
                      @blur="$v.billing.ccNum.$touch"
                      clearable/>
                  </div>

                  <div class="col-2">
                    <q-input
                      :error="$v.billing.ccCCV.$error"
                      type="tel"
                      :max-length="ccCCVLen"
                      v-model="billing.ccCCV"
                      @keydown="isNumber($event)"
                      @keydown.space="$event.preventDefault()"
                      @blur="$v.billing.ccCCV.$touch"
                      clearable/>
                  </div>
                </div>
              </q-field>

              <q-field dark label="Exp Date" :labelWidth="2" helper="Enter Experation Month and Year">
                <!-- <q-input ref="date" MM/YY)" type="text" v-model="billing.expDate" clearable/> -->
                <div class="row no-wrap xs-gutter">
                  <div class="col-4">
                    <q-select
                      :error="$v.billing.expMonth.$error"
                      v-model="billing.expMonth"
                      :options="selectMonthOptions"
                      @blur="$v.billing.expMonth.$touch"/>
                  </div>

                  <div class="col-4">
                    <q-select
                      :error="$v.billing.expYear.$error"
                      v-model="billing.expYear"
                      :options="selectYearOptions"
                      @blur="$v.billing.expYear.$touch"/>
                  </div>
                </div>
              </q-field>

              <q-field dark label="Zip Code" :labelWidth="2" helper="Enter Zip Code">
                <q-input
                  :error="$v.billing.ccZip.$error"
                  type="text"
                  v-model="billing.ccZip"
                  clearable
                  @blur="$v.billing.ccZip.$touch"/>
              </q-field>

              <q-stepper-navigation>
                <q-btn color="tertiary" @click="toSummary">Next</q-btn>
              </q-stepper-navigation>
            </q-step>

            <!-- STEP 3 END-->

            <!-- STEP 4 -->

            <q-step name="summary" title="Summary" :order="4">
              <span class="text-center"><h4>Summary</h4></span>

              <q-list separator>
                <q-collapsible group="summary" icon="fa-user" label="Account" opened>
                  <q-btn color="tertiary" @click="$refs.stepper.goToStep('account')">Edit</q-btn>

                  <q-field dark label="Name" :labelWidth="2">
                    <q-input readonly type="text" v-model="billing.name"/>
                  </q-field>

                  <q-field dark label="Email" :labelWidth="2">
                    <q-input readonly type="email"  v-model="account.email"/>
                  </q-field>

                  <q-field dark label="Password" :labelWidth="2">
                    <q-input readonly type="password" v-model="account.password"/>
                  </q-field>
                </q-collapsible>

                <q-collapsible group="summary" icon="fa-shopping-cart" label="Credits">
                  <q-btn color="tertiary" @click="$refs.stepper.goToStep('credits')">Edit</q-btn>

                  <q-field dark label="Number of Credits" :labelWidth="3">
                    <q-input readonly type="text" v-model="credits"/>
                  </q-field>

                  <q-field dark label="Price" :labelWidth="3">
                    <q-input readonly type="text" prefix="$" v-model="computedPrice"/>
                  </q-field>
                </q-collapsible>

                <q-collapsible group="summary" icon="fa-credit-card-alt" label="Billing">
                  <q-btn color="tertiary" @click="$refs.stepper.goToStep('billing')">Edit</q-btn>

                  <q-field dark label="Payment Method" :labelWidth="2">
                    <q-input readonly type="text" :before="[{ icon: ccIcon, handler () {}, content: true }]" v-model="ccType.niceType" />
                  </q-field>

                  <q-field dark label="Card Number" :labelWidth="2">
                    <q-input readonly " type="text" v-model="ccMask" />
                  </q-field>

                  <q-field dark label="Zip Code" :labelWidth="2">
                    <q-input readonly " type="text" v-model="billing.ccZip" />
                  </q-field>
                </q-collapsible>
              </q-list>

              <br />

              <q-btn class="full-width" color="tertiary" @click="postRegister">GO!</q-btn>
            </q-step>

          </q-stepper>
          <!-- WIZARD END -->
        </div>
        <!-- SIGN UP END -->

        <!-- SOCIAL START -->
        <div  v-if="currentStep === 'account'">
          <div class="row">
            <div class="socialMedia">OR<br>Sign In with your favorite social media</div>
          </div>

          <div class="row socialIcons justify-center" >
            <a href="/login/facebook" class="facebook socialicon">facebook</a>
            <a href="/login/instagram" class="instagram socialicon">instagram</a>
            <a href="/login/twitter" class="twitter socialicon">twitter</a>
          </div>
        </div>
        <!-- SOCIAL END -->

      </div>

    </q-layout>
  </q-transition>
</template>

<script>
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
import creditCardType from 'credit-card-type'
import { Dialog } from 'quasar'

export default {
  data () {
    return {
      currentStep: 'first',
      selectMonthOptions: [
        { value: '01', label: '01' },
        { value: '02', label: '02' },
        { value: '03', label: '03' },
        { value: '04', label: '04' },
        { value: '05', label: '05' },
        { value: '06', label: '06' },
        { value: '07', label: '07' },
        { value: '08', label: '08' },
        { value: '09', label: '09' },
        { value: '10', label: '10' },
        { value: '11', label: '11' },
        { value: '12', label: '12' }
      ],
      selectYearOptions: [
        { label: '2017', value: '17' },
        { label: '2018', value: '18' },
        { label: '2019', value: '19' },
        { label: '2020', value: '20' },
        { label: '2021', value: '21' },
        { label: '2022', value: '22' },
        { label: '2023', value: '23' },
        { label: '2024', value: '24' },
        { label: '2025', value: '25' },
        { label: '2026', value: '26' },
        { label: '2027', value: '27' },
        { label: '2028', value: '28' },
        { label: '2029', value: '29' },
        { label: '2030', value: '30' }
      ],
      account: {
        email: '',
        password: ''},
      credits: 1,
      skipped: false,
      billing: {
        name: '',
        ccNum: '',
        ccCCV: '',
        expMonth: '',
        expYear: '',
        ccZip: ''
      }
    }
  },
  computed: {
    ccType: function () {
      var types = creditCardType(this.billing.ccNum)
      if (types.length === 0) {
        return undefined
      }

      return types[0]
    },
    ccMaxLen: function () {
      return this.ccType ? this.ccType.lengths[this.ccType.lengths.length - 1] : 16
    },
    ccCCVLen: function () {
      return this.ccType ? this.ccType.code.size : 4
    },
    ccIcon: function () {
      if (!this.ccType) {
        return ''
      }

      switch (this.ccType.type) {
        case 'master-card':
          return 'fa-cc-mastercard'
        case 'visa':
          return 'fa-cc-visa'
        case 'american-express':
          return 'fa-cc-amex'
        case 'discover':
          return 'fa-cc-discover'
        default:
          return 'fa-credit-card'
      }
    },
    ccMask: function () {
      return this.billing.ccNum.replace(/[0-9](?=([0-9]{4}))/g, 'X')
    },
    computedPrice: function () {
      return this.credits * 0.50
    }
  },
  mounted () {

  },
  validations: {
    account: {
      email: { required, email },
      password: { required, minLength: minLength(4) }
    },
    billing: {
      name: { required },
      ccNum: { required, numeric, minLength: minLength(13) },
      ccCCV: { required, numeric },
      expMonth: { required },
      expYear: { required },
      ccZip: { required }
    }
  },
  methods: {
    skipAccount () {
      this.account.email = ''
      this.account.password = ''
      this.account.confirmPass = ''
      this.skipped = true
      this.$refs.stepper.next()
    },
    toBidpack () {
      this.skipped = false
      this.$v.account.$touch()

      /* if (this.$v.account.$error) {
        return
      } */

      this.$refs.stepper.next()
    },
    toSummary () {
      this.$v.account.$touch()
      this.$v.billing.$touch()

      if (this.$v.account.$error || this.$v.billing.$error) {
        return
      }

      this.$refs.stepper.next()
    },
    isNumber: function (evt) {
      evt = evt || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 41 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) && charCode !== 46) {
        evt.preventDefault()
      }
      else {
        return true
      }
    },
    postRegister: function () {
      const dialog = Dialog.create({
        title: 'Progress',
        message: 'Computing...',
        progress: {
          indeterminate: true
        },
        buttons: [],
        noBackdropDismiss: true,
        noEscDismiss: true
      })

      const timeout = setTimeout(() => {
        clearInterval(timeout)
        dialog.close()
      }, 3000)
    }
  }
}
</script>

<style scoped lang="stylus">
  .layout-padding
    @media (orientation: landscape) and (max-width: 768px)
      padding 0.5rem

  .q-field-label
    color white

  .join-layout
    background-color #0084cc

  .reg-wizard
    width 90%
    max-width 90vw

  #biddybidcard
    width 300px
    padding 8px
    @media (min-width: 768px)
      width 540px
    .biddy-bid-main-display
      width 100%
      @media (min-width: 768px)
        width 100%
    &.orientation-landscape
      width 540px

  .biddy-bid-main-display
    padding 12px 0 20px
    margin 0
    h1, h2, h3, h5, h4
      color #ff8528

</style>
