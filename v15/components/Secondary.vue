<template>
  <div id="secondary">
    
    <!-- GRID COMPONENT -->
    <div class="grid-container">
      <div class="row sm-gutter no-horiz-gutter">
        <div class="col-4 grid-box" v-for="n in 9" :id="'grid-'+n" :key="n">
          <div class="my-content" :id="'box-'+n">{{n}} <span v-show="n === 5"> - MYSTERY</span></div>
        </div>
      </div>
    </div>

    <!-- WINNERS DISPLAY AREA -->
    <div class="winners-container bg-teal-13">
      <div class="row">
        <ul>
          <li v-for="(winner, index) in winners" :key="index"><strong>Prize:</strong> {{winner.payout.prize}}   <strong>Rank:</strong> {{winner.rank}}</li>
        </ul>
      </div>
    </div>

    <!-- BAR COMPONENT -->
    <div class="bar-container bg-pink-4">
      <div class="row items-center">
        <div class="col-10 bg-yellow" style="padding: 10px">
          <q-progress color="blue" :percentage="50" stripe style="height: 10px" />
        </div>
        <div class="col-auto bg-cyan">
          <img src="../dist/img/chest.png"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { TimelineMax } from 'gsap'
import CustomBounce from 'gsap/CustomBounce'

export default {
  data () {
    return {
      tl: undefined,
      winners: []
    }
  },
  created () {
    this.tl = new TimelineMax()
  },
  mounted () {
    // const tl = new TimelineMax()
    // tl.set('#grid-1', {
    //   opacity: 50,
    //   scale: 0.9,
    //   visibility: 'visible',
    //   transformOrigin: '50% 50%'
    // })

    CustomBounce.create('myBounce', {
      strength: 0.3
    })

    this.tl.add('start')

    this.tl.staggerFromTo('.grid-box', 2, {
      y: -1000,
      scaleX: 1,
      scaleY: 1
    }, {
      y: 0,
      scaleX: 1,
      scaleY: 1,
      ease: 'myBounce'
    }, 0.1, 'start')
    // tl.fromTo('.grid-box', 2, {
    //   y: -1000
    // }, {
    //   y: 0,
    //   ease: 'myBounce'
    // }, 0.1, 'start')
  },
  methods: {
    trigger: function (winners) {
      this.winners = winners
      const grouping = [[1], [2, 3], [4, 5, 6], [7, 8], [22, 23, 24], [9, 10], [11, 12, 13, 14], [15, 16, 17, 18], [19, 20, 21]]
      // this.tl.restart()
      this.tl = new TimelineMax()

      this.tl.set('.my-content', {
        background: '#f00'
      })

      winners.forEach(winner => {
        console.log(winner.rank)
        var pos = grouping.findIndex((element) => {
          return element.includes(winner.rank + 1)
        })
        this.tl.set(`#box-${pos + 1}`, {
          background: '#0f0'
        })
      }, this)

      CustomBounce.create('myBounce', {
        strength: 0.3
      })

      this.tl.add('start')

      this.tl.staggerFromTo('.grid-box', 2, {
        y: -1000,
        scaleX: 1,
        scaleY: 1
      }, {
        y: 0,
        scaleX: 1,
        scaleY: 1,
        ease: 'myBounce'
      }, 0.1, 'start')
    }
  }
}
</script>

<style scoped lang="stylus">
.grid-container
  margin 10px
  padding-left: 5%

.bar-container
  margin 10px
  padding 30px

.winners-container
  margin 10px
  padding 60px 30px 

.my-content
  background #ffcc00
  border 3px solid black
  width: 10vw
  height: 10vw

.winner
  background #00ff00

.loser
  background #ff0000
</style>
