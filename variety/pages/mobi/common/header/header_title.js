import Head from 'next/head';
import Style from '../style.js';
export default ({text}) => (
    <div>
        <Head>
          <title>{text}</title>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no, user-scalable=no,minimum-scale=1.0, maximum-scale=1.0" />
        </Head>
        <Style />
    </div>
)

