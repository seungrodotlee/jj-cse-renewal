<template>
  <div
    class="g-input relative flex flex-col"
    :class="data.errored ? 'errored' : ''"
  >
    <div class="flex rounded-xl" :class="disabled ? 'bg-gray-100' : 'bg-white'">
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
            isSmall
              ? `px-2 transformtop-4 -translate-x-2 ${
                  !disabled ? 'bg-white' : ''
                }`
              : 'top-6',
            disabled ? 'bg-gray-100 text-gray-500' : '',
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
          :class="[
            isFocused || valueBind.length > 0
              ? 'transform translate-y-[10px]'
              : '',
            disabled ? 'bg-gray-100' : 'bg-white',
          ]"
          :value="valueBind"
          @keyup="keyup"
          @focus="toggleFocus(true)"
          @blur="toggleFocus(false)"
          @keyup.enter="emit('enter')"
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
          @keyup="resizeTextarea($event)"
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
  emits: ["enter", "update"],
  setup(props, { emit }) {
    const { disabled, data } = toRefs(props);
    const { errored, value, validator, initial } = toRefs(data.value);

    const inputElement = ref(null);
    const isFocused = ref(false);
    const isErrored = ref(false);
    const valueBind = ref(initial.value || value.value);
    const inputDynamicStyles = computed(() => {
      let border = isFocused.value ? "border-primary" : "border-gray-300";
      border = errored.value ? "border-red-600" : border;

      let disabledStyle = disabled.value
        ? " bg-gray-100 text-gray-500 pointer-events-none"
        : "";

      return border + disabledStyle;
    });

    const toggleFocus = (value) => {
      isFocused.value = value;

      emit("update", "focused", isFocused.value);
    };

    const keyup = (e) => {
      valueBind.value = e.target.value;
    };

    const resizeTextarea = (e) => {
      e.target.style.height = e.target.scrollHeight + "px";
    };

    let updateFromOriginChange = false;
    watch(valueBind, (to) => {
      let result = validator.value(to);

      emit("update", "errored", !result.result);

      if (result.fixed !== undefined) {
        valueBind.value = result.fixed;
      } else {
        if (updateFromOriginChange) {
          updateFromOriginChange = false;
          return;
        }

        emit("update", "value", to);
      }
    });

    watch(value, (to) => {
      valueBind.value = to;
    });

    watch(initial, (to) => {
      updateFromOriginChange = true;
      valueBind.value = to;
    });

    return {
      emit,
      inputElement,
      isErrored,
      isFocused,
      valueBind,
      inputDynamicStyles,
      toggleFocus,
      keyup,
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
