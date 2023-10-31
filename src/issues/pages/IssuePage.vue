<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id } = route.params;

const { issueQuery, commentQuery } = useIssue(+id);
</script>

<template>
  <router-link class="text-white" to="/">Go Back</router-link>

  <!-- header -->
  <LoaderSpinner
    v-if="issueQuery.isLoading.value"
    :thickness="1"
    size="2rem"
    :show-title="false"
  />
  <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
  <p v-else>Issue with ID {{ id }} not found</p>

  <!-- comments -->
  <LoaderSpinner
    v-if="commentQuery.isLoading.value"
    :thickness="1"
    size="2rem"
    :show-title="false"
  />

  <div v-else-if="commentQuery.data.value" class="column">
    <span class="text-h5 q-mb-md"
      >Comments ({{ commentQuery.data.value.length }})</span
    >
    <IssueCard
      v-for="comment in commentQuery.data.value"
      :key="comment.id"
      :issue="comment"
    />
  </div>
</template>

<style scoped></style>
