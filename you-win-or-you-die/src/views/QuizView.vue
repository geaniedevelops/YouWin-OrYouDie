<script setup>
import { ref, computed } from "vue";

const questions = ref([
  {
    question: "Who married Lyanna Stark and Rhaegar Targaryen?",
    answer: 0,
    options: [
      "Archmaester Ebrose",
      "Maester Maynard",
      "Maester Helliweg",
      "Maester Lewin",
    ],
    selected: null,
  },
  {
    question: "Who was Lyanna Mormont’s mother?",
    answer: 3,
    options: [
      "Dania Mormont",
      "Annalys Mormont",
      "Thalina Mormont",
      "Maege Mormont",
    ],
    selected: null,
  },
  {
    question: "Which of the following is TRUE?",
    answer: 2,
    options: [
      "Bran Stark is a Greenseer but not a warg",
      "Bran Stark is a warg but not a Greenseer",
      "Bran Stark is both a warg AND a Greenseer",
      "Bran Stark is neither a warg or a Greenseer",
    ],
    selected: null,
  },
  {
    question: "How did Wun-Wun die?",
    answer: 1,
    options: [
      "Shot in the back with a ballista bolt",
      "Shot through the eye by Ramsey Bolton",
      "Left behind at Hardhome",
      "He is still alive",
    ],
    selected: null,
  },
  {
    question: "Who was Cersei Lannister intended to marry?",
    answer: 0,
    options: [
      "Rhaegar Targaryen",
      "Petyr Baelish",
      "Stannis Baratheon",
      "Oberyn Martell",
    ],
    selected: null,
  },
  {
    question: "Where is Melisandre from?",
    answer: 3,
    options: ["Volantis", "Braavos", "Naath", "Asshai"],
    selected: null,
  },
  {
    question: "Which Dragon was called 'The Black Dread'?",
    answer: 1,
    options: ["Drogon", "Balerion", "Meraxes", "Vhagar"],
    selected: null,
  },
  {
    question: "Who took in Daenerys and Viserys after they fled Dragonstone?",
    answer: 2,
    options: ["Lord Varys", "Pyat Pree", "Illyrio Mopatis", "Xaro Xhoan Daxos"],
    selected: null,
  },
]);

const quizCompleted = ref(false);
const currentQuestion = ref(0);
const score = computed(() => {
  let value = 0;
  questions.value.map((q) => {
    if (q.selected != null && q.answer == q.selected) value++;
  });
  return value;
});

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const SetAnswer = (e) => {
  questions.value[currentQuestion.value].selected = e.target.value;
  e.target.value = null;
};

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
    return;
  }
  quizCompleted.value = true;
};
</script>

<template>
  <main class="quiz-container">
    <section class="quiz" v-if="!quizCompleted">
      <article class="quiz-info">
        <h2 class="quiz-question">{{ getCurrentQuestion.question }}</h2>
      </article>
      <article class="quiz-answers">
        <label
          v-for="(option, index) in getCurrentQuestion.options"
          :for="'option' + index"
          :key="index"
          :class="`option ${
            getCurrentQuestion.selected == index
              ? index == getCurrentQuestion.answer
                ? 'correct'
                : 'wrong'
              : ''
          } ${
            getCurrentQuestion.selected != null &&
            index == getCurrentQuestion.selected
              ? 'disabled'
              : ''
          }`"
        >
          <input
            type="radio"
            :id="'option' + index"
            :name="getCurrentQuestion.index"
            :value="index"
            v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected"
            @change="SetAnswer"
          />
          <span>{{ option }}</span>
        </label>
      </article>
      <article class="quiz-control">
        <button @click="NextQuestion" :disabled="!getCurrentQuestion.selected">
          {{
            getCurrentQuestion.index == questions.length - 1
              ? "Finish"
              : getCurrentQuestion.selected == null
              ? "Make Selection"
              : "Next Selection"
          }}
        </button>
        <p>Score: {{ score }}/{{ questions.length }}</p>
      </article>
    </section>
    <section class="quiz-results" v-else>
      <p>Your score is {{ score }}/{{ questions.length }}</p>
      <article v-if="score > 5">
        <h2>You Win</h2>
      </article>
      <article v-else>
        <h2>You Die</h2>
      </article>
    </section>
    <a
      class="vector-credit"
      href="https://www.vecteezy.com/free-vector/pen-line"
    >
      Pen Line Vectors by Vecteezy
    </a>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
