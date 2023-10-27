<script lang="ts" setup>
import { useIssuesStore } from '../../../stores/issues';
const issuesStore = useIssuesStore();
</script>

<template>
  <q-btn-toggle
    v-model="issuesStore.state"
    toggle-color="primary"
    push
    spreed
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  />
</template>

<style lang="postcss" scoped></style>
