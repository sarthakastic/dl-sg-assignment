import React, { useState } from 'react';
import styles from './DeviceCard.module.css';
import LazyImage from '../commonUI/LazyImage';

interface DeviceCardProps {
  deviceNumber: number;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ deviceNumber }) => {
  const [isBYOD, setIsBYOD] = useState(false);
  const [deviceType, setDeviceType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleToggle = () => setIsBYOD(!isBYOD);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteImage = () => setPreviewUrl(null);

  return (
    <div className={styles.deviceCard}>
      <h2 className={styles.title}>Device {deviceNumber}</h2>

     <div className={styles.defaultInputGroup} >

      <div className={`${styles.inputGroup} ${styles.section}`}>
        <label htmlFor={`deviceType-${deviceNumber}`}>Device type</label>
        <input
          id={`deviceType-${deviceNumber}`}
          type="text"
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          placeholder="Enter the device type"
          className={styles.inputField}
          aria-required="true"
          />
      </div>

      <div className={styles.section}>
        <div className={styles.toggleHeader}>
          <span>Bringing your own device?</span>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={isBYOD}
              onChange={handleToggle}
              aria-checked={isBYOD}
              aria-label={`Toggle if bringing your own device for Device ${deviceNumber}`}
              />
            <span className={styles.slider}></span>
          </label>
        </div>
        <p className={styles.toggleDescription}>
          Toggle this on if you're bringing your own device. Leave it off if Drive Mate is to provide the device.
        </p>
      </div>
              </div>

      
      {isBYOD && (
        <div className={styles.byodGroup}>
          <div className={`${styles.inputGroup} ${styles.section}`}>
            <label htmlFor={`serialNumber-${deviceNumber}`}>Serial number</label>
            <input
              id={`serialNumber-${deviceNumber}`}
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter the serial number"
              aria-required="true"
            />
          </div>

         
          <div className={`${styles.inputGroup} ${styles.section}`}>
            {!previewUrl && <label htmlFor={`imageUpload-${deviceNumber}`}>Upload an image of the device</label>}
            {previewUrl ? (
              <div className={styles.imagePreviewContainer}>
                <LazyImage
                  src={previewUrl}
                  alt={`Preview of uploaded device for Device ${deviceNumber}`}
                  className={styles.imagePreview}
                />
                <button
                  onClick={handleDeleteImage}
                  className={styles.deleteButton}
                  aria-label="Remove uploaded device image"
                >
                  X
                </button>
              </div>
            ) : (
              <>
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
                  <span>Click to upload</span>
                </label>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceCard;
