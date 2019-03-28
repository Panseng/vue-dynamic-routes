<template>
  <div class="header-container">
    <div class="nav-list">
      <ul>
      <li class="route" v-for="(route, index) in routes" :key="index" @mouseover="reverseShow(index)" @mouseout="reverseShow()">
        <router-link :to="{name: route.name}">{{ route.name }}</router-link>
        <ul v-if="route.children">
          <li v-for="item in route.children" :key="item.name">
            <router-link :to="{name: item.name}">{{ item.name }}</router-link>
          </li>
        </ul>
      </li>
      <li @click="logOut" class="change-roles">登出</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'headTop',
  data () {
    return {
      routes: [],
      targetIndex: -1
    }
  },
  computed: {
    ...mapState([
      'userRoutes'
    ])
  },
  created () {
    this.routes = this.navRoutes(this.userRoutes)
    console.log(this.userRoutes)
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'LogOut'
    ]),
    navRoutes (routes) {
      for (let index in routes) {
        if (routes[index].name === 'Login') {
          routes.splice(index, 1)
        } else if (routes[index].name === '404') {
          routes.splice(index, 1)
        }
      }
      return routes
    },
    logOut () {
      this.LogOut().then(() => {
        location.reload()
        this.$router.push({path: '/'})
        console.log('then: ' + sessionStorage.getItem('Token'))
      }).catch((error) => {
        console.log(error)
      })
    },

    reverseShow ({index = -1}) {
      this.targetIndex = index
    }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.header-container {
  top: 0;
  left: 0;
  @include wh(100%, 8%);
  background-color: rgb(76,180,231);
  position: fixed;
  z-index: 50 ;
  .nav-list{
    @include wh(auto, 100%);
    @include center;
    background-color: transparent;
    ul{
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      position: relative;
      li{
        display: inline-block;
        position: relative;
        ul {
          display: flex;
          flex-direction: column;
          li{
            display: block;
            text-indent: .5em;
          }
        }
        .show {
          visibility: visible;
        }
      }
      .change-roles{
        background-color: rgb(241,124,103);
        padding: .3rem .6rem;
      }
    }
  }
}
</style>
