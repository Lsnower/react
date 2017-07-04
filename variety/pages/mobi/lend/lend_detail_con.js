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
		this.page = {
            startX: 0,
			iNow: 0
		};
        this.bigger = this.bigger.bind(this);
		this.seeBig = this.seeBig.bind(this);
		this.bigImgnone = this.bigImgnone.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
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
    bigger(img){
        this.setState({bigger:!this.state.bigger,img:img});
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
	seeBig(i){
		this.page.iNow = i
		$(this.refs['img'+i]).siblings().css({left: "100%"});
		$(this.refs['img'+i]).css({left: "0%"});
		
		$(this.refs['icon'+i]).siblings().removeClass('curr');
		$(this.refs['icon'+i]).addClass('curr');
		
		$(this.refs.maskBig).show();
	}
	bigImgnone(){
		$(this.refs.maskBig).hide();
	}
	handleTouchStart(e){
		this.page.startX = e.changedTouches[0].pageX;
	}
	handleTouchEnd(e){
		var contentImg = this.state.info.contentImg ? this.state.info.contentImg.split(','):[];
		if(contentImg.length > 0){
			var startX = this.page.startX;
			var endX = e.changedTouches[0].pageX;
			var iNow = this.page.iNow;
			var Next = 0;
			
			if(startX>endX){//后
				Next = this.page.iNow + 1;
				if(iNow<(contentImg.length-1)){
					$(this.refs['img'+Next]).css({left: "100%"})
					$(this.refs['img'+iNow]).stop().animate({left: "-100%"});
                	$(this.refs['img'+Next]).stop().animate({left: "0%"});
					
					$(this.refs['icon'+Next]).siblings().removeClass('curr');
					$(this.refs['icon'+Next]).addClass('curr');
					
					this.page.iNow = this.page.iNow+1;
				}
			}
			else{//前
				Next = this.page.iNow - 1;
				if(iNow>0){
					$(this.refs['img'+Next]).css({left: "-100%"})
					$(this.refs['img'+iNow]).stop().animate({left: "100%"});
                	$(this.refs['img'+Next]).stop().animate({left: "0%"});
					
					$(this.refs['icon'+Next]).siblings().removeClass('curr');
					$(this.refs['icon'+Next]).addClass('curr');
					
					this.page.iNow = this.page.iNow-1;
				}
			}
		}
		
    }
    render(){
        if(this.state.info){
            var contentImg = this.state.info.contentImg ? this.state.info.contentImg.split(','):[];
             var time = this.formattime(this.state.info.createDate);
             var lends = this.state.info.land;
             var lendArray; 
            if(lends){
                lendArray = (lends.split('-'))[1]+' '+(lends.split('-'))[2];
            }else{
                lendArray = '暂无定位信息';
            }
            return(
                    
                    <div>
                        <div>
                            <div className="lendmsg_bot">
                                    <p><pre>{this.state.info.content?this.state.info.content:''}</pre></p>
                                <div className="lend_kuang">
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
                                </div>
                                <ul className="help-info" style={{height:contentImg.length?'':'.2rem'}}>
                                    {
                                        contentImg.map((e,i)=>{
                                            var bgImg = e?e+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png';
                                            return(
                                                <li className="help-img" key={i} style={{background:'url('+bgImg+') no-repeat left center',backgroundSize:'cover'}} onClick={()=>{this.seeBig(i)}}>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                
                                <Bigger show={this.state.bigger} hand={this.bigger} pic={this.state.img} type="lend"/>
                                
                                <div className='mask_big' ref='maskBig' onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}  onClick={this.bigImgnone}>
									<ul>
										
										{
											contentImg.map((e,i)=>{
												var bgImg = e?e+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png';
												return(<li key={i} ref={'img'+i}><img src={bgImg}  /></li>)
											})
										}
										
									</ul>
									
									<div className={contentImg.length>1?"clearfix carousel-div img_show":"clearfix carousel-div img_hide"}>
										{
											contentImg.map((e,i)=>{
												
												return(<span key={i} ref={'icon'+i} className="dot"></span>)
											})
										}
										
									</div>
									
									
								</div>
                          
                           
                            </div>
                                
                        </div>
                        <style jsx global>{`
                            html{-webkit-text-size-adjust:none;}
                        `}</style>
                        <style jsx>{`
                            .lendmsg_bot{
                                padding-left:0.4rem;
                            }
                            .lendmsg_bot p{
                                font-size:0.14rem;
                                color:#222222;
								margin-top: .09rem;
								
                            }
                            .lendmsg_bot pre{
                                overflow: hidden;
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
                                overflow: hidden;
                                margin-top:0.05rem;
                            }
                            .lend_tip{
                                height:100%;
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
                            }
                            .lend_pic img{
                                width:0.6rem;
                                height:0.6rem;
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
                            }
                            .lend_time span{
                                margin-right:0.05rem;
                            }
                            #showtip{
                                display: inline-block;
                                height:0.15rem;
                                width:0.35rem;
                                border-radius:0.08rem;
                                border:1px solid #ef6d6a;
                                color:#ef6d6a;
                                line-height:0.15rem;
                                text-align: center;
                                font-size:0.1rem;
                            }
                            .help-info{
                                width: 100%;
                                height: .8rem;
                                padding: .1rem 0 0;
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
							.mask_big{
								width: 100%;
								height: 100%;
								background-color: rgba(0,0,0,1);
								position: fixed;
								top: 0;
								left: 0;
								z-index: 99;
								display: none;
							}
							.mask_big ul{
								width: 100%;
								height: 3rem;
								position: absolute;
								top: 40%;
								margin-top: -1.5rem;
							}
							.mask_big li{
								width: 100%;
								height: 100%;
								float: left;
								position: absolute;
								left: 0;
								top: 0;
							}
							.mask_big li:nth-child(n+2) {
								left: 100%
							}
							.mask_big li img{
								position: absolute;
                                top: 0;
                                left: 0;
                                bottom: 0;
                                right: 0;
                                margin: 0 auto;
							}
							
							.mask_big .carousel-div {
								position: absolute;
								bottom: 0;
								width: 100%;
								text-align: center;
							}

							.mask_big .dot {
								width: .06rem;
								height: .06rem;
								margin: .04rem;
								overflow: hidden;
								vertical-align: middle;
								background-color: #e0e0e0;
								border-radius: 100%;
								-webkit-box-shadow: 0 0 .08rem rgba(0,0,0,.4);
								box-shadow: 0 0 .08rem rgba(0,0,0,.4);
								display: inline-block;
							}

							.mask_big .curr,.mod-list {
								background-color: #fff
							}
							.img_hide{
								display: none;
							}
							.img_show{
								display: block;
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
