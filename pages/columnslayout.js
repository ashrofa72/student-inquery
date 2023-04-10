import { useState } from 'react';
import styles from '../styles/columnslayout.module.css';

export default function MyPage() {
  const [showDatePicker, setShowDatePicker] = useState(true);

  const handleRadioChange = (event) => {
    setShowDatePicker(event.target.value !== 'option1');
  };

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <h2 className={styles.header}>Column 1</h2>
        <div>
          <label>
            <input type="radio" name="options" value="option1" checked={showDatePicker} onChange={handleRadioChange} />
            Option 1
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="options" value="option2" checked={!showDatePicker} onChange={handleRadioChange} />
            Option 2
          </label>
        </div>
        {showDatePicker && <input type="date" className={styles.datePicker} />}
      </div>
      <div className={styles.column}>
        <h2 className={styles.header}>Column 2</h2>
        {/* add content for column 2 here */}
      </div>
      <div className={styles.column}>
        <h2 className={styles.header}>Column 3</h2>
        {/* add content for column 3 here */}
      </div>
    </div>
  );
}
