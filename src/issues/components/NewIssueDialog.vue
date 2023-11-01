<script setup lang="ts">
import { ref, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../composables/useIssueMutation';

interface Props {
  isOpenProp: boolean;
  labelsProp: string[];
}

interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { issueMutation } = useIssueMutation();

const isOpen = ref<boolean>();
const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);

watch(props, () => {
  isOpen.value = props.isOpenProp;
});

watch(
  () => issueMutation.isSuccess.value,
  (isSuccess) => {
    if (isSuccess) {
      title.value = '';
      body.value = '';
      labels.value = [];

      issueMutation.reset();
      emits('onClose');
    }
  }
);
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom" persistent>
      <q-card style="width: 500px">
        <q-form @submit.prevent="issueMutation.mutate({ title, body, labels })">
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">New Issue</div>
              <div class="text-grey">Add new issue with labels</div>
            </div>

            <q-space />

            <div>
              <q-input
                filled
                dense
                v-model="title"
                label="Title"
                placeholder="Title"
                class="q-mb-sm"
                :rules="[(val) => !!val || 'Field is required']"
              />
              <q-select
                v-model="labels"
                :options="props.labelsProp"
                label="Labels"
                use-chips
                filled
                dense
                multiple
                stack-label
                class="q-mb-sm"
              />
              <!-- TODO: Markdown editor -->
              <MdEditor
                v-model="body"
                placeholder="# Markdown"
                language="en-US"
              />
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn
              :disable="issueMutation.isLoading.value"
              @click="emits('onClose')"
              flat
              label="Close"
              v-close-popup
              color="dark"
            />
            <q-space />
            <q-btn
              :disable="issueMutation.isLoading.value"
              flat
              type="submit"
              label="Add Issue"
              color="dark"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>
