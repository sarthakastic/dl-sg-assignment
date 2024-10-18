import BottomBar from '../../components/BottomBar';
import DeviceCard from '../../components/DeviceCard';
import DynamicSection from '../../components/DynamicSection';
import style from './Devices.module.css';
const Devices = () => {
  const deviceNumbers = [1, 2, 3, 4];

  const sections1 = [{ content: <div>helloworld</div> }];

  const sections = deviceNumbers.map((number) => ({
    content: <DeviceCard key={number} deviceNumber={number} />,
  }));

  return (
    <div>
      <DynamicSection
        heading="Device management"
        subheading="Add details of the device, if any already installed on your car. If none, then continue to next step."
        sections={sections}
      />
      <BottomBar />
    </div>
  );
};

export default Devices;
