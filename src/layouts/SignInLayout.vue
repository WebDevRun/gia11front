<template>
  <div>
    <h2 class="h1">Войти в систему</h2>
    <form class="formWrapper" @submit.prevent="submitHandler">
      <input
        id="nickName"
        v-model="nickName"
        class="formWrapper__nickName"
        type="text"
        name="nickName"
        placeholder="Введите свой логин"
      />
      <input
        id="password"
        v-model="password"
        class="formWrapper__password"
        type="password"
        name="password"
        placeholder="Введите свой пароль"
      />
      <button class="formWrapper__button" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'SingInPanel',
  data() {
    return {
      nickName: '',
      password: '',
    }
  },
  computed: {
    ...mapGetters({
      accessToken: 'getAccessToken',
    }),
  },
  methods: {
    ...mapActions(['login']),
    async submitHandler() {
      if (this.nickName.trim() && this.password.trim()) {
        const user = {
          nickName: this.nickName,
          password: this.password,
        }
        await this.login(user)
      }

      if (this.accessToken) {
        this.$router.push('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.formWrapper {
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  &__nickName,
  &__password {
    margin-bottom: 15px;
  }
  &__nickName,
  &__password,
  &__button {
    padding: 5px;
  }
  &__button {
    border: 1px solid #15816b;
    background-color: #15816b;
    color: #fff;
    font-family: inherit;
    font-size: 1.1em;
  }
}
</style>
