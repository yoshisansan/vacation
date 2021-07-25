import styles from '../styles/roulette.module.css';

const CheckLists = ({handleCheckGenre}) => {
  const checkList = ["映像","Youtube","アニメ","読み物","音楽","お出かけ","食べ物","飲み物","ゲーム","スポーツ","料理","その他"];

  return (
    <div className={styles.checkLists}>
      {checkList.map((item, index) => {
        return(
          <div className={styles.checkboxWrap} key={index}>
            <input onClick={(e) => handleCheckGenre(e)} type="checkbox" id={index} name={item} defaultChecked="checked" />
            <label htmlFor={index} className={styles.checkbox}>{item}</label>
          </div>
        );
        })
      }
    </div>
  )
}

export default CheckLists;