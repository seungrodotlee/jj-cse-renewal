import { ref } from "vue";

export default function useInput() {
  const generate = ({
    placeholder = "내용을 입력하세요",
    errored = false,
    errorLabel = "",
    value = "",
    initial = null,
    focused = false,
    errorCondition = (data) => null,
    fixCondition = (data) => null,
    onChange = (data) => null,
  }) => {
    const input = ref({
      placeholder,
      errored,
      errorLabel,
      focused,
      value: initial || value,
      initial,
      validator: (data) => {
        const errorLabel = errorCondition(data);
        const fixed = fixCondition(data);

        let pack = {
          result: true,
        };

        if (errorLabel) {
          input.value.errorLabel = errorLabel;

          pack.result = false;
        }

        if (fixed || fixed === "") {
          pack.fixed = fixed;
          pack.result = false;
        }

        return pack;
      },
      onUpdate: (event, data) => {
        input.value[event] = data;
        if (event === "value") onChange(data);
      },
    });

    console.log(input.value);

    return input;
  };

  return {
    generate,
  };
}
