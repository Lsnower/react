/*
* @Author: Maolin
* @Date:   2017-05-15 16:32:57
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-24 14:24:33
*/

import Link from 'next/link';
import Router from 'next/router';

import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_con from './lend_con.js';
import Text_none from '../common/text_none.js';
class Cut extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            end:0
        }
        this.countdown = this.countdown.bind(this);
        this.timer = null
    }
    componentWillReceiveProps(nextProps){
        this.countdown(nextProps)
    }
    componentDidMount(){
        this.countdown(this.props)
    }
    countdown(n){
        var t = this;
        var nowTime = new Date().getTime();
        var diff = (n.time-n.now)>=86400000?86400000:(n.time-n.now);
        if(diff>0){
            var h = diff/1000/60/60,
            m = (h-parseInt(h))*60,
            s = (m-parseInt(m))*60;

            t.setState({
                end:(parseInt(h)>=10?parseInt(h):'0'+parseInt(h))+':'+(parseInt(m)>=10?parseInt(m):'0'+parseInt(m))
            })
        }else{
            t.setState({
                end:'00:00'
            })
        }

    }
    render(){
        return(<span className="colorR" ref="endline">{this.state.end}</span>)
    }
}
class LendOut extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[],wait:0,now:new Date().getTime(),isLogin:false};
        this.toHistory = this.toHistory.bind(this);
        this.handler = this.handler.bind(this);
    }
    componentDidMount(){
        var t = this;

        //判断用户是否登录
        $.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        isLogin:true
                    });
                }else{
                    t.setState({
                        isLogin:false
                    });
                }
                
            }
        }); 

        //我的借出
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/myLoanOut.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        data:d.data
                    });
                }else{
                    t.setState({
                        show:true,
                        code:d.code,
                        content: d.msg
                    });
                }
                
            }
        });

        this.timer=setInterval(function(){
            var n = new Date().getTime();
            t.setState({
                now:n 
            })
        },60000);
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
     formattime(n){
            var time = new Date(n).getTime();
            var year = new Date(n).getFullYear();
            var mon = new Date(n).getMonth() +1;
            mon = mon >= 10? mon:'0'+mon;
            var day = new Date(n).getDate();
            day = day >= 10? day:'0'+day;
            var hour=new Date(n).getHours()<10?"0"+new Date(n).getHours():new Date(n).getHours();
            var min=new Date(n).getMinutes()<10?"0"+new Date(n).getMinutes():new Date(n).getMinutes();

            var now = new Date().getTime(),
                nowYear = new Date().getFullYear(),
                nowMon = new Date().getMonth()+1,
                nowDay = new Date().getDate(),
                nowHour = new Date().getHours(),
                nowMin = new Date().getMinutes();

            var t='';
            if(year == nowYear){
                if(mon == nowMon){
                    if(day == nowDay){
                        t = hour+':'+min;
                    }else{
                        var f = nowDay-day;
                        t = f == 1?'昨日'+hour+':'+min:mon+'月'+day+'日';
                    }
                }else{
                    t = mon+'月'+day+'日';
                }
            }else{
               t=  year+'年'+mon+'月'+day+'日';
            }
            return t
    }

    
    
    toHistory(){
        Router.push({
            pathname:'/mobi/lend/lendHistory',
            query:{type:'lendout'}
        })
    }
    handler(e){
        if(this.state.isLogin){
            Router.push({
              pathname: '/mobi/user/circle_user/userInfo',
              query: { id: e }
            })
        }else{
            this.setState({
                confirm:{
                    code:503,
                    show:true,
                    content:'您未登录，请重新登录'
                }
            })
        }
    }
    render(){
        if(this.state.data.length){
            return(
            <div>
                 <Header_title text="我的借出"/>
                 <Header text="我的借出"/>
                 <div className="lend-wrap">
                 {
                    this.state.data.map((e,i)=>{
                        return(
                            <div className="lend-list" key={i}>
                                <section className="finance" >
                                    <div className="info" onClick={()=>{this.handler(e.userId)}}>
                                        <div className="user">
                                            <img className="img left clearfix" src={e.portrait?e.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} />
                                            <p className="location">
                                                <span className="name">{e.userName?e.userName:'-'}</span>
                                                <em className="flag time">发起意向</em>
                                            </p>
                                            <p className="location">
                                                <span>{e.location?e.location:'暂无位置信息'}</span>
                                                <em className="flag time">{e.intentionTime?this.formattime(e.intentionTime):'-'}</em>
                                            </p>
                                        </div>
                                       
                                    </div>
                                    <Lend_con info={e} lendType='lendout' isHistory='0'/>
                                </section>
                                <div className="countdown">
                                    <p className="countdown-title">等待确认中</p>
                                    <p><span className="txt">倒计时 </span><Cut key={i} now={this.state.now} time={e.endlineTime} /></p>
                                </div>
                            </div>
                        )
                    })
                 }
                 <footer>
                    <div onClick={()=>this.toHistory()}>历史借出</div> 
                 </footer>
                 <style jsx global>{`
                    body{
                        -webkit-text-size-adjust:none;
                        background: #e7e7e8;
                    }
                `}</style>
                 <style jsx>{`
                    .lend-wrap{
                        padding-bottom:.6rem;
                    }
                    .lend-list{
                        background: #fff;
                        margin: .1rem 0;
                    }
                    .info p:first-child{
                            padding-top:.01rem;
                        }
                        .info .location{
                            font-size: .12rem;
                            color: #b3b3b3;
                            position: relative;
                        }
                        .img {
                            display: inline-block;
                            width: .33rem;
                            height: .33rem;
                            border-radius: 50%;
                            margin-right: .09rem;
                        }
                        .name {
                            display: inline-block;
                            font-size: .16rem;
                            color: #cd4a47;
                            margin: -.1rem .05rem 0 0 ;
                        }
                        .flag {
                            font-size: .12rem;
                            color: #b6b6b6;
                            position: absolute;
                            right: 0;
                        }
                        .finance {
                            margin-top: .1rem;
                            background: #fff;
                            padding: .1rem .13rem;
                        }
                        .times{
                            width:100%;
                            height:.3rem;
                            line-height:.3rem;
                            font-size:.12rem;
                            color: #b3b3b3;
                        }
                        .countdown{
                            padding:.1rem;
                            border-top: 1px solid #e7e7e8;
                        }
                        .countdown p{
                            height:.2rem;
                            line-height: .2rem;
                        }
                        .countdown-title{
                            color:#b3b3b3;
                            font-size: .12rem;

                        }
                        .countdown-txt{
                            font-size: .15rem;
                        }
                        footer{
                            width: 100%;
                            height: .45rem;
                            line-height: .45rem;
                            text-align: center;
                            background: #869bcb;
                            color: #fff;
                            font-size: .16rem;
                            position: fixed;
                            bottom: 0;
                            border-top: .01rem solid #e9e9e9;
                            z-index: 10;
                        }
                `}</style>
                 </div>
                 
            </div>
        )
        }else{
            return(
                <div>
                    <Header_title text="我的借出"/>
                    <Header text="我的借出"/>
                    <footer>
                        <div onClick={()=>this.toHistory()}>历史借出</div> 
                     </footer>
                    <Text_none text=""/>
                    <style jsx>{`
                        footer{
                            width: 100%;
                            height: .45rem;
                            line-height: .45rem;
                            text-align: center;
                            background: #869bcb;
                            color: #fff;
                            font-size: .16rem;
                            position: fixed;
                            bottom: 0;
                            border-top: .01rem solid #e9e9e9;
                            z-index: 10;
                        }
                    `}</style>
                </div>
            )
        }
        
    }
}
export default LendOut;
