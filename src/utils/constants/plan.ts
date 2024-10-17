export interface Plan {
  id: number;
  title: string;
  description: string[];
  price: number;
}

export const plan: Plan[] = [
  {
    id: 1,
    title: 'Just mates',
    description: [
      'Bring your own GPS',
      'Mileage reporting to be done by you',
      'In-person key handover to guests',
    ],
    price: 0,
  },
  {
    id: 2,
    title: 'Good mates',
    description: [
      'Primary GPS included',
      'Automated mileage calculations',
      'In-person key handover to guests',
    ],
    price: 10,
  },
  {
    id: 3,
    title: 'Best mates',
    description: [
      'Key access technology',
      'Automated mileage calculations',
      'Remote handover to guests',
    ],
    price: 30,
  },
];
