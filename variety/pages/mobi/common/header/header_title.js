import Head from 'next/head';
import Style from '../style.js';
export default ({text}) => (
    <div>
        <Head>
          <title>{text}</title>
            <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=vYA2Zwlxxb22bRHPFTGqYHl35Rf6ZbUh"></script>
            <script type="text/javascript" src="/static/exif.js"></script>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no, user-scalable=no,minimum-scale=1.0, maximum-scale=1.0" />
        </Head>
        <Style />
    </div>
)

