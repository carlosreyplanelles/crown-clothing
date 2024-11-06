import { Group, FormInputValue, FormInputLabel } from "./form-input.styles";

export function FormInput({ label, inputOptions }) {
  return (
    <Group>
      <FormInputValue {...inputOptions} />
      {label && (
        <FormInputLabel shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}
