export default function useInput({
  placeholder = "내용을 입력하세요",
  errored = false,
  errorLabel = "",
  value = "",
  validator = () => {
    return {
      result: true,
    };
  },
}) {
  const generated = {
    placeholder,
    errored,
    errorLabel,
    value,
    validator,
  };

  return {
    generated,
  };
}
