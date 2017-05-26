/*
* @Author: Maolin
* @Date:   2017-05-17 14:12:17
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-25 11:43:30
*/

import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Confirm from '../common/confirm.js';
import Bigger from '../user/circle_user/bigger_pic.js'

// 进入该页面要先判断是否有没有付款成功

class History_detail extends React.Component{
    constructor(state) {
        super(state);
        this.state={isLogin:false,data:null,bigPic:false,img:false};
        this.bigger = this.bigger.bind(this);
        this.handler = this.handler.bind(this);
    }
    componentDidMount(){
        var t = this;
        var orderId = t.props.url.query.orderId;

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

        //展示用户详情
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/showDetails.do',
            data:{id:orderId},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({data:d.data});
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code
                    })
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
    bigger(img){
        this.setState({bigPic:!this.state.bigPic,img:img});
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
        if(this.state.data){
            var contentImg = this.state.data ? (this.state.data.contentImg?this.state.data.contentImg.split(','):[]):[];
            return(
                <div>
                    <Header_title text="详情"/>
                    <Header text="详情"/>
                    <div className="wrap">
                        <div className="info">
                            <div className="user" >
                                <div className="person" onClick={()=>{this.handler(this.props.url.query.type=='lendin'?this.state.data.selectedUserId:this.state.data.userId)}}>
                                    <img className="img left clearfix" src={this.state.data?(this.props.url.query.type == 'lendout'?this.state.data.portrait || "/static/circle/headportrait64x64@3x.png":this.state.data.selectedPortrait || "/static/circle/headportrait64x64@3x.png"):"/static/circle/headportrait64x64@3x.png"} />
                                    <span className="person-type">{this.props.url.query.type == 'lendout'?'借款人':'好心人'}</span>
                                </div>
                                <div className="user-info">
                                    <p className="location">
                                        <span className="name">{this.state.data?(this.props.url.query.type == 'lendout'?this.state.data.userName:this.state.data.selectedUserName):'-'}</span>
                                        <em>{this.state.data?(this.state.data.isAttentionSelected == 2?'已关注':''):''}</em>
                                        <em className="flag time">{this.props.url.query.type == 'lendout'? '借出时间':'借入时间'}</em>
                                    </p>
                                    <p className="location">
                                        <span>{this.state.data?(this.props.url.query.type == 'lendout'?this.state.data.location || '暂无位置信息':this.state.data.selectedLocation||'暂无位置信息'):'暂无位置信息'}</span>
                                        <em className="flag time">{this.state.data?this.formattime(this.state.data.confirmTime):'-'}</em>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ul className="lending">
                            <li className="title">借款</li>
                            <li>
                                <p className="txt">需要金额</p>
                                <strong className="num">{this.state.data?'￥'+this.state.data.money:'￥0'}</strong>
                            </li>
                            <li>
                                <p className="txt">借款时间</p>
                                <strong className="num">{this.state.data?this.state.data.days+'天':'0天'}</strong>
                            </li>
                            <li>
                                <p className="txt">借款利息</p>
                                <strong className="num colorR">{this.state.data?'￥'+this.state.data.interest:'￥0'}</strong>
                            </li>
                        </ul>
                        <p>{this.state.data?this.state.data.content:''}</p>
                        <ul className="help-info" style={{height:contentImg.length?'':'.2rem'}}>
                        {
                            contentImg.map((e,i)=>{
                                var bgImg = e?e:'/static/circle/headportrait64x64@3x.png';
                                return(
                                    <li className="help-img" key={i} style={{background:'url('+bgImg+') no-repeat left center',backgroundSize:'cover'}} onClick={()=>{this.bigger(bgImg)}}>
                                    </li>
                                )
                            })
                        }
                        </ul>
                        <Bigger show={this.state.bigPic} hand={this.bigger} pic={this.state.img} />
                    </div>
                    <style jsx global>{`
                        body{
                            -webkit-text-size-adjust:none;
                            background: #e7e7e8;
                        }
                    `}</style>
                    <style jsx>{`
                        .wrap{
                            padding: .1rem .13rem;
                            background: #fff;
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
                        .help-info{
                            width: 100%;
                            height: .8rem;
                            padding: .16rem 0 0;
                            overflow: hidden;
                        }
                        .help-img{
                            display: inline-block;
                            width: 23.7%;
                            height: .6rem;
                            background:#333;
                            border-radius: .04rem;
                            background:url('/static/circle/headportrait64x64@3x.png') no-repeat top center;
                            background-size: contain;
                            margin-right: 1.3%;
                        }
                        .help-info li:last-child{
                            margin-right:0;
                        }
                    `}</style>
                </div>
            )
        }else{
            return(<div></div>)
        }
        
    }
}
export default History_detail;
