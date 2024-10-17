import React, { useState } from 'react';
import styles from './DeviceCard.module.css';

interface DeviceCardProps {
  deviceNumber: number;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ deviceNumber }) => {
  const [isBYOD, setIsBYOD] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleToggle = () => {
    setIsBYOD(!isBYOD);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <div className={styles.deviceCard}>
      <h2 className={styles.title}>Device {deviceNumber}</h2>

      <div className={styles.inputGroup}>
        <label htmlFor={`deviceType-${deviceNumber}`}>Device type</label>
        <input
          id={`deviceType-${deviceNumber}`}
          type="text"
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          placeholder="Enter the device type"
        />
      </div>

      <div className={styles.toggleGroup}>
        <div className={styles.toggleHeader}>
          <span>Bringing your own device?</span>
          <label className={styles.switch}>
            <input type="checkbox" checked={isBYOD} onChange={handleToggle} />
            <span className={styles.slider}></span>
          </label>
        </div>
        <p className={styles.toggleDescription}>
          Toggle this on if you're bringing your own device. Leave it off if
          Drive mate is to provide the device.
        </p>
      </div>

      {isBYOD && (
        <>
          <div className={styles.inputGroup}>
            <label htmlFor={`serialNumber-${deviceNumber}`}>
              Serial number
            </label>
            <input
              id={`serialNumber-${deviceNumber}`}
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter the serial number"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Upload an image of the device</label>
            <input
              id={`imageUpload-${deviceNumber}`}
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <label
              htmlFor={`imageUpload-${deviceNumber}`}
              className={styles.uploadButton}
            >
              Click to upload
            </label>
            {image && <p className={styles.fileName}>{image.name}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default DeviceCard;
