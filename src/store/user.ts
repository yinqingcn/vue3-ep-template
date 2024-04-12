import { defineStore } from 'pinia';

// Options Store方式
export const useUserStore = defineStore('user', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
