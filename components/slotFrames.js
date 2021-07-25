import { useState } from "react";
import useInterval from './useInterval';
import styles from '../styles/roulette.module.css';

const SlotFrames = ({morningData, eveningData, noonData, isSlot}) => {
  const [result, setResult] = useState({
    morning: null,
    noon: null,
    evening: null
  });

  const slotStart = () => {
    // stateを更新しすぎると動きがもたつくのでスロットの動きだけはDOM操作で行う

    if(isSlot){
      const randomMorning = morningData[Math.floor(Math.random() * morningData.length)],
        randomNoon = noonData[Math.floor(Math.random() * noonData.length)],
        randomEvening = eveningData[Math.floor(Math.random() * eveningData.length)];
      setResult({
        morning: randomMorning.item + randomMorning.tailWordMorning,
        noon: randomNoon.item + randomNoon.tailWordNoon,
        evening: randomEvening.item + randomEvening.tailWordEvening
      });

      return;
    }

      return;
  }

  useInterval(() => {
    slotStart();
  }, isSlot ? 50 : null);

  const SlotFrame = ({timeRange, id, res}) => {
    return (
      <div className={styles.roulette}>
        <div className={styles.rouletteTimeRange}>{timeRange}</div>
        <div className={styles.rouletteDisplay} id={id}>
          <p className={styles.rouletteMoji}>{res}</p>
        </div>
      </div>
    )
  };

  return (
    <div>
      <SlotFrame timeRange="朝" id="morningDOM" res={result.morning}/>
      <SlotFrame timeRange="昼" id="noonDOM" res={result.noon}/>
      <SlotFrame timeRange="晩" id="eveningDOM" res={result.evening}/>
    </div>
  );
}

export default SlotFrames;