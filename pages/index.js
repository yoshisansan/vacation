import Head from 'next/head'
import Roulette from '../components/roulette'
import Image from 'next/image'
import Layout from '../components/layout'
// const Odometer = dynamic(import('react-odometerjs'), {
//     ssr: false,
//     loading: () => 0
// });

export default function Home() {

  return (
    <Layout>
      <Roulette />
    </Layout>
  )
}
