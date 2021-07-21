import { useState } from 'react'
import useInterval from './useInterval';
import styles from '../styles/Roulette.module.css'
import vacationJSON from '../vacation.json';
import data from './twitter';
import debug from 'debug';
const lg = debug('data');

await Promise.resolve(lg(data));
// [{tag: "hoge", item: "呪術廻戦"}, ...]にする
const {general, morning, noon, evening} = vacationJSON;
const GENERAL_DATA = Object.values(general)
  .map((data) => {
  // チェックマークを確認してジャンルを外す処理待ち

    const TagAndItemArr = data.items.map(d => {
      // tailWordのnullチェック待ち
      return {
        tag: data.tag,
        item: String(d + data.tailWord)
      }
    });

    return TagAndItemArr
  })
  .reduce((prev, next) => prev.concat(next), []);

const CheckTag = () => {
  // チェックマークの入ったジャンルだけでガチャする
}


const testArr = ["寿司","遺跡","城","プール","ネットサーフィン","筋肉","ランニング"];

const Roulette = () => {
  const [slotState, setSlotState] = useState({
    isSlot: false,
    innerText: 'ガチャる',
  });
  const [result, setResult] = useState({
    morning: null,
    noon: null,
    evening: null
  });

  const SlotFrame = ({timeRange, id, res}) => {
    return (
      <div>
        <div>{timeRange}：</div>
        <div className={styles.roulette} id={id}>{res}</div>
      </div>
    )
  };
  const slotStart = () => {
    // stateを更新しすぎると動きがもたつくのでスロットの動きだけはDOM操作で行う
    if(slotState.isSlot){
      setResult({
        morning: GENERAL_DATA[Math.floor(Math.random() * GENERAL_DATA.length)].item,
        noon: GENERAL_DATA[Math.floor(Math.random() * GENERAL_DATA.length)].item,
        evening: GENERAL_DATA[Math.floor(Math.random() * GENERAL_DATA.length)].item
      });

      return;
    }

      // const morningDOM = document.getElementById('morningDOM'),
      //   noonDOM = document.getElementById('noonDOM'),
      //   eveningDOM = document.getElementById('eveningDOM');
      // morningDOM.textContent = GENERAL_DATA[Math.floor(Math.random() * GENERAL_DATA.length)].item;
      // noonDOM.textContent = GENERAL_DATA[Math.floor(Math.random() * GENERAL_DATA.length)].item;
      // eveningDOM.textContent = GENERAL_DATA[Math.floor(Math.random() * GENERAL_DATA.length)].item;

      return;
  }

  useInterval(() => {
    slotStart();
  }, slotState.isSlot ? 50 : null);

  return (
    <>
      <div>
        <SlotFrame timeRange="朝" id="morningDOM" res={result.morning}/>
        <SlotFrame timeRange="昼" id="noonDOM" res={result.noon}/>
        <SlotFrame timeRange="晩" id="eveningDOM" res={result.evening}/>
      </div>
      <button onClick={
            () => {setSlotState({
            isSlot: !slotState.isSlot,
            innerText: !slotState.isSlot ? 'ガチャを止める' : 'ガチャる',
            });
          }
        }
      >
        {slotState.innerText}
      </button>
    </>
  );
}

export default Roulette;