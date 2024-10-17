// src/pages/Subscription.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './Subscription.module.css';
import { updateCompletionStatus } from '../../redux/slices/routeStatusSlice';
import PlanCard from '../../components/PlanCard';
import { Plan, plan } from '../../utils/constants/plan';
import { AddOn, addOn } from '../../utils/constants/addOn';
import AddOnCard from '../../components/AddOnCard';
import CardDetails from '../../components/CardDetails';
import BottomBar from '../../components/BottomBar';

export const Subscription = () => {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null); // Track selected plan by ID

  const handleSubmit = (values: {
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => {
    console.log('Form submitted:', values);
  };

  const handlePlanSelect = (id: number) => {
    setSelectedPlan(id);
  };

  return (
    <div className={style.deviceContainer}>
      <p>Subscription Plan</p>
      <p>Select the ideal subscription plan for your listing.</p>

      <p>Select Your Plan</p>

      {plan.map((planInfo: Plan) => (
        <PlanCard
          key={planInfo.id}
          planInfo={planInfo}
          isSelected={selectedPlan === planInfo.id}
          onSelect={() => handlePlanSelect(planInfo.id)}
        />
      ))}

      <p>Select add-ons for your subscription </p>

      {addOn.map((addOnInfo: AddOn) => (
        <AddOnCard key={addOnInfo?.id} addOnInfo={addOnInfo} />
      ))}

      <CardDetails onSubmit={handleSubmit} />

      <p>
        Learn more about the plans here - What is the right plan for me? You
        will be able to switch between plans easily later as well. Speak to our
        host success team if you need any clarifications.
      </p>

      <button
        onClick={() =>
          dispatch(
            updateCompletionStatus({ path: 'subscription', value: true })
          )
        }
        disabled={selectedPlan === null} // Disable button if no plan is selected
      >
        Update
      </button>
      <BottomBar />
    </div>
  );
};
