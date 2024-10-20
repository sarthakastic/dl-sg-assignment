import { useEffect, useState } from 'react';
import BottomBar from '../../components/BottomBar';
import DeviceCard from '../../components/DeviceCard';
import DynamicSection from '../../components/DynamicSection';
import Shimmer from '../../components/commonUI/Shimmer';

const Devices = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataFetching(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const deviceNumbers = [1, 2, 3, 4];

  const sections = deviceNumbers.map((number) => ({
    content: <DeviceCard key={number} deviceNumber={number} />,
  }));

  const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

  if (isDataFetching) {
    return <Shimmer height="50vh" />;
  }

  return (
    <div>
      <DynamicSection
        heading="Device management"
        subheading="Add details of the device, if any already installed on your car. If none, then continue to next step."
        sections={sections}
      />
      <BottomBar disabled={true} />
    </div>
  );
};

export default Devices;
