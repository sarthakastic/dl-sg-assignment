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
import DynamicSection from '../../components/DynamicSection';
import PaymentCard from '../../components/Payment';

export const Subscription = () => {
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(0);

  // const handleSubmit = (values: {
  //   cardNumber: string;
  //   expiry: string;
  //   cvc: string;
  // }) => {
  //   console.log('Form submitted:', values);
  // };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan?.title);
    setSelectedPlanPrice(plan?.price);
  };

  const handleSubmit = (values: any) => {
    console.log(values);
    // Handle form submission
  };

  const sections = [
    {
      content: (
        <>
          <p className={style.heading}>Select Your Plan</p>
          <div className={style.planCardContainer}>
            {plan.map((planInfo: Plan) => (
              <PlanCard
                key={planInfo.id}
                planInfo={planInfo}
                isSelected={selectedPlan === planInfo.title}
                onSelect={() => handlePlanSelect(planInfo)}
              />
            ))}
          </div>
        </>
      ),
    },
    ...(selectedPlan
      ? [
          {
            content: (
              <>
                <p className={style.heading}>
                  Select add-ons for your subscription{' '}
                </p>
                <div className={style.addOnCardContainer}>
                  {addOn
                    .filter((addOnInfo: AddOn) =>
                      addOnInfo.suggestion.some(
                        (suggestion) =>
                          suggestion.toLowerCase().replace(/\s/g, '') ===
                          selectedPlan.toLowerCase().replace(/\s/g, '')
                      )
                    )
                    .map((addOnInfo: AddOn) => (
                      <AddOnCard key={addOnInfo?.id} addOnInfo={addOnInfo} />
                    ))}
                </div>
              </>
            ),
          },
        ]
      : []),
    ...(selectedPlan
      ? [
          {
            content: (
              <>
                <p className={style.heading}>Add card details</p>
                <PaymentCard
                  onSubmit={handleSubmit}
                  initialValues={{ cardNumber: '', expiryDate: '', cvc: '' }}
                />
                <p>
                  You will not be charged right now. Subscription will only
                  start once your listing is published and live.
                </p>
                {/* <CardDetails onSubmit={handleSubmit} /> */}
              </>
            ),
          },
        ]
      : []),
    {
      content: (
        <>
          <div>
            <p className={style.text}>
              Learn more about the plans here -{' '}
              <a href="/" className={style.linkText}>
                What is the right plan for me?
              </a>
            </p>
            <p className={style.text}>
              You will be able to switch between plans easily later as well.
              Speak to our host success team if you need any clarifications.
            </p>
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <DynamicSection
        heading="Subscription plan"
        subheading="Select the ideal subscription plan for your listing."
        sections={sections}
      />

      <BottomBar disabled={!selectedPlan} />
    </div>
  );
};
