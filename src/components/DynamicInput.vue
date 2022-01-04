<template>
  <div class="g-input relative flex flex-col" :class="errored ? 'errored' : ''">
    <div class="flex rounded-xl bg-white">
      <div
        class="relative flex-grow rounded-xl transition duration-500"
        :class="[
          inputDynamicStyles,
          isSmall ? 'px-6 py-6' : 'px-10 py-6',
          borderless ? '' : 'border',
        ]"
      >
        <div
          class="
            placeholder
            absolute
            top-6
            origin-left
            transition-transform
            duration-500
            pointer-events-none
            whitespace-nowrap
            z-10
          "
          :class="[
            isFocused || valueBind.length > 0
              ? 'transform -translate-y-4 scale-75'
              : '',
            lastCharEmphasized ? 'emphasized' : '',
          ]"
          v-html="placeholder"
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
      v-if="errored"
      class="error-label top-full mt-2 text-sm"
      :class="isSmall ? 'ml-6' : 'ml-10'"
    >
      {{ errorLabel }}
    </div>
  </div>
</template>

<script>
import { ref, toRefs, computed, watch } from "vue";

export default {
  props: {
    placeholder: {
      type: String,
      default: "Placeholder",
    },
    errored: {
      type: Boolean,
      default: false,
    },
    errorLabel: String,
    disabled: Boolean,
    isSmall: Boolean,
    inputType: String,
    value: String,
    validator: {
      type: Function,
      default: () => true,
    },
    isTextArea: {
      type: Boolean,
      default: false,
    },
    lastCharEmphasized: {
      type: Boolean,
      default: false,
    },
    borderless: Boolean,
    focused: Boolean,
  },
  setup(props, { emit }) {
    const { disabled, errored, value, validator } = toRefs(props);

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

      emit("update:focused", isFocused.value);
    };

    const resizeTextarea = (e) => {
      console.log(e.target);

      e.target.style.height = e.target.scrollHeight + "px";
    };

    watch(valueBind, (to) => {
      let result = validator.value(to);

      emit("update:errored", !result.result);

      console.log(result);
      if (result.fixed || result.fixed === "") {
        valueBind.value = result.fixed;
      } else {
        emit("update:value", to);
      }
    });

    watch(value, (to) => {
      valueBind.value = to;
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
