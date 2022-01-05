<template>
  <label
    class="checkbox-set transition duration-500 cursor-pointer items-center"
    :class="[checked ? 'checked' : '', errored ? 'error' : '']"
    @mouseenter="errored ? emit('update:errored', false) : null"
    @click="check"
  >
    <div
      class="
        relative
        flex-shrink-0 flex-center
        h-6
        w-6
        mt-1
        mr-4
        transition
        duration-500
      "
      :class="[
        isRoundShape ? 'round-shape rounded-2xl' : 'checkbox rounded-md',
      ]"
    >
      <check-icon
        v-if="!isRoundShape"
        class="h-6 w-6 checkbox-icon text-white transition duration-500"
      />
      <div
        v-else
        class="
          checkbox-icon-colored
          round
          flex-center
          bg-white
          rounded-full
          overflow-hidden
          h-6
          w-6
        "
      >
        <div
          class="radio-inner h-3 w-3 rounded-full transition duration-500"
        ></div>
      </div>
    </div>
    <p class="flex-center text-sm whitespace-nowrap">
      {{ errored ? errorLabel : label }}
    </p>
  </label>
</template>

<script>
import { ref, toRefs, watch } from "vue";

import { CheckIcon } from "@heroicons/vue/outline";

export default {
  components: {
    CheckIcon,
  },
  props: {
    label: String,
    errored: Boolean,
    errorLabel: String,
    checked: Boolean,
    isRoundShape: Boolean,
  },
  setup(props, { emit }) {
    const { checked, errored, isRoundShape } = toRefs(props);
    const checkedLocal = ref(checked.value);

    const check = () => {
      if (isRoundShape.value && checkedLocal.value) {
        return;
      }

      checkedLocal.value = !checkedLocal.value;
      emit("update:checked", checkedLocal.value);
    };

    watch(checked, (to) => {
      if (!to) checkedLocal.value = false;
    });

    return {
      checked,
      checkedLocal,
      check,
      errored,
      emit,
    };
  },
};
</script>

<style lang="scss">
.checkbox-set {
  @apply inline-flex opacity-50;

  &.checked {
    @apply opacity-100;
  }

  .radio-inner {
    @apply bg-white;
  }

  &.checked {
    .radio-inner {
      @apply bg-primary;
    }
  }

  & .checkbox,
  & .round-shape {
    @apply border border-gray-300;
  }

  & .checkbox-icon {
    @apply opacity-0;
  }

  & .checkbox-icon-colored {
    @apply opacity-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
  }

  @media (hover: hover) {
    &:hover .checkbox {
      @apply bg-primary border-0;
    }

    &:hover .checkbox-icon {
      @apply opacity-100;
    }
  }

  &.checked .checkbox {
    @apply bg-primary border-0;
  }

  &.checked .checkbox-icon {
    @apply opacity-100;
  }

  &.error {
    @apply text-red-600 opacity-100;

    & .checkbox {
      @apply border-red-600;
    }
  }
}
</style>
