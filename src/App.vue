<template>
  <div>
    <div class="main-nav">
      <!-- <router-link :to="{ name: 'UploadFiles' }">Загрузка файлов</router-link> -->
      <router-link :to="{ name: 'Infomation' }">Информация ГИА 11</router-link>
      <router-link :to="{ name: 'About' }">О проекте</router-link>
    </div>
    <router-view class="wrapper" />
  </div>
</template>

<style lang="scss">
body {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

.main-nav {
  height: 50px;
  background-color: #15816b;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2em;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
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

.wrapper {
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
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
