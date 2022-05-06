import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect, createRef} from "react";
import axios from 'axios';
const HumanElapsed = require('human-elapsed')
import moment from 'moment';
export default function Home() {

  const [currentSatoshiTime, setSatoshiTime] = useState(null);
  const [timeAfterSatoshi, setTimeAfterSatoshi] = useState(null)

  const MINUTE_MS = 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      let aS_time = moment().unix() - moment.utc('2008-10-31 18:10:00 UTC', '"YYYY-MM-DD HH:MM:SS"').unix();
      (async() => {
        const {data: {address: address}} = await axios.get(`/api/satoshiTime/${aS_time}`)
        setSatoshiTime(address)
        setTimeAfterSatoshi(aS_time)
      })()
    }, MINUTE_MS);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
   
  }, [])

  function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-xl font-bold mb-10">{currentSatoshiTime ? currentSatoshiTime : ''}</h1>
              <h1 className="text-md font-bold mb-10">Satoshi was first seen {HumanElapsed(timeAfterSatoshi)} ago</h1>
              <p>
                Satoshi Time is a universal, decentralized clock, that is easy to calculate based on the number of seconds that have passed since Satoshi appeared on the Internet with the idea of Bitcoin.
              </p>

              <h1 className="text-3xl font-bold mt-10">How does is work?</h1>
              <p className="text-2xl font-bold mt-10 mb-10">
                First, you create a BIP-39 wallet with this seed phrase:
              </p>
              <div>
              <div className="overflow-x-auto">
              <div className="overflow-x-auto">
  <table className="table w-full">
   
    <tbody>
      <tr>
        <td><b>1. Satoshi</b></td>
        <td><b>2. Satoshi</b></td>
        <td><b>3. Satoshi</b></td>
        <td><b>4. Satoshi</b></td>
      </tr>
      <tr>
        <td><b>5. Satoshi</b></td>
        <td><b>6. Satoshi</b></td>
        <td><b>7. Satoshi</b></td>
        <td><b>8. Satoshi</b></td>
      </tr>
      <tr>
        <td><b>9. Satoshi</b></td>
        <td><b>10. Satoshi</b></td>
        <td><b>11. Satoshi</b></td>
        <td><b>12. Satoshi</b></td>
      </tr>
      <tr>
        <td><b>13. Satoshi</b></td>
        <td><b>14. Satoshi</b></td>
        <td><b>15. Satoshi</b></td>
        <td><b>16. Satoshi</b></td>
      </tr>
      <tr>
        <td><b>17. Satoshi</b></td>
        <td><b>18. Satoshi</b></td>
        <td><b>19. Satoshi</b></td>
        <td><b>20. Satoshi</b></td>
      </tr>
      <tr>
        <td><b>21. Satoshi</b></td>
        <td><b>22. Satoshi</b></td>
        <td><b>23. Satoshi</b></td>
        <td><b>24. Birth</b></td>
      </tr>
    </tbody>
  </table>
</div>
              <p className="text-2xl font-bold mt-10 mb-10">
                Then count the seconds since Satoshi introduced the Bitcoin Whitepaper
              </p>
              <div className="mockup-code">
  <pre><code>let secondsSinceSatoshi = moment().unix() - moment.utc('2008-10-31 18:10:00 UTC', '"YYYY-MM-DD HH:MM:SS"').unix();</code></pre>
</div>
              </div>

              <p className="text-2xl font-bold mt-10 mb-10">
                Using that value as the derivation path, you can create a unique address
              </p>
              <div className="mockup-code">
                <pre><code>m/84'/0'/0'/0/secondsSinceSatoshi</code></pre>
              </div>
              <p className="text-2xl font-bold mt-10 mb-10">
                There are enough addresses for every second until the last Bitcoin is mined!
              </p>
              </div>

              
              <button className="btn btn-primary mt-10" onClick={() => window.open('https://github.com/LAMike310/satoshi-time', '_blank')}>View Code</button>
            </div>
          </div>
        </div>

    </div>
  )
}
