<script lang="ts" setup>
import IssueCard from './IssueCard.vue';
</script>

<template>
  <div class="row">
    <IssueCard v-for="issue of 20" :key="issue" />
  </div>
</template>

<style lang="postcss" scoped></style>
