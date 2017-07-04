import React from 'react'
import Link from 'next/link'
import Router from 'next/router';
import AllhistoryStyle from './pk_historycss.js';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Text_none from '../common/text_none.js';
import Confirm from '../common/confirm.js';

import InfiniteScroll from 'react-infinite-scroll-component';

class Process extends React.Component{
    constructor(props){
        super(props)
		this.formattime = this.formattime.bind(this);
    }
	componentDidUpdate(){
		$(this.refs.scrollDiv).scrollTop( $(this.refs.scrollDiv)[0].scrollHeight );
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
		var sec=new Date(n).getSeconds()<10?"0"+new Date(n).getSeconds():new Date(n).getSeconds();
		
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
					t = hour+':'+min+':'+sec;
				}
				else{
					var f = nowDay-day;
					t = f == 1?'昨日'+hour+':'+min+':'+sec : mon+'/'+day+' '+hour+':'+min+':'+sec;
				}
			}
			else{
				t = mon+'/'+day+' '+hour+':'+min+':'+sec;
			}
		}
		else{
			t=  year+'/'+mon+'/'+day+' '+hour+':'+min+':'+sec;
		}
		return t

	}
    render(){
		
		var data = this.props.data;
		var ulHeight = (this.props.data.length * 0.5)+'rem';
		var fqId = this.props.fqId;
		
        return(<div className='pro'>
            <div className="processDiv" ref="scrollDiv">
            	<ul className="process" style={{height:ulHeight}}>
					{
						data.map((e,i) => {
							//var liBottom = (i*0.5)+'rem';
							var jsonBuy = {1:'买多建仓',2:'卖空建仓',3:'买多平仓',4:'卖空平仓'};
							var liClass = e.userId == fqId ? 'pro_left' : 'pro_right';
							return(<li key={i} className={liClass}>
									<span>{e.optPrice+jsonBuy[e.optStatus]}</span>
									<em>{this.formattime(e.optTime)}</em>
								</li>)
						})
					}
				</ul>
            </div>
            <div className='pro_line'></div>
        </div>)
    }
}
class Pkinfo extends React.Component{
    constructor(props){
        super(props)
		this.state = {
			confirm:{
                show:false,
                content:'',
            }
        }
		this.toUserDetail = this.toUserDetail.bind(this);
    }
	toUserDetail(d){
		var userId = d;
		$.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    Router.push({
						pathname:'/mobi/user/circle_user/userInfo',
						query:{id:userId}
					})
                }
				else{
					this.setState({
						confirm:{
							show:true,
							content:d.msg
						}
					});
				}
                
            }.bind(this)
        });
        
    }
    render(){
		var data = this.props.data;
		var fqImg = data.launchUserPortrait ? data.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : '/static/circle/headportrait64x64@3x.png';
		var yzImg = data.againstUserPortrait ? data.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : '/static/circle/headportrait64x64@3x.png';
		
		var pkjson = {1:'现金',2:'元宝',3:'积分'};
		
		var fqGold,yzGold,fqWidth,yzWidth;
		
		if( (data.launchScore<0)&&(data.againstScore<0) ){// 得分都小于零
			fqGold = (data.launchScore+0).toFixed(2);
			yzGold = (data.againstScore+0).toFixed(2);
			
			var allGold = data.launchScore + data.againstScore;
			fqWidth = ((data.againstScore/allGold)*100).toFixed(0)+'%';
			yzWidth = ((data.launchScore/allGold)*100).toFixed(0)+'%';
			
		}
		else if(data.launchScore<0){//发起者用户得分 小于零
			fqGold = (data.launchScore+0).toFixed(2);
			yzGold = data.againstScore==0 ? '0.00' : '+' + (data.againstScore+0).toFixed(2);
			fqWidth = '0%';
			yzWidth = '100%';
		}
		else if(data.againstScore<0){//应战者用户得分 小于零
			fqGold = data.launchScore==0?'0.00':'+' + (data.launchScore+0).toFixed(2);
			yzGold = (data.againstScore+0).toFixed(2);
			fqWidth = '100%';
			yzWidth = '0%';
		}
		else{//得分都大于零 
			fqGold = data.launchScore==0?'0.00':'+' + (data.launchScore+0).toFixed(2);
			yzGold = data.againstScore==0?'0.00':'+' + (data.againstScore+0).toFixed(2);
			
			var allGold = data.launchScore + data.againstScore;
			if(allGold == 0){
				fqWidth = '50%';
				yzWidth = '50%';
			}
			else{
				fqWidth = ((data.launchScore/allGold)*100).toFixed(0)+'%';
				yzWidth = ((data.againstScore/allGold)*100).toFixed(0)+'%';
			}
			
			
		}
		fqGold = fqGold ? fqGold : '0.00';
		yzGold = yzGold ? yzGold : '0.00';
		fqWidth = fqWidth ? fqWidth : '50%';
		yzWidth = yzWidth ? yzWidth : '50%';
		
        return(<div>
            <div className='pk_item'>
                <div className="pk_mid">
                    <div className='range'>
                        <span className="range_left" style={{width:fqWidth}}></span>
                        <span className="range_right" style={{width:yzWidth}}></span>
                        <span className="gold_left">{fqGold}</span>
                        <span className="gold_right">{yzGold}</span>
                    </div>
                    <p>{data.reward+pkjson[data.coinType]+' 已结束'}</p>
                    <p><span>{data.launchPraise?data.launchPraise:0}赞</span><span>{data.againstPraise?data.againstPraise:0}赞</span></p>
                </div>
                <div className="pk_left" onClick={()=>{this.toUserDetail(data.launchUser)}}>
                    <img src={fqImg} />
                    <img src='/static/pk/futuresvs_list_ko@2x.png' style={{display:data.winResult==2?'block':'none'}} className="img_ko" />
                    <p>{data.launchUserName}</p>
                </div>
                <div className="pk_right" onClick={()=>{this.toUserDetail(data.againstUser)}}>
                    <img src={yzImg} />
                    
                    <img src='/static/pk/futuresvs_list_ko@2x.png' style={{display:data.winResult==1?'block':'none'}} className="img_ko" />
                    <p>{data.againstUserName}</p>
                </div>
            </div>
            <Confirm type='1' confirm={this.state.confirm} isOk={ ()=>Router.push({pathname: '/login'}) }/>
        </div>)
    }
}

export default  class extends React.Component {
	constructor(props){
        super(props)
		this.state={
            bottomData:[],
			topData:[]
        };
    }
	componentDidMount(){
		var _this = this
		var roomCode = _this.props.url.query.pkid;
		
		$.ajax({
            type:'get',
            url:'/game/battle/findBattle.do',
            data:{ battleId:roomCode},
            dataType:'json',
            success:function(d){
                if(d.code==200){
					_this.setState({
						bottomData:d.data
					});
                }
                
            }
        });
		
		$.ajax({
            type:'get',
            url:'/game/battleorder/optLog.do',
            data:{ battleId:roomCode},
            dataType:'json',
            success:function(d){
                if(d.code==200){
					_this.setState({
						topData:d.data
					});
                }
                
            }
        });
		
	}
	render() {
		return <div>
			<Header_title text="对战详情"/>
			<div><Header text="对战详情" /></div>
			<AllhistoryStyle />
			<Process data={this.state.topData} fqId={this.state.bottomData.launchUser} />	
			<div className='pk_bottom'>
				<Pkinfo data={this.state.bottomData} />
			</div>
		</div>
	}
}
