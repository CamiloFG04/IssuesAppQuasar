<script lang="ts" setup>
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from '../../composables/useLabels';

const { labelsQuery, toggleLabel, selectedLabels } = useLabels();
const { isLoading, data } = labelsQuery;
</script>

<template>
  <div class="q-mt-md">
    <LoaderSpinner
      v-if="isLoading"
      size="50"
      :thickness="1"
      :show-title="false"
    />
    <q-chip
      v-else
      v-for="label in data"
      :key="label.id"
      :style="{ color: `#${label.color}` }"
      :outline="!selectedLabels.includes(label.name)"
      clickable
      @click="toggleLabel(label.name)"
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style lang="postcss" scoped></style>
