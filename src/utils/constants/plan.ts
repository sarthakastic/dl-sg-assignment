import lockIcon from '../../assets/images/Lock.svg';
import locationIcon from '../../assets/images/Group 5171.svg';
import mileageIcon from '../../assets/images/e.svg';

interface Description {
  icon: any;
  text: string;
}
export interface Plan {
  id: number;
  title: string;
  description: Description[];
  price: number;
}

export const plan: Plan[] = [
  {
    id: 1,
    title: 'Just mates',
    description: [
      { icon: locationIcon, text: 'Bring your own GPS' },
      { icon: mileageIcon, text: 'Mileage reporting to be done by you' },
      { icon: lockIcon, text: 'In-person key handover to guests' },
    ],
    price: 0,
  },
  {
    id: 2,
    title: 'Good mates',
    description: [
      { icon: locationIcon, text: 'Primary GPS included' },
      { icon: mileageIcon, text: 'Automated mileage calculations' },
      { icon: lockIcon, text: 'In-person key handover to guests' },
    ],
    price: 10,
  },
  {
    id: 3,
    title: 'Best mates',
    description: [
      { icon: locationIcon, text: 'Key access technology' },
      { icon: mileageIcon, text: 'Automated mileage calculations' },
      { icon: lockIcon, text: 'Remote handover to guests' },
    ],
    price: 30,
  },
];
