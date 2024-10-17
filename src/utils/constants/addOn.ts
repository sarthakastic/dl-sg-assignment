export interface AddOn {
  id: number;
  title: string;
  price: number;
  suggestion: string[];
  isActive: boolean;
}

export const addOn: AddOn[] = [
  {
    id: 1,
    title: 'BYO secondary GPS',
    price: 5,
    suggestion: ['Just mates', 'Good mates', 'Best mates'],
    isActive: true,
  },
  {
    id: 2,
    title: 'BYO lockbox',
    price: 10,
    suggestion: ['Good mates'],
    isActive: true,
  },
  {
    id: 3,
    title: 'Between trip insurance',
    price: 10,
    suggestion: ['Best mates'],
    isActive: true,
  },
];
