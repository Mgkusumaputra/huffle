import { GroupPickerDistributionMethod, RandomPickerOptions } from "@/types";

export interface Person {
  name: string;
  representative?: boolean;
}

export function randomGroupPicker(
  people: Person[],
  options: RandomPickerOptions
): Person[][] {
  let { numberOfGroups, maxMembersPerGroup, pickRepresentative } = options;

  let groups: Person[][] = [];
  let remainingPeople = [...people];

  // Fisher-Yates Shuffle to randomize the order of remainingPeople array
  for (let i = remainingPeople.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingPeople[i], remainingPeople[j]] = [
      remainingPeople[j],
      remainingPeople[i],
    ];
  }

  // Distribute people into groups based on the selected option
  if (numberOfGroups !== 0 && numberOfGroups !== undefined) {
    const groupSize = Math.ceil(remainingPeople.length / numberOfGroups);
    for (let i = 0; i < numberOfGroups; i++) {
      const group = remainingPeople.slice(i * groupSize, (i + 1) * groupSize);
      if (group.length > 0) {
        groups.push(group);
      }
    }
  } else if (maxMembersPerGroup !== 0) {
    while (remainingPeople.length > 0) {
      const group = remainingPeople.splice(0, maxMembersPerGroup);
      if (group.length > 0) {
        groups.push(group);
      }
    }
  }

  // Optionally pick representatives for each group
  if (pickRepresentative) {
    groups = groups.map((group) => {
      const representativeIndex = Math.floor(Math.random() * group.length);
      const representative = group[representativeIndex];
      return group.map((person) => ({
        ...person,
        representative: person === representative,
      }));
    });
  }

  return groups;
}
