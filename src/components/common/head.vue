<template>
  <div class="header-container">
    <ul>
      <li v-for="route in routes" :key="route.name">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </li>
      <li @click="changeRoles" class="change-roles">{{ boolVa ? 'user' : 'admin'}}</li>
    </ul>
  </div>
</template>

<script>
import { dynamicRoutes, defaultRoutes } from '@/router'
export default {
  name: 'headTop',
  data () {
    return {
      roles: [ 'user' ],
      routes: defaultRoutes,
      boolVa: false
    }
  },
  created () {
    // 增加 sessionStorage是为了防止刷新导致的路由丢失
    if (sessionStorage.getItem('roles')) {
      this.roles = JSON.parse(sessionStorage.getItem('roles'))
    }
  },
  methods: {
    hasPermission (roles, route) {
      if (!route.meta) return true
      return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    },

    permission (roles, dyroutes) {
      const rs = []
      for (let route of dyroutes) {
        if (this.hasPermission(this.roles, route)) {
          rs.push(route)
        }
      }
      return rs
    },

    handleRoutes () {
      let temp = []
      // 这里注意push与concat区别，特别是push数组 & concat数组
      temp = temp.concat(this.permission(this.roles, dynamicRoutes))
      if (temp.length > 0){
        this.$router.addRoutes(temp)
      }
      this.$router.push('/')
      this.routes = defaultRoutes.concat(temp)
    },

    changeRoles () {
      this.boolVa = !this.boolVa
      if (this.roles.indexOf('admin') >= 0) {
        this.roles.pop()
        sessionStorage.setItem('roles', JSON.stringify(this.roles))
      } else {
        this.roles.push('admin')
        sessionStorage.setItem('roles', JSON.stringify(this.roles))
      }
    }
  },
  watch: {
    roles () {
      this.handleRoutes()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.header-container {
  @include wh(100%, 8%);
  background-color: rgb(76,180,231);
  position: relative;
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
      background-color: #CC3333;
    }
  }
}
</style>
