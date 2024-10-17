import DeviceCard from '../../components/DeviceCard';
import style from './Devices.module.css';
const Devices = () => {
  const deviceNumbers = [1, 2, 3, 4];
  return (
    <div className={style.deviceContainer}>
      <p>Device Management</p>
      <p>
        Add details of the device, if any already installed on your car. If
        none, then continue to next step
      </p>
      {deviceNumbers.map((number) => (
        <DeviceCard key={number} deviceNumber={number} />
      ))}
    </div>
  );
};

export default Devices;
