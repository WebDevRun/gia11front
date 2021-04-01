<template>
  <div class="wrapper" v-if="exams.length">
    <h1 class="h1">Информация ГИА 11</h1>
    <div class="tools">
      <p class="tools__name">Инструменты управления</p>
      <div class="tools__attributes attributes">
        <input type="checkbox" name="openAllInfo" id="openAllInfo" class="attributes__checkbox" v-model="checked">
        <label for="openAllInfo" class="attributes__label">{{ checkedMessage }}</label>
      </div>
    </div>
    <div v-for='(exam, index) in exams' :key='index'>
      <InfoSubject :exam="exam" :openAllInfo="checked"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InfoSubject from '../templates/InfoSubject.vue'

export default {
  name: 'AllInfo',
  data () {
    return {
      checked: false
    }
  },
  computed: {
    ...mapGetters({
      exams: 'getAllExams'
    }),
    checkedMessage () {
      if (this.checked) {
        return 'Скрыть все данные'
      } else {
        return 'Показать все данные'
      }
    }
  },
  methods: {
    ...mapActions(['getAllExams'])
  },
  async created () {
    await this.getAllExams()
  },
  components: {
    InfoSubject
  }
}
</script>

<style lang="scss" scoped>
.tools {
  background-color: #fff;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
  border-radius: .25rem;
  font-size: 1.3em;
  padding: 10px;
  &__name {
    margin: 0;
    text-align: center;
    font-weight: 700;
  }
  &__attributes {
    margin: 10px 0;
  }
}

.attributes {
  border-radius: .25rem;
  padding: 10px;
  &__checkbox {
    height: 15px;
    width: 15px;
    margin-right: 5px;
  }
}
</style>
