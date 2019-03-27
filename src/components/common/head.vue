<template>
  <div class="header-container">
    <ul>
      <li v-for="route in routes" :key="route.name">
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'headTop',
  data () {
    return {
      routes: []
    }
  },
  computed: {
    ...mapState([
      'userRoutes'
    ])
  },
  created () {
  },
  mounted () {
    this.routes = this.navRoutes(this.userRoutes)
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
        this.$router.push({path: '/'})
        console.log('then: ' + sessionStorage.getItem('Token'))
      }).catch((error) => {
        console.log(error)
      })
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
  ul{
    @include center;
    li{
      display: inline-block;
      border-right: 1px solid gray;
      padding: 2px 10px;
      margin: 0;
    }
    li:last-of-type{
      border-right: none;
    }
    .change-roles{
      background-color: rgb(241,124,103);
      padding: .3rem .6rem;
    }
  }
}
</style>
