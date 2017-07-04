/*
* @Author: Maolin
* @Date:   2017-05-08 17:42:11
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-25 10:11:20
*/
import React from 'react';
import Router from 'next/router';
import Bigger from '../user/circle_user/bigger_pic.js'
class Issure_con extends React.Component{
    constructor(props) {
        super(props);
        this.state={bigger:false,img:null,info:props.info}
        this.detail = this.detail.bind(this);
		this.toMakeall = this.toMakeall.bind(this);
    }
    componentWillUnmount(){
    }
    componentDidMount(){
        var t = this;
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            info:nextProps.info
        })
    }
    detail(e){
        if(this.props.query !== 'detail'){
            var t = this,
            id = isNaN(t.props.info.id)?t.props.info.dataId:t.props.info.id,
            userId = t.props.info.userId,
            lendType = t.props.lendType;
			
			//userId
			
            Router.push({
              pathname: '/mobi/lend/lend_detail',
              query: {id:id,userId:userId,type:'detail',lendType:lendType}
            })
        }
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
	toMakeall(event){
		event.stopPropagation();
		this.refs.text2.innerHTML = this.state.info.content
	}
    render(){
        if(this.state.info){
             var contentImg = this.state.info.contentImg ? this.state.info.contentImg.split(',')[0]+'?x-oss-process=image/resize,m_fill,h_200,w_200':'';
            
            var t = this.state.info.contentImg?this.state.info.contentImg.split(','):'';
            var shownoimg = t.length > 1 ? 'posiimg' : 'noimg';
             var noimg = this.state.info.contentImg ? 'upuserimg' : 'noimg';
             var time = this.formattime(this.state.info.createTime?this.state.info.createTime:this.state.info.createDate);
             var lends = this.state.info.location;
             var lendArray; 
            if(lends){
                lendArray = lends;
            }else{
                lendArray = '暂无定位信息';
            }
                return(
                    <div>
                        <div>
                            <div onClick={()=>{this.detail()}}>
                                <div className="lendmsg_bot">
                                    <p className='text' ref='text2'>
                                        <pre>
                                    	{this.state.info.content?this.state.info.content:''}
                                        </pre>
                                    </p>
                                    <div className="lend_kuang">
                                        <div className="lend_tip">
                                        </div>
                                        <ul className="lend_kuanglist">
                                            <li>
                                                需要资金:<span>{this.state.info.money}元</span>
                                            </li>
                                            <li>
                                                借款期限:<span>{this.state.info.days}天</span>
                                            </li>
                                            <li>
                                                回报利息:<span>{this.state.info.interest}元</span>
                                            </li>
                                        </ul>
                                        <div className="lend_pic">
                                            <img className={noimg} src={contentImg}/>
                                            <img className={shownoimg} src="../../../static/help/circle_more_pic@2x.png"/>
                                        </div>
                                    </div>
                                    <div className="lend_time">
                                        <span>{time}</span>
                                        <span>{lendArray}</span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <style jsx global>{`
                            html{-webkit-text-size-adjust:none;}
                        `}</style>
                        <style jsx>{`
							.text span{
								color: #999;
							}
							.text .span_show{
								display: inline-block;
							}
							.text .span_hide{
								display: none;
							}
                            .lend_usermsg{
                                height:0.32rem;
                                width:100%;
                            }
                            .lend_usermsg img{
                                width:0.32rem;
                                height:0.32rem;
                                border-radius:50%;
                                display: block;
                                float: left;
                            }
                            .lend_usermsg span{
                                display: inline-block;
                                height:100%;
                                line-height:0.32rem;
                                font-size:0.16rem;
                                margin-left: 0.1rem;
                            }
                            .lendmsg_bot{
                                padding-left:0.4rem;
                                
                            }
                            .lendmsg_bot p{
                                font-size:0.14rem;
                                color:#222222;
                                line-height:0.2rem;
								margin-top: .09rem;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                word-wrap: break-word;
                            }
                            .lendmsg_bot pre{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                display:block;
                                word-wrap: break-word;
                                display: block; 
                                whitewhite-space:pre-wrap; 
                                whitewhite-space:-moz-pre-wrap;   
                                whitewhite-space:-pre-wrap;
                                whitewhite-space:-o-pre-wrap;
                                word-wrap:break-word; 
                                white-space: pre-wrap;
                            }
                            .lendmsg_bot .lend_kuang{
                                width:100%;
                                border:1px solid #dddddd;
                                overflow: hidden;
                                margin-top:0.05rem;
                                background: url(../../../static/help/opinion_borrowing@2x.png) no-repeat 0.08rem center;
                                background-size:0.32rem;
                            }
                            .lend_tip{
                                height:0.8rem;
                                width:0.5rem;
                                float: left;
                            }
                            .lend_kuanglist{
                                height:100%;
                                padding:0.05rem 0 0.05rem 0;
                                float: left;
                                
                            }
                            .lend_kuanglist span{
                                color:#3f3f3f;
                                padding-left:0.03rem;
                            }
                            .lend_pic{
                                float: right;
                                padding: 0.1rem;
                                position:relative;
                            }
                            .lend_pic .upuserimg{
                                width:0.6rem;
                                height:0.6rem;
                                border:1px solid #f5f5f5;
                            }
                            .lend_pic .posiimg{
                                position:absolute;
                                bottom:0.15rem;
                                right:0.11rem;
                                width:0.25rem;
                            }
                            .lend_pic .noimg{
                                display: none !important;
                            }
                            .lend_kuanglist li{
                                color:#a7a7a7;
                                line-height:0.25rem;
                                
                            }
                            .lend_time{
                                color:#999999;
                                font-size:0.1rem;
                                margin:0.1rem 0;
                            }
                            .lend_time span{
                                margin-right:0.05rem;
                            }
                            .colorR{
                                color: #cd4a47;
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
                return <div></div>
            }
       
    }
}
export default Issure_con;
