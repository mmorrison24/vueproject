<template>
  <div id="primary">
    
  <!-- AUCTION ITEM DESCRIPTION -->
  <div class="row">
    <div class="col">
      <q-carousel arrows dots>

        <div slot="slide" class="bg-indigo">
          <div class="row">
            <div class="col auction-image">
              <img src="../dist/img/auctionItem.png" width="70%"  height="70%"  />
            </div>
            <div class="col auction-desc">
              <h5>{{ auction ? auction.item.name : 'N/A' }}</h5>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p>{{ auction ? auction.item.description : 'Auction has not started yet' }}</p>
            </div>
          </div>
        </div>

        <div slot="slide" class="bg-indigo-3">
          <div class="row">
            <div class="col auction-image">
              <img src="../dist/img/auctionItem.png" width="70%"  height="70%"  />
            </div>
            <div class="col auction-desc">
              <h5>LG-55 (54.6 inch diag.)</h5>
              <p>LED-1080p-Smart HDTV-Black</p>
            </div>
          </div>
        </div>

      </q-carousel>
    </div>
  </div>
  <!-- AUCTION ITEM DESC END -->

  <!-- STATS -->
  <div class="row">

    <div class="col">
      <div class="bg-purple stats">
        <h6>Auction Stats</h6>
        <dl>
          <dt>Title</dt>
          <dd>{{ auction ? auction.title : '' }}</dd>
          
          <dt>Total Bids</dt>
          <dd>{{ auction ? auction.totalBids : 0 }}</dd>

          <dt>Trigger Price</dt>
          <dd>{{ auction ? auction.triggerPrice : 0 }}</dd>

          <dt>Tags</dt>
          <dd>{{ auction ? auction.tags.join(', ') : '' }}</dd>
        </dl>
      </div>
    </div>
    
    <div class="col">
      <div class="bg-grey-5 history">
        <q-card class="bg-white">
          <q-card-title>Leaderboard</q-card-title>

          <!-- <q-card-main>
            <img src= "../dist/img/avatar.png" height="25%" width="25%">
            <span>supertiger</span>
          </q-card-main> -->
          <q-list v-if="auction">
            <q-item v-for="(leader, index) in auction.topBidders" :key="index">
              <q-item-side>
                <q-item-tile avatar>
                  <img src="~assets/avatar.png" />
                </q-item-tile>
              </q-item-side>
              <q-item-main :label="leader[0]" />
              <q-item-side right>
                <big>{{ '$' + leader[1] }}</big>
              </q-item-side>
            </q-item>
          </q-list>
        </q-card>
        
        <q-card class="bg-white">
          <q-card-title>Bid History</q-card-title>

          <q-list v-if="auction">
            <q-item v-for="(bid, index) in recentBidHistory" :key="index">
              <q-item-side :letter="''+(index+1)"/>
              <q-item-main :label="bid.bidder.username" />
              <q-item-side right>
                <big>{{ '$' + bid.bidAmount }}</big>
              </q-item-side>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

  </div>
  <!-- STATS END -->

  <!-- BID BUTTON -->
  <div class="row  bg-brown bid-container">

    <div class="col-6 offset-3">

      <q-btn class="full-width" big color="blue" @click="btnClick">BID</q-btn>

    </div>

  </div>

  </div>
</template>

<script>
export default {
  props: ['auction'],
  data () {
    return {}
  },
  computed: {
    recentBidHistory: function () {
      if (!this.auction) {
        return []
      }

      return this.auction.bidHistory.slice(-5).reverse()
    }
  },
  methods: {
    btnClick: function () {
      this.$emit('btnClick')
    }
  }
}
</script>

<style scoped lang="stylus">
.auction-image
  width 33%
  height 100%

.auction-desc
  width 67%
  height 100%

.primary
  padding 10px
  
.stats
  padding 120px 50px
  
.history
  padding 50px
  
.bid-container
  padding 50px 0px
</style>
