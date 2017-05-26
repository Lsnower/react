/*
* @Author: Maolin
* @Date:   2017-05-15 10:00:56
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-26 14:20:25
*/

import Link from 'next/link';
import Router from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_con from './lend_con.js';
import Text_none from '../common/text_none.js';
import Confirm from '../common/confirm.js';

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

class HelpList extends React.Component{
     constructor(props) {
        super(props);
        this.state = {
            helpData:[]
        }
    }
    componentDidMount(){
        var t = this;
         $.ajax({
            type:'post',
            url:'/coterie/help/loan/intentionCount.do',
            data:{id:this.props.id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({helpData:d.data});
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code,
                        not: false
                    })
                }
                
            }
        });
    }
    render(){
        var num = parseInt(screen.width/40)-1;
        return(
            <div>
                <ul className="help-wrap">
                {
                    this.state.helpData.slice(0,num).map((e,i)=>{
                        return(
                            <li className="help-user" key={i} style={{background:'url('+e.portrait+') no-repeat left center',backgroundSize:'cover'}}>
                            </li>
                        )
                    })
                }
                    <li className="help-other" style={{display:this.state.helpData.length>8?'block':'none'}}></li>
                </ul>
            <style jsx>{`
                .help-wrap{
                    padding: .05rem .1rem;
                    height: .44rem;
                }
                .help-user{
                    width: .32rem;
                    height: .32rem;
                    float: left;
                    border-radius: 50%;
                    border: 1px solid #eee;
                    margin-right: .05rem;
                }
                .help-other{
                    width: .32rem;
                    height: .32rem;
                    float: left;
                    background: url('/static/circle/helpdetail_icon_more@3x.png');
                    background-size:cover;
                }
            `}</style>    
            </div>
        )
    }
}
class Mylend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
            listShow:true,
            data:[],
            helpData:[],
            show:false,
            wait:0,
            now:new Date().getTime(),
            index:0
        }
        this.cancle = this.cancle.bind(this);
        this.toHistory = this.toHistory.bind(this);
        this.canOk = this.canOk.bind(this);
        this.canNot = this.canNot.bind(this);
    }
    componentDidMount(){
        var t = this;

        //我的借入
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/myLoanIn.do',
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
    cancle(e,id,i){
        
        var t = this;
        this.setState({
            show:true,
            title:'是否要取消借款？',
            id:id,
            index:i
        })
    }
    canNot(){
        this.setState({show:!this.state.show})
    }
    canOk(){
        var t = this;
        t.setState({show:false})
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/cancelLoan.do',
            data:{id:this.state.id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.refs['wrap'+t.state.index].style.display = 'none';
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code,
                        not: false
                    })
                }
                
            }
        }); 
    }
    toHistory(){
        Router.push({
            pathname:'/mobi/lend/lendHistory',
            query:{type:'lendin'}
        })
    }
    render(){
        if(this.state.data.length){
            return (
                <div>
                    <Header_title text="我的借入"/>
                    <Header text="我的借入" />
                    <div className="lend-wrap">
                    {
                        this.state.data.map((d,i)=>{
                            return(
                                <div className="lend-list" key={i} ref={'wrap'+i} >
                                    <section className="finance" key={i}>
                                        <p className="times">发布于 <span>{this.formattime(d.createDate)}</span></p>
                                        <Lend_con info={d} lendType='lendin'/>
                                    </section>
                                    {
                                        d.status == 1?(<div className="help">
                                         <p className="help-status">审核中</p>
                                    </div>):(<div className="help">
                                         <p className="help-title">正在寻求帮助</p>
                                         <p className="help-time">倒计时 <Cut key={i} now={this.state.now} time={d.endlineTime} /></p>
                                         <a className="help-btn" onClick={(e)=>this.cancle(e,d.id,i)}>取消借款</a>
                                    </div>)
                                    }
                                    
                                </div>
                                )
                        })
                    
                    }
                    <Confirm type={2} confirm={this.state} isNot={()=>{this.canNot()}} isOk={()=>{this.canOk()}}/>
                    </div>
                    <footer>
                       <div onClick={()=>this.toHistory()}>历史借入</div> 
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
                        .help{
                            position: relative;
                            border-top: 1px solid #e7e7e8;
                            padding: .1rem;
                            height:.6rem;
                        }
                        .help-status{
                            text-align: center;
                            height: .44rem;
                            line-height: .44rem;
                            color: #82848A;
                        }
                        .help-title{
                            color: #b3b3b3;
                            font-size: .12rem;
                        }
                        .help-time{
                            font-size: .15rem;
                            height:.26rem;
                            line-height: .26rem;
                            color: #5f6166;
                        }
                        .help-btn{
                            position: absolute;
                            top: .14rem;
                            right: .1rem;
                            font-size: .14rem;
                            padding: .05rem .1rem;
                            border: 1px solid #cd4a47;
                            border-radius: .04rem;
                            color: #cd4a47;
                        }
                        
                        .help-wrap{
                            padding: .1rem .13rem;
                            height: .42rem;
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
            ) 
        }else{
            return(
                <div>
                    <Header_title text="我的借入"/>
                    <Header text="我的借入"/>
                    <footer>
                       <div onClick={()=>this.toHistory()}>历史借入</div> 
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
export default Mylend;
