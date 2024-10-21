import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Subscription.module.css';
import { updateCompletionStatus } from '../../redux/slices/routeStatusSlice';
import PlanCard from '../../components/PlanCard';
import { plan } from '../../utils/constants/plan';
import { AddOn, addOn } from '../../utils/constants/addOn';
import AddOnCard from '../../components/AddOnCard';
import BottomBar from '../../components/BottomBar';
import DynamicSection from '../../components/DynamicSection';
import PaymentCard from '../../components/Payment';
import {
  updateMyPlan,
  updateSelectedAddOns,
} from '../../redux/slices/planSlice';
import { RootState } from '../../redux/store';
import Shimmer from '../../components/commonUI/Shimmer';
import { PlanInterface } from '../../utils/types/PlanCard.types';
import { showToaster } from '../../redux/slices/toasterSlice';

const Subscription = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { myPlan, selectedAddOns } = useSelector(
    (state: RootState) => state.plan
  );

  const [selectedPlan, setSelectedPlan] = useState<string>(myPlan);
  const [selectedAddOn, setSelectedAddOn] = useState<string>(selectedAddOns);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvc: '' });

  useEffect(() => {
   const timer = setTimeout(() => {
      setIsDataFetching(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlanSelect = (plan: PlanInterface) => {
    setSelectedPlan(plan?.title);
  };

  const handlePaymentFormValidityChange = (isValid: boolean) => {
    setIsPaymentFormValid(isValid);
  };

  const handleSubmit = () => {
    setIsLoading(true);

    dispatch(updateCompletionStatus({ path: 'subscription', value: true }));
    dispatch(updateMyPlan(selectedPlan));
    dispatch(updateSelectedAddOns(selectedAddOn));

    const subscriptionData = {
      selectedPlan,
      selectedAddOn,
      cardDetails, 
    };

    localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));

    setTimeout(() => {
      setIsLoading(false);
      dispatch(showToaster({ type: "success", message: "Subscription activated successful!" }));
      navigate('/device');
    }, 1000);
  };

  const sections = [
    {
      content: (
        <div className={styles.subscriptioSectionWrapper}>
          <p className={styles.heading}>Select Your Plan</p>
          <div className={styles.planCardContainer}>
            {plan.map((planInfo: PlanInterface) => (
              <PlanCard
                key={planInfo.id}
                planInfo={planInfo}
                isSelected={selectedPlan === planInfo.title}
                onSelect={() => handlePlanSelect(planInfo)}
              />
            ))}
          </div>
        </div>
      ),
    },
    ...(selectedPlan
      ? [
          {
            content: (
              <div className={styles.subscriptioSectionWrapper}>
                <p className={styles.heading}>
                  Select add-ons for your subscription{' '}
                </p>
                <div className={styles.addOnCardContainer}>
                  {addOn
                    .filter((addOnInfo: AddOn) =>
                      addOnInfo.suggestion.some(
                        (suggestion) =>
                          suggestion.toLowerCase().replace(/\s/g, '') ===
                          selectedPlan.toLowerCase().replace(/\s/g, '')
                      )
                    )
                    .map((addOnInfo: AddOn) => (
                      <AddOnCard
                        key={addOnInfo?.id}
                        addOnInfo={addOnInfo}
                        onSelect={() => setSelectedAddOn(addOnInfo?.title)}
                      />
                    ))}
                </div>
              </div>
            ),
          },
        ]
      : []),
    ...(selectedPlan
      ? [
          {
            content: (
              <div className={styles.subscriptioSectionWrapper}>
                <p className={styles.heading}>Add card details</p>
                <PaymentCard
                  onSubmit={setCardDetails} 
                  initialValues={cardDetails}
                  onValidityChange={handlePaymentFormValidityChange}
                />
                <p className={styles.paymnetSubtext}>
                  You will not be charged right now. Subscription will only
                  start once your listing is published and live.
                </p>
              </div>
            ),
          },
        ]
      : []),
    {
      content: (
        <div className={styles.subscriptioSectionWrapper}>
          <div>
            <p className={styles.text}>
              Learn more about the plans here -{' '}
              <a href="/" className={styles.linkText}>
                What is the right plan for me?
              </a>
            </p>
            <p className={styles.text}>
              You will be able to switch between plans easily later as well.
              Speak to our host success team if you need any clarifications.
            </p>
          </div>
        </div>
      ),
    },
  ];

  if (isDataFetching) {
    return <Shimmer height="50vh" />;
  }

  return (
    <div>
      <DynamicSection
        heading="Subscription plan"
        subheading="Select the ideal subscription plan for your listing."
        sections={sections}
      />

      <BottomBar
        isLoading={isLoading}
        onClick={handleSubmit}
        disabled={!selectedPlan || !isPaymentFormValid}
      />
    </div>
  );
};

export default Subscription;
