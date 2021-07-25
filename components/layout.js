import Head from 'next/head';
import styles from '../styles/layout.module.css';
import Image from 'next/image';

const name = 'あきふみ@タイ個人開発';
export const siteTitle = 'ガチャバケーション';

export default function Layout({ children }) {
  return (
  <div className={styles.container}>
    <Head>
      <title>ガチャバケーション</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="何したらいいのかわからない大切な休日の時間の使い方を適当に決めよう"
      />
      <meta
        property="og:image"
        content={`/gatya-vacation-og.png`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <header className={styles.header}>
    <h1 className={styles.title}>
      <Image 
        className={styles.logo}
        alt="ガチャバケーション"
        src="/vacation-logo.png"
        width={1080}
        height={186}
      />
    </h1>
    <div className={styles.wrapCloud}>
      <div className={styles.leftCloud}>
        <Image 
          alt="ガチャバケーション雲"
          src="/vacation-cloud.png"
          width={160}
          height={120}
        />
        </div>
        <div className={styles.rightCloud}>
          <Image 
            alt="ガチャバケーション雲"
            src="/vacation-cloud.png"
            width={160}
            height={120}
          />
        </div>
      </div>
    </header>
    <main className={styles.main}>{children}</main>
  </div>
  )
}