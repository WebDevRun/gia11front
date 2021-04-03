<template>
  <div class="wrapper" v-if='exams.length'>
    <h1 class="h1">Информация ГИА 11</h1>
    <div class="tools">
      <p class="tools__name">Инструменты управления</p>
      <div class="tools__attributes attributes">
        <div class="attributes__checkbox checkbox">
          <input type="checkbox" name="openAllInfo" id="openAllInfo" v-model="checked">
          <label for="openAllInfo" class="checkbox__label">{{ checkedMessage }}</label>
        </div>
        <div class="attributes__text">
          <span>Найти: </span>
          <input type="text" name="subname" id="subname" placeholder="Фамилия" @input="searchAttributes.searchSubname = $event.target.value">
          <input type="text" name="name" id="name" placeholder="Имя" @input="searchAttributes.searchName = $event.target.value">
        </div>
      </div>
    </div>
    <div v-for='(exam, index) in filteredExams' :key='index'>
      <InfoSubject :exam="exam" :openAllTables="checked" />
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
      checked: false,
      searchAttributes: {
        searchSubname: '',
        searchName: ''
      }
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
    },
    filteredExams () {
      const filteredExams = []
      this.exams.forEach(item => {
        const exam = {}
        const newParticipants = item.participants.filter(item => {
          return item.subname.toLowerCase().includes(this.searchAttributes.searchSubname.toLowerCase()) && item.name.toLowerCase().includes(this.searchAttributes.searchName.toLowerCase())
        })
        if (newParticipants.length !== 0) {
          exam.examCode = item.examCode
          exam.examName = item.examName
          exam.examDate = item.examDate
          exam.participants = newParticipants
        }
        if (Object.keys(exam).length) {
          filteredExams.push(exam)
        }
      })
      return filteredExams
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
  &__checkbox {
    margin: 10px 0;
  }
}

.attributes {
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
  &__checkbox {
    border-radius: 0.25rem;
    & input[type=checkbox] {
      height: 15px;
      width: 15px;
      margin-right: 5px;
    }
  }
  &__text {
    padding: 2px;
    & input[type=text] {
    margin-right: 2px;
    }
  }
}
</style>
