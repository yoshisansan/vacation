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
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <meta name="description" content="大切な休日の過ごし方は適当に決めよう！" />
      <meta property="og:url" content="https://gatya-vacation.vercel.app/" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:description" content="大切な休日の過ごし方は適当に決めよう！" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://gatya-vacation.vercel.app/gatya-vacation-og.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@akifumiyoshimu" />
      <meta name="twitter:title" content="ガチャバケーション" />
      <meta name="twitter:description" content="大切な休日の過ごし方は適当に決めよう！" />
      <meta name="twitter:image" content="https://gatya-vacation.vercel.app/gatya-vacation-og.png" />
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