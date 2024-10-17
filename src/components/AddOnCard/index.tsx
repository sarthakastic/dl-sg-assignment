import { AddOn } from '../../utils/constants/addOn';

const AddOnCard = ({ addOnInfo }: { addOnInfo: AddOn }) => {
  return (
    <div>
      <p>
        {addOnInfo?.title}-${addOnInfo?.price}
      </p>
    </div>
  );
};

export default AddOnCard;
