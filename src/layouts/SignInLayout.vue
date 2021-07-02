<template>
  <div>
    <h2 class="h1">Войти в систему</h2>
    <form class="formWrapper" @submit.prevent="submitHandler">
      <input
        id="nickName"
        v-model.trim="nickName"
        :class="{ red: hasLoginError }"
        class="formWrapper__nickName"
        type="text"
        name="nickName"
        placeholder="Введите свой логин"
      />
      <input
        id="password"
        v-model.trim="password"
        :class="{ red: hasLoginError }"
        class="formWrapper__password"
        type="password"
        name="password"
        placeholder="Введите свой пароль"
      />
      <button class="formWrapper__button" type="submit">Войти</button>
    </form>
    <div v-if="hasLoginError" class="errorMessage">
      Нет верный логин или пароль
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SingInPanel",
  data() {
    return {
      nickName: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters({
      accessToken: "getAccessToken",
      error: "getError",
    }),
    hasLoginError() {
      return this.error?.message === "invalid nickname or password";
    },
  },
  methods: {
    ...mapActions(["login"]),
    async submitHandler() {
      if (this.nickName && this.password) {
        const user = {
          nickName: this.nickName,
          password: this.password,
        };
        await this.login(user);
      }

      if (!this.error && this.accessToken) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.formWrapper {
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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

.red {
  border: 2px solid red;
}

.errorMessage {
  color: red;
  text-align: center;
  font-size: 1.2em;
}
</style>
