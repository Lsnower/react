import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Updown from './updown.js'
import Sline from './sline.js'
import Kline from './kline.js'
import $ from 'jquery'
import Link from 'next/link'
import Router from 'next/router'
import Alert from '../common/confirm.js'
import Text_none from '../common/text_none.js'
import InfiniteScroll from 'react-infinite-scroll-component'

class TabController extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item:['观点','简介'],
            current: 0
        };
    }

    itemNav = (index) => {
        return index === this.state.current ? 'on' : '';
    }

    itemCon = (index) => {
        return index === this.state.current ? 'con on' : 'con';
    }

    render(){
        return (
            <div>
                <nav>
                    {
                        this.state.item.map((element,index) => {
                            return (
                                <div key={index} onClick={ () => { this.setState({ current: index }) } } className={ this.itemNav(index) }>{this.state.item[index] }</div>
                            )
                        })
                    }
                </nav>
                
                <div>
                   {
                        React.Children.map(this.props.children, (element,index) => {
                            return (
                                <div key={index} onClick={ () => { this.setState({ current: index }) } } className={ this.itemCon(index) }>{ element }</div>
                            )
                        })
                    } 
                </div>
                <style>{`
            
                nav{
                    width:100%;
                    display:flex;
                    display:-webkit-flex;
                    border-bottom:.01rem solid #e7e7e8;
                    margin-top:.1rem;
                    background:#fff;
                 }
                 nav div{
                    flex:1;
                    -webkit-flex:1;
                    font-size.16rem;
                    color:#0c0f16;
                    line-height:.4rem;
                    position:relative;
                    text-align:center;
                 }
                 nav div.on{
                    color:#869bcb;
                 }
                nav div.on:after{
                    content:'';
                    width:.5rem;
                    height:.01rem;
                    border-bottom:.02rem solid #869bcb;
                    position:absolute;
                    bottom:0rem;
                    left:50%;
                    margin-left:-.25rem;
                 }
                .con{
                    background:#fff;
                    display:none;
                }
                div.on{display:block;}

                `}</style>
            </div>
        );
    }
}
class Info extends React.Component{
     constructor(props){
        super(props)
        this.state={
            info:null
        }
    }
    componentDidMount(){
        var _this = this;
        $.ajax({
            type:'get',
            url:'/order/order/getVarietytradeIntro.do',
            data:{varietyId:_this.props.vId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data){
                    _this.setState({
                        info:e.data
                    })
                }
            }
        })
    }
    render(){
        var d = this.state.info;
        if(d){
            {var _time=d.tradeTime.split('//'),opsition=d.opsitionTime.split('//')}
             return(<div className="info">
                    <p><span>交易品种</span>{d.varietyName}</p>
                    <p><span>交易代码</span>{d.varietyType}</p>
                    <p className="info-time"><span>交易时间</span>{_time[0]}<div className='pt50'>{_time[1]}</div></p>
                    <p className="info-time"><span>持仓时间</span>{opsition[0]}<div className='pt50'>{opsition[1]}</div></p>
                    <p><span>交易单位</span>{d.tradeUnit}</p>
                    <p><span>报价单位</span>{d.reportPriceUnit}</p>
                    <p><span>最低保证金</span>{d.lowestMargin}</p>
                    <p><span>交易方式</span>{d.tradeType}</p>
                    <p><span>交易制度</span>{d.tradeRegime}</p>
                    <p><span>交割时间</span>{d.deliveryTime}</p>
                    <p className="info-time"><span>每日价格<br/>最大波动限制</span>{d.everydayPriceMaxFluctuateLimit}</p>
                    <style>{`
                        .info{
                            padding:0 .1rem;
                        }
                        .info p{
                            line-height:.35rem;
                            font-size:.12rem;
                            color:#0c0f16;
                        }
                        .info span{
                            display:inline-block;
                            width:.8rem;
                            color:#82848a;
                        }
                        .info p.info-time{
                            line-height:.18rem;
                        }
                        .pt50{padding-left:.8rem;}
                        .info  em{
                            display:inline-block;
                            width:.16rem;
                            height:.16rem;
                            border-radius:.08rem;
                            color:#fff;
                            line-height:.16rem;
                            text-align:center;
                            font-size:.1rem;
                            margin-right:.05rem;
                        }
                        em.summer{         
                            background:#cd4a47;
                        }
                        em.winter{         
                            background:#869bcb;
                        }
                    `}</style>
                </div>
                )
        }else{
            return <div><Text_none text="暂无简介" /></div>
        }
       
    }
}
class View extends React.Component{
    constructor(props){
        super(props)
        this.dates = this.dates.bind(this);
        this.txClick = this.txClick.bind(this);
        this.viewClick = this.viewClick.bind(this);
        this.isOk = this.isOk.bind(this);
        this.when = this.when.bind(this);
        this.state={
            confirm:{
                show:false,
                type:1,
                content:''
            }
        }
    }
    dates() {
        var e = function(e, r) {
            return (!r && 10 > e ? "0" : "") + e
        };
        return {
            format: function(r, a, t) {
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
        }
    }
    txClick(id){
        if(this.props.isLogin){
            Router.push({
                pathname:'/mobi/user/circle_user/userInfo',
                query:{id:id}
                
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请重新登录',
                    code:503
                }
            })
        }
        
    }
    viewClick(id){
        if(this.props.isLogin){
            Router.push({
                pathname:'/mobi/circle/components/service_detail',
                query:{viewpointId:id,type:'detail'}
            })
        }else{
            this.setState({
                confirm:{
                    show:true,
                    content:'您未登录，请重新登录',
                    code:503
                }
            })
        }
    }
    isOk(){
        this.setState({
            confirm:{
                show:false
            }
        })
    }
    when(t){
         var n = new Date().getTime(),
            Y = new Date().getFullYear(),
            M = new Date().getMonth() + 1,
            D = new Date().getDate(),
            l = function(e) {
                return (10 > e ? "0": "") + e
            },
            z = new Date((Y + '-' + l(M) + '-' + l(D) + ' 00:00:00')).getTime(),
            f;
        f = (Y-new Date(t).getFullYear())>0?'Y年M月D日':t - z <0?t-z<-86400000?'M月D日':'昨日 h:m':'h:m';
        return f;

    }
    render(){
        if(this.props.viewData.length){
            var ihigh = ['opinion_up.png','opinion_up_succeed.png','opinion_up_fail.png'],
                ilow = ['opinion_down@2x.png','opinion_down_succeed.png','opinion_down_fail.png'];
            
            return (<div>
                 {

                     this.props.viewData.map((e,i) => {
                        {var v = e.direction?ihigh:ilow;}
                         return(
                            <div  className='list' key={i}>
                               <div className='view-head'>
                                  <img src={e.userPortrait?e.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/mine/headportrait160x160@3x.png'} onClick={()=>{this.txClick(e.userId)}} />
                                  <span>{e.userName}</span>
                                  <em>{e.isAttention==1?'':'已关注'}</em>
                                  <em className='view-time'>{this.dates().format(e.createTime,this.when(e.createTime))}</em>
                               </div>
                               <div className='view-con' onClick={()=>{this.viewClick(e.id)}}>
                                    <span className={e.direction?"thigh":'tlow'}><img src={'/static/future/'+v[e.guessPass]} /></span>
                                    {e.content.length>45?e.content.substring(0,40)+'...':e.content}
                               </div>
                               <div className="view-foot" onClick={()=>{this.viewClick(e.id)}}>
                                    <span className="view-star">{e.praiseCount>999?'999+':e.praiseCount}</span>
                                    <span className="view-comm">{e.replyCount>999?'999+':e.replyCount}</span>
                               </div>
                               
                           </div>
                        )
                   
                    }) 
                }
                <Alert confirm={this.state.confirm}  isNot={this.isOk} isOk={this.isOk}/>

                <style>{`
                    .list{
                        padding:.15rem .1rem;
                        width:100%;
                        border-bottom:.01rem solid #e7e7e8;
                        
                    }
                    .view-head{
                        width:100%
                        height:.4rem;
                    }
                     .view-head img{
                        display:inline-block;
                        width:.35rem;
                        vertical-align:top;
                        border-radius: .18rem;
                        height: .35rem;
                     }
                    .view-head span{
                        color:#cd4a47;
                        font-size:.16rem;
                        line-height:.4rem;
                        padding:0 .05rem;
                    }
                    .view-head em{
                        color:#b3b3b3;
                        line-height:.4rem;
                        font-size:.12rem;
                    } 
                    .view-time{
                        float:right;
                    }
                    .view-con{
                        font-size:.13rem;
                        line-height:.24rem;
                        color:#82848a;
                    }
                    .view-con span{
                        display:inline-block;
                        width:.33rem;
                        height:.13rem;
                        margin-right:.05rem;
                    }
                   .view-con span img{
                        display:block;
                        margin-top:.01rem;
                        width:100%;
                   }
                    .view-foot{
                        width:100%;
                        height:.4rem;
                        position:relative;
                    }
                    .view-foot span{
                        line-height:.4rem;
                        color:#82848a;
                        display: inline-block;
                        line-height: .19rem;
                        padding-left: .22rem;
                        font-size: .12rem;
                        margin-top:.2rem;
                        float:right;
                    }

                    .view-foot .view-star{
                        color:#cd4a47;
                        background: url(/static/circle/futures_opinion_icon_like@3x.png) no-repeat .05rem .02rem;
                        background-size: 0.17rem;
                    }
                    .view-foot .view-comm{
                        background: url(/static/circle/circledetail_content_icon_discuss@3x.png) no-repeat .03rem;
                        margin-right:.05rem;
                        background-size: 0.17rem;
                    }
                    .view-bottom{
                        width:100%;
                        padding:.25rem 0;
                        background: #e7e7e8;
                        font-size:.14rem;
                        color:#82848a;
                        text-align:center;
                        display:block;
                    }
                   
                `}</style>
            </div>)
        }else{
            return <div><Text_none text="快来发表你的观点吧！" />
           
            </div>
        }       
    }
}
class Foot extends React.Component{
    constructor(props){
        super(props);
        this.handleCom=this.handleCom.bind(this);
        this.isOk=this.isOk.bind(this);
        this.setOptional = this.setOptional.bind(this);
        this.getOptional = this.getOptional.bind(this);
        this.optional = this.optional.bind(this);
        this.state={
            confirm:{
                show:false,
                type:1,
                content:''
            },
            optional:0
        }
    }
    handleCom(){
        var _this = this;
        $.ajax({
            type:'post',
            url:'/coterie/viewpoint/checkCalculate.do',
            data:{bigVarietyTypeCode:'future',varietyId:_this.props.vid},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    if(!e.data.isCalculate){
                        _this.props.model();
                    }else{

                        Router.push({
                            pathname:'/mobi/future/comment',
                            query:{type:e.data.direction,varietyId:_this.props.vid,bigVarietyTypeCode:'future',varietyType:_this.props.vtype,calcuId:e.data.calcuId}
                        })
                    }
                }else{
                    _this.setState({
                        confirm:{
                            show:true,
                            content:e.msg,
                            code:e.code
                        }
                    })
                }
                
            }
        })
    }
    isOk(){
        this.setState({
            confirm:{
                show:false
            }
        })
    }
    componentDidMount(){
        var _this = this;
        _this.getOptional();
    }
    getOptional(){
        var _this = this;
        $.ajax({
            type:'post',
            url:'/order/optional/checkOptional.do',
            data:{varietyId:_this.props.vid},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    _this.setState({
                        optional:e.data
                    })
                   
                }
                var  isLogin = e.code == 503?false:true
                _this.props.checkLogin(isLogin);
            }
        });
    } 
    optional(){
       this.setState({
            confirm:{
                type:2,
                show:true,
                content:'是否要取消自选'
            }
        })
    }
    setOptional(){
        var _this = this,
            url = this.state.optional?'/order/optional/deleteOptional.do':'/order/optional/addOptional.do';
        $.ajax({
            type:'post',
            url:url,
            data:{varietyId:_this.props.vid},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                     _this.setState({
                        confirm:{
                            type:1,
                            show:true,
                            content:_this.state.optional?'取消自选成功':'添加自选成功'
                        }
                    })
                    _this.getOptional();

                }else{
                    _this.setState({
                        confirm:{
                            type:1,
                            show:true,
                            content:e.msg,
                            code:e.code
                        }
                    })
                }
            }
        });
    }
    render(){
        return(<div className="foot">
            <span className="comment" onClick={this.handleCom}><em><img src="/static/future/futures_btn_opinion@2x.png" />发表观点</em></span>
            <span className="chooice" onClick={this.state.optional?this.optional:this.setOptional}><em>{this.state.optional?'取消自选':'+自选'}</em></span>
            <span className="trade"><em><img src="/static/future/futures_btn_trade@3x.png" /><Link href={'https://www.dajiexin.com/'}><a>交易</a></Link></em></span>
            <Alert type={this.state.confirm.type} confirm={this.state.confirm} isNot={this.isOk} isOk={this.state.confirm.type==1?this.isOk:this.setOptional}/>
            <style>{`
                .foot{
                    height:.45rem;
                    width:100%;
                    background:#cd4a47;
                    display:flex;
                    display:-webkit-flex;
                    position:fixed;
                    left:0;
                    bottom:0;
                    z-index:101;
                }
                .foot span{
                    color:#fff;
                    line-height:.38rem;
                    text-align:center;
                    font-size:.14rem;‘
                    display:block;
                    position:relative;
                    height:.38rem;
                    margin-top:.03rem;
                }
                .foot span em{
                    height:.16rem;
                    font-size:.14rem;
                    margin:0 auto;
                }

                .comment{

                    flex:2;
                    -webkit-flex:2;
                    position:relative;
                }
                .chooice{
                    border-left:0.01rem solid #fff;
                    border-right:0.01rem solid #fff;
                }
                .chooice,.trade{
                    flex:1;
                    -webkit-flex:1;
                }
                .comment em img,.trade em img{
                    display:inline-block;
                    width:.25rem;
                    vertical-align:middle;
                } 
                .foot .chooice em{
                    color:#fff;
                    font-size:.14rem;
                }
                
            `}</style>
        </div>)
    }
}

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
        this.toLoadView = this.toLoadView.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.mounted = true;
        this.websocket = null;
    }
    socket(c, d, callback){
        var code = c,_data = d,_this=this;
        var wsip = window.location.host+'/ws.do';
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
        this.serverRequest.abort();  
        this.mounted = false;
        this.websocket.close();
    }
    componentDidMount(){
        var _this = this;
        _this.socket(101,_this.props.data.contractsCode);
        
        _this.toLoadView()
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
    toLoadView(){
        var _this =this;
        _this.serverRequest=$.ajax({
            type:'get',
            url:'/coterie/viewpoint/findViewpoint.do',
            data:{page:_this.state.viewPage,pageSize:10,varietyId:_this.props.data.varietyId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data.length){
                    _this.setState({
                        viewData:_this.state.viewData.concat(e.data),
                        viewPage:_this.state.viewPage+1,
                        viewMore:e.resultCount>(_this.state.viewPage+1)*10?true:false
                    })
                }
            }
        })
    }
    render (){
        var d = this.props.data.exchangeStatus?this.state.data:null,
            t = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=='micromessenger'?'0':'0.5',
            s = {
                marginTop:t+'rem'
            },
            sacle = this.props.data.marketPoint;
        return <div className="content" style={s}>
            <div className='mdata'>
                <div className={d?d.upDropPrice>0?'tleft thigh':'tleft tlow':'tleft'}>
                    <span>{d?d.lastPrice.toFixed(sacle):'休市'}</span>
                    <em>{d?(d.upDropPrice>0?'+'+d.upDropPrice:d.upDropPrice):''}   {d?(d.upDropSpeed>0?'+'+(d.upDropSpeed*100).toFixed(2)+'%':(d.upDropSpeed*100).toFixed(2)+'%'):''}</em>
                </div>
                <div className='tright'>
                    
                    <div>
                        <em>最高</em>
                        <span>{this.state.data?this.state.data.highestPrice.toFixed(sacle):'--'}</span>
                        <em>最低</em>
                        <span>{this.state.data?this.state.data.lowestPrice.toFixed(sacle):'--'}</span>
                    </div>
                    <div>
                        <em>今开</em>
                        <span>{this.state.data?this.state.data.openPrice.toFixed(sacle):'--'}</span>
                        <em>{d?'昨收':'收盘'}</em>
                        <span>{this.state.data?d?this.state.data.preSetPrice.toFixed(sacle):this.state.data.lastPrice.toFixed(sacle):'--'}</span>
                    </div>
                </div>
            </div>
            <InfiniteScroll next={this.toLoadView} height={800} hasMore={this.state.viewMore} loader={ <span className="view-bottom">加载更多</span>} endMessage={<span className="view-bottom">已加载全部</span>}>
            <div className="chart-content ">
            <ul className="chart-title">
                <li className={this.state.type==100?'on':''} onClick={()=>{this.handleChart(1,100)}}>分时图</li>
                <li className={this.state.type==1440?'on':''} onClick={()=>{this.handleChart(2,1440)}}>日K</li>
                <li className={this.state.type==60?'on':''} onClick={()=>{this.handleChart(2,60)}}>60分钟</li>
                <li className={this.state.type==30?'on':''} onClick={()=>{this.handleChart(2,30)}}>30分钟</li>
                <li className={this.state.type==15?'on':''} onClick={()=>{this.handleChart(2,15)}}>15分钟</li>
            </ul>
            <section>
            <Sline chart={this.state.chart} scale={this.props.data.marketPoint} peroid={this.props.data.openMarketTime} code={this.props.data.contractsCode} data={this.state.data}/>
            <Kline chart={this.state.chart} type={this.state.type} code={this.props.data.contractsCode} scale={this.props.data.marketPoint}/>
            </section>
            </div>
            <TabController>
            <View viewData={this.state.viewData} isLogin={this.state.isLogin}/>
            <Info vId={this.props.data.varietyId}/>
            </TabController>
            </InfiniteScroll>
            <Foot model={this.showModel} vid={this.props.data.varietyId} vtype={this.props.data.varietyType} checkLogin={this.checkLogin}/>
            <Updown show={this.state.show} quota={this.state.data} model = {this.showModel} variety={this.props.data} bigVarietyTypeCode={'future'}/>
            <style>{`
                .hide {display:none}
                .quota_main{
                    background:#e7e7e8;
                }
                .quota_main em{
                    font-style:normal;
                }
                .mdata{
                    
                    background:#0c0f16;
                    display:flex;
                    display:-webkit-flex;
                    padding:.2rem;
                    width:100%;
                    position:fixed;
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
                    padding-top:1rem;
                }
               
                .tright div{
                    width:.7rem;
                    padding-left:.12rem;
                    float:right;
                }
                
                .tright div em{
                    font-size:.1rem;
                    color:#82848a;
                    display:block;
                }
                .tright div span{
                    font-size:.12rem;
                    color:#fff;
                    display:block;
                }
                .tright div:last-child{
                    border-right:.01rem solid #82848a;
                } 
                .chart-title{
                    width:100%;
                    display:flex;
                    display:-webkit-flex;
                    height:.4rem;
                    border-bottom:.005rem solid #e7e7e8;
                }
                .chart-title li{
                    flex:1;
                    -webkit-flex:1;
                    font-size:.12rem;
                    line-height:.4rem;
                    color:#0c0f16;
                    text-align:center;
                    position:relative;
                    background:#fff;
                }
                .chart-title li.on{
                    color:#869bcb;

                }
                .chart-title li.on:after{
                    content:'';
                    width:.5rem;
                    height:.01rem;
                    border-bottom:.01rem solid #869bcb;
                    position:absolute;
                    bottom:0rem;
                    left:50%;
                    margin-left:-.25rem;
                 }
                
                 
            `}</style>
        </div>
    }
}
export default  class  Future extends React.Component {
    constructor(props){
        super(props)
        var future = function(){
            var f = JSON.parse(localStorage.getItem('future')),v;
            for(var i=0;i<f.length;i++){
                if(f[i].varietyId == props.url.query.varietyId){
                    v = f[i];
                    break;
                }
               
            }

            return v;
        }
        
        this.state={
            vId:null,
            future:null,
        }
    }

     componentDidMount(){
        var _this = this;
       $.ajax({
            type:'get',
            url:'/order/order/getVarietyInfoById.do',
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
    
    render (){
        if(this.state.vId){
             return  <div className='quota_main'  ref="main" id="main">
                <Header_title text='乐米期货行情'/>
                <Head text={this.state.future.varietyName+'('+this.state.future.contractsCode+')'} little={this.state.future.smallVarietyTypeCode=='foreign'?'国际期货':'国内期货'} />
                 
                <Quota data={this.state.future}/>
                
                <style>{`
                    #head{position:fixed;z-index:99;top:0;left:0;}
                   .quota_main{background:#e7e7e8;padding-bottom:.45rem;}
                `}</style>
           </div>
       }else{
         return <div>loading...</div>
       }
        
        
         
    }
}
