import Vue from "vue";
import Vuex from "vuex";
import * as fb from "firebase";

Vue.use(Vuex);
type QuestionType = {
  date: string;
  question: string;
  order: number;
  time: string;
};
export default {
  state: {
    questions: []
  },
  mutations: {
    setQuestions(state: any, payload: Array<QuestionType>) {
      state.questions = payload;
    }
  },
  getters: {
    questions(state: any) {
      return state.questions;
    }
  },
  actions: {
    fetchQuestionList({ commit }: any, payload: any) {
      const usersRef = fb.database().ref("questions");
      const rawData: Array<QuestionType> = [];
      usersRef.limitToLast(10).on("value", a => {
        const resQuestions = a.val();
        for (const resQuestionsKey in resQuestions) {
          const item: QuestionType = resQuestions[resQuestionsKey];
          rawData.push({
            date: item.date,
            question: item.question,
            order: item.order,
            time: item.time
          });
        }
      });
      rawData.sort(function(b, a) {
        if (a.order > b.order) {
          return 1;
        }
        if (a.order < b.order) {
          return -1;
        }
        return 0;
      });
      commit("setQuestions", rawData);
    },
    addQuestion({ commit }: any, payload: any) {
      const date = new Date();
      const usersRef = fb.database().ref("questions");
      usersRef.push({
        question: payload.question,
        date: payload.date,
        time: payload.time,
        order: payload.order
      });
    }
  }
};
