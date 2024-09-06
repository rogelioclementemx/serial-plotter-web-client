import Head from 'next/head';
import RealTimeChart from "./components/real-time-chart/real-time-chart";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Real-Time Chart</title>
        <meta name="description" content="Real-Time Chart using Chart.js and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <RealTimeChart />
      </main>
    </div>
  );
}
