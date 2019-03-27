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
      <li @click="changeRoles" class="change-roles">{{ boolVa ? 'user' : 'admin'}}</li>
      <li @click="reloadPage">刷新</li>
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
    this.routes = this.elimateNav(this.routes)
    console.log(this.routes)
  },
  mounted () {
  },
  methods: {
    // 重置router（相当于重置了vue的实例）
    reloadPage () {
      window.location.reload()
      sessionStorage.removeItem('roles')
    },

    hasPermission (roles, route) {
      if (!route.meta) return true
      return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    },

    permission (roles, dyroutes) {
      const rs = []
      for (let route of dyroutes) {
        let tem = {...route}
        if (this.hasPermission(this.roles, tem)) {
          if (tem.children) {
            tem.children = this.permission(roles, tem.children)
          }
          rs.push(tem)
        }
      }
      return rs
    },

    // 剔除layout嵌套、剔除login页面
    elimateNav (initRoutes) {
      for (let index in initRoutes) {
        if (initRoutes[index].name === 'Login') {
          // 排除 login组件
          initRoutes.splice(index, 1)
        } else if (initRoutes[index].name === 'Default' || initRoutes[index].name === 'Dynamic') {
          let temp = initRoutes[index].children
          initRoutes.splice(index, 1)
          initRoutes = initRoutes.concat(temp)
        }
      }
      console.log(initRoutes)
      return initRoutes
    },

    handleRoutes () {
      let temp = []
      // 这里注意push与concat区别，特别是push数组 & concat数组
      temp = temp.concat(this.permission(this.roles, dynamicRoutes))
      if (temp.length > 0) {
        this.$router.addRoutes(temp)
      }
      this.$router.push('/')
      this.routes = this.elimateNav(defaultRoutes.concat(temp))
      console.log(this.routes)
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
