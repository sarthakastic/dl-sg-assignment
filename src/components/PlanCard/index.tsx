// src/components/PlanCard.tsx
import { Plan } from '../../utils/constants/plan';
import style from './PlanCard.module.css';

interface PlanCardProps {
  planInfo: Plan;
  isSelected: boolean;
  onSelect: () => void;
}

const PlanCard = ({ planInfo, isSelected, onSelect }: PlanCardProps) => {
  return (
    <div
      className={`${style.planCardContainer} ${
        isSelected ? style.selected : ''
      }`}
      onClick={onSelect}
    >
      <p>{planInfo.title}</p>
      {planInfo.description.map((desc, index) => (
        <p key={index}>{desc}</p>
      ))}
      <p>{`$${planInfo.price}`}</p>
    </div>
  );
};

export default PlanCard;
