<template>
  <q-layout>
    <transition appear name="custom-classes-transition" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
      <div class="creditCardModal" v-if="showCreditCard">
          <div class="landscape logo_white"><img src="../dist/img/logo_white.png" height="100%" width="100%" /></div>
          <div id="creditCard" name="creditcard">
              <div class="row reg_mail_container" v-if="this.$store.emailPresence =='false'">
                  <label id="reg_email_label">Email</label>
                  <input v-validate="'required|email'" :class="{'is-danger': errors.has('email')}" name="email" id="ccemail" class="reg-input no-border" required="required" autofocus="autofocus" placeholder="We won't share it..." v-model="emailAddress">
                  <span v-show="errors.has('email')" class="message reg-error">{{ errors.first('email') }}</span>
              </div>
              <br/>
              <div class="row reg_password_container" v-if="this.$store.emailPresence =='false'">
                  <label id="reg_password_label">Password</label>
                  <input v-validate="'required|min:4|max:8'" :class="{'is-danger': errors.has('password')}" id="cc_reg_password_input" type="password" name="password" required="required" class="reg-input no-border" placeholder="At least 4 characters" v-model="password">
                  <span v-show="errors.has('password')" class="message reg-error">{{ errors.first('password') }}</span>
              </div>
              <br/>
              <div class="row field_container">
                  <div class="cc_name_label">Name</div>
                  <input v-validate="'required'" :class="{'is-danger': errors.has('ccName')}" class="reg-input no-border" id="cc_name_input" name="ccName" data-vv-as="Name" v-model="ccName" placeholder="Cardholder Name" />
                  <span v-show="errors.has('ccName')" class="message reg-error">{{ errors.first('ccName') }}</span>
              </div>
              <br/>
              <div class="row field_container">
                  <div class="cc_number_label">Number</div>
                  <div id="cardContainer"><span :data-type="ccType" id="cc_logo" :class="ccLogo"></span></div>
                  <input v-validate="'required|credit_card'" :class="{'is-danger': errors.has('ccNumber')}" type="number" class="reg-input no-border" id="cc_number_input" data-vv-as="CC Number" name="ccNumber" placeholder="Credit Card Number" v-model="ccNumber" />
                  <span v-show="errors.has('ccNumber')" class="message reg-error">{{ errors.first('ccNumber') }}</span>
              </div>
              <br/>
              <div class="row field_container">
                  <div class="cc_cvv_label">CVV Code</div>
                  <input v-validate="'required|min:3|max:4'" type="number" :class="{'is-danger': errors.has('ccCVV')}" class="reg-input no-border" id="cc_cvv_input" name="ccCVV" v-model="ccCVV" data-vv-as="CVV" placeholder="CVV Code" />
                  <span v-show="errors.has('ccCVV')" class="message reg-error">{{ errors.first('ccCVV') }}</span>
              </div>
              <br/>
              <div class="row field_container">
                  <div class="cc_exp_month_label">Exp Month</div>
                  <div class="cc_exp_month">
                      <q-select type="list" id="cc_expMonth_input" name="ccExpMonth" v-model="selectMonth" :options="selectMonthOptions"></q-select>
                  </div>
              </div>
              <br/>
              <div class="row field_container">
                  <div class="cc_exp_year_label">Exp Year</div>
                  <div class="cc_exp_year">
                      <q-select type="list" id="cc_exp_year_input" name="ccExpYear" v-model="selectYear" :options="selectYearOptions"></q-select>
                  </div>
              </div>
              <br/>
              <div class="row field_container">
                  <div class="cc_zip_label">Zip Code</div>
                  <input v-validate="'required'" :class="{'is-danger': errors.has('ccZip')}" data-vv-as="Zip Code" class="reg-input no-border" id="cc_zip_input" name="ccZip" placeholder="Zip Code" v-model="ccZip" />
                  <span v-show="errors.has('ccZip')" class="message reg-error">{{ errors.first('ccZip') }}</span>
              </div>
              <br/>
              <button class="tertiary go_cc" :disabled="errors.any()" v-on:click="showCCsummary = !showCCsummary" @click="ccSummaryData">Go!</button>
          </div>
      </div>
    </transition>

    <transition appear name="custom-classes-transition" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
        <div class="ccSummaryModal" v-if="!showCCsummary">
            <div class="landscape logo_white mobile-hide"><img src="../dist/img/logo_white.png" height="100%" width="100%" /></div>
            <!-- TODO: Change these to inline inputs with validators-->
            <div class="ccSummaryContainer layout-padding">
                <div class="ccSummarySubtitle">Summary of Purchase</div>
                <div class="list item-delimiter">
                    <q-collapsible icon="person" group="information" label="Account Information">
                        <div class="row items-center info" v-for="info in accountInfos()">
                            <div class="auto">
                                {{ info.label }}:
                                <span v-if="info.editmode">
                        <span v-if="info.type === 'email'">
                          <input class="inline" type="email" :name="info.label" v-validate="info.valid" v-model="info.value" required autofocus />
                        </span>
                                <span v-else-if="info.type === 'password'">
                          <input class="inline" type="password" :name="info.label" v-validate="info.valid" v-model="info.value" required autofocus />
                        </span>
                                <span v-else>
                          <input class="inline" type="text" :name="info.label" v-validate="info.valid" v-model="info.value" required autofocus />
                        </span>
                                <span v-show="errors.has(info.label)" class="message"> {{ errors.first(info.label) }} </span>
                                </span>
                                <span v-else>
                        {{ info.value }}
                      </span>
                            </div>
                            <span v-if="!info.editmode">
                      <button class="circular dark clear edit" @click="editInfo(info)">
                        <i>edit</i>
                        <q-tooltip :offset="[0,-5]">
                          Edit
                        </q-tooltip>
                      </button>
                    </span>
                            <span class="btn-inline" v-else>
                      <button class="circular dark clear edit" :disabled="errors.has(info.label)" @click="saveInfo(info)">
                        <i>save</i>
                        <q-tooltip :offset="[0,-5]">
                          Save
                        </q-tooltip>
                      </button>
                      <button class="circular dark clear edit" @click="cancelEdit(info)">
                        <i>cancel</i>
                        <q-tooltip :offset="[0,-5]">
                          Cancel
                        </q-tooltip>
                      </button>
                    </span>
                        </div>
                    </q-collapsible>
                    <q-collapsible icon="credit_card" group="information" label="Credit Card Information">
                        <div class="row items-center info" v-for="info in ccInfos()">
                            <div class="auto">
                                {{ info.label }}:
                                <span v-if="info.editmode">
                        <span v-if="info.type === 'number'">
                          <input class="inline" type="number" :name="info.label" v-validate="info.valid" v-model="info.value" required autofocus />
                        </span>
                                <span v-else-if="info.type === 'month'">
                          <q-select type="list" id="cc_expMonth_input"  name="ccExpMonth" v-model="info.value" :options="selectMonthOptions"></q-select>
                        </span>
                                <span v-else-if="info.type === 'year'">
                          <q-select type="list" id="cc_exp_year_input"  name="ccExpYear" v-model="info.value" :options="selectYearOptions"></q-select>
                        </span>
                                <span v-else>
                          <input class="inline" type="text" :name="info.label" v-validate="info.valid" v-model="info.value" required autofocus />
                        </span>
                                <span v-show="errors.has(info.label)" class="message"> {{ errors.first(info.label) }} </span>
                                </span>
                                <span v-else>
                        {{ info.value }}
                      </span>
                            </div>
                            <span v-if="!info.editmode">
                      <button class="circular dark clear edit" @click="editInfo(info)">
                        <i>edit</i>
                        <q-tooltip :offset="[0,-5]">
                          Edit
                        </q-tooltip>
                      </button>
                    </span>
                            <span class="btn-inline" v-else>
                      <button class="circular dark clear edit" :disabled="errors.has(info.label)" @click="saveInfo(info)">
                        <i>save</i>
                        <q-tooltip :offset="[0,-5]">
                          Save
                        </q-tooltip>
                      </button>
                      <button class="circular dark clear edit" @click="cancelEdit(info)">
                        <i>cancel</i>
                        <q-tooltip :offset="[0,-5]">
                          Cancel
                        </q-tooltip>
                      </button>
                    </span>
                        </div>
                    </q-collapsible>
                    <q-collapsible icon="shopping_cart" group="information" label="Purchase Information">
                        <div class="row items-center">
                            <div class="auto">
                                <div class="bidpack">Bidpack Size: {{ getBidpack() }} Bidpack</div>
                                <div class="bidpack"># of Bids: {{ $store.initBidpack.purchasedBids }} Bids</div>
                                <div class="bidpack total">Total: ${{ $store.initBidpack.amtBidPack }}</div>
                            </div>
                            <button class="circular dark clear edit" @click="showEditBidpack = true">
                                <i>edit</i>
                                <q-tooltip :offset="[0,-5]">
                                    Edit
                                </q-tooltip>
                            </button>
                        </div>
                    </q-collapsible>
                </div>
            </div>
            <br/>
            <button class="tertiary go_cc" :disabled="checkValid" @click="postCC()">Go!</button>
        </div>
    </transition>

    <bidpack :editing="true" v-if="showEditBidpack" @close="showEditBidpack = false"></bidpack>
  </q-layout>
</template>

<script>
  import axios from 'axios'
  var querystring = require('querystring')
  export default {
    data () {
      return {
        showEditBidpack: false,
        emailAddress: '',
        password: '',
        showCreditCard: true,
        selectMonth: '03',
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
        selectYear: '20',
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
        showReg: 'true',
        showCCsummary: 'false',
        ccNumber: '',
        ccName: '',
        ccCVV: '',
        ccZip: '',
        ccType: '',
        store: ['emailPresence', 'emailAddress', 'password', 'ccEmailAddress', 'ccType', 'ccName', 'ccNumber', 'ccCVV', 'ccExpMonth', 'ccExpYear', 'ccZip', 'smallbidPack', 'medBidpack', 'lgBidpack', 'xlBidpack'],
        summaryInfo: [
          { label: 'Email', value: '', accountInfo: true, ref: 'emailAddress', type: 'email', valid: 'required|email' },
          { label: 'Password', value: '', accountInfo: true, ref: 'password', type: 'password', valid: 'required|min:4|max:8' },
          { label: 'Name', value: '', ccInfo: true, ref: 'ccName', type: 'text', valid: 'required' },
          { label: 'CC Number', value: '', ccInfo: true, ref: 'ccNumber', type: 'number', valid: 'required|credit_card' },
          { label: 'CVV Number', value: '', ccInfo: true, ref: 'ccCVV', type: 'number', valid: 'required|min:3|max:4' },
          { label: 'Exp Month', value: '', ccInfo: true, ref: 'ccExpMonth', type: 'month', valid: 'required' },
          { label: 'Exp Year', value: '', ccInfo: true, ref: 'ccExpYear', type: 'year', valid: 'required' },
          { label: 'Zip', value: '', ccInfo: true, ref: 'ccZip', type: 'number', valid: 'required' }
        ]
      }
    },
    computed: {
      checkValid () {
        const editArr = this.summaryInfo.map(function (a) { return a.editmode })
        return editArr.some(function (editmode) { return editmode })
      },
      ccLogo () {
        var logoClass = { creditcardlogo: true }
        if (this.ccNumber.match(/^4/)) {
          logoClass.visa = true
          logoClass.mastercard = false
          logoClass.amex = false
          logoClass.discover = false
          this.ccType = 'VISA'
        }
        else if (this.ccNumber.match(/^3/)) {
          logoClass.visa = false
          logoClass.mastercard = false
          logoClass.amex = true
          logoClass.discover = false
          this.ccType = 'AMEX'
        }
        else if (this.ccNumber.match(/^5/)) {
          logoClass.visa = false
          logoClass.mastercard = true
          logoClass.amex = false
          logoClass.discover = false
          this.ccType = 'MASTER CARD'
        }
        else if (this.ccNumber.match(/^6/)) {
          logoClass.visa = false
          logoClass.mastercard = false
          logoClass.amex = false
          logoClass.discover = true
          this.ccType = 'DISCOVER'
        }
        else {
          logoClass.visa = false
          logoClass.mastercard = false
          logoClass.amex = false
          logoClass.discover = false
          this.ccType = ''
        }
        return logoClass
      }
    },
    beforeCreate: function () {
      this.$options.components.Bidpack = require('./Bidpack.vue')
    },
    methods: {
      getBidpack () {
        if (this.$store.initBidpack.smallbidPack === 'true') {
          return 'Small'
        }
        else if (this.$store.initBidpack.medBidpack === 'true') {
          return 'Medium'
        }
        else if (this.$store.initBidpack.lgBidpack === 'true') {
          return 'Large'
        }
        else {
          return 'Extra Large'
        }
      },
      editInfo (info) {
        console.log(this)
        this.$set(info, 'editmode', true)
      },
      saveInfo (info) {
        console.log('save')
        this.$store[info.ref] = info.value
        if (info.type === 'password') {
          this.$set(info, 'value', info.value.replace(/./ig, '•'))
        }
        this.$set(info, 'editmode', false)
      },
      cancelEdit (info) {
        console.log('cancel')
        this.$set(info, 'value', this.$store[info.ref])
        if (info.type === 'password') {
          this.$set(info, 'value', this.$store[info.ref].replace(/./ig, '•'))
        }
        this.$set(info, 'editmode', false)
      },
      accountInfos () {
        return this.summaryInfo.filter(info => {
          return info.accountInfo
        })
      },
      ccInfos () {
        return this.summaryInfo.filter(info => {
          return info.ccInfo
        })
      },
      ccSummaryData () {
        const emailaddress = document.getElementById('email') ? document.getElementById('ccemail').value : ''
        const emailVal = document.getElementById('ccemail').value
        const ccName = document.getElementById('cc_name_input').value
        const ccPassword = document.getElementById('cc_reg_password_input').value
        const ccNumber = document.getElementById('cc_number_input').value
        const ccCVV = document.getElementById('cc_cvv_input').value
        const ccExpMonth = this.selectMonth
        const ccExpYear = this.selectYear
        const ccExpZip = document.getElementById('cc_zip_input').value
        const ccType = document.getElementById('cc_logo') || ''
        if (emailaddress === '') {
          document.getElementById('ccemail').innerHTML += 'Email: ' + emailVal
          this.$store.emailAddress = this.summaryInfo[0].value = emailVal
          console.log(emailVal)
        }
        else {
          document.getElementById('email').innerHTML += 'Email: ' + emailaddress
          this.$store.emailAddress = this.summaryInfo[0].value = emailaddress
          console.log(emailaddress)
        }
        if (ccType !== '') {
          this.$store.ccType = ccType.getAttribute('data-type')
        }
        this.$store.ccName = this.summaryInfo[2].value = ccName
        this.$store.password = ccPassword
        this.summaryInfo[1].value = ccPassword.replace(/./ig, '•') // Protect Password
        this.$store.ccNumber = this.summaryInfo[3].value = ccNumber
        this.$store.ccCVV = this.summaryInfo[4].value = ccCVV
        this.$store.ccExpMonth = this.summaryInfo[5].value = ccExpMonth
        this.$store.ccExpYear = this.summaryInfo[6].value = ccExpYear
        this.$store.ccZip = this.summaryInfo[7].value = ccExpZip
      },
      postCC () {
        const emailVal = this.$store.emailAddress
        const passwordVal = this.$store.password
        const ccTypeVal = this.$store.ccType
        const ccNameVal = this.$store.ccName
        const ccNumberVal = this.$store.ccNumber
        const ccCvvVal = this.$store.ccCVV
        const ccExpMonthVal = this.$store.ccExpMonth
        const ccExpYearVal = this.$store.ccExpYear
        const ccZipVal = this.$store.ccExpZip
        const purchasedBids = this.$store.initBidpack.purchasedBids
        const freeBids = this.$store.initBidpack.freeBids
        const amount = this.$store.initBidpack.amtBidPack
        const emailPresence = this.$store.emailPresence
        console.log(ccTypeVal)
        console.log(ccNameVal)
        console.log(ccNumberVal)
        console.log(ccCvvVal)
        console.log(ccExpMonthVal)
        console.log(ccExpYearVal)
        console.log(ccZipVal)
        console.log(purchasedBids)
        console.log(freeBids)
        console.log(amount)
        console.log(emailPresence)
        if (emailPresence === 'false') {
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
              axios.post('/creditcard',
              querystring.stringify({
                username: emailVal,  // gave the values directly for testing
                password: passwordVal,
                email: emailVal,
                ccType: ccTypeVal,
                ccName: ccNameVal,
                ccNumber: ccNumberVal,
                ccCVV: ccCvvVal,
                ccExpMonth: ccExpMonthVal,
                ccExpYear: ccExpYearVal,
                ccZip: ccZipVal,
                purchasedBids: purchasedBids,
                freeBids: freeBids,
                amount: amount
              }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(function (response) {
                console.log(response)
              })
            })
        }
        else {
          axios.post('/creditcard',
            querystring.stringify({
              username: emailVal,  // gave the values directly for testing
              password: passwordVal,
              email: emailVal,
              ccType: ccTypeVal,
              ccName: ccNameVal,
              ccNumber: ccNumberVal,
              ccCVV: ccCvvVal,
              ccExpMonth: ccExpMonthVal,
              ccExpYear: ccExpYearVal,
              ccZip: ccZipVal,
              purchasedBids: purchasedBids,
              freeBids: freeBids,
              amount: amount
            }), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function (response) {
              console.log(response)
            })
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  transition(args...)
    -webkit-transition args
    -moz-transition args
    transition args
     
  .inline
    background rgba(0,0,0,0.15)
    border-radius 20px
    margin 7px
    padding 6px 0px 6px 10px
    width: 98%
    height: 30px
    &:focus
      outline-width 0
      background: rgba(31,134,252, 0.25)
      transition background 0.5s

  .reg-input
    width 30%
    margin-left 3px
    
    
  .reg-error
    font-size initial
  // @media screen and (max-width: 645px)
    
    
</style>
