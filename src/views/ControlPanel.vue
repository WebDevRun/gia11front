<template>
  <div class="controlWrapper">
    <div class="controlWrapper__sideBar">
      <router-link
        v-for="link in links"
        :key="link.name"
        :to="{ name: `${link.name}` }"
        :exact="link.exact"
      >
        {{ link.title }}
      </router-link>
    </div>
    <router-view class="controlWrapper__wrapper" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { title: 'Загрузить данные', name: 'UploadFiles' },
        { title: 'Минимальные баллы', name: 'minScore' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.controlWrapper {
  display: flex;
  height: calc(100vh - 50px);
  &__sideBar {
    width: 200px;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    & a {
      font-size: 1.1em;
      padding: 7px;
      text-decoration: none;
    }
  }
  &__wrapper {
    width: 100%;
  }
}
</style>
