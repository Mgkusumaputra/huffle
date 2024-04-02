// Define an interface for a person
interface Person {
  name: string;
}

// Define an interface for day assignment
export interface DayAssignment {
  day: string;
  people: Person[];
}

// Function to pick people based on selected days using balanced shuffle
export function randomPicketPicker(
  selectedDays: string[],
  people: Person[]
): [string, Person[]][] {
  // Function to shuffle an array using Fisher-Yates algorithm
  function fisherYatesShuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledPeople = fisherYatesShuffle([...people]);

  const targetGroupSize = Math.ceil(
    shuffledPeople.length / selectedDays.length
  );

  const assignments: [string, Person[]][] = selectedDays.map((day) => [
    day,
    [],
  ]);

  // Assign people to days
  shuffledPeople.forEach((person, index) => {
    const dayIndex = index % selectedDays.length;
    assignments[dayIndex][1].push(person);
  });

  return assignments;
}

// Example usage
const selectedDays: string[] = ["senin", "selasa", "rabu", "kamis", "jumat"];

const people: Person[] = [
  { name: "Udin" },
  { name: "Agus" },
  { name: "Asep" },
  { name: "Karni" },
  { name: "Nurul" },
  { name: "Liat" },
  { name: "Septi" },
  { name: "Wahyu" },
  { name: "Arif" },
  { name: "Sri" },
  { name: "Maya" },
  { name: "Siti" },
  { name: "Reza" },
  { name: "Andri" },
  { name: "Amat" },
  { name: "Kartika" },
];

const result = randomPicketPicker(selectedDays, people);
console.log(result);
