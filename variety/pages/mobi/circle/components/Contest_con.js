import Router from 'next/router';
import Confirm from '../../common/confirm.js';

class Contest_con extends React.Component{
    constructor(props) {
        super(props);
		this.state = {
			btnNum:1,
			confirm:{
                show:false,
				title:'',
                content:'',
				yes:''
            },
			joinpk:false
        };
        this.formattime = this.formattime.bind(this);
		this.detail = this.detail.bind(this);
		this.isOkcick = this.isOkcick.bind(this);
		this.isNot = this.isNot.bind(this);
		this.gopk = this.gopk.bind(this);
    }
    componentWillReceiveProps(){

    }
    componentDidMount(){
		
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
    detail(url,type){
		
        var t = this;
		if(this.props.isLogin){
			if(url&&type){
				if(url=='fqpk'){
					var json = {1:'现金',2:'元宝',3:'积分'};
					var str = this.props.info.reward + json[this.props.info.coinType]
					t.setState({
						btnNum:2,
						confirm:{
							show:true,
							title:'确认加入对战？',
							content:'加入对战将暂时冻结'+str+'作为对战奖金，胜利时返还，失败扣除',
							yes:'确定'
						},
						joinpk:type
					});
				}
				else{
					var json = {}
					if(type==1){
						json.varietyId = t.props.info.varietyId;
						json.battleId = t.props.info.dataId;
						json.batchCode = t.props.info.batchCode;
					}
					else{
						json.pkid = t.props.info.dataId;
					}
					Router.push({
						pathname: url,
						query: json
					})
				}

			}
			else{
				this.setState({
					btnNum:1,
					confirm:{
						show:true,
						title:'',
						content:'对战邀请已失效',
						yes:''
					},
					joinpk:false
				});
			}
		}
		else{
			this.setState({
				btnNum:1,
				confirm:{
					show:true,
					title:'',
					content:'您未登录，请重新登录',
					yes:''
				},
				joinpk:false
			});
		}
    }
	gopk(type){
		$.ajax({
			url: '/game/battle/joinBattle.do',
			type: 'post',
			data: {battleId:type,userFrom:'coterie'},
			success:function(d){
				if(d.code == 200){
					Router.push({
						pathname: '/mobi/pk/trade',
						query:{varietyId:d.data.varietyId,battleId:d.data.id,batchCode:d.data.batchCode}
					})
				}
				else if(d.code == 2201){

					t.setState({
						btnNum:2,
						confirm:{
							show:true,
							title:'加入失败',
							content:'余额不足，请兑换或选择其他赏金较低的对战',
							yes:'去充值'
						},
						joinpk:false
					});
				}
				else{
					t.setState({
						btnNum:1,
						confirm:{
							show:true,
							title:'',
							content:d.msg,
							yes:''
						},
						joinpk:false
					});
				}
			}
		});
	}
	isOkcick(){
		if(this.props.isLogin){
			if(this.state.btnNum==2){
				if(this.state.joinpk==false){
					Router.push({
					  pathname: '/mobi/bowl/bowl'
					})
				}
				else{
					var _this = this
					_this.gopk(_this.state.joinpk);
				}
			}
			this.setState({
				btnNum:1,
				confirm:{
					show:false,
					title:'',
					content:'',
					yes:''
				},
				joinpk:false
			});
			this.onoff=false;
		}
		else{
			Router.push({pathname: '/login'})
		}
		
		return false
	}
	isNot(){
		this.setState({
			btnNum:1,
			confirm:{
				show:false,
				title:'',
				content:'',
				yes:''
			},
			joinpk:false
		});
		this.onoff=false;
	}
    render(){
		var data = this.props.info;
		
		var gameType = {1:'现金',2:'元宝',3:'积分'};
		var gameTime = (data.endline/60).toFixed(0)+'分钟';
		var gameWin = data.reward + gameType[data.coinType];
		
		var yzImg = '/static/pk/futuresvs_list_join_normal@2x.png';
		
		
		var nextUrl,nextType,pkonoff,yzName;
		var btnText = '加入对战';
		
		if(data.gameStatus==0){ //对战已取消
			pkonoff = true;
			gameTime = '已取消';
		}
		else if(data.gameStatus==1){ //对战发起
			nextUrl = 'fqpk';
			nextType = data.dataId;
			pkonoff = true;
		}
		else if(data.gameStatus==2){//对战开始未结束 
			yzImg = data.againstUserPortrait?data.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png';
			nextUrl = '/mobi/pk/trade';
			nextType = 1;
			pkonoff = false;
			btnText = data.againstUserName;
			gameTime = '对战中';
		}
		else{//对战已结束
			yzImg = data.againstUserPortrait?data.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png';
			nextUrl = '/mobi/pk/pk_detailed';
			nextType = 2;
			pkonoff = false;
			btnText = data.againstUserName;
			gameTime = '已结束';
		}
		
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
			yzGold = data.againstScore==0?'0.00':'+' + (data.againstScore+0).toFixed(2);
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
		

		return(
            <div>
                <div onClick={()=>this.detail(nextUrl,nextType)} className='gp_all'>
                    <div className="text" ref='text'>
                        {data.content?data.content:'-'}
                    </div>
                    
                     
                    <div className="lendmsg_bot">
                    	
                        <div className="contestMain">
                        	<div className="contestLeft">
								<div className="contestName">{data.varietyName}</div>
								<div className="contestZt">{
										pkonoff ? 
										<img className="contestPk_img" src='/static/pk/futuresvs_list_vs@2x.png' />
										: 
										<div className="contestPk_main">
											<div className="contestPk_left" style={{width:fqWidth}}></div>
											<span className="contestPk_leftS">{fqGold}</span>
											<div className="contestPk_right" style={{width:yzWidth}}></div>
											<span className="contestPk_rightS">{yzGold}</span>
										</div>
									}</div>
								<div className="contestTime">{gameWin+' '+gameTime}</div>
                        	</div>
                        	<div className="contestUser">
                        		<img src={yzImg} />
                        		<div>{btnText}</div>
                        	</div>
                        </div>
                       
                        <div className="pl_time">{this.formattime(this.props.info.createTime)}</div>
                        
                    </div>
                </div>
                
                <Confirm type={this.state.btnNum} confirm={this.state.confirm} isOk={this.isOkcick} isNot={this.isNot} />
                
                <style jsx global>{`
                    html{-webkit-text-size-adjust:none;}
                `}</style>
                <style jsx>{`
					.gp_all{
						padding-left: 0.4rem;
						padding-bottom: 0.4rem;
					}
                    .text{
                        line-height: .2rem;
                        height: auto;
                        margin: .09rem 0;
                        text-align: justify;
						color: #222;
					    word-wrap: break-word;
                    }
					.lendmsg_bot{
						position: relative;
						
					}
					.pl_time{
						width: 50%;
						height: 0.2rem;
						color: #999;
						font-size: 0.12rem;
						position: absolute;
						bottom: -0.33rem;
						left: 0;
					}
					.contestMain{
						width: 100%;
						height: 0.9rem;
						background: #564f68;
						display: flex;
					}
					.contestLeft{
						flex: 3;
						text-align: center;
					}
					.contestName{
						line-height: 0.3rem;
						margin-top: 0.1rem;
						color: #FFF;
					}
					.contestTime{
						margin-top: 0.06rem;
						font-size: 0.1rem;
						color: #9c9c9c;
					}
					.contestZt{
						width: 80%;
						height: 0.16rem;
						margin: 0 auto;
						background: #645c78;
						border-radius: 0.08rem;
						overflow: hidden;
						position: relative;
					}
					.contestPk_img{
						height: 100%;
					}
					.contestPk_main{
						width: 100%;
						height: 100%;
						overflow: hidden;
						color: #fff;
						font-size: 0.1rem;
						line-height: 0.16rem;
					}
					.contestPk_left{
						width: 30%;
						height: 100%;
						float: left;
						background: #f3b071;
					}
					.contestPk_leftS{
						position: absolute;
						left: 0.07rem;
					}
					.contestPk_right{
						width: 70%;
						height: 100%;
						float: left;
						background: #ef6d6a;
					}
					.contestPk_rightS{
						position: absolute;
						right: 0.07rem;
					}
					.contestUser{
						flex: 1;
						margin-right: 0.15rem;
						text-align: center;
					}
					.contestUser img{
						width: 0.33rem;
						height: 0.33rem;
						display: block;
						margin: 0 auto;
						margin-top: 0.15rem;
						border-radius: 50%;
					}
					.contestUser div{
						color: #fff;
						margin-top: 0.05rem;
					}
                `}</style>
            </div>
        )
    }
}
export default Contest_con;
