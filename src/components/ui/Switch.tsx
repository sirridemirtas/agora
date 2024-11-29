import {
  Switch as HeadlessSwitch,
  Field,
  Label,
  Description,
} from "@headlessui/react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
}

export default function Switch({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  name,
  value,
}: SwitchProps) {
  return (
    <Field disabled={disabled}>
      <div className="flex items-center justify-between">
        <div className="flex flex-grow flex-col">
          {label && (
            <Label
              className="text-sm font-medium leading-6 text-gray-900 data-[disabled]:opacity-50"
              passive
            >
              {label}
            </Label>
          )}
          {description && (
            <Description className="text-sm text-gray-500 data-[disabled]:opacity-50">
              {description}
            </Description>
          )}
        </div>
        <HeadlessSwitch
          checked={checked}
          onChange={onChange}
          name={name}
          value={value}
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-gray-900 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
        >
          <span
            className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6"
            aria-hidden="true"
          />
        </HeadlessSwitch>
      </div>
    </Field>
  );
}
