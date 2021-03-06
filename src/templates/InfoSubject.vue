<template>
  <details ref="details" class="detailsWrapper" :open="openAllTables">
    <summary class="detailsWrapper__h2 h2" @click="openTableHandler">
      <div class="h2__info">{{ exam.examCode }} - {{ exam.examName }}</div>
      <div class="h2__statistic statistic" :class="{ open: openTable }">
        <div class="statistic__numberOfParticipants">
          {{ countParticipants }}
        </div>
        <div class="statistic__maxScore">
          {{ maxScore }}
        </div>
        <div class="statistic__averageScore">
          {{ averageScore }}
        </div>
        <div class="statistic__minScore">
          {{ minScore }}
        </div>
      </div>
    </summary>
    <div class="detailsWrapper__scroll">
      <table class="detailsWrapper__table table">
        <tr class="table__head">
          <th
            class="arrows"
            :class="sortData.examDate"
            @click="sortHandler(exam.participants, 'examDate')"
          >
            Дата
          </th>
          <th>МСУ</th>
          <th
            class="arrows"
            :class="sortData.schoolCode"
            @click="sortHandler(exam.participants, 'schoolCode')"
          >
            Код школы
          </th>
          <th>Класс</th>
          <th>Код ППЭ</th>
          <th>Номер аудитории</th>
          <th
            class="arrows"
            :class="sortData.subname"
            @click="sortHandler(exam.participants, 'subname')"
          >
            Фамилия
          </th>
          <th class="arrows" :class="sortData.name" @click="sortHandler(exam.participants, 'name')">
            Имя
          </th>
          <th
            class="arrows"
            :class="sortData.lastname"
            @click="sortHandler(exam.participants, 'lastname')"
          >
            Отчетсво
          </th>
          <th>Задания с кратким ответом</th>
          <th v-if="checkDetailedTasks(exam)">Задания с развёрнутым ответом</th>
          <th>Первичный балл</th>
          <th
            class="arrows"
            :class="sortData.score"
            @click="sortHandler(exam.participants, 'score')"
          >
            Балл
          </th>
        </tr>
        <tr v-for="(participant, index) in exam.participants" :key="index" class="table__content">
          <td>{{ formatDate(participant.examDate) }}</td>
          <td>{{ participant.MSY }}</td>
          <td>{{ participant.schoolCode }}</td>
          <td>{{ participant.class }}</td>
          <td>{{ participant.PPACode }}</td>
          <td>{{ participant.classroom }}</td>
          <td>{{ participant.subname }}</td>
          <td>{{ participant.name }}</td>
          <td>{{ participant.lastname }}</td>
          <td>{{ participant.shortTask.join(',') }}</td>
          <td v-if="participant.detailedTask.length">
            {{ participant.detailedTask.join(',') }}
          </td>
          <td>{{ participant.baseScore }}</td>
          <td>{{ participant.score }}</td>
        </tr>
      </table>
    </div>
  </details>
</template>

<script>
export default {
  name: 'InfoSubject',
  props: {
    exam: {
      type: Object,
      required: true,
    },
    openAllTables: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      sortData: {
        examDate: 'none',
        schoolCode: 'none',
        subname: 'none',
        name: 'none',
        lastname: 'none',
        score: 'none',
      },
      openTable: false,
      isDetailedTasks: true,
    }
  },
  computed: {
    countParticipants() {
      return this.exam.participants.length
    },
    maxScore() {
      let max = 0
      this.exam.participants.forEach((item) => {
        if (item.score > max) {
          max = item.score
        }
      })
      return max
    },
    minScore() {
      let min = 100
      this.exam.participants.forEach((item) => {
        if (item.score < min) {
          min = item.score
        }
      })
      return min
    },
    averageScore() {
      let sum = 0
      this.exam.participants.forEach((item) => {
        sum += item.score
      })
      return (sum / this.countParticipants).toFixed(0)
    },
  },
  watch: {
    openAllTables() {
      if (this.openAllTables) {
        this.openTable = true
      } else {
        this.openTable = false
      }
    },
  },
  methods: {
    sortHandler(participants, sortField) {
      switch (this.sortData[sortField]) {
        case 'none':
        case 'descendingOrder':
          participants.sort((a, b) => {
            if (a[sortField] > b[sortField]) {
              return 1
            }
            if (a[sortField] < b[sortField]) {
              return -1
            }
            return 0
          })
          this.updateSortStatus(sortField, 'ascendingOrder')
          break
        case 'ascendingOrder':
          participants.sort((a, b) => {
            if (a[`${sortField}`] < b[`${sortField}`]) {
              return 1
            }
            if (a[`${sortField}`] > b[`${sortField}`]) {
              return -1
            }
            return 0
          })
          this.updateSortStatus(sortField, 'descendingOrder')
          break
      }
    },
    updateSortStatus(sortField, sort) {
      for (const key in this.sortData) {
        if (key === sortField) {
          this.sortData[key] = sort
        } else {
          this.sortData[key] = 'none'
        }
      }
    },
    openTableHandler() {
      if (!this.$refs.details.open) {
        this.openTable = true
      } else {
        this.openTable = false
      }
    },
    formatDate(date) {
      const newDate = new Date(date)
      let dd = newDate.getDate()
      if (dd < 10) {
        dd = '0' + dd
      }
      let mm = newDate.getMonth() + 1
      if (mm < 10) {
        mm = '0' + mm
      }
      const yy = newDate.getFullYear()
      return `${dd}.${mm}.${yy}`
    },
    checkDetailedTasks(exam) {
      if (exam.participants[0]?.detailedTask.length) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.detailsWrapper {
  background-color: #fff;
  margin: 10px 0;
  &__h2 {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1.2em;
  }
}

.h2 {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.table {
  width: 100%;
  &__head th,
  &__content td {
    border: 1px solid #ccc;
    padding: 15px 2px;
  }
  &__content td {
    text-align: center;
  }
}

.arrows {
  cursor: pointer;
}

.descendingOrder,
.ascendingOrder {
  &::after {
    content: '';
    display: inline-block;
    border: solid #000;
    border-width: 0 3px 3px 0;
    margin-left: 5px;
    padding: 2px;
  }
}

.descendingOrder {
  &::after {
    transform: rotate(-135deg);
  }
}

.ascendingOrder {
  &::after {
    transform: rotate(45deg);
  }
}

.statistic {
  display: flex;
  width: 250px;
  justify-content: space-between;
  &:after {
    content: '';
    display: inline-block;
    border: solid #000;
    border-width: 0 3px 3px 0;
    margin: 0 5px;
    padding: 5px;
    height: 3px;
    width: 3px;
    transform: rotate(45deg);
  }
  &.open:after {
    transform: rotate(-135deg);
  }
  &__numberOfParticipants:before,
  &__maxScore:before,
  &__averageScore:before,
  &__minScore::before {
    content: '';
    background-repeat: no-repeat;
    height: 20px;
    width: 20px;
    margin-right: 6px;
    background-size: cover;
    display: inline-block;
    vertical-align: middle;
  }
  &__numberOfParticipants::before {
    background-image: url(../assets/numberOfParticipants.svg);
  }
  &__maxScore:before {
    background-image: url(../assets/maxScore.svg);
  }
  &__averageScore:before {
    background-image: url(../assets/averageScore.svg);
  }
  &__minScore:before {
    background-image: url(../assets/minScore.svg);
  }
}

@media (max-width: 1240px) {
  .table {
    font-size: 0.85em;
  }
}

@media (max-width: 1070px) {
  .table {
    font-size: 0.75em;
  }
}

@media (max-width: 950px) {
  .table {
    font-size: 0.65em;
    &__head th,
    &__content td {
      padding: 10px 2px;
    }
  }
}

@media (max-width: 830px) {
  .table {
    font-size: 0.55em;
    &__head th,
    &__content td {
      padding: 5px 2px;
    }
  }
}

@media (max-width: 710px) {
  .table {
    &__head th,
    &__content td {
      padding: 5px 2px;
    }
  }

  .descendingOrder,
  .ascendingOrder {
    &::after {
      border-width: 0 2px 2px 0;
      margin-left: 3px;
      padding: 1px;
    }
  }
}

@media (max-width: 600px) {
  .detailsWrapper__scroll {
    overflow-y: scroll;
  }
  .table {
    &__head th,
    &__content td {
      padding: 2px;
    }
  }
}

@media (max-width: 768px) {
  .detailsWrapper {
    margin: 5px 0;
    &__h2 {
      font-size: 1em;
    }
  }

  .h2 {
    padding: 10px;
  }
}

@media (max-width: 576px) {
  .h2 {
    &__info {
      margin-right: 20px;
      width: calc(40% - 20px);
    }
  }

  .statistic {
    width: 50%;
    &__numberOfParticipants:before,
    &__maxScore:before,
    &__averageScore:before,
    &__minScore::before {
      margin-right: 4px;
      height: 12px;
      width: 12px;
    }
  }
}
</style>
