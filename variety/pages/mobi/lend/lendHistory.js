/*
* @Author: Maolin
* @Date:   2017-05-15 13:56:36
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-25 11:45:18

*/



import Link from 'next/link';
import Router from 'next/router';

import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Text_none from '../common/text_none.js';
import Confirm from '../common/confirm.js';

class Btns extends React.Component{
    constructor(props) {
        super(props);
        this.state = {not:true,info:props.info};
        this.repayed = this.repayed.bind(this);
    }
    componentDidMount(){
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            info: nextProps.info
        })
    }

    //已经还款
    repayed(){
        var t = this,type= t.props.type;
        
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/repayed.do',
            data:{id:t.props.info.id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.props.callback(t.props.index);
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
        if(this.state.info){
            var btnType = this.props.type == 'lendin'? this.props.info.loanInRepay : this.props.info.loanOutRepay;
            if(this.props.info.status == 7 || this.props.info.status == 6){
                if(btnType == 0){
                    return (
                         <ul className="his-btn">
                            <li className="link"><a href={this.state.info.phoneNum ?"tel:"+this.state.info.phoneNum:"tel:"}>联系对方</a></li>
                            <li className="no-money" onClick={()=>{this.repayed()}}>已经还款</li>
                            <Confirm type={1} confirm={this.state} />
                            <style jsx>{`
                                .his-btn{
                                    display: flex;
                                    display: -webkit-flex;
                                    width: 100%;
                                    border-top: 1px solid #e7e7e8;
                                }
                                .his-btn li{
                                    flex: 1;
                                    -webkit-flex: 1;
                                    text-align: center;
                                    height: .44rem;
                                    line-height: .44rem;
                                }
                                li.link{
                                    color: #869bcb;
                                }
                                li.no-money{
                                    background: #cd4a47;
                                    color: #fff;
                                }
                        `}</style>
                         </ul>
                    )
               }else{
                    return (
                         <ul className="his-btn">
                            <li className="huankuan">已还款</li>
                            <style jsx>{`
                                .his-btn{
                                    display: flex;
                                    display: -webkit-flex;
                                    width: 100%;
                                    border-top: 1px solid #e7e7e8;
                                }
                                .his-btn li{
                                    flex: 1;
                                    -webkit-flex: 1;
                                    text-align: center;
                                    height: .44rem;
                                    line-height: .44rem;
                                }
                                li.huankuan{
                                    color: #82848A;
                                }
                        `}</style>
                         </ul>
                    )
                    
               }
           }else{
                if(this.props.info.status == 8 ){
                     return (
                         <ul className="his-btn">
                            <li className="huankuan">已还款</li>
                            <style jsx>{`
                                .his-btn{
                                    display: flex;
                                    display: -webkit-flex;
                                    width: 100%;
                                    border-top: 1px solid #e7e7e8;
                                }
                                .his-btn li{
                                    flex: 1;
                                    -webkit-flex: 1;
                                    text-align: center;
                                    height: .44rem;
                                    line-height: .44rem;
                                }
                                li.huankuan{
                                    color: #82848A;
                                }
                        `}</style>
                         </ul>
                    )
                }else{
                    return(<p></p>)
                }
           }
       }else{
        return(<div></div>)
       }
        
        
    }
       
}
class LendHistory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
            data:[],
            helpData:[]
        }
        this.toDetail = this.toDetail.bind(this);
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

        /*
            历史借入：lendin
            历史借出： lendout
        */
        var url = this.props.url.query.type == 'lendin'?'/coterie/help/loan/historyLoan.do':'/coterie/help/loan/historyLoanOut.do'
        $.ajax({
            type:'post',
            url:url,
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
    toDetail(id,status){
        var type = this.props.url.query.type;
        if(status == 6 || status == 7 || status == 8){
            Router.push({
                pathname:'/mobi/lend/history_detail',
                query:{orderId: id,type:type}
            })
        }
    }
    hanleBack(e){
        this.state.data[e].status == 8;
        this.props.url.query.type == 'lendin'?this.state.data[e].loanInRepay=1:this.state.data[e].loanOutRepay=1;
        this.setState({
            data:this.state.data
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
                    show:true,
                    content:'您未登录，请重新登录'
                }
            })
        }
    }
    render(){
        var type = this.props.url.query.type;
        /*
        * lendIn,历史借入
        * status==6,7,8 正常订单，显示用户信息（头像，用户名，地址）,借出时间显示confirmTime
        * status == 2,审核未通过，显示审批时间 auditTime
        * status ==4> ,借助失败，显示修改时间 modifyTime
        *
        * lendOut 历史借出
        *  借出时间  confirmTime
        */
        if(this.state.data.length){
            return (
                <div>
                    <Header_title text={this.props.url.query.type == 'lendin'?'历史借入':'历史借出'}/>
                    <Header text={this.props.url.query.type == 'lendin'?'历史借入':'历史借出'}/>
                    <div className="lend-wrap">
                    {
                        this.state.data.map((e,i)=>{
                                {e.index = i;}
                            return(
                                <div className="lend-list" key={i}>
                                    <div>
                                        <section className="finance" key={i}>
                                        {
                                                type == 'lendin'?(<div className="info">
                                                <div className="fail" style={{display:(e.status==6||e.status==7||e.status==8)?'none':'block'}}>
                                                    <div className="fail-info"><span className="fail-txt">借款失败： </span><span>{e.failMsg?e.failMsg:e.status == 2?'审核失败':'-'}</span></div>
                                                    <div className="fail-time">
                                                        <p className="location">失败时间</p>
                                                        <p className="location">{e.status == 2?this.formattime(e.auditTime):((e.status ==6 ||e.status ==7 || e.status ==8)?this.formattime(e.confirmTime):this.formattime(e.modifyDate))}</p>
                                                    </div>
                                                </div>
                                                <div className="user" style={{display:(e.status==6||e.status==7||e.status==8)?'inline-block':'none'}}>
                                                    <div className="person" onClick={()=>{this.handler(e.selectedUserId)}}>
                                                        <img className="img left clearfix" src={e.portrait?e.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} />
                                                        <span className="person-type">好心人</span>
                                                    </div>
                                                    <div className="user-info">
                                                        <p className="location">
                                                            <span className="name">{e.userName?e.userName:'-'}</span>
                                                            <em className="flag time">借入时间</em>
                                                        </p>
                                                        <p className="location">
                                                            <span>{e.location?e.location:'暂无位置信息'}</span>
                                                            <em className="flag time">{e.status == 2?this.formattime(e.auditTime):((e.status ==6 ||e.status ==7 || e.status == 8)?this.formattime(e.confirmTime):this.formattime(e.modifyDate))}</em>
                                                        </p>
                                                    </div>
                                                </div>
                                               
                                            </div>):(<div className="info">
                                                <div className="fail" style={{display:(e.status==6||e.status==7||e.status==8)?'none':'block'}}>
                                                    <div className="fail-info"><span className="fail-txt">借款失败： </span><span>{e.failMsg?e.failMsg:e.status == 2?'审核失败':'-'}</span></div>
                                                    <div className="fail-time">
                                                        <p className="location">失败时间</p>
                                                        <p className="location">{e.confirmTime?this.formattime(e.confirmTime):'-'}</p>
                                                    </div>
                                                </div>
                                                <div className="user" style={{display:(e.status==6||e.status==7||e.status==8)?'inline-block':'none'}} >
                                                    <div className="person" onClick={()=>{this.handler(e.userId)}}>
                                                        <img className="img left clearfix" src={e.portrait?e.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} />
                                                        <span className="person-type">借款人</span>
                                                    </div>
                                                    <div className="user-info">
                                                        <p className="location">
                                                            <span className="name">{e.userName?e.userName:'-'}</span>
                                                            <em className="flag time">借出时间</em>
                                                        </p>
                                                        <p className="location">
                                                            <span>{e.location?e.location:'暂无位置信息'}</span>
                                                            <em className="flag time">{e.confirmTime?this.formattime(e.confirmTime):'-'}</em>
                                                        </p>
                                                    </div>
                                                </div>
                                               
                                            </div>)
                                        }
                                            
                                            <ul className="lending" onClick={(id,status)=>{this.toDetail(e.id,e.status)}}>
                                                <li className="title">借款</li>
                                                <li>
                                                    <p className="txt">需要金额</p>
                                                    <strong className="num">{e.money?'￥'+e.money:'￥0'}</strong>
                                                </li>
                                                <li>
                                                    <p className="txt">借款时间</p>
                                                    <strong className="num">{e.days?e.days+'天':'0天'}</strong>
                                                </li>
                                                <li>
                                                    <p className="txt">借款利息</p>
                                                    <strong className="num colorR">{e.interest?'￥'+e.interest:'￥0'}</strong>
                                                </li>
                                            </ul>
                                        </section>
                                        <Btns info={e} type={this.props.url.query.type} callback={this.hanleBack.bind(this)} index={e.index}/>
                                    </div>
                                </div>
                                )
                        })
                    
                    }
                    </div>
                    <style jsx global>{`
                        body{
                            -webkit-text-size-adjust:none;
                            background: #e7e7e8;
                        }
                    `}</style>
                    <style jsx>{`
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
                            height: .2rem;
                            line-height: .2rem;
                        }
                        .user{
                            position: relative;
                            width:100%;
                        }
                        .person{
                            position: absolute;
                        }
                        .user-info{
                            padding-left:.44rem;
                        }
                        .person-type{
                            display: inline-block;
                            position: absolute;
                            left: .012rem;
                            bottom: -.03rem;
                            font-size: .1rem;
                            color: #fff;
                            padding: .01rem;
                            height: .16rem;
                            line-height: .16rem;
                            background: url(/static/circle/loan_bg_goodheart@3x.png) no-repeat left center;
                            background-size: contain;
                        }
                        .img {
                            display: inline-block;
                            width: .35rem;
                            height: .35rem;
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
                        .fail{
                            height: .3rem;
                            position: relative;
                        }
                        .fail-info{
                            position: absolute;
                            left: 0;
                            top: .04rem;
                            font-size: 0.15rem;
                        }
                        .fail-time{
                            text-align: right;
                            position: absolute;
                            top: -.04rem;
                            right: 0;
                        }
                        .fail-txt{
                            font-weight: 600;
                        }
                        .help{
                            position: relative;
                            border-top: 1px solid #e7e7e8;
                            padding: .1rem;
                            height:.6rem;
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
                        .lending{
                            display: flex;
                            display: -webkit-flex;
                            width: 100%;
                            height: .66rem;
                            margin: .12rem 0; 
                            background: #f0f0f0;
                            border-radius: .04rem;
                        }
                        .lending .title{
                            display: inline-block;
                            width: .18rem;
                            padding: .16rem .03rem;
                            margin: 0 auto;
                            line-height: .14rem;
                            background: #cd4a47;
                            color: #fff;
                            border-radius: .04rem/.04rem 0 0 .04rem;
                            font-size: .12rem;
                        }
                        .lending li{
                            padding: .1rem 0;
                            text-align: center;
                            line-height: .2rem;
                        }
                        .lending li:nth-child(1){
                        }
                        .lending li:not(:nth-child(1)){
                            flex: 1;
                            -webkit-flex: 1;
                        }
                        .lending .txt{
                            font-size: .12rem;
                            color: #b7b8bb;
                            margin-bottom:.05rem;
                        }
                        .lending .num{
                            font-size: .18rem;
                            letter-spacing:.01rem;
                        }
                    `}</style>
                </div>
            ) 
        }else{
            return(
                <div>
                     <Header_title text={this.props.url.query.type == 'lendin'?'历史借入':'历史借出'}/>
                    <Header text={this.props.url.query.type == 'lendin'?'历史借入':'历史借出'}/>
                    <Text_none text=" "/>
                </div>
            )
        }
    }
}
export default LendHistory;
