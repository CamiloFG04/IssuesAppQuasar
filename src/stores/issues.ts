import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useIssuesStore = defineStore('issues', () => {
  // TODO: arreglar tipo de dato
  const state = ref(''); // all = '' , open,close
  const labels = ref<string[]>([]);

  return {
    // state
    state,
    labels,
    // getters

    // actions
    toggleLabel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter((label) => label !== labelName);
        return;
      }
      labels.value.push(labelName);
    },
  };
});
