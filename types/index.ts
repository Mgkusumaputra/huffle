const GroupPickerDistributionMethod = {
  Default: "Default",
  Gender: "Gender",
} as const;

export type GroupPickerDistributionMethod =
  keyof typeof GroupPickerDistributionMethod;
