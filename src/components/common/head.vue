<template>
  <div class="header-container">
    <div class="nav-list">
      <ul>
      <li class="route" v-for="(route, index) in routes" :key="index" @mouseenter="reverseShow(index)" @mouseleave="reverseShow()">
        <router-link :to="{name: route.name}">{{ route.name }}</router-link>
        <ul v-if="route.children" v-show="index === targetIndex">
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

    reverseShow (i = -1) {
      this.targetIndex = i
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
  z-index: 150;
  .nav-list{
    @include wh(auto, 100%);
    @include center;
    left: 40%;
    background-color: transparent;
    ul{
      position: absolute;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      li{
        display: inline-block;
        margin: auto 1rem;
        ul {
          display: block;
          li{
            display: block;
            text-indent: .5em;
          }
        }
      }
      a:hover {
        font-weight: 600;
      }
      .change-roles{
        background-color: rgb(241,124,103);
        padding: .3rem .6rem;
        width: 3.6rem;
        text-align: center;

      }
    }
  }
}

</style>
