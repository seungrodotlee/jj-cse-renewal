<template>
  <div
    class="g-input relative flex flex-col"
    :class="data.errored ? 'errored' : ''"
  >
    <div class="flex rounded-xl bg-white">
      <div
        class="relative flex-grow rounded-xl transition duration-500"
        :class="[
          inputDynamicStyles,
          isSmall ? 'px-6 py-4' : 'px-10 py-6',
          borderless ? '' : 'border',
        ]"
      >
        <div
          class="
            placeholder
            absolute
            bg-white
            origin-left
            transition-transform
            duration-500
            pointer-events-none
            whitespace-nowrap
            z-10
          "
          :class="[
            isFocused || ('' + valueBind).length > 0
              ? `transform -translate-y-${isSmall ? 7 : 4} scale-75`
              : '',
            lastCharEmphasized ? 'emphasized' : '',
            isSmall ? 'px-2 transformtop-4 -translate-x-2' : 'top-6',
          ]"
          v-html="data.placeholder"
        ></div>
        <input
          v-if="!isTextArea"
          :type="inputType"
          class="
            w-full
            font-semibold
            outline-none
            transition-transform
            duration-500
          "
          :class="
            isFocused || valueBind.length > 0
              ? 'transform translate-y-[10px]'
              : ''
          "
          v-model="valueBind"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
        />
        <textarea
          v-if="isTextArea"
          class="
            w-full
            font-semibold
            outline-none
            transition-transform
            duration-500
            resize-none
            leading-5
          "
          :class="
            isFocused || valueBind.length > 0
              ? 'transform translate-y-[10px]'
              : ''
          "
          style="min-height: 5rem"
          v-model="valueBind"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
          @keydown="resizeTextarea($event)"
        />
      </div>
    </div>

    <div
      v-if="data.errored"
      class="error-label top-full mt-2 text-sm"
      :class="isSmall ? 'ml-6' : 'ml-10'"
    >
      {{ data.errorLabel }}
    </div>
  </div>
</template>

<script>
import { ref, toRefs, computed, watch } from "vue";

export default {
  props: {
    data: Object,
    isTextArea: {
      type: Boolean,
      default: false,
    },
    lastCharEmphasized: {
      type: Boolean,
      default: false,
    },
    borderless: Boolean,
    inputType: String,
    focused: Boolean,
    isSmall: Boolean,
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const { disabled, data } = toRefs(props);
    const { errored, value, validator } = toRefs(data.value);

    const isFocused = ref(false);
    const isErrored = ref(false);
    const valueBind = ref(value.value);
    const inputDynamicStyles = computed(() => {
      let border = isFocused.value ? "border-primary" : "border-gray-300";
      border = errored.value ? "border-red-600" : border;

      let disabledStyle = disabled.value
        ? " bg-gray-300 text-g-gray pointer-events-none"
        : "";

      return border + disabledStyle;
    });

    const toggleFocus = (value) => {
      isFocused.value = value;

      emit("update", "focused", isFocused.value);
    };

    const resizeTextarea = (e) => {
      console.log(e.target);

      e.target.style.height = e.target.scrollHeight + "px";
    };

    watch(valueBind, (to) => {
      let result = validator.value(to);

      emit("update", "errored", !result.result);

      console.log(result);
      if (result.fixed !== undefined) {
        valueBind.value = result.fixed;
      } else {
        emit("update", "value", to);
      }
    });

    watch(value, (to) => {
      valueBind.value = to;
      console.log(valueBind.value);
    });

    return {
      isErrored,
      isFocused,
      valueBind,
      inputDynamicStyles,
      toggleFocus,
      resizeTextarea,
    };
  },
};
</script>

<style lang="scss">
.g-input {
  & .placeholder {
    @apply text-gray-500;
  }
  & .emphasized::after {
    content: "*";
    color: red;
  }

  &.errored,
  &.errored .placeholder {
    @apply text-red-600;
  }
}
</style>
