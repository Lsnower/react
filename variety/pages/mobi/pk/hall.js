import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import Confirm from '../common/confirm.js';
export default  class Pk extends React.Component{
    constructor(props){
        super(props);
        this.websocket = null;
        this.socket = this.socket.bind(this);
        this.getPkList=this.getPkList.bind(this);
        this.userBatte = this.userBatte.bind(this);
        this.toMatch = this.toMatch.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.addPK = this.addPK.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.state={
            list:[],
            end:0,
            userBatte:null,
            userInfo:{},
            lookingfor:'none',
            tipasy:false,
            confirm:{
                show:false,
                content:''
            },
            tx:'/static/circle/headportrait64x64@3x.png',
            _height:667
           
        }
        this._location='',this.battleIds={},this.isLogin=false;
        this.rule = this.rule.bind(this);
        this.close = this.close.bind(this);
        this.hideLook=this.hideLook.bind(this);
        this.updateRoom=this.updateRoom.bind(this);
        this.upadte=true;
    }
    componentDidMount(){
		this.socket();
        this.getPkList();
        this.userBatte();
        this.getUserInfo();
        this.updateRoom();
        this.setState({
            tx:localStorage.getItem('userPortrait')?localStorage.getItem('userPortrait')+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png',
            _height:window.screen.height-50
        })
		var _this = this;
		$.ajax({
            type:'get',
            url:'/user/article/articleDetail.do',
            data:{id:5},
            dataType:'json',
            success:function(e){
                if(e.code == 200){
                    $(_this.refs.tipcontent).html(e.data.content);
                }
            }
        })
    }
    getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
    }
    socket(){
        var _this = this,
            _host = window.location.host,
            wsip = 'ws://'+_host+'/game/ws.do';
        _this.websocket = new WebSocket(wsip);
        _this.websocket.onopen = function(evnt) {
            console.log("链接服务器成功!");
            var t1 = _this.getCookie('token1'),
                t2 = _this.getCookie('token2');
            if(t1&&t2){
                var a = {
                    code: 1100,
                    uuid:'reg'+new Date().getTime(),
                    timestamp:new Date().getTime(),
                    content:{
                        token1:t1,
                        token2:t2,
                        host:window.location.host
                    }
                };
                a = JSON.stringify(a);
                _this.websocket.send(a);
            }
            

        };

        _this.websocket.onmessage = function(evnt) {
            var m = JSON.parse(evnt.data),
                uuid = m.uuid.replace(/\d+/g,'');
                if(m.code==2000){
                    var a = {
                        code: 1000
                    };
                    a = JSON.stringify(a);
                    _this.websocket.send(a);
                    return false;
                }
                if(m.code<3000){
                    switch(uuid){
                        case 'match':
                            if(m.content.code==200){
                                 _this.setState({
                                    lookingfor:'block'
                                })
                            }
                           
                        break;
                        case 'matchCancel':
                            if(m.content.code==200){
                                 _this.setState({
                                    lookingfor:'none'
                                })
                            }
                        break;
                        case 'updateRoom':
                            if(m.content.code==200){
                                 var d = m.content.data,
                                    l = _this.state.list;
                                for(var i=0;i<d.length;i++){
                                    var _id = d[i].id;
                                    for(var j=0;j<l.length;j++){
                                        if(_id==l[j].id){
                                            Object.assign(l[j],d[i]);
                                        }
                                    }
                                }
                                _this.setState({
                                    list:l
                                })
                            }
                           
                        break;
                        case 'joinBattle':
                            if(m.content.code==200){
                                var i = m.uuid.split('&');
                                Router.push({
                                  pathname: '/mobi/pk/trade',
                                  query:_this.room
                                })
                            }else{
                                if(m.content.code==2201){
                                    _this.setState({
                                        confirm:{
                                            type:2,
                                            show:true,
                                            yes:'去充值',
                                            title:'加入失败',
                                            content:'余额不足,请兑换或选择赏金较低的对战',
                                            isOk:function(){
                                               _this.toRecharge();
                                               _this.setState({
                                                    confirm:{
                                                        show:false
                                                    }
                                                   
                                                })
                                            },
                                            isNot:function(){
                                                _this.setState({
                                                    confirm:{
                                                        show:false
                                                    }
                                                   
                                                })
                                            }
                                        }
                                    })
                                }else{
                                    _this.setState({
                                        confirm:{
                                            type:1,
                                            show:true,
                                            title:'加入失败',
                                            content:m.content.msg,
                                            isOk:function(){
                                                _this.setState({
                                                    confirm:{
                                                        show:false
                                                    }
                                                   
                                                })
                                            }
                                        }
                                    })
                                }
                                
                            }
                        break;
                    }
                }else if(m.code==3000){
                    var _type = m.content.type;
                    switch(_type){
                        case 31:
                        var d = m.content.data;
                             _this.setState({
                                lookingfor:'none',
                                confirm:{
                                    type:2,
                                    show:true,
                                    yes:'加入对战',
                                    no:'继续匹配',
                                    title:'匹配成功',
                                    content:'对战品种:'+d.varietyName+';对战时长:'+(d.endline/60)+'分钟;对战赏金:'+d.reward+(d.coinType==2?'元宝':'积分')+'(加入对战后，赏金将会暂时冻结，对战胜利后返还，失败扣除)',
                                    isOk:function(){
                                         _this.setState({
                                            confirm:{
                                                show:false
                                            }
                                           
                                        })
                                        _this.addPK(d.id,d.batchCode,d.varietyId);
                                    },
                                    isNot:function(){
                                         _this.setState({
                                            confirm:{
                                                show:false
                                            }
                                           
                                        })
                                        _this.toMatch(2,d.id)
                                    }
                                }
                            })
                        break;
                        case 33:
                        case 32:
                            _this.setState({
                                lookingfor:'none',
                                confirm:{
                                    type:2,
                                    show:true,
                                    yes:'继续匹配',
                                    no:'稍后重试',
                                    title:'匹配失败',
                                    content:'匹配超时,请重新匹配或稍后重试',
                                    isOk:function(){
                                         _this.setState({
                                            confirm:{
                                                show:false
                                            }
                                           
                                        })
                                        _this.toMatch()
                                    },
                                    isNot:function(){
                                        _this.setState({
                                            confirm:{
                                                show:false
                                            }
                                           
                                        })
                                    }
                                }
                            })

                        break;
                    }
                }
                
        };
    }

    checkLogin(callback){
        var _this = this;
        if(!_this.isLogin){
            _this.setState({
                confirm:{
                    type:2,
                    show:true,
                    content:'您还没登录,请重新登录',
                    isOk:function(){
                        Router.push({pathname:'/login'})
                    },
                    isNot:function(){
                        _this.setState({
                            confirm:{
                                show:false
                            }
                        })
                    }
                }
            })
        }else{
            callback();
        }
    }
    beforeMatch(){
        var _this = this;
        _this.checkLogin(function(){
            _this.setState({
                confirm:{
                    type:2,
                    show:true,
                    title:'确认匹配对战？',
                    content:'匹配对战将随机选择赏金在余额范围内的对局',
                    isOk:function(){
                         _this.setState({
                            confirm:{
                                show:false
                            }
                           
                        })
                        _this.toMatch()
                    },
                    isNot:function(){
                         _this.setState({
                            confirm:{
                                show:false
                            }
                           
                        })
                    }
                }
            })
        })  
    }
    toMatch(t,r){
        var _this = this;
        var _uuid = 'match'+new Date().getTime(),
        a = {
            code: 1200,
            uuid:_uuid,
            content:{cmd:'/game/battle/quickSearchForAgainst.do',parameters:{type:t||1,refuseIds:r}}
        };
        a = JSON.stringify(a);
        _this.websocket.send(a); 
           
    }
    create(){
         var _this = this;
        _this.checkLogin(function(){
             Router.push({
                pathname:'/mobi/pk/create'
             })
        })
    }
     beforeHideLook(){
        var _this = this;
        _this.setState({
            lookingfor:'none',
            confirm:{
                type:2,
                show:true,
                title:'取消匹配',
                content:'对手正在来的路上，是否要取消匹配？',
                yes:'不等了',
                no:'继续匹配',
                isOk:function(){
                     _this.setState({
                        confirm:{
                            show:false
                        }
                       
                    })
                    _this.hideLook()
                },
                isNot:function(){

                     _this.setState({
                         lookingfor:'block',
                        confirm:{
                            show:false
                        }
                       
                    })
                }
            }
        })
    }
    hideLook(){
         var _this = this;
        _this.checkLogin(function(){
             var _uuid = 'matchCancel'+new Date().getTime(),
                a = {
                    code: 1200,
                    uuid:_uuid,
                    content:{cmd:'/game/battle/quickSearchForAgainst.do',parameters:{type:0}}
                };
                a = JSON.stringify(a);
                _this.websocket.send(a); 
        })
         this.setState({
            lookingfor:'none'
        })
    }
    addPK(id,code,vid){
        var _this = this;
        _this.checkLogin(function(){
            var _uuid = 'joinBattle'+new Date().getTime(),
                a = {
                    code: 1200,
                    uuid:_uuid,
                    content:{cmd:'/game/battle/joinBattle.do',parameters:{battleId:id,userFrom:'hall'}}
                };
                _this.room={varietyId:vid,battleId:id,batchCode:code},
                a = JSON.stringify(a);
                _this.websocket.send(a); 
        });
           
    }
    userBatte(){
        var that = this;
        $.ajax({
            type:'get',
            url:'/game/battle/userBattle.do',
            data:{},
            dataType:'json',
            success:function(e){
                if(e.code == 200){
                    that.setState({
                        userBatte:e.data
                    })
                }
            }
        })
    }
    updateRoom(){
        var that = this;
        if(this.upadte){
            var upadte=function(){
                var _uuid = 'updateRoom'+new Date().getTime(),
                ids = Object.keys(that.battleIds).join(','),
                a = {
                    code: 1200,
                    uuid:_uuid,
                    content:{cmd:'/game/battle/selectBattleGamingData.do',parameters:{battleIds:ids}}
                };
                a = JSON.stringify(a);
                that.websocket.send(a); 
                that.updateRoom();
                
            }
            setTimeout(function(){
                upadte();
            },5000);
        
        }
        
    }
    getPkList(){
        var that = this;
        $.ajax({
            type:'get',
            url:'/game/battle/selectBattleGaming.do',
            data:{pageSize:15,location:that._location},
            dataType:'json',
            success:function(e){
                if(e.code == 200){
                    that.setState({
                        end:e.data.end,
                        list:that.state.list.concat(e.data.list)
                    })
                }
            }
        })
    }
    getUserInfo(){
        var _this = this;
           $.ajax({
            type:'get',
            url:'/user/userAccount/userAccountInfo.do',
            data:{},
            dataType:'json',
            success:function(e){
                if(e.code == 200){
                    _this.setState({
                        userInfo:e.data
                    });
                    _this.isLogin = true;
                }
                if(e.code==503){
                    _this.isLogin = false;
                }
            }
        })
    }
    toRecharge(){
        this.checkLogin(function(){
            Router.push({
                pathname:'/mobi/bowl/bowl'
            })
        });
    }
    componentWillUnmount(){
        this.websocket.close();
         this.upadte=false;
    }

    rule(){
		
        this.setState({
            tipasy:true
        })
    }
	close(){
		this.setState({
            tipasy:false
        })
	}
    toMore(){
        Router.push({
            pathname:'/mobi/pk/pk_history_all'
        })
    }
    myResult(){
        this.checkLogin(function(){
            Router.push({
                pathname:'/mobi/pk/pk_history'
            })
        })
    }
    render(){
        {var btns = this.state.userBatte? <One battle={this.state.userBatte}/>:<Two callback={this.beforeMatch.bind(this)} create={this.create.bind(this)}/> }
		var a = this.state.tipasy ? 'tipmodel' : 'tipshow';
		
		var point = this.state.userInfo.credit?this.state.userInfo.credit:0;
		var treasure = this.state.userInfo.yuanbao?this.state.userInfo.yuanbao:0;
		
		if(point>10000){
			var num = point/10000;
			var num1 = num.toFixed(1);
			var num2 = num.toFixed(2);
			point = num2.substring(0,num2.lastIndexOf('.')+2)+'万';
		}
		
		if(treasure>10000){
			var num = treasure/10000;
			var num1 = num.toFixed(1);
			var num2 = num.toFixed(2);
			treasure = num2.substring(0,num2.lastIndexOf('.')+2)+'万';
		}
		
        return(<div>
            <Header_title text='期货PK'/>
            <Head path="/index" text="期货对战" />
            <InfiniteScroll next={this.getPkList} height={this.state._height} hasMore={!this.state.end} loader={ <span className='more' onClick={this.toMore.bind(this)}>历史对战&gt;</span>} endMessage={<span onClick={this.toMore.bind(this)} className='more'>历史对战&gt;</span>}>

            <div className='pk_main'>

                <div className='pk_user'>
                    <img src={this.state.tx} />
                    <span className='point'>{point}</span>
                    <span className='treasure'>{treasure}个</span>
                    <span className="recharge" onClick={this.toRecharge.bind(this)}>充值</span>
                </div> 
                <div className="pk_logo">
                    <img src='/static/pk/futuresvs_banner.gif' />
                    <p><a className='pk_result' onClick={this.myResult.bind(this)}>查看战绩</a><a className='pk_rule' onClick={this.rule}>决斗规则&gt;</a></p>
                </div>
                <div className='pk_list'>
                    {
                        this.state.list.map((e,i)=>{
                            this._location = e.createTime;
                            if(e.gameStatus!=3){
                                this.battleIds[e.id]=e;
                            }
                            return <Item key={i} game={e} addPK={this.addPK} callLogin={this.checkLogin} userBatte={this.state.userBatte}/>
                        })
                    }
                </div>
                
                
            </div>
            </InfiniteScroll>
            <div className='pk_buttons'>
                   {btns}
                </div>
            <Confirm  confirm={this.state.confirm}  />
            <section style={{display:this.state.lookingfor}}>
                <div className="lookingfor msgbox" >
                    <div className="content">
                        <div className="main">
                            <div className="title">正在匹配</div>
                            <div className="sub-title"><img src='/static/pk/futuresvs_lookingfor@2x.gif' /></div>
                        </div>
                        <div className="action clearfix">
                            <div onClick={this.beforeHideLook.bind(this)} className="btn btn-right">取消匹配</div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='pk_buttons'>
                {btns}
            </div>
            <div className={a}>
				<div className="tipmain">
					<div className='tiptitle'>
						决斗规则
						<img onClick={this.close} className="tipclose" src="/static/wallet/popup_delete@2x.png"/>
					</div>
					<div className="tipcontent" ref="tipcontent">
					
					</div>
				</div>    
			</div>
           <style>{`
            .pk_main{
                background:url(/static/pk/futures_versus_bannerbg@2x.png) no-repeat;
                width:100%;
                min-height:5.2rem;
                background-size: cover;
                padding-top:.15rem;
                padding-bottom:1rem;
            }
            .pk_list {
            }
            .pk_user{
                margin:0 .1rem;
                height:.32rem;
                border-radius:.16rem;
                background:rgba(255,255,255,0.1);
                font-size:.12rem;
            }
            .pk_user img{
                display:inline-block;
                height:.32rem;
                width:.32rem;
                border-radius:.16rem;
                vertical-align: middle;
            }
            .pk_user span{
                color:#fff;
                display:inline-block;
                line-height:.32rem;
                margin-left:.05rem;
                padding-left:.25rem;
            }
            .pk_user span.point{
                background:url(/static/pk/futuresvs_list_integral@2x.png) .02rem .06rem  no-repeat;
                background-size:.2rem;
            }
            .pk_user span.treasure{
                background:url(/static/pk/futuresvs_list_wing@2x.png) .02rem .05rem  no-repeat;
                background-size:.2rem;
            }
            .pk_user span.recharge{
                float:right;
                padding-right:.1rem;
                background:url(/static/pk/futuresvs_list_topup@2x.png) .06rem .09rem  no-repeat;
                background-size:.12rem;
            }
            .pk_logo{
                position:relative;
            }
             .pk_logo img{
                display:block;
                width:100%;
                height:100%;
             }
             .pk_logo p{
                position:absolute;
                color:#fff;
                bottom:.1rem;
                left:50%;
                font-size:.12rem;
                margin-left:-.67rem;
             }
             .pk_result{
                display:inline-block;
                background:#878787;
                height:.16rem;
                line-height:.16rem;
                text-align:center;
                border-radius:.07rem;
                padding:0 .05rem;
                margin-right:.15rem;
             }
             .pk_rule{
                color:#999;
             }
             .pk_item{
                background:#564f68;
                box-shadow:0 .02rem .04rem 0 #251943;
                height:.8rem;
                margin-bottom:.2rem;
                position:relative;
             }
             .pk_left{
                width:.9rem;
                float:left;
                height:.8rem;
                margin-left:-100%;
                 padding:0 .15rem;
             }
             .pk_right{
                width:.9rem;
                float:left;
                height:.8rem;
                margin-left:-.9rem;
                padding:0 .15rem;
             }
             .pk_mid{
                float:left;
                width:100%;
                height:.8rem;
                padding: 0  .9rem;
             }
             .pk_left,.pk_right{
                margin-top:-.1rem;

             }
             .pk_left img,.pk_right img{
                width:.6rem;
                height: .6rem;
                display:block;
                border-radius:.3rem;

             }
             .pk_left p,.pk_right p{
                width:.6rem;
                color:#fff;
                text-align:center;
                font-size:.12rem;
                line-height:.3rem;
                text-overflow:ellipsis;
                overflow:hidden; 
                height:.3rem;
                white-space: nowrap;
             }
             .pk_mid p{
                width:100%;
                color:#fff;
                text-align:center;
                line-height:.3rem;
                font-size:.12rem;

             }
             .pk_mid p:last-child{
                color:#9c9c9c;
             }
             .pk_mid .range{
                width:100%;
                height:.14rem;
                border-radius:.07rem;
                background:#645c78;
                position:relative;
                overflow:hidden;

             }
             .pk_mid .range .range_left{
                float:left;
                height:.14rem;
                background:#f3b071;
                border-radius:.07rem 0 0 .07rem ;
                color:#fff;
                font-size:.12rem;
                line-height:.14rem;
             }
             .pk_mid .range .range_right{
                float:right;
                height:.14rem;
                background:#ef6d6a;
                border-radius:0 .07rem  .07rem 0;
                color:#fff;
                font-size:.12rem;
                line-height:.14rem;
                text-align:right;
             }
             .pk_mid .range span em{
                position:absolute;
                top:0;
                z-index:19;
             }
             .pk_mid .range span.range_left em{
                left:.05rem;
             }
             .pk_mid .range span.range_right em{
                right:.05rem;
            }
             img.ko{
                position: absolute;
                top: -.1rem;
             }
             .pk_buttons{
                width:3rem;
                position:fixed;
                left:50%;
                margin-left:-1.5rem;
                bottom:.1rem;
                z-index:20;
             }
             .infinite-scroll-component{
                margin-top:-.1rem;
             }
             span.more{
                color:#fff;
                margin: 0 auto;
                display: block;
                text-align:center;
                margin-top:-1.1rem;
             }
             .lookingfor{
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    z-index: 99;
                    background-color: rgba(0,0,0,.4);
                    -webkit-transform: translateZ(0);
                    transform: translateZ(0);
                }
                .lookingfor .main{
                    padding: .15rem .18rem .25rem;
                }
                .lookingfor .main .title{
                    text-align: center;
                    font-size; .14rem;
                    color: #0c0f16;
                    line-height: .24rem;
                }
                .lookingfor .main .sub-title{
                    text-align: left;
                    font-size: .12rem;
                    color: #7a7b7f;
                    padding-top: .16rem;
                    line-height: .18rem;
                    text-align:center;
                }
                .lookingfor .main .sub-title img{
                    display:block;
                    width:80%;
                    margin:0 auto;
                }
                .lookingfor .btn{
                    margin:0;
                    height:.45rem;
                    line-height:.45rem;
                    color:#222;
                    background:#f5f5f5;
                }
			.tipmodel{
				height:100%;
				width:100%;
				background:rgba(0,0,0,0.40);
				position: fixed;
				top:0;
				z-index: 20;
			}
			.tipshow{
				display: none;
			}
			.tipmain{
				position: absolute;
				top: 32%;
				left: 50%;
				margin-left: -1.25rem;
				padding-bottom: 0.1rem;
				width:2.5rem;
				background: #fff;
				padding-top:0.2rem;
			}
			.tiptitle{
				height:0.2rem;
				line-height:0.2rem;
				text-align: center;
				font-size:0.16rem;
				color:#222222;
				position: relative;
			}
			.tipcontent{
				width:90%;
				margin: 0 auto;
				margin-top: 0.1rem;
			}
			.tipcontent p{
				width:100%;
				font-size:0.12rem;
				color:#222222;
				line-height: 0.2rem;
			}
			.tipclose{
				position: absolute;
				top: -0.8rem;
				right: 0;
				width: 0.3rem;
			}
            `}</style>
        </div>)
     }
}
class Item extends React.Component{
     constructor(props){
        super(props);
        this.toDetail=this.toDetail.bind(this);
        this.toAddPk=this.toAddPk.bind(this);
        this.toGz = this.toGz.bind(this);
        this.addPK = this.addPK.bind(this);
        this.state={
            confirm:{
                show:false,
                content:''
            }
        }
    }
    toDetail(e){
        Router.push({
            pathname:'/mobi/pk/pk_detailed',
            query:{pkid:e}
        })
    }
    addPK(){
		console.log(121)
        var _this = this,game = _this.props.game,mypk = _this.props.userBatte;
        if(mypk){
            _this.setState({
                confirm:{
                    show:true,
                    type:2,
                    title:'加入失败',
                    yes:'前往对战',
                    content:'已存在进行中的对战,对战结束后可加入新的游戏',
                    isOk:function(){
                        Router.push({
                            pathname: '/mobi/pk/trade',
                            query:{varietyId:mypk.varietyId,battleId:mypk.id,batchCode:mypk.batchCode}
                        })
                        _this.setState({
                            confirm:{
                                show:false,
                            }
                        })
                    },
                    isNot:function(){
                        _this.setState({
                            confirm:{
                                show:false,
                            }
                        })
                    }
                }
            })
        }else{
            var s={2:'元宝',3:'积分'}
            _this.setState({
                confirm:{
                    show:true,
                    type:2,
                    title:'确认加入对战?',
                    content:'加入对战将暂时冻结'+game.reward+s[game.coinType]+'作为对战奖金，胜利时返还，失败扣除',
                    isOk:function(){
                       _this.toAddPk(game.id,game.batchCode,game.varietyId)
                    },
                    isNot:function(){
                         _this.setState({
                            confirm:{
                                show:false,
                            }
                        })
                    }
                }
            })
        }
        
    }
    toAddPk(id,code,vid){
        this.props.addPK(id,code,vid);
        this.setState({
            confirm:{
                show:false,
                content:''
            }
        })
    }
    toGz(id,code,vid){
        this.props.callLogin(function(){
            Router.push({
                pathname:'/mobi/pk/trade',
                query:{varietyId:vid,battleId:id,batchCode:code}
            })
        })
    }
    render(){
        var game = this.props.game,coinType={2:'元宝',3:'积分'},
            l = parseInt(game.launchScore)/(parseInt(game.launchScore)+parseInt(game.againstScore)),
            r=1-l>1?1:1-l;
            if((game.launchScore ===0 && game.againstScore === 0)||(!game.launchScore&&!game.againstScore)){l=0.5,r=0.5};
            (game.launchScore<0&&game.againstScore<0)&&(l=r,r=1-l);
            (game.launchScore>=0&&game.againstScore<0)&&(l=1,r=0);
            (game.launchScore<0&&game.againstScore>=0)&&(l=0,r=1);
        if(game.gameStatus == 1){
            return (<div className='pk_item'>
                <div className="pk_mid" onClick={()=>{this.addPK()}}>
                    <p>{game.varietyName}</p>
                    <div className='range'>
                        <span className="range_left" style={{paddingLeft:'0'}}></span>
                        <span className="range_right" style={{paddingRight:'0'}}></span>
                    </div>
                    <p>{game.reward+coinType[game.coinType]+'   '+(game.endline/60).toFixed(0)+'分钟'}</p>
                </div>
                <div className="pk_left" onClick={()=>{this.addPK()}}>
                    <img src={game.launchUserPortrait?game.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.launchUserName}</p>
                </div>
                <div className="pk_right" onClick={()=>{this.addPK()}}>
                    <img src='/static/pk/futuresvs_list_join_normal@2x.png' />
                    <p>加入对战</p>
                </div>
                <Confirm confirm={this.state.confirm}  />

            </div>)
        }else if(game.gameStatus==2){
            return(<div className='pk_item' onClick={()=>{this.toGz(game.id,game.batchCode,game.varietyId)}}>
                <div className="pk_mid">
                    <p>{game.varietyName}</p>
                    <div className='range'>
                        <span className="range_left" style={{width:l*100+'%'}}><em>{(game.launchScore>=0?'+':'')+(game.launchScore.toFixed(2)||'0.00')}</em></span>
                        <span className="range_right" style={{width:r*100+'%'}}><em>{(game.againstScore>=0?'+':'')+(game.againstScore.toFixed(2)||'0.00')}</em></span>
                    </div>
                        <p>{game.reward+coinType[game.coinType]+'   '+'对战中'}</p>
                </div>
                <div className="pk_left">
                    <img src={game.launchUserPortrait?game.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.launchUserName}</p>
                </div>
                <div className="pk_right">
                     <img src={game.againstUserPortrait?game.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.againstUserName}</p>
                </div>
            </div>)
        }else if(game.gameStatus==3){
            return(<div className='pk_item' onClick={()=>this.toDetail(game.id)}>
                <div className="pk_mid">
                    <p>{game.varietyName}</p>
                    <div className='range'>
                        <span className="range_left" style={{width:l*100+'%'}}><em>{(game.launchScore>0?'+':'')+game.launchScore.toFixed(2)}</em></span>
                        <span className="range_right" style={{width:r*100+'%'}}><em>{(game.againstScore>0?'+':'')+game.againstScore.toFixed(2)}</em></span>
                    </div>
                    <p>{game.reward+coinType[game.coinType]+'    已结束'}</p>
                </div>
                <div className="pk_left">
                    <img src={game.launchUserPortrait?game.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.launchUserName}</p>
                    <img className='ko' style={{display:game.winResult==2?'block':'none'}} src='/static/pk/futuresvs_list_ko@2x.png' />
                </div>
                <div className="pk_right">
                    <img src={game.againstUserPortrait?game.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.againstUserName}</p>
                    <img className='ko' style={{display:game.winResult==1?'block':'none'}} src='/static/pk/futuresvs_list_ko@2x.png' />

                </div>
            </div>)
        }else{
            return <div></div>
        }
        
    }
}
class Two extends React.Component{
    constructor(props){
        super(props);
       
    }
    matching(){
        this.props.callback();
    }
    create(){
        this.props.create();
    }
    render(){
        return(<div>
            <a className='left_btn' onClick={this.matching.bind(this)}></a>
            <a className='right_btn' onClick={this.create.bind(this)}></a>
            
            <style>{`
               .left_btn{
                    display:block;
                    float:left;
                    background:url(/static/pk/futuresvs_list_matching_normal@2x.png) no-repeat;
                    background-size:100%;
                    height:.45rem;
                    width:1.5rem;
               } 
               .right_btn{
                    display:block;
                    float:right;
                    background:url(/static/pk/futuresvs_list_create_normal@2x.png) no-repeat;
                    background-size:100%;
                    height:.45rem;
                    width:1.5rem;
               } 
               .left_btn:active{
                    background:url(/static/pk/futuresvs_list_matching_press@2x.png) no-repeat;
                    background-size:100%;
               }
                .right_btn:active{
                    background:url(/static/pk/futuresvs_list_create_press@2x.png) no-repeat;
                    background-size:100%;
               }
               
            `}</style>
        </div>)
    }
}
class One extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        var battle = this.props.battle;
         Router.push({
          pathname: '/mobi/pk/trade',
          query:{varietyId:battle.varietyId,battleId:battle.id,batchCode:battle.batchCode}
        })
    }
    render(){
        return(<div>
            <a onClick={this.handleClick} className='one_btn'></a>
            <style>{`
               .one_btn{
                    display:block;
                    margin: 0 auto;
                    background:url(/static/pk/futuresvs_list_current_normal@2x.png) no-repeat;
                    background-size:100%;
                    height:.45rem;
                    width:1.58rem;
               } 
               
                .one_btn:active{
                    background:url(/static/pk/futuresvs_list_current_press@2x.png) no-repeat;
                    background-size:100%;
               }
            `}</style>
        </div>)
    }
}