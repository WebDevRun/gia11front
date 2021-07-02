<template>
  <div>
    <h1 class="h1">Минимальные баллы</h1>
    <form class="formWrapper" @submit.prevent="submitHandler">
      <label class="formWrapper__input year">
        <span>{{ minScore.year.name }}:</span>
        <input
          :id="minScore.year.name"
          v-model.number="minScore.year.value"
          type="number"
          :name="minScore.year.name"
          min="2010"
          required
        />
      </label>
      <label
        v-for="(sub, i) in minScore.subjects"
        :key="i"
        class="formWrapper__input minScore"
      >
        <span>{{ sub.name }}:</span>
        <input
          :id="i"
          v-model.number="sub.value"
          type="number"
          :name="i"
          min="1"
          max="100"
          required
        />
      </label>
      <input class="formWrapper__button" type="submit" value="Отправить" />
    </form>
    <div v-if="isSubmit && status.n && status.nModified" class="status">
      Данные обновлены
    </div>
    <div v-if="isSubmit && status.n && !status.nModified" class="status">
      Такие данные уже есть
    </div>
    <div v-if="isSubmit && !status.n && !status.nModified" class="status">
      Данные добавлены
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      minScore: {
        year: {
          name: "год",
          value: "",
        },
        subjects: {
          russian: {
            name: "русский язык",
            value: "",
          },
          mathematics: {
            name: "математика",
            value: "",
          },
          physics: {
            name: "физика",
            value: "",
          },
          socialStudies: {
            name: "обществознание",
            value: "",
          },
          history: {
            name: "история",
            value: "",
          },
          informatics: {
            name: "информатика",
            value: "",
          },
          foreignLanguage: {
            name: "иностранный язык",
            value: "",
          },
          literature: {
            name: "Литература",
            value: "",
          },
          biology: {
            name: "Биология",
            value: "",
          },
          geograghy: {
            name: "География",
            value: "",
          },
          chemistry: {
            name: "химия",
            value: "",
          },
        },
      },
      isSubmit: false,
    };
  },
  computed: {
    ...mapGetters({
      status: "getMinScoreStatus",
    }),
  },
  methods: {
    ...mapActions(["addMinScore"]),
    async submitHandler() {
      await this.addMinScore(this.minScore);
      this.isSubmit = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.formWrapper {
  width: 860px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  font-size: 1.1em;
  &__input,
  &__button {
    margin: 10px 30px;
    & input {
      width: 60px;
      margin-left: 10px;
      padding: 3px;
      border: 1px solid #15816b;
    }
  }
  &__input {
    display: flex;
    justify-content: space-between;
    & span::first-letter {
      text-transform: uppercase;
    }
  }
  &__input.year {
    grid-column: 1 / 4;
    align-self: center;
    justify-self: center;
    & input {
      width: 100px;
    }
  }
  &__button {
    grid-column: 1 / 4;
    align-self: center;
    justify-self: center;
    padding: 10px 20px;
    border: 1px solid #15816b;
    background-color: #15816b;
    color: #eee;
    font-size: 1.2rem;
    font-family: inherit;
    border-radius: 3px;
  }
}

.status {
  text-align: center;
  font-size: 2em;
  color: #9a9a9a;
}
</style>
