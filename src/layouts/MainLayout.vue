<template>
  <div>
    <div class="mainNav">
      <div class="mainNav__links">
        <router-link
          v-for="link in links"
          :key="link.name"
          :to="{ name: `${link.name}` }"
          :exact="link.exact"
        >
          {{ link.title }}
        </router-link>
        <button @click="logout">Выйти</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      links: [
        { title: 'ГИА11', name: 'Infomation', exact: true },
        { title: 'О проекте', name: 'About' },
        { title: 'Администрированние', name: 'ControlPanel' },
      ],
    }
  },
  methods: {
    ...mapActions(['logoutFromDB']),
    async logout() {
      await this.logoutFromDB()
      this.$router.push('/signin')
    },
  },
}
</script>

<style lang="scss">
.mainNav {
  height: 50px;
  background-color: #15816b;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  padding: 0 20px;
  &__links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
  & button {
    border: 0;
    padding: 5px 15px;
    background-color: #0c493c;
    color: #fff;
    font-family: inherit;
    font-size: 1em;
    cursor: pointer;
    border-radius: 0.25rem;
    &:hover {
      background-color: #0c372e;
    }
  }
  & a {
    color: #fff;
    text-decoration: none;
  }
}

.h1 {
  text-align: center;
  font-size: 1.5em;
}

table {
  border-collapse: collapse;
}

@media (max-width: 1200px) {
  .wrapper {
    max-width: 1140px;
  }
}

@media (max-width: 992px) {
  .wrapper {
    max-width: 960px;
  }
}

@media (max-width: 768px) {
  .wrapper {
    max-width: 720px;
  }
}

@media (max-width: 576px) {
  .wrapper {
    max-width: 540px;
  }
}
</style>
