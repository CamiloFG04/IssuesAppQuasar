import { storeToRefs } from 'pinia';
import { useIssuesStore } from 'src/stores/issues';

const useStore = () => {
  const issuesStore = useIssuesStore();
  const { labels, state } = storeToRefs(issuesStore);

  return {
    // Reactive properties
    labels,
    state,

    // Getters (computed)

    // Actions (methods)
  };
};

export default useStore;
