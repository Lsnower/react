/*
* @Author: Maolin
* @Date:   2017-04-18 10:29:35
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-24 19:17:48
*/
import Router from 'next/router';
import Confirm from '../../common/confirm.js';

class ContestUserInfo extends React.Component{
    constructor(props) {
        super(props);
		this.state = {
			time:null,
			btnNum:1,
			confirm:{
                show:false,
				title:'',
                content:'',
				yes:''
            },
			joinpk:false
        };
		this.onoff=true;
        this.handler = this.handler.bind(this);
		this.detail = this.detail.bind(this);
		this.isOkcick = this.isOkcick.bind(this);
		this.gopk = this.gopk.bind(this);
		this.isOkcick = this.isOkcick.bind(this);
		this.isNotcick = this.isNotcick.bind(this);
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
    
    handler(e){
		e.stopPropagation();
		if(this.props.isLogin){
            Router.push({
              pathname: '/mobi/user/circle_user/userInfo',
              query: { id: this.props.user.userId }
            })
        }else{
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
	detail(url,type){
		
		if(this.props.isLogin){
			
			var t = this;
			if(url&&type){
				if(url=='fqpk'){
					var json = {1:'现金',2:'元宝',3:'积分'};
					var str = this.props.user.reward + json[this.props.user.coinType]
					if(t.onoff){
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
					t.onoff = true;
				}
				else{
					var json = {}
					if(type==1){
						json.varietyId = t.props.user.varietyId;
						json.battleId = t.props.user.dataId;
						json.batchCode = t.props.user.batchCode;
					}
					else{
						json.pkid = t.props.user.dataId;
					}
					Router.push({
						pathname: url,
						query: json
					})
				}
				
			}
			else{
				if(this.onoff){
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
				this.onoff = true;
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
		var t = this;
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
					if(t.onoff){
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
					t.onoff = true;
				}
				else{
					if(t.onoff){
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
					t.onoff = true;
				}
			}
		});
	}
	isNotcick(){
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
    render(){
		var data = this.props.user;
		var nextUrl,nextType;
		
		if(data.gameStatus==0){ //对战已取消
			nextUrl = null;
			nextType = null;
		}
		else if(data.gameStatus==1){ //对战发起
			nextUrl = 'fqpk';
			nextType = data.dataId;
		}
		else if(data.gameStatus==2){//对战开始未结束 
			nextUrl = '/mobi/pk/trade';
			nextType = 1;
		}
		else{//对战已结束
			nextUrl = '/mobi/pk/pk_detailed';
			nextType = 2;
		}
		return(
            <div>
                <div className="info" onClick={()=>this.detail(nextUrl,nextType)}>
                   <img className="img left clearfix" src={data.userPortrait?data.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} onClick={this.handler}/>
                    <p  onClick={this.handler}>
                        <span className="name">{data.userName}</span>
                        <em className="flag">{data.isAttention == 2?'已关注':''}</em>
                        
                    </p>
                    <Confirm type={this.state.btnNum} confirm={this.state.confirm} isOk={this.isOkcick} isNot={this.isNotcick} />
                </div>
                <style jsx>{`
                    .info {
                        position: relative;
                        height: .33rem;
                        line-height: .33rem;
                    }
                    .info p {
                        display: inline-block;
                    }
                    .img {
                        display: inline-block;
                        width: .33rem;
                        height: .33rem;
                        border-radius: 50%;
                        margin-right: .09rem;
                    }
                    .name {
                        font-size: .16rem;
                        color: #222222;
                        margin-right: .05rem;
                    }
                    .flag {
                        font-size: .12rem;
                        color: #b6b6b6;
                    }
                    .time {
                        position: absolute;
                        right: 0;
                    }
                `}</style>
            </div>
        )
    }
}

export default ContestUserInfo;
