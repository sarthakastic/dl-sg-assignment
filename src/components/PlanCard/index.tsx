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
      <p className={style.title}>{planInfo.title}</p>
      {planInfo.description.map((desc, index) => (
        <p className={style.description} key={index}>
          <img src={desc?.icon} alt="" /> <span>{desc?.text}</span>
        </p>
      ))}
      <p className={style.price}>
        {' '}
        <span className={style.priceAmount}>
          {planInfo.price === 0 ? 'Free' : '$' + planInfo.price}
          {planInfo.price !== 0 && (
            <span className={style.duration}>/month</span>
          )}
        </span>{' '}
      </p>
    </div>
  );
};

export default PlanCard;
