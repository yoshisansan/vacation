// vercelへデプロイ
// twitterタイムライン追加
// シェアボタン実装
import { useState } from 'react';
import SlotFrames from './SlotFrames';
import styles from '../styles/roulette.module.css';
import vacationJSON from '../vacation.json';
import Image from 'next/image';

// [{tag: "hoge", item: "呪術廻戦"}, ...]にする
const {general, morning, noon, evening} = vacationJSON;
// const GENERAL_DATA = Object.values(general)
//   .map((data) => {
//   // チェックマークを確認してジャンルを外す処理待ち

//     const TagAndItemArr = data.items.map(d => {
//       // tailWordのnullチェック待ち
//       return {
//         tag: data.tag,
//         tailWordMorning: data.tailWordMorning,
//         tailWordNoon: data.tailWordNoon,
//         tailWordEvening: data.tailWordEvening,
//         item: d,
//       }
//     });

//     return TagAndItemArr
//   })
//   .reduce((prev, next) => prev.concat(next), []);

const generateData = (JSONdata, generalObj) => {
  const generatedData = Object.values(JSONdata)
  .map((data) => {
    const TagAndItemArr = data.items.map(d => {
      return {
        tag: data.tag,
        tailWordMorning: data.tailWordMorning,
        tailWordNoon: data.tailWordNoon,
        tailWordEvening: data.tailWordEvening,
        item: d,
      }
    });

    return TagAndItemArr
  })
  .reduce((prev, next) => prev.concat(next), []);

  // 時間帯ごとに全般データと結合する
  if(generalObj !== null) return generalObj.concat(generatedData);

  return generatedData;

}

const GENERAL_DATA = generateData(general, null),
  MORNING_DATA = generateData(morning, GENERAL_DATA),
  NOON_DATA = generateData(noon, GENERAL_DATA),
  EVENING_DATA = generateData(evening, GENERAL_DATA);


const Roulette = () => {
  const [slotState, setSlotState] = useState({
    isSlot: false,
    innerText: 'ガチャる',
    twitterMsg: {morning: null, noon: null, evening: null},
  });
  // const [result, setResult] = useState({
  //   morning: null,
  //   noon: null,
  //   evening: null
  // });
  const [dataGatya, setDataGatya] = useState({
    morningData: MORNING_DATA,
    noonData: NOON_DATA,
    eveningData: EVENING_DATA,
    falseList: [],
  });

  // const slotStart = () => {
  //   // stateを更新しすぎると動きがもたつくのでスロットの動きだけはDOM操作で行う
  //   if(dataGatya.morningData.length === 0 || dataGatya.noonData.length === 0 || dataGatya.eveningData.length === 0 ) {
  //     setSlotState({
  //       isSlot: !slotState.isSlot,
  //       innerText: !slotState.isSlot ? 'ストップ' : 'ガチャる',
  //     });

  //     return alert('最低一つはチェックマークを入れてください')
  //   };

  //   if(slotState.isSlot){
  //     const randomMorning = dataGatya.morningData[Math.floor(Math.random() * dataGatya.morningData.length)],
  //       randomNoon = dataGatya.noonData[Math.floor(Math.random() * dataGatya.noonData.length)],
  //       randomEvening = dataGatya.eveningData[Math.floor(Math.random() * dataGatya.eveningData.length)];
  //     setResult({
  //       morning: randomMorning.item + randomMorning.tailWordMorning,
  //       noon: randomNoon.item + randomNoon.tailWordNoon,
  //       evening: randomEvening.item + randomEvening.tailWordEvening
  //     });

  //     return;
  //   }

  //     return;
  // }

  // useInterval(() => {
  //   slotStart();
  // }, slotState.isSlot ? 50 : null);

  const handleCheckGenre = (e) => {
    const targetName = e.target.name;

    if(!e.target.checked) {
      const falseFilterData = (data) => {
        const filtedData =  data.filter(d => {
          if( targetName === d.tag ) return false;

          // falseListの配列も順番にチェック
          for( let i = 0; i < dataGatya.falseList.length; i++ ){
            if( dataGatya.falseList[i]  === d.tag) return false;
          }

          return true;
        });

        return filtedData;
      }

      setDataGatya({
        morningData: falseFilterData(MORNING_DATA),
        noonData: falseFilterData(NOON_DATA),
        eveningData: falseFilterData(EVENING_DATA),
        falseList: [...dataGatya.falseList, targetName],
      });

      return;
    } else {
      const trueFilterData = (data) => {
        const filtedData =  data.filter(d => {
          if( targetName === d.tag) return true;

          for( let i = 0; i < dataGatya.falseList.length; i++ ){
            if( dataGatya.falseList[i]  === d.tag) return false;
          }

          return true;
        });

        return filtedData;
      }
      setDataGatya({
        morningData: trueFilterData(MORNING_DATA),
        noonData: trueFilterData(NOON_DATA),
        eveningData: trueFilterData(EVENING_DATA),
        falseList: dataGatya.falseList.filter(falseChar => falseChar !== targetName),
      });

      return;

    }
  }


  // const SlotFrame = ({timeRange, id, res}) => {
  //   return (
  //     <div className={styles.roulette}>
  //       <div className={styles.rouletteTimeRange}>{timeRange}</div>
  //       <div className={styles.rouletteDisplay} id={id}>
  //         {/* <Image 
  //           className={styles.rouletteImage}
  //           src="/vacation-display.png"
  //           height={260}
  //           width={80}
  //           quality={30}
  //           alt="スロットディスプレイ"
  //         /> */}
  //         <p className={styles.rouletteMoji}>{res}</p>
  //       </div>
  //     </div>
  //   )
  // };

  const checkList = ["映像","Youtube","アニメ","読み物","音楽","お出かけ","食べ物","飲み物","ゲーム","スポーツ","料理","その他"];
  const CheckComponent = checkList.map((item, index) => {
    return (
      <div className={styles.checkboxWrap} key={index}>
        <input onClick={(e) => handleCheckGenre(e)} type="checkbox" id={index} name={item} defaultChecked="checked" />
        <label htmlFor={index} className={styles.checkbox}>{item}</label>
      </div>
    )
  });

  const AlpacaButton = () => {
    return (
    <div className={styles.rouletteButtonWrap}>
      <div className={styles.rouletteAlpaca} >
      <Image
        src="/vacation-alpaca.png"
        height={220}
        width={220}
        quality={1}
        alt="アルパカ"
      />
      </div>
      <button
        className={styles.rouletteButton}
        onClick={
            () => {setSlotState({
            isSlot: !slotState.isSlot,
            innerText: !slotState.isSlot ? 'ストップ' : 'ガチャる',
            twitterMsg: !slotState.isSlot ? {morning: null, noon: null, evening: null} : {morning: document.getElementById('morningDOM').innerText, noon: document.getElementById('noonDOM').innerText, evening: document.getElementById('eveningDOM').innerText},
            });
          }
        }
      >
        {slotState.innerText}
      </button>
    </div>
    );
  }


//   <a href="https://twitter.com/intent/tweet?
//   text={ツイートテキスト}&
//   url={ウェブページのURL}&
//   hashtags={ハッシュタグ}&
//   via={Twitterユーザー名}&
//   related={追加のTwitterユーザー名}＆
//   in-reply-to={親ツイートのID}"
// target="_blank"
// rel="nofollow noopener noreferrer"
// >ここにアイコンが入ります。</a>
  const TwitterButton = ({twitterMsg}) => {
    const { morning, noon, evening } = twitterMsg;
    let text;
    if(morning === null || noon === null || evening === null) {
      text = '大切な休日の過ごし方は適当に決めよう！%0a'
    } else {
      text = `あなたにおすすめの休日ガチャプランは、%0a【朝】${morning}%0a【昼】${noon}%0a【夜】${evening}%0aです。%0a`;
    };
    const url = `localhost:8000`;
    const hashtags = 'ガチャバケーション';

    return (
      <a 
        className={styles.twitterButtonLink}
        href={`https://twitter.com/intent/tweet?text=${text}&hashtags=${hashtags}&url=${url}`}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <button className={styles.twitterButton}>
          <Image
            src="/vacation-twitter-icon.png"
            width={40}
            height={40}
          />
          <p>結果をシェアする</p>
        </button>
      </a>
    )
  }

  return (
    <>
      <SlotFrames morningData={dataGatya.morningData} noonData={dataGatya.noonData} eveningData={dataGatya.eveningData} isSlot={slotState.isSlot}/>
      {/* <div>
        <SlotFrame timeRange="朝" id="morningDOM" res={result.morning}/>
        <SlotFrame timeRange="昼" id="noonDOM" res={result.noon}/>
        <SlotFrame timeRange="晩" id="eveningDOM" res={result.evening}/>
      </div> */}
      <AlpacaButton />
      <div className={styles.checkLists}>
        {CheckComponent}
      </div>
      <TwitterButton twitterMsg={slotState.twitterMsg} />
      <footer>
        <div className={styles.footerStyle}>
          <p>Copyright © 2021 by あきふみ@海外個人開発</p>
        </div>
      </footer>
      {/* <TwitterTimelineEmbed
        sourceType="profile"
        screenName="saurabhnemade"
        options={{height: 400}}
      /> */}
    </>
  );
}

export default Roulette;