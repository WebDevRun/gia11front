<template>
  <div class="wrapper" v-if='exams.length'>
    <h1 class="h1">Информация ГИА 11</h1>
    <div class="tools">
      <div class="tools__attributes attributes">
        <div class="attributes__year">
          <span>Год: </span>
          <select name="year" id="year" v-model='selectYear'>
            <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="attributes__text">
          <span>Найти: </span>
          <input type="text" name="subname" id="subname" placeholder="Фамилия" v-model="searchParams.searchSubname">
          <input type="text" name="name" id="name" placeholder="Имя" v-model="searchParams.searchName">
        </div>
        <div class="attributes__checkbox checkbox">
          <input type="checkbox" name="openAllInfo" id="openAllInfo" v-model="checked">
          <label for="openAllInfo" class="checkbox__label">{{ checkedMessage }}</label>
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
      searchParams: {
        searchSubname: '',
        searchName: ''
      },
      selectYear: (new Date().getFullYear() - 1).toString()
    }
  },
  computed: {
    ...mapGetters({
      exams: 'getAllExams',
      years: 'getAllYears'
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
          return item.subname.toLowerCase().includes(this.searchParams.searchSubname.toLowerCase()) && item.name.toLowerCase().includes(this.searchParams.searchName.toLowerCase())
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
    ...mapActions(['getAllExams', 'getAllYears'])
  },
  async created () {
    const windowData = Object.fromEntries(new URL(window.location).searchParams.entries())

    if (windowData.year) {
      this.selectYear = windowData.year
    }

    if (windowData.subname) {
      this.searchParams.searchSubname = windowData.subname
    }

    if (windowData.name) {
      this.searchParams.searchName = windowData.name
    }

    history.pushState(null, document.title, `${window.location.pathname}?year=${this.selectYear}&subname=${this.searchParams.searchSubname}&name=${this.searchParams.searchName}`)
    // vue-router.esm-bundler.js?6c02:71 [Vue Router warn]: history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:
    // history.replaceState(history.state, '', url)

    await this.getAllYears()
    await this.getAllExams()
  },
  watch: {
    'searchParams.searchSubname' () {
      history.pushState(null, document.title, `${window.location.pathname}?year=${this.selectYear}&subname=${this.searchParams.searchSubname}&name=${this.searchParams.searchName}`)
    },
    'searchParams.searchName' () {
      history.pushState(null, document.title, `${window.location.pathname}?year=${this.selectYear}&subname=${this.searchParams.searchSubname}&name=${this.searchParams.searchName}`)
    },
    async selectYear () {
      history.pushState(null, document.title, `${window.location.pathname}?year=${this.selectYear}&subname=${this.searchParams.searchSubname}&name=${this.searchParams.searchName}`)
      await this.getAllExams()
    }
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
