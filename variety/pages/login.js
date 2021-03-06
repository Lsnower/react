/*
* @Author: Maolin
* @Date:   2017-04-14 10:24:46
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-05 09:13:50
*/

import Header_title from './mobi/common/header/header_title.js';
import Footer from './mobi/common/footer.js';
import Login from './mobi/login/login.js';

export default (e) => (
    <div>
        <Header_title text="乐米-登录"/>
        <div className="content">
               <Login login={e}/>
        </div>
        <style jsx global>{`
            .right{float: right;}
            .content{
                padding-bottom: 0.6rem;
            }
        `}</style>
        <style jsx>{`
            .content{
                height:100%;
                background: #fff;
                position: relative;
                padding-bottom: 0.6rem;
            }
           
           
        `}</style>
    </div>
)
