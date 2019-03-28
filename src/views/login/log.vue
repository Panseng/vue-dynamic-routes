<template>
  <div class="login-container">
    <form>
      <p><span>账号：</span><input type="text" placeholder="请输入账号" v-model="formData.username" /></p>
      <p><span>密码：</span><input type="password" placeholder="请输入密码" v-model="formData.password" /></p>

      <div class="notice">
        <p>账号：admin or user</p>
        <p>密码：admin or user</p>
      </div>

      <div class="abc">
        <input type="button" @click="submit" value="登录">
        <input type="button" @click="clearAll" value="清空">
      </div>
    </form>
    <!--
    <div>
      <button @click="submit">登录</button>
    </div>
    -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      'Login',
      'GetInfo'
    ]),

    submit () {
      // 不能在promise中执行马上需要的计算，容易导致数据接不上
      // actions：登录、获取info、计算动态路由
      this.Login(this.formData).then(() => {
        // 转入跳转页面或home
        this.$router.push({path: this.redirect || '/'})
      }).catch((error) => {
        console.log(error)
      })
    },

    clearAll () {
      this.formData.username = ''
      this.formData.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.login-container {
  background-color: rgb(73,90,128);
  @include wh(100%, 100%);
  form {
    @include center;
    p{
      margin: .8rem auto;
      font-size: 1.1rem;
      span{
        color: #e1e1e1;
      }
      input {
        appearance: none;
        height: 1.6rem;
        background-color: rgba(248,242,220,0.1);
        border-radius: .3rem;
      }
    }
    .notice {
      p{
        color: gray;
        margin: .1rem auto;
        font-size: .8rem;
        text-align: center;
      }
    }
    .abc{
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
      button, input {
        font-size: 1rem;
        padding: .3rem .5rem;
        border-radius: .3rem;
        background-color: rgb(241,124,103);
      }
    }
  }
  p, div{
    background-color: rgb(73,90,128);
  }
}
</style>
