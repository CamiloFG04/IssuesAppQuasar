<script lang="ts" setup>
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from '../components/issue-list/IssueCard.vue';

const route = useRoute();
const { id } = route.params;
</script>

<template>
  <LoaderSpinner />

  <router-link class="text-white" to="/">Go Back</router-link>

  <!-- header -->
  <IssueCard />

  <!-- comments -->
  <LoaderSpinner :thickness="1" size="2rem" :show-title="false" />

  <div class="column">
    <span class="text-h5 q-mb-md">Comments (5)</span>
    <IssueCard v-for="comment in 5" :key="comment" />
  </div>
</template>

<style scoped></style>
