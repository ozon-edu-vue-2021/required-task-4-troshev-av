export const ARRAY_PROP_DEFAULT = () => [];

export const GENDER_PROP_DEFAULT = "male";
export const GENDER_PROP_VALIDATOR = (value) =>
  value === "male" || value === "female";

export const GENDER_OPTIONS = [
  { label: "Мужской", value: "male" },
  { label: "Женский", value: "female" },
];

export const OPTIONS_PROP_VALIDATOR = (options) =>
  options.every((item) => "label" in item && "value" in item);
