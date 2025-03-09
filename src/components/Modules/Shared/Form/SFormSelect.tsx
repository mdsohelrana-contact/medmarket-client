"use client";

import { Controller, Control } from "react-hook-form";
import Select, { MultiValue, SingleValue, ActionMeta } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface IFormSelectProps {
  name: string;
  label?: string;
  control: Control<any>;
  options: OptionType[];
  multiple?: boolean;
}

const SFormSelect = ({
  name,
  label,
  control,
  options,
  multiple = false,
}: IFormSelectProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="w-full">
          {label && <label className="block text-gray-700 mb-1">{label}</label>}
          <Select
            {...field}
            options={options}
            isMulti={multiple}
            onChange={(
              newValue: MultiValue<OptionType> | SingleValue<OptionType>,
              _actionMeta: ActionMeta<OptionType>
            ) => {
              field.onChange(
                multiple
                  ? (newValue as MultiValue<OptionType>)?.map((s) => s.value)
                  : (newValue as SingleValue<OptionType>)?.value
              );
            }}
            value={
              multiple
                ? options.filter((option) =>
                    field.value?.includes(option.value)
                  )
                : options.find((option) => option.value === field.value) || null
            }
            className="mt-1"
          />
        </div>
      )}
    />
  );
};

export default SFormSelect;
