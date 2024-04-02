const GroupPickerDistributionMethod = {
  Default: "Default",
  Gender: "Gender",
} as const;

export type GroupPickerDistributionMethod =
  (typeof GroupPickerDistributionMethod)[keyof typeof GroupPickerDistributionMethod];

export interface RandomPickerOptions {
  numberOfGroups?: number;
  maxMembersPerGroup?: number;
  pickRepresentative?: boolean;
}
