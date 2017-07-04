import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_black.js'
import Link from 'next/link'
import Sline from '../future/sline.js'
import Kline from '../future/kline.js'
import $ from 'jquery'
import Router from 'next/router'
import Alert from '../common/confirm.js'
import Toast from '../common/toast.js'
class Quota extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            chart:1,
            type:100,
            data:null,
            viewData:[],
            viewPage:0,
            viewMore:true,
            isLogin:false
        };
        this.showModel=this.showModel.bind(this);
        this.socket = this.socket.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.mounted = true;
        this.websocket = null;
    }
    socket(c, d, callback){
        var code = c,_data = d,_this=this;
        var wsip = 'fanli.esongbai.xyz/ws.do';
        var ws = [window.location.protocol=='https:'?'wss:'+ wsip : 'ws:' + wsip],n;
        if ('WebSocket' in window) {
            _this.websocket = new WebSocket(ws[0]);
        } else if ('MozWebSocket' in window) {
            _this.websocket = new MozWebSocket(ws[0]);
        }
        _this.websocket.onopen = function(evnt) {
            console.log("链接服务器成功!");
            var a = {
                code: code,
                data: _data
            };
            a = JSON.stringify(a);
            _this.websocket.send(a);

        };
        _this.websocket.onmessage = function(evnt) {
            var m = JSON.parse(evnt.data),
                d = m.data;
                if(m.code==100&&_this.mounted){
                    _this.setState({
                        data:d
                    })
                    _this.props.callback(d);
                }
                if(m.code==201){
                    var a = {
                        code: 202,
                        data: _data
                    };
                    a = JSON.stringify(a);
                    _this.websocket.send(a);
                }
           
        };
        _this.websocket.onerror = function(evnt) {
        };
        _this.websocket.onclose = function(evnt) {
            console.log("与服务器断开了链接!");
        };
    }
    componentWillUnmount() {  
        this.mounted = false;
        this.websocket.close();
    }
    componentDidMount(){
        var _this = this;
        _this.socket(101,_this.props.data.contractsCode);
            }
    showModel(){
        this.setState({
            show:!this.state.show
        })
    }
    handleChart(e,v){
        this.setState({
            chart:e,
            type:v
        })
    }
    checkLogin(f){
        this.setState({
            isLogin:f
        })
    }
   
    render (){
        var d = this.props.data.exchangeStatus?this.state.data:null,
            sacle = this.props.data.marketPoint;
        return <div className="content">
            <div className='mdata'>
                <div className={d?d.upDropPrice>0?'tleft thigh':'tleft tlow':'tleft'}>
                    <span>{d?d.lastPrice.toFixed(sacle):'0'}</span>
                    <em>{d?(d.upDropPrice>0?'+'+d.upDropPrice:d.upDropPrice):''}   {d?(d.upDropSpeed>0?'+'+(d.upDropSpeed*100).toFixed(2)+'%':(d.upDropSpeed*100).toFixed(2)+'%'):''}</em>
                </div>
                <div className='tright'>
                    
                    <div>
                        <em>最高</em>
                        <span className='first'>{this.state.data?this.state.data.highestPrice.toFixed(sacle):'0'}</span>
                        <em>最低</em>
                        <span>{this.state.data?this.state.data.lowestPrice.toFixed(sacle):'0'}</span>
                    </div>
                    <div>
                        <em>今开</em>
                        <span className='first'>{this.state.data?this.state.data.openPrice.toFixed(sacle):'0'}</span>
                        <em>{d?'昨收':'收盘'}</em>
                        <span>{this.state.data?d?this.state.data.preSetPrice.toFixed(sacle):this.state.data.lastPrice.toFixed(sacle):'0'}</span>
                    </div>
                </div>
            </div>
            <div className="chart-content ">
            <ul className="chart-title">
                <li className={this.state.type==100?'on':''} onClick={()=>{this.handleChart(1,100)}}>分时图</li>
                <li className={this.state.type==1440?'on':''} onClick={()=>{this.handleChart(2,1440)}}>日K</li>
                <li className={this.state.type==60?'on':''} onClick={()=>{this.handleChart(2,60)}}>60分钟</li>
                <li className={this.state.type==30?'on':''} onClick={()=>{this.handleChart(2,30)}}>30分钟</li>
                <li className={this.state.type==15?'on':''} onClick={()=>{this.handleChart(2,15)}}>15分钟</li>
            </ul>
            <section>
            <Sline chart={this.state.chart} scale={this.props.data.marketPoint} peroid={this.props.data.openMarketTime} code={this.props.data.contractsCode} data={this.state.data} color={{path:'#fff',line:'#362d4d',text:'#666'}}/>
            <Kline chart={this.state.chart} type={this.state.type} code={this.props.data.contractsCode} scale={this.props.data.marketPoint} color={{path:'#fff',line:'#362d4d',text:'#666'}}/>
            </section>
            </div>
            
            <style>{`
                .hide {display:none}
               
                .quota_main em{
                    font-style:normal;
                }
                .mdata{
                    background:#222;
                    display:flex;
                    display:-webkit-flex;
                    padding:.1rem;
                    width:100%;
                    z-index: 99;
                }
                .mdata div.tleft,.mdata div.tright{
                    flex:1;
                    -webkit-flex:1;
                }
                
                .mdata .tleft span{
                    font-size:.38rem;
                    display:block;
                    color:#82848a;
                    line-height: .45rem;
                } 
                .mdata .thigh span,.mdata .thigh em{
                    color:#cd4a47;
                }
                .mdata .tlow span,.mdata .tlow em{
                    color:#33d37e;
                }
                .mdata .tleft em{
                    font-size:.14rem;
                    display:block;
                }
                .chart-content{
                    padding:0 .1rem;
                    background:#222;
                }
               
                .tright div{
                    min-width:.5rem;
                    padding-left:.12rem;
                    float:right;
                }
                
                .tright div em{
                    font-size:.1rem;
                    color:#999;
                    display:block;
                }
                
                .tright div {
                    font-size:.12rem;
                    color:#999;
                    display:block;
                }
                .tright div span.first{
                    display:block;
                    padding-bottom:.03rem;
                }
                .chart-title{
                    width:100%;
                    display:flex;
                    display:-webkit-flex;
                    height:.36rem;
                }
                .chart-title li{
                    flex:1;
                    -webkit-flex:1;
                    font-size:.12rem;
                    line-height:.36rem;
                    color:#ddd;
                    text-align:center;
                    position:relative;
                }
                .chart-title li.on{
                    color:#cd4a47;

                }     
                svg.mod-sline, svg.mod-kline{
                    background:#222;
                    height:1.6rem;
                }
                setion, article{
                    background:#222;
                }
            `}</style>
        </div>
    }
}
export default  class  Future extends React.Component {
    constructor(props){
        super(props)
        this.state={
            vId:null,
            future:null,
            info:null,
            lookingfor:'none',
            addIn:'none',
			addImg:'',
            quota:{},
            launchs:[],
            againsts:[],
            orderCode:0,
            opUser:0,
            confirm:{
                show:false
            },
            pkResult:false,
            pkResultInfo:null
        }
        this.websocket = null;
        this.getCookie=this.getCookie.bind(this);
        this.toMatch = this.toMatch.bind(this);
        this.updateQuota = this.updateQuota.bind(this);
        this.battleInfo = this.battleInfo.bind(this);
        this.hideLook = this.hideLook.bind(this);
    }
    socket(){
        var _this=this,
            wsip = window.location.host+'/game/ws.do',
            ws = window.location.protocol=='https:'?'wss:'+ wsip : 'ws:' + wsip;
        if ('WebSocket' in window) {
            _this.websocket = new WebSocket(ws);
        } else if ('MozWebSocket' in window) {
            _this.websocket = new MozWebSocket(ws);
        }
        _this.websocket.onopen = function(evnt) {
            console.log("房间链接成功!");
            var a = {
                code: 1100,
                uuid:'reg'+new Date().getTime(),
                timestamp:new Date().getTime(),
                content:{
                    token1:_this.getCookie('token1'),
                    token2:_this.getCookie('token2'),
                    host:window.location.host
                }
            };
            a = JSON.stringify(a);
            _this.websocket.send(a);
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
                        case 'matchCancle':
                            if(m.content.code==200){
                                 _this.setState({
                                    lookingfor:'none'
                                })
                            }
                           
                        break;
                        case 'battle':
                            if(m.content.code==200){
                                var obj = Object.assign(_this.state.info,m.content.data[0]);
                                _this.setState({
                                    info:obj
                                })
                            }
                           
                        break;
                    }   
                }else if(m.code==3000){
					
                    var _type = m.content.type;
                    switch(_type){
                        case 12:
                            var obj = Object.assign(_this.state.info,m.content.data);
							var addImg = m.content.data.againstUserPortrait ? m.content.data.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : '/static/circle/headportrait64x64@3x.png';
                            _this.setState({
                                info:obj,
                                lookingfor:'none',
                                addIn:'block',
								addImg:addImg
                            })
                           setTimeout(function(){
                                _this.setState({
                                    addIn:'none',
									addImg:''
                                })
                           },2000)
                        break;
                        case 13:
                            var i = _this.state.info,
                                me = i.loginUser,
                                launch = i.launchUser,
                                against = i.againstUser;
                            if(me!=launch&&me!=against){
                                return false;
                            }
                            var d= m.content.data,
                                _info = Object.assign(i,d);
                            d.isLaunch = me ==launch;
                            _this.setState({
                                info:_info,
                                pkResult:true,
                                pkResultInfo:d,
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
                        case 22:
                        case 21:
                            _this.setState({
                                orderCode:_type,
                                opUser:m.content.data.userId
                            });
                             _this.battleInfo();
                        break;
                        case 51:
                            var _uid = m.content.data.praiseUserId,count = m.content.data.currentPraise;
                            _uid == _this.state.info.againstUser ?_this.state.info.againstPraise=count:_this.state.info.launchPraise=count;
                           _this.setState({
                                info:_this.state.info
                           })
                        break;
                    }
                }
                
           
        };
        _this.websocket.onerror = function(evnt) {
        };
        _this.websocket.onclose = function(evnt) {
            console.log("与服务器断开了链接!");
        };
    }
    updateQuota(d){
        this.setState({
            quota:d
        })
    }
    getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
        else
        return null;
    }
    componentWillUnmount() {  
       this.websocket&& this.websocket.close();
    }
    componentDidMount(){
        var _this = this,pram=_this.props.url.query;
        _this.socket();
        _this.battleInfo();
       $.ajax({
            type:'get',
            url:'/order/future/query/infoPrice.do',
            data:{varietyId:_this.props.url.query.varietyId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data){
                     _this.setState({
                        vId:e.data.varietyId,
                        future:e.data
                    });
                }
            }
        })
      
    }
    battleInfo(){
        var _this = this,pram=_this.props.url.query;
         $.ajax({
            type:'get',
            url:'/game/battle/findBattle.do',
            data:{battleId:pram.battleId,batchCode:pram.batchCode},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                   _this.setState({
                        info:e.data
                   })
                }
            }
        })
    }
   
    toMatch(){
        var _this = this,
        _uuid = 'match'+new Date().getTime(),
        a = {
            code: 1200,
            uuid:_uuid,
            content:{cmd:'/game/battle/quickSearchForLaunch.do',parameters:{type:1,battleId:_this.state.info.id}}
        };
        a = JSON.stringify(a);
        _this.websocket.send(a); 
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
        var _this = this,

        _uuid = 'matchCancle'+new Date().getTime(),
        a = {
            code: 1200,
            uuid:_uuid,
            content:{cmd:'/game/battle/quickSearchForLaunch.do',parameters:{type:1,battleId:_this.state.info.id}}
        };
        a = JSON.stringify(a);
        _this.websocket.send(a); 
        
    }
    updateProfit(a,b){
        this.setState({
            launchs:a,
            againsts:b
        })
    }
    render (){
        if(this.state.vId){
            var status = this.state.future.exchangeStatus?'交易中':'休市中',
                pinfo= this.state.pkResultInfo,
                icon = {2:'元宝',3:'积分'},
                res = 0;
                if(pinfo){
                    if(pinfo.winResult==1){
                        pinfo.isLaunch?res = 1:res = 2;
                        
                    }
                    if(pinfo.winResult==2){
                        pinfo.isLaunch?res = 2 : res =1;
                    }
                }
             return  <div className='quota_main'  ref="main" id="main">
                <Header_title text='期货PK'/>
                <Head text={this.state.future.varietyName+'('+this.state.future.contractsCode+')'} little={this.state.future.smallVarietyTypeCode=='foreign'?'国际期货-'+status:'国内期货-'+status} />
                <Quota data={this.state.future} callback={this.updateQuota}/>
                {this.state.info?this.state.info.gameStatus==1?<Waiting info={this.state.info} match={this.toMatch}/>:<Process info={this.state.info} quota={this.state.quota} callbackProfit={this.updateProfit.bind(this)} code={this.state.orderCode} opUser={this.state.opUser} eqMoney={this.state.future.eachPointMoney}/>:''}
                <div className='pk_bottom'>
                    {this.state.info?<Pkinfo info={this.state.info} quota={this.state.quota} launchs={this.state.launchs} againsts={this.state.againsts} eqMoney={this.state.future.eachPointMoney}/>:''}
                </div>
                <section style={{display:this.state.lookingfor}}>
                    <div className="lookingfor msgbox" >
                        <div className="content">
                            <div className="main">
                                <div className="title">正在匹配</div>
                                <div className="sub-title"><img src='/static/pk/futuresvs_lookingfor@2x.gif' /></div>
                            </div>
                            <div className="action clearfix" >
                                <div className="btn btn-right" onClick={this.beforeHideLook.bind(this)}>取消匹配</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section style={{display:this.state.addIn}}>
                    <div className="lookingfor msgbox" >
                        <div className="content">
                            <div className="main">
                                <div className="title">即将进入游戏</div>
                                <img className="yzUser" src={this.state.addImg} />
                                 <p>已有对手</p>
                                <p>2s后进入对战</p>
                            </div>
                            
                        </div>
                    </div>
                </section>
                <div className={this.state.pkResult?'tipmodel':'tipshow'}>
                    <div className={pinfo?res==0?"tipmain tipadraw":res==1?'tipmain tipwin':'tipmain tiplose':'tipmain'}>
                        <div>
                            <img onClick={()=>{Router.push({pathname:'/mobi/pk/hall'})}} className="tipclose" src="/static/wallet/popup_delete@2x.png"/>
                        </div>
                        <div className="tiptitle">{pinfo?res==0?"赏金退还":(res==1?'+'+Math.ceil(pinfo.reward*0.95):'-'+pinfo.reward)+icon[pinfo.coinType]:''}</div>
                        <p>{pinfo?res==0?"英雄所见略同":(res==1?'神操作！真是羡煞旁人':'别气馁,下一站大神'):''}</p>
                        
                    </div>    
                </div>
                 <Alert  confirm={this.state.confirm}  />
                <style>{`
                   .quota_main{
                        background:#222;              
                        width: 100%;
                        min-height: 6.67rem;
                    }
                    .pk_bottom{
                        position:fixed;
                        bottom:0;
                        left:0;
                        width:100%;
                        z-index:22;
                    }
                    .pk_item{
                        background:#564f68;
                        box-shadow:0 .02rem .04rem 0 #251943;
                        height:.8rem;
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
                        height:.6rem;
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
                        color:#9c9c9c;
                        text-align:center;
                        line-height:.27rem;
                        font-size:.12rem;
                     }
                     .pk_mid p span.star{
                        display:block;
                        border:.01rem solid #fff;
                        border-radius:.2rem;
                        color:#fff;
                        height:.21rem;
                        line-height:.2rem;
                        background:url('/static/pk/futuresvs_watching_praise.png') .06rem no-repeat;
                        background-size:.12rem;
                        padding-left: .22rem;
                        text-align: left;
                        padding-right: .1rem;
                     }
                     .pk_mid p span.staron{
                        background:url('/static/pk/futuresvs_watching_praise.png') .06rem no-repeat #ef6d6a;
                        background-size:.12rem;
                     }
                     .pk_mid p span:first-child{
                        float:left;
                     }
                     .pk_mid p span:last-child{
                        float:right;
                     }
                     .pk_mid .range{
                        width:100%;
                        height:.14rem;
                        border-radius:.07rem;
                        background:#645c78;
                        position:relative;
                        overflow:hidden;
                        margin-top:.1rem;
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
                        z-index:99;
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
					.lookingfor .main .yzUser{
                        display:block;
                        width:0.8rem;
                        margin:0 auto;
						border-radius: 0.4rem;
                    }
                    .lookingfor .btn{
                        margin:0;
                        height:.45rem;
                        line-height:.45rem;
                        color:#222;
                        background:#f5f5f5;
                    }
                    .lookingfor p{
                        font-size:.12rem;
                        text-align:center;
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
                        position: fixed;
                        top:0;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                        width:2.5rem;
                        height:1.65rem;
                        background: #fff;
                        padding-top:0.2rem;
                        
                    }
                    .tipadraw{
                        background:url('/static/pk/futuresvs_alerts_adraw@2x.png');
                        background-size:100%;
                    }
                     .tiplose{
                        background:url('/static/pk/futuresvs_alerts_lose@2x.png');
                        background-size:100%;
                    }
                    .tipwin{
                        background:url('/static/pk/futuresvs_alerts_win@2x.png');
                        background-size:100%;
                    }
                    .tiptitle{
                        height:0.2rem;
                        line-height:0.2rem;
                        text-align: center;
                        font-size:0.16rem;
                        color:#222222;
                        position: relative;
                        margin-top:.5rem;
                    }
                  
                    .tipmain p{
                        text-align:center;
                        font-size:0.12rem;
                        color:#999;
                        line-height: 0.2rem;
                    }
                    .tipclose{
                        position: absolute;
                        top: -0.5rem;
                        right: 0;
                        width: 0.3rem;
                    }
                `}</style>
           </div>
       }else{
         return <div style={{textAlign:'center'}}>loading...</div>
       }
     
    }
}
class Waiting extends React.Component {
    constructor(props){
        super(props)
        this.handleCancle = this.handleCancle.bind(this);
        this.cancelComfirm = this.cancelComfirm.bind(this);
        this.cutDown=this.cutDown.bind(this);
        this.isNotCancle=this.isNotCancle.bind(this);
        this.getServiceTime= this.getServiceTime.bind(this);
        this.state={
			addIn:'none',
            confirm:{
                show:false,
                content:''
            },
            endTime:'00:00'
        }
        this.timer=true;
    }
    componentDidMount(){
       this.getServiceTime();
    }
    getServiceTime(){
        var _this = this;
        $.ajax({
            type:'get',
            url:'/user/user/getSystemTime.do',
            data:{},
            dataType:"json",
            success:function(e){
                var now = e.data,
                    end = _this.props.info.createTime+600000;
                _this.cutDown((end-now));
            }
        })
    }
    cutDown(t){
        if(this.timer){
             if(t<=0){
                clearTimeout(this.timer);
                 this.setState({
                    confirm:{
                        show:true,
                        content:'等待时间过长，房间已超时',
                        type:2,
                        title:'等待超时',
                        no:'重新创建',
                        isOk:function(){
                            Router.push({
                                pathname:'/mobi/pk/hall'
                            })
                        },
                        isNot:function(){
                            Router.push({
                                pathname:'/mobi/pk/create'
                            })
                        }
                    }
                })
                return false;
            }
            var _this = this,
                d = t/1000>600?600:t/1000,
                m = d/60>1?'0'+parseInt(d/60):'00',
                s = parseInt(d - parseInt(d/60)*60),
                s = s>=10?s:'0'+s;
            _this.setState({
               endTime:m+':'+s
            });
            setTimeout(function(){
                _this.cutDown(t-1000);
            },1000);
        }
       
    }
    cancelComfirm(){
        var _this = this;
        _this.setState({
            confirm:{
                show:true,
                content:'是否要取消对战?',
                title:'取消对战',
                no:'继续对战',
                type:2,
                again:true,
                isOk:_this.handleCancle,
                isNot:_this.isNotCancle
            }
        })
    }
    isNotCancle(){
        var _this = this;
        _this.setState({
            confirm:{
                show:false
            }
        })
    }
     beforeMatch(){
        var _this = this;
        _this.setState({
            confirm:{
                type:2,
                show:true,
                title:'匹配对战',
                content:'进行匹配对战，系统将进行撮合对战',
                isOk:function(){
                     _this.setState({
                        confirm:{
                            show:false
                        }
                       
                    })
                    _this.props.match();
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
    }
    handleCancle(e,d){
        if(!d.again){return false;}
        var _this = this;
        $.ajax({
            type:'get',
            url:'/game/battle/cancelBattle.do',
            data:{battleId:_this.props.info.id},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                   Router.push({
                        pathname:'/mobi/pk/hall'
                   })
                }
				else if(e.code==4606){
					_this.setState({
                        addIn:'block'
                    }) 
					setTimeout(function(){
						_this.setState({
							addIn:'none'
						})
				   },2000)
				}
				else{
                   _this.setState({
                        confirm:{
                            show:true,
                            content:e.msg,
                            type:1,
                            again:false,
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
        })
    }
    componentWillUnmount(){
        this.timer=false;
    }
    render(){
        return(<div className="wait">
            <ul>
                <li><Link href={"http://v.t.sina.com.cn/share/share.php?url=http://"+window.location.host+"/mobi/login/share?code="+this.props.info.batchCode+"&title=乐米期货对战，紧张激烈的金融游戏，勇者无所畏惧，还有更多元宝好礼等你领取，快来加入吧！&appkey=522354160&pic=http://"+window.location.host+"/static/pk/share@2x.png"}><a><img src='/static/pk/futuresvs_wiat_invitation_normal@2x.png' /></a></Link></li>
                <li onClick={this.beforeMatch.bind(this)}><img src='/static/pk/futuresvs_wiat_matching_normal@2x.png' /></li>
                <li className="mb" onClick={this.cancelComfirm}><img src='/static/pk/futuresvs_wiat_cancel_normal@2x.png' /></li>
                <li><p>倒计时{this.state.endTime}</p></li>
            </ul>
            <section style={{display:this.state.addIn}}>
				<div className="lookingfor msgbox" >
					<div className="content">
						<div className="main">
							<div className="title">取消失败，对战已经开始</div>
							<p>2s后进入对战</p>
						</div>

					</div>
				</div>
			</section>
            <Alert confirm={this.state.confirm}  />
            <style>{`
                .wait{
                    background-image:url('/static/pk/futures_versus_bannerbg@2x.png');
                    background-size:cover;
                }
                .wait ul{
                    width:100%;
                }
                .wait ul li{
                    width:100%;
                    margin-bottom:.2rem;
                }
                .wait ul li.mb{
                    margin-bottom:0;
                }
                .wait ul li img{
                    display:block;
                    margin:0 auto;
                    width:1.6rem;
                }
                .wait ul li p{
                    width:100%;
                    text-align:center;
                    font-size:.12rem;
                    color:#fff;
                    line-height:.25rem;
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
				.lookingfor .main .yzUser{
					display:block;
					width:0.8rem;
					margin:0 auto;
					border-radius: 0.4rem;
				}
				.lookingfor .btn{
					margin:0;
					height:.45rem;
					line-height:.45rem;
					color:#222;
					background:#f5f5f5;
				}
				.lookingfor p{
					font-size:.12rem;
					text-align:center;
				}
            `}</style>
        </div>)
    }
}
class Pkinfo extends React.Component{
    constructor(props){
        super(props)
        this.onstar = this.onstar.bind(this);
        this.updateEndTime=this.updateEndTime.bind(this);
        this.getServiceTime = this.getServiceTime.bind(this);
        this.state={
            info:props.info,
            endTime:0,
            launchScore:props.info.launchUnwindScore||0,
            againstScore:props.info.againstUnwindScore||0
        }
        this.timer=true;
        this.observer=true;
        this.cutDown = null;
        this.stime=null;
        this.scribe=this.scribe.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(this.state.info.gameStatus==3){
            this.setState({
                info:nextProps.info
            })
            return false;
        }
        
        var d = nextProps.quota,o = nextProps.launchs[0],v = nextProps.againsts[0],p=0,q=0;
        if(o){
            p = Math.round((o.direction ? d.lastPrice- o.orderPrice : o.orderPrice - d.lastPrice)*nextProps.eqMoney/10)*10;
        }
         if(v){
            q = Math.round((v.direction ? d.lastPrice- v.orderPrice : v.orderPrice - d.lastPrice)*nextProps.eqMoney/10)*10;
        }
        var _info=Object.assign(this.state.info,nextProps.info);

        this.setState({
            info:_info,
            launchScore:nextProps.info.launchUnwindScore+p,
            againstScore:nextProps.info.againstUnwindScore+q,
        })

        
    }
    componentDidMount(){
        this.scribe();
        this.getServiceTime();
    }
    getServiceTime(){
        var _this = this;
        $.ajax({
            type:'get',
            url:'/user/user/getSystemTime.do',
            data:{},
            dataType:"json",
            success:function(e){
                _this.stime = e.data;
                _this.updateEndTime( _this.stime);
            }
        })
    }
    updateEndTime(t){
        clearTimeout(this.cutDown);
        if(this.timer){
            var t = (this.state.info.startTime+this.state.info.endline*1000)-t;
            if(t<=0){return false;}
            var _this = this;
            if(t){
                var d = t/1000,
                    m = d/60>1?parseInt(d/60)<10?'0'+parseInt(d/60):parseInt(d/60):'00',
                    s = parseInt(d - parseInt(d/60)*60),
                    s = s>=10?s:'0'+s;
                _this.setState({
                   endTime:m+':'+s
                });
            }
           
            this.cutDown=setTimeout(function(){
                _this.stime=_this.stime+1000;
                _this.updateEndTime( _this.stime);
            },1000);
        }
        
      
    }
    componentWillUnmount(){
       this.timer=false;
    }
    onstar(e,l,a,s,r){
        var _this = this;
        if(e){return false}
        _this.state.info[s]+=1;
        _this.state.info[s+'ClassName']='staron';
        $.ajax({
            type:'post',
            url:'/game/battle/userPraise.do',
            data:{battleId:l,praiseId:a},
            success:function(r){
                if(r.code==200){
                    _this.setState({
                        info:_this.state.info
                   })
                }
               
            }
        })
    }
    scribe(){
        var _this = this,
        game = this.state.info,
        me = game.loginUser,
        launch = game.launchUser,
        against = game.againstUser,
        inPk= !(me!=launch&&me!=against);
        if(!inPk){
            $.ajax({
                type:'post',
                url:'/game/battle/subscribeBattle.do',
                data:{battleId: _this.state.info.id},
                success:function(r){
                    if(r.code==200){
                         console.log('订阅成功');
                    }
                  
                }
            })
        }
        
    }
    toUserDetail(d){
        Router.push({
            pathname:'/mobi/user/circle_user/userInfo',
            query:{id:d}
        })
    }
    render(){

        var game = this.state.info,coinType={2:'元宝',3:'积分'},
        l = parseInt(this.state.launchScore)/(parseInt(this.state.launchScore)+parseInt(this.state.againstScore)),
        r=1-l>1?1:1-l,
        me = game.loginUser,
        launch = game.launchUser,
        against = game.againstUser,
        inPk= !(me!=launch&&me!=against);
        var lscore=this.state.launchScore,ascore=this.state.againstScore;
        if((lscore===0 && ascore === 0)||(!lscore&&!ascore)){l=0.5,r=0.5};
        (lscore<0&&ascore<0)&&(l=r,r=1-l);
        (lscore>=0&&ascore<0)&&(l=1,r=0);
        (lscore<0&&ascore>=0)&&(l=0,r=1);
        if(game.gameStatus == 1){
            return(<div className='pk_item'>
                <div className="pk_mid">
                    <div className='range'>
                        <span className="range_left" style={{paddingLeft:'0'}}></span>
                        <span className="range_right" style={{paddingRight:'0'}}></span>
                    </div>
                    <p>{game.reward+coinType[game.coinType]+'   '+(game.endline/60).toFixed(0)+'分钟'}</p>
                    <p><span>{game.launchPraise>999?'999+':(game.launchPraise||0)}赞</span><span>{game.againstPraise>999?'999+':(game.againstPraise||0)}赞</span></p>
                </div>
                <div className="pk_left" onClick={()=>{this.toUserDetail(launch)}}>
                     <img src={game.launchUserPortrait?game.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.launchUserName}</p>
                </div>
                <div className="pk_right">
                    <img src='/static/circle/headportrait64x64@3x.png' />
                    <p>等待加入</p>
                </div>
            </div>)
        }else if(game.gameStatus==2){
            return(<div className='pk_item'>
                <div className="pk_mid">
                    <div className='range'>
                        <span className="range_left" style={{width:l*100+'%'}}><em>{(lscore>0?'+':'')+(lscore.toFixed(2)||'0.00')}</em></span>
                        <span className="range_right" style={{width:r*100+'%'}}><em>{(ascore>0?'+':'')+(ascore.toFixed(2)||'0.00')}</em></span>
                        
                    </div>
                        <p>{game.reward+coinType[game.coinType]+'   剩余'+this.state.endTime}</p>
                       <p>
                       <span className={inPk?'':'star '+this.state.info.launchPraiseClassName} onClick={()=>{this.onstar(inPk,game.id,launch,'launchPraise')}}>{game.launchPraise>999?'999+':(game.launchPraise||0)+(inPk?'赞':'')}</span>
                       <span className={inPk?'':'star '+this.state.info.againstPraiseClassName} onClick={()=>{this.onstar(inPk,game.id,against,'againstPraise')}}>{game.againstPraise>999?'999+':(game.againstPraise||0)+(inPk?'赞':'')}</span>
                       </p>

                </div>
                <div className="pk_left" onClick={()=>{this.toUserDetail(launch)}}>
                    <img src={game.launchUserPortrait?game.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.launchUserName}</p>
                </div>
                <div className="pk_right" onClick={()=>{this.toUserDetail(against)}}>
                     <img src={game.againstUserPortrait?game.againstUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.againstUserName}</p>
                </div>
            </div>)
        }else if(game.gameStatus==3){
            return(<div className='pk_item'>
                <div className="pk_mid">
                    <div className='range'>
                        <span className="range_left" style={{width:l*100+'%'}}><em>{(lscore>0?'+':'')+(lscore.toFixed(2)||'0.00')}</em></span>
                        <span className="range_right" style={{width:r*100+'%'}}><em>{(ascore>0?'+':'')+(ascore.toFixed(2)||'0.00')}</em></span>
                    </div>
                        <p>{game.reward+coinType[game.coinType]+'   已结束'}</p>
                       <p>
                       <span className={inPk?'':'star '+this.state.info.launchPraiseClassName}>{game.launchPraise>999?'999+':(game.launchPraise||0)+(inPk?'赞':'')}</span>
                       <span className={inPk?'':'star '+this.state.info.againstPraiseClassName} >{game.againstPraise>999?'999+':(game.againstPraise||0)+(inPk?'赞':'')}</span>
                       </p>

                </div>
                <div className="pk_left" onClick={()=>{this.toUserDetail(launch)}}>
                    <img src={game.launchUserPortrait?game.launchUserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png'} />
                    <p>{game.launchUserName}</p>
                    <img className='ko' style={{display:game.winResult==2?'block':'none'}} src='/static/pk/futuresvs_list_ko@2x.png' />

                </div>
                <div className="pk_right" onClick={()=>{this.toUserDetail(against)}}>
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

class Process extends React.Component{
    constructor(props){
        super(props);
        this.logs = this.logs.bind(this);
        this.format = this.format.bind(this);
        this.getOrder = this.getOrder.bind(this);
        this.callProfit = this.callProfit.bind(this);
        this.state = {
            logs:[],
            launchOrders:[],
            againstOrders:[],
            orderCode:props.code,
            opUser:props.opUser
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.code!=0 && (nextProps.code != this.state.orderCode||nextProps.opUser != this.state.opUser)){
            this.logs();
            this.getOrder();
        }
        this.setState({
            orderCode:nextProps.code,
            opUser:nextProps.opUser
        })
    }
    componentDidMount(){
        this.logs();
        this.getOrder();
    }
    logs(){
        var that = this,pklogs=$(this.refs.pklogs);
        $.ajax({
            type:'get',
            url:'/game/battleorder/optLog.do',
            data:{battleId:that.props.info.id},
            success:function(r){
                if(r){
                   that.setState({
                        logs:r.data
                    },function(){
                         pklogs.scrollTop(50*r.data.length);
                    }) 
                }
                
            }
        })
    }

    format(r, a, t) {
        var e = function(e, r) {
            return (!r && 10 > e ? "0" : "") + e
        };
        a = a || "Y-M-D h:m:s";
        for (var c = r.getTime ? r : new Date(r), s = a.length, g = a, n = 0; s > n; n++) switch (a.charAt(n)) {
            case "Y":
                g = g.replace(/Y/g, e(c.getFullYear(), t));
                break;
            case "y":
                g = g.replace(/y/g, e(c.getFullYear(), t).substring(2));
                break;
            case "M":
                g = g.replace(/M/g, e(c.getMonth() + 1, t));
                break;
            case "D":
                g = g.replace(/D/g, e(c.getDate(), t));
                break;
            case "h":
                g = g.replace(/h/g, e(c.getHours(), t));
                break;
            case "m":
                g = g.replace(/m/g, e(c.getMinutes(), t));
                break;
            case "s":
                g = g.replace(/s/g, e(c.getSeconds(), t))
        }
        return g
    }
    getOrder(){
        var that = this;
        $.ajax({
            type:'get',
            url:'/game/battleorder/orders.do',
            data:{battleId:that.props.info.id},
            success:function(r){

                if(r.data.length>0){
                    var o1=[],o2=[];
                    for(var i=0;i<r.data.length;i++){
                        if(r.data[i].userId==that.props.info.launchUser){
                            o1.push(r.data[i])
                        }else{
                             o2.push(r.data[i])
                        }
                    }
                   that.setState({
                        launchOrders:o1,
                        againstOrders:o2
                    },function(){
                        that.callProfit(that.state.launchOrders,that.state.againstOrders)

                    }) 
                }else{
                    that.setState({
                        launchOrders:[],
                        againstOrders:[]
                    },function(){
                        that.callProfit(that.state.launchOrders,that.state.againstOrders)
                    }) 
                }
                
            }
        })
    }
    callProfit(a,b){
        this.props.callbackProfit(a,b)
    }
    render(){
        var me = this.props.info.loginUser,
            launch = this.props.info.launchUser,
            against = this.props.info.againstUser,
            isLaunch = me==launch,
            isAgainst = me==against,
            inPk= !(me!=launch&&me!=against),
            logs = this.state.logs,
            status={1:'买多建仓',2:'卖空建仓',3:'买多平仓',4:'卖空平仓'},
            myOrders =inPk?me==launch?this.state.launchOrders:this.state.againstOrders:[];

        return(<div className='pro'>
            <ul className="process" ref='pklogs'>
            {
              logs.map((e,i)=>{
                    return (<li className={e.userId==launch?'pro_left':'pro_right'}>
                        <span>{e.optPrice.toFixed(e.marketPoint)+status[e.optStatus]}</span>
                        <em>{this.format(e.optTime,'h:m:s')}</em>
                    </li>)
                })  
            }
                
                
            </ul>
            <div className='pro_operation'>
                {inPk?myOrders.length>0?<One battleId={this.props.info.id} orders={myOrders} callback={this.getOrder} logs={this.logs}/>:<Two battleId={this.props.info.id} callback={this.getOrder} logs={this.logs}/>:''}
                <p style={{display:inPk?'block':'none'}}><Myprofit orders={myOrders} quota={this.props.quota} eqMoney={this.props.eqMoney}/></p>
            </div>
            <style>{`
                .pro{
                    width:100%;
                    background-image:url('/static/pk/futures_versus_bannerbg@2x.png');
                    background-size:cover;
                    padding-bottom:1rem;
                }
                ul.process{
                    width:100%;
                    height:.8rem;

                    overflow: scroll;
                }
               
                .process li{
                    height:.5rem;
                    width:50%;
                    position:relative;
                    color:#fff;
                    box-sizing:border-box;
                }
                .process li.pro_left{
                    left:0;
                    padding-right:.1rem;
                    border-right:.01rem solid #362d4d;
                }
                .process li.pro_left:before{
                    content:'';
                    display:block;
                    width:.06rem;
                    height:.06rem;
                    border-radius:.03rem;
                    background:#f3b071;
                    position:absolute;
                    right:-.03rem;
                    top:.13rem;
                }
                .process li.pro_right{
                    left:50%;
                    padding-left:.1rem;
                    border-left:.01rem solid #362d4d;
                    margin-left:-.01rem;
                }
                .process li.pro_right:before{
                    content:'';
                    display:block;
                    width:.06rem;
                    height:.06rem;
                    border-radius:.03rem;
                    background:#ef6d6a;
                    position:absolute;
                    left:-.03rem;
                    top:.13rem;
                }
                .process li span{
                    display:block;
                    background:rgba(255,255,255,0.10);
                    border-radius:.04rem;
                    width:1.1rem;
                    height:.28rem;
                    color:#fff;
                    line-height:.28rem;
                    text-align:center;
                    font-size:.14rem;
                }
                .process li.pro_left span,.process li.pro_left em{
                    float:right;
                }
                .process li em{
                    color:#666;
                    font-size:.12rem;
                    line-height:.2rem;
                    display:block;
                    clear:both;
                }
                .pro_operation{
                    width:2.8rem;
                    margin:0 auto;
                    padding:.2rem 0;
                    position: fixed;
                    bottom: .6rem;
                    left: 50%;
                    margin-left: -1.4rem;
                }
                .pro_operation p{
                    font-size:.12rem;
                    color:#999;
                    width:100%;
                    text-align:center;
                    line-height:.25rem;
                }
                .pro_operation p span{
                    color:#fff;
                }

            `}</style>
        </div>)
    }
}
class Myprofit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profit:0,
            ortherProfit:0
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.orders&&this.props.orders.length>0){
            var d = nextProps.quota,o = this.props.orders[0];
            var p = Math.round((o.direction ? d.lastPrice- o.orderPrice : o.orderPrice - d.lastPrice)*nextProps.eqMoney/10)*10;
            this.setState({
                profit:p
            })
        }
       
    }
    
    render(){
        if(this.props.orders&&this.props.orders.length>0){
            var o = this.props.orders[0];
            return(<p className="profit">持仓方向<em>{o.direction==1?'买多':'卖空'}</em>买入价<em>{o.orderPrice}</em> 持仓盈亏<em className={this.state.profit>=0?'thigh':'tlow'}>{this.state.profit>0?'+'+this.state.profit:this.state.profit}</em>
                <style>{`
                    .profit em{
                        color:#fff;
                        padding:0 .05rem;
                    }
                    .profit em.thigh{
                        color:#cd4a47;
                    }
                    .profit em.tlow{
                        color:#2ecc9f;
                    }
                `}</style>
                </p>)
        }else{
            return <div>暂无持仓</div>
        }
    }
}
class Two extends React.Component{
    constructor(props){
        super(props);
        this.createOrder = this.createOrder.bind(this);
        this.state={
            toast:''
        }
    }
    createOrder(d){
         var that = this;
        $.ajax({
            type:'get',
            url:'/game/battleorder/createOrder.do',
            data:{battleId:that.props.battleId,direction:d},
            success:function(r){
                if(r.code==200){
                  // that.props.callback();
                  // that.props.logs();
                }else{
                    that.setState({
                        toast:r.msg
                    })
                }
                
            }
        })
    }
    render(){
        return(<div className='box'>
            <a onClick={()=>{this.createOrder(1)}} className='left_btn'></a>
            <a onClick={()=>{this.createOrder(0)}} className='right_btn'></a>
            <Toast text={this.state.toast}/>
            <style>{`
                .box{
                    width:2.4rem;
                    margin:0 auto;
                    overflow:hidden;
                }
               .left_btn{
                    display:block;
                    float:left;
                    background:url('/static/pk/futures_vs_buy_normal@2x.png') no-repeat;
                    background-size:100%;
                    height:.45rem;
                    width:1.2rem;
               } 
               .right_btn{
                    display:block;
                    float:right;
                    background:url('/static/pk/futures_vs_sell_normal@2x.png') no-repeat;
                    background-size:100%;
                    height:.45rem;
                    width:1.2rem;
               } 
               .left_btn:active{
                    background:url('/static/pk/futures_vs_buy_press@2x.png') no-repeat;
                    background-size:100%;
               }
                .right_btn:active{
                    background:url('/static/pk/futures_vs_sell_press@2x.png') no-repeat;
                    background-size:100%;
               }
            `}</style>
        </div>)
    }
}
class One extends React.Component{
    constructor(props){
        super(props);
        this.state={
            toast:''
        }
    }
    unwind(){
        var that = this;
        $.ajax({
            type:'get',
            url:'/game/battleorder/unwind.do',
            data:{battleId:that.props.battleId,orderId:that.props.orders[0].id},
            success:function(r){
                if(r.code==200){
                  // that.props.callback();
                  // that.props.logs();
                }else{
                    this.setState({
                        toast:r.msg
                    })
                }
                
            }
        })
    }
    render(){
        return(<div>
            <a onClick={this.unwind.bind(this)} className='one_btn'></a>
                <Toast text={this.state.toast}/>

            <style>{`
               .one_btn{
                    display:block;
                    margin: 0 auto;
                    background:url('/static/pk/futures_vs_clearance_normal@2x.png') no-repeat;
                    background-size:100%;
                    height:.45rem;
                    width:1.58rem;
               } 
               
                .one_btn:active{
                    background:url('/static/pk/futures_vs_clearance_press@2x.png') no-repeat;
                    background-size:100%;
               }
            `}</style>
        </div>)
    }
}