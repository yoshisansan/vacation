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
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
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