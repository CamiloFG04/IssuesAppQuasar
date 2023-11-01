<script lang="ts" setup>
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import { ref } from 'vue';
import IssueList from '../components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';
import FloatingButtons from 'src/shared/components/FloatingButtons.vue';
import { Size } from '../interfaces/button';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import useLabels from '../composables/useLabels';

const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const isOpen = ref<boolean>(false);

const openDialog = () => {
  isOpen.value = true;
};
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">GitHub Issues</span>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-md-4">
      <!-- TODO: filtros -->
      <FilterSelector />
    </div>
    <div class="col-xs-12 col-md-8">
      <LoaderSpinner v-if="issuesQuery.isLoading.value" />

      <IssueList v-else :issues="issuesQuery.data?.value || []" />
    </div>
  </div>
  <FloatingButtons
    :buttons="[
      {
        icon: 'add',
        color: 'primary',
        size: Size.lg,
        action: openDialog,
      },
    ]"
  />
  <NewIssueDialog
    :is-open-prop="isOpen"
    v-if="labelsQuery.data"
    :labels-prop="labelsQuery.data.value?.map((label) => label.name) || []"
    @on-close="isOpen = false"
  />
</template>

<style scoped></style>
