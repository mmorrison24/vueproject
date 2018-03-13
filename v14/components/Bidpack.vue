<template>
<q-layout>
    <transition appear name="custom-classes-transition" enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
      <div class="bidPackModal" v-if="showBidPack">
        <div class="landscape logo_white"><img src="../dist/img/logo_white.png" height="100%" width="100%"/></div>
        <!--<h2>Bidpack{{ this.$store.emailPresence}}</h2>-->
        <div class ="bidPackSubtitle">CHOOSE YOUR BID PACK</div>
        <div id="bidPackHolder">
          <div id="bidPackContainer">
            <div class="row bidPackRow">
              <div class="bidPackItem" :class="smallSelected" @click="postsmallBidpack()">
                <div class="bidPackItemHeader">
                  <div class="bidPackItemHeader_txt">20 BIDS </div>
                  <div class="bidPackItemSubHeader">
                    <div class="bidPackItemHSubHeader_txt">+5 FREE BIDS </div>
                  </div>
                </div>
                <div class="bidPackAmt">$10.00</div>
                <hr class="hr_bidPack">
                <div class="row bidPackFooter">
                  <div class="bidPackFooter_txt">PURCHASE NOW<div class="arrow-right"> </div> </div>
              </div>
              </div>


              <div class="bidPackItem" :class="medSelected" @click="postmedBidpack()">
                <div class="bidPackItemHeader">
                  <div class="bidPackItemHeader_txt">40 BIDS </div>
                  <div class="bidPackItemSubHeader">
                    <div class="bidPackItemHSubHeader_txt">+10 FREE BIDS </div>
                  </div>
                </div>
                <div class="bidPackAmt">$20.00</div>
                <hr class="hr_bidPack">
                <div class="row bidPackFooter">
                  <div class="bidPackFooter_txt">PURCHASE NOW<div class="arrow-right"> </div> </div>
                </div>
              </div>
            </div>
            <br/>
            <div class="row bidPackRow">
              <div class="bidPackItem" :class="lgSelected" @click="postlgBidpack()">
                <div class="bidPackItemHeader">
                  <div class="bidPackItemHeader_txt">100 BIDS </div>
                  <div class="bidPackItemSubHeader">
                    <div class="bidPackItemHSubHeader_txt">+25 FREE BIDS </div>
                  </div>
                </div>
                <div class="bidPackAmt">$50.00</div>
                <hr class="hr_bidPack">
                <div class="row bidPackFooter">
                  <div class="bidPackFooter_txt">PURCHASE NOW<div class="arrow-right"> </div> </div>
                </div>
              </div>
              <div class="bidPackItem" :class="xlSelected" @click="postxlBidpack()">
                <div class="bidPackItemHeader">
                  <div class="bidPackItemHeader_txt">200 BIDS </div>
                  <div class="bidPackItemSubHeader">
                    <div class="bidPackItemHSubHeader_txt">+50 FREE BIDS </div>
                  </div>
                </div>
                <div class="bidPackAmt">$100.00</div>
                <hr class="hr_bidPack">
                <div class="row bidPackFooter">
                  <div class="bidPackFooter_txt">PURCHASE NOW<div class="arrow-right"> </div> </div>
                </div>
              </div>



              <div slot="footer" class="row bidPack_footer">
                <div class="bidPackFooterContainer"  v-if="showBidPack">
                  <div class="bidPackFooterModal_txt">Purchase a Bid Pack and Get</div>
                  <div class="landing-free_bids_purchase-bid-pack"></div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </transition>

    <div class="bidPackModal" v-if="showReg">
      <appRegister></appRegister>
    </div>

  </q-layout>
</template>

<script>
  import Register from './Register.vue'
  export default {
    props: ['editing'],
    data () {
      return {
        showBid: true,
        showCreditCard: true,
        selectMonth: '03',
        selectYear: '2020',
        showBidPack: true,
        showReg: false,
        store: ['emailPresence', 'smallbidPack', 'medBidpack', 'lgBidpack', 'xlBidpack']
      }
    },
    computed: {
      smallSelected () {
        return { bidpackSelected: this.$store.initBidpack.smallbidPack === 'true' }
      },
      medSelected () {
        return { bidpackSelected: this.$store.initBidpack.medBidpack === 'true' }
      },
      lgSelected () {
        return { bidpackSelected: this.$store.initBidpack.lgBidpack === 'true' }
      },
      xlSelected () {
        return { bidpackSelected: this.$store.initBidpack.xlBidpack === 'true' }
      }
    },
    methods: {
      postsmallBidpack () {
        console.log('Gimme Small' + this.$store.initBidpack.smallbidPack)
        this.$store.initBidpack.smallbidPack = 'true'
        this.$store.initBidpack.medBidpack = 'false'
        this.$store.initBidpack.lgBidpack = 'false'
        this.$store.initBidpack.xlBidpack = 'false'
        this.$store.initBidpack.purchasedBids = 20
        this.$store.initBidpack.freeBids = 5
        this.$store.initBidpack.amtBidPack = 10
        console.log('Gimme Small Again' + this.$store.initBidpack.smallbidPack)
        if (this.editing) {
          this.$emit('close')
          return
        }
        this.showReg = 'true'
        return this.showReg
      },
      postmedBidpack () {
        console.log('Gimme Medium' + this.$store.initBidpack.medBidPack)
        this.$store.initBidpack.smallbidPack = 'false'
        this.$store.initBidpack.medBidpack = 'true'
        this.$store.initBidpack.lgBidpack = 'false'
        this.$store.initBidpack.xlBidpack = 'false'
        this.$store.initBidpack.purchasedBids = 40
        this.$store.initBidpack.freeBids = 10
        this.$store.initBidpack.amtBidPack = 20
        console.log('Gimme Small Again' + this.$store.initBidpack.medBidPack)
        if (this.editing) {
          this.$emit('close')
          return
        }
        this.showReg = 'true'
        return this.showReg
      },
      postlgBidpack () {
        console.log('Gimme Large' + this.$store.initBidpack.lgBidPack)
        this.$store.initBidpack.smallbidPack = 'false'
        this.$store.initBidpack.medBidpack = 'false'
        this.$store.initBidpack.lgBidpack = 'true'
        this.$store.initBidpack.xlBidpack = 'false'
        this.$store.initBidpack.purchasedBids = 100
        this.$store.initBidpack.freeBids = 25
        this.$store.initBidpack.amtBidPack = 50
        console.log('Gimme Large Again' + this.$store.initBidpack.lgBidPack)
        if (this.editing) {
          this.$emit('close')
          return
        }
        this.showReg = 'true'
        return this.showReg
      },
      postxlBidpack () {
        console.log('Gimme XL' + this.$store.initBidpack.xlBidPack)
        this.$store.initBidpack.smallbidPack = 'false'
        this.$store.initBidpack.medBidpack = 'false'
        this.$store.initBidpack.lgBidpack = 'false'
        this.$store.initBidpack.xlBidpack = 'true'
        this.$store.initBidpack.purchasedBids = 200
        this.$store.initBidpack.freeBids = 50
        this.$store.initBidpack.amtBidPack = 100
        console.log('Gimme XL Again' + this.$store.initBidpack.xlBidPack)
        if (this.editing) {
          this.$emit('close')
          return
        }
        this.showReg = 'true'
        return this.showReg
      }
    },
    components: {
      appRegister: Register
    }
  }
</script>

<style scoped lang="stylus">
  .bidpackSelected
    border 4px solid #000
</style>
