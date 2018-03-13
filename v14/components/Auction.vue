<template>
  <q-layout>
    <div slot="header" class="topnav">

<div class="row navContainer">
  <div class="row auctionShop">
    <div class="column auctionShopLeft">
      <div class="logo"></div>
    </div>
    <div class="column auctionShopRight">
      <div class="luckybidsText"></div>
      <div class="auctionShopNowText">
        <span class="auctionShopNowTxt">Shop Now</span>

      </div>
      <div class="arrow-right-white"> </div>
    </div>




  </div>

  <div class="row auctionGiftcard">
    <div class="column auctionGiftCardLeft">
      <div class="btn_giftcard"></div>
    </div>
    <div class="column auctionGiftCardRight">
      <div class="auctionGiftCardText">
        <span class="auctionGiftCardText">Gift Card</span>
      </div>
      <div class="auctionGiftCardAmt">
        $590
      </div>
    </div>


  </div>
  <div class="row auctionBidsWon">
    <div class="column auctionBidsWonLeft">
      <div class="btn_bidswon"></div>
    </div>
    <div class="column auctionBidsWonRight">
      <div class="auctionBidsWonTxt">
      <span class="auctionBidsWonTxt">Bids Won</span>
      </div>
      <div class="auctionBidsWonAmt">
        75
      </div>
    </div>




  </div>

  <div class="auctionMyBids">
    <div class="row auctionMyBids">
      <div class="column auctionMyBidsLeft">
        <div class="btn_mybids"></div>
      </div>
      <div class="column auctionMyBidsRight">
        <div class="auctionMyBidsTxt">
          <span class="auctionMyBidsTxt">My Bids</span>
        </div>
        <div class="auctionMyBidsAmt">
        250
      </div>
        </div>
      </div>
    </div>
  <div class="auctionMenu">
    <div class="auctionMenuContainer">
    <div class="row circle-white"></div>
    <div class="row circle-white"></div>
    <div class="row circle-white"></div>
  </div>
  </div>
  </div>

  </div>




    <div class="layout-view">
      <div class="main">

      <div class ="column auctionBoardContainer">

        <div class="row auctionBoard">
  <div class="gameContainer">






    <div class="row gameRow">

      <div id="wrap1" class="gamePiece">
          <div class="cardFace front"></div>
          <div class="cardFace back"></div>
      </div>

      <div id="wrap2" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap3" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap4" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>


      <!--<div id="wrap2" class="cardWrapper">-->
        <!--<div class="gameCard">-->
          <!--<div class="cardFace front"></div>-->
          <!--<div class="cardFace back"></div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div id="wrap3">-->
        <!--<div class="gameCard">-->
          <!--<div class="cardFace front"></div>-->
          <!--<div class="cardFace back"></div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div id="wrap4" class="cardWrapper">-->
        <!--<div class="gameCard">-->
          <!--<div class="cardFace front"></div>-->
          <!--<div class="cardFace back"></div>-->
        <!--</div>-->
      <!--</div>-->

    </div>

    <div class="row gameRow">
      <div id="wrap5" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap6" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap7" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap8" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>
    </div>

    <div class="row gameRow">

      <div id="wrap9" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap10" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap11" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>

      <div id="wrap12" class="gamePiece">
        <div class="cardFace front"></div>
        <div class="cardFace back"></div>
      </div>
    </div>


        </div>





        </div>

      <div class="row tokenMeter">
        <div class="auctionProgressBar">
        <q-progress :percentage="50" class="light-blue stripe animate"></q-progress>
          <div class="auctionProgressBarIndicator">
            <img src="../dist/img/chest.png" />
          </div>

        </div>


      </div>



      </div>

      <div class ="column auctionContainer">

      <div class="auctionItem">
        <div class="auctionSwiper">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide>
            <div class="row auctionItemContainer">
              <div class="column auctionItemLeft">
                <img src="../dist/img/auctionItem.png" width="70%"  height="70%"  />
              </div>
              <div class="column auctionItemRight">
                <div class="auctionItemTitle">
                  <span class="auctionItemTitle">
                  LG-55 (54.6 inch diag.)
                </span>
              </div>
                <div class="auctionItemDesc">
                   <span class="auctionItemDesc">
                  LED-1080p-Smart HDTV-Black
                   </span>
                </div>
            </div>
            </div>

          </swiper-slide>
          <swiper-slide>Auction Item 2</swiper-slide>
          <swiper-slide>Auction Item 3</swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        </div>
      </div>

      <div class="row auctionStatsBidContainer">
      <div class="column auctionStats">
        Auction Stats
      </div>
      <div class="auctionCurrentBid">
        <div class="auctionCurrentBidContainer">
          <div class="row auctionCurrentBidTxt">
            <span class="auctionCurrentBidTxt">
              $12.99
            </span>
          </div>
          <div class="row auctionCurrentBidder">
            <img src= "../dist/img/avatar.png" height="50%" width="50%">
            <div class="auctionCurrentBidTxtUser">
            <span class="auctionCurrentBidTxtUser">
              supertiger
            </span>
            </div>
          </div>

        </div>
      </div>
      </div>

        <div class="row auctionBidButtons">
          Bid Buttons
        </div>


      </div>

      </div>


</div>

  </q-layout>
</template>

<script>
//  const wrap1 = document.getElementById('wrap1')
  import { TimelineMax } from 'gsap'
  export default {
    data () {
      return {
        anim: '',
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 30
        }
      }
    },
    mounted () {
//      TweenMax.to('#wrap1', 2, {width: '200px', height: '150px'})
      const tl = new TimelineMax()
      tl.set('#wrap1', {
        opacity: 50,
        scale: 0.9,
        visibility: 'visible',
        transformOrigin: '50% 50%'
      })
    }
  }
  </script>
<style scoped lang="stylus">
.navContainer
    background #FFF
    width 100%
    height 100px
    margin 0

.main
  height 100%
  width 100%

.auctionShopLogoTextContainer
  height 100%
  width 100%

.auctionGiftcard, .auctionBidsWon
  width 100%
  background-color #000000

.auctionMyBids
  width 80%
  background-color #3366cc

.auctionShop
   background-image url(../dist/img/bg_shop.png)
   background-repeat no-repeat
   background-color #CC3300
   width 130%

.auctionMenu
 width 25%
 background-color #000000

.logo
  max-width 154px
  max-height 179px
  width 107px

.logo::after
  content ' '
  display: inline-block
  width:154px
  height:100%
  background-position 0.2457002457002457% 9.090909090909092%
  background-size 364.2857142857143% 106.14525139664805%
  background-image: url(../dist/img/auctionNav.png)
  padding: 0

div.logo::after
  max-width:154px
  width:100%
  height:0
  padding: 0 0 116.23376623376623% 0

.luckybidsText
  max-width 323px
  max-height 49px
  content ' '
  display inline-block
  width 64%
  height 35%
  background-position 65.54621848739495% 99.29078014184397%
  background-size 173.68421052631578% 387.7551020408163%
  background-image url(../dist/img/auctionNav.png)
  background-repeat no-repeat
  padding 0
  margin-left 17%
  margin-top 6%

.auctionShopNowText, .auctionGiftCardText, .auctionBidsWonTxt, .auctionMyBidsTxt
  margin-left 44%
  margin-top 3%
  font-size 157%
  text-transform uppercase

span.auctionGiftCardText, span.auctionBidsWonTxt, span.auctionMyBidsTxt
  font-size 100%
  display block
  margin-left -45%

.auctionBoardContainer
  width 50%
  height 100%
  float left

.auctionContainer
  width 50%
  height 100%
  float right


.auctionItemContainer
  height 100%
  width 100%
  display block
  margin-top 20px

.auctionStatsBidContainer
  height 60%

.auctionShopRight, .auctionBidsWonRight, .auctionMyBidsRight
  width 85%

.auctionGiftCardLeft, .auctionBidsWonLeft, .auctionMyBidsLeft
 width 33%
 margin-left 10%
 margin-top 2%
 display block

.auctionGiftCardRight, .auctionBidsWonRight, .auctionMyBidsRight
  width 67%

.auctionGiftCardAmt, .auctionBidsWonAmt, .auctionMyBidsAmt
  font-size 250%
  display block
  margin auto

.auctionBoard
  width 100%
  height 85%
  background-color #FFF

.gameContainer
  margin-left 30px
  height 100%
  width 100%
  margin-top 17%

.gamePiece
  position relative
  border-radius 10px
  background #f3a000
  height 150px
  width 150px
  border: 5px solid #ffcc00
  margin-left 20px
  margin-bottom 40px

.tokenMeter
  width 100%
  height 15%
  background-color #FFF

.auctionProgressBar
  width 70%
  display block
  margin auto

.auctionProgressBarIndicator
  display block
  margin-left 100%
  width 30px
  margin-top -10%

.auctionItem
  width 100%
  height 25%
  /*background-color #f84800*/

.auctionItemLeft
  width 33%
  height 100%

.auctionItemRight
  width 67%
  height 100%

.auctionItemTitle
  height 100%
  width 100%
  margin-left 122px
  margin-top -110px
  font-size 130%

.auctionItemDesc
  height 100%
  width 100%
  margin-left 122px
  font-size 108%

.auctionSwiper
  display block
  margin-left 64px
  margin-top 12px

.auctionStats
  background-color #e312f0
  width 45%
  height 100%

.auctionCurrentBid
  width 55%
  height 100%

.auctionCurrentBidContainer
  border-style solid
  border-width 3px
  border-color #d6d6d6
  background-color #FFF
  box-shadow 1px 1.732px 10px 0px rgba(0, 0, 0, 0.75)
  width 90%
  height 61%
  margin-top 130px
  margin-left 16px

.auctionCurrentBidTxt
  color #669900
  font-weight bold
  padding-top 20px
  font-size 200%
  font-family Arial, "Helvetica Neue", Helvetica, sans-serif
  margin auto

.auctionCurrentBidder
  height 38%
  width 30%
  margin-left 88px

.auctionCurrentBidTxtUser
    margin-left 11px
    margin-top 6px
    font-size 138%

.auctionBidButtons
  background-color #d9e73d
  width 100%
  height 15%
  float top

.btn_giftcard
  max-width 120px
  max-height 126px
  &::after
    content ' '
    display inline-block
    width 80px
    height 86px
    background-position 99.77324263038548% 1.5625%
    background-size 467.5% 150.79365079365078%
    background-image url(../dist/img/auctionNav.png)
    padding 0

.btn_bidswon
  max-width 138px
  max-height 138px
  &::after
    content ' '
    display inline-block
    width 90px
    height 90px
    background-position 36.87943262411348% 1.9230769230769231%
    background-size 406.5217391304348% 137.68115942028984%
    background-image url(../dist/img/auctionNav.png)
    padding 0

.btn_mybids
  max-width 144px
  max-height 133px
  &::after
    content ' '
    display inline-block
    width 95px
    height 88px
    background-position 70.74340527577938% 1.7543859649122806%
    background-size 389.5833333333333% 142.85714285714286%
    background-image url(../dist/img/auctionNav.png)
    padding 0


.cardWrapper
  position relative
  margin-left 2%
  margin-right 10px
  margin-top 10px
  width 312px
  height 191px
  float left

.cardFace
  width 100%
  height 100%
  position absolute
  overflow hidden
  border-radius 10px
  border 5px solid #ffcc00

.cardFace.front
    background #cc0000

.cardFace.back
  background #91E600


</style>
