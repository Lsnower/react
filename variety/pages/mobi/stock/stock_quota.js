import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Updown from '../future/updown.js'
import Sline from '../stock/sline.js'
import Kline from '../stock/kline.js'
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
            item:['观点','新闻','财务'],
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
class FinanceInfo extends React.Component{
     constructor(props){
        super(props)
        this.state={
            info:null,
            company:''
        }
        this.hanleCompany=this.hanleCompany.bind(this);
    }
    componentDidMount(){
        var _this = this;
        $.ajax({
            type:'get',
            url:'/crawler/crawler/selectData.do',
            data:{type:"financial_summary",page:0,pageSize:15,code:_this.props.vId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data){
                    _this.setState({
                        info:e.data
                    })
                }
            }
        });
        $.ajax({
            type:'get',
            url:'/crawler/crawler/selectCompanyProfile.do',
            data:{code:_this.props.vId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data){
                    _this.setState({
                        company:e.data.companyName
                    })
                }
            }
        })
       
    }
    hanleCompany(){
        var _this=this;
        Router.push({
            pathname:'/mobi/stock/company',
            query:{code:_this.props.vId}
        })
    }
    render(){
        var d = this.state.info;
        if(d){
            return(<div>
            <div className='company' onClick={this.hanleCompany}>
                <img src='/static/future/shares_finance_icon_company@2x.png' />
                {this.state.company}
                <span className="arrow"></span>
            </div>
            {
                d.map((d,i) => {
                    {var t = d.jiezhiriqi.split('-'),s={1:'一',2:'二',3:'三',4:'四'},j = s[parseInt(t[1])/3];}
                    return(
                        <div className="info" key={i}>
                            <h3>{t[0]+'年第'+j+'季度'} (截止日期{d.jiezhiriqi})</h3>
                            <p><span>每股净资产</span>{d.meigujinzichan||'-'}</p>
                            <p><span>每股收益</span>{d.meigushouyi||'-'}</p>
                            <p><span>每股现金含量</span>{d.meiguxianjinhanliang||'-'}</p>
                            <p><span>每股资本公积金</span>{d.meiguzibengongjijin||'-'}</p>
                            <p><span>固定资产合计</span>{d.gudingzichanheji||'-'}</p>
                            <p><span>流动资产合计</span>{d.liudongzichanheji||'-'}</p>
                            <p><span>资产总计</span>{d.zichanzongji||'-'}</p>
                            <p><span>长期负债合计</span>{d.changqifuzaiheji||'-'}</p>
                            <p><span>主营业务收入</span>{d.zhuyingyewushouru||'-'}</p>
                            <p><span>财务费用</span>{d.caiwufeiyong||'-'}</p>
                            <p><span>净利润</span>{d.jinlirun||'-'}</p>
                        </div>
                    )
                }) 
            }
                
                    <style>{`
                        .company{
                            height:.5rem;
                            line-height:.5rem;
                            color:#869bcb;
                            font-size:.16rem;
                            position:relative;
                        }
                        .company img{
                            display:inline-block;
                            width:.2rem;
                            height:.2rem;
                            margin:0 .1rem;
                            vertical-align:middle;
                            margin-top: -.03rem;
                        }
                        .company .arrow{
                            border-top: .01rem solid #82848a;
                            border-right: .01rem solid #82848a;
                            transform:rotate(45deg);
                            -moz-transform:rotate(45deg);    
                            -webkit-transform:rotate(45deg); 
                            width:.12rem;
                            height: .12rem;
                            position: absolute;
                            top: .19rem;
                            right: .15rem;
                        }
                        .info p{
                            line-height:.35rem;
                            font-size:.12rem;
                            color:#0c0f16;
                            padding-left:.1rem;
                        }
                        .info span{
                            display:inline-block;
                            width:1.2rem;
                            color:#82848a;
                        }
                        .info h3{
                            width:100%;
                            height:.32rem;
                            color:#82848a;
                            line-height:.32rem;
                            font-size:.13rem;
                            background:#e7e7e8;
                            padding-left:.1rem;
                            margin-bottom:.1rem;
                        }
                        .info p.info-time{
                            line-height:.18rem;
                        }
                        .pt50{padding-left:.83rem;}
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
class News extends React.Component{
    constructor(props){
        super(props) 
        this.state={
            news:null
        }  
        this.dates = this.dates.bind(this);
    }
     componentDidMount(){
        var _this = this;
        $.ajax({
            type:'get',
            url:'/crawler/crawler/selectData.do',
            data:{type:"stock_news",page:0,pageSize:100,code:_this.props.vId},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data){
                    _this.setState({
                        news:e.data
                    })
                }
            }
        });
         
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
    toNews(id){
        Router.push({
            pathname: '/mobi/common/article',
            query : {
                id : id,
                myUrl : 3
            }
        })
    }
    render(){
        var d = this.state.news;
        if(d){
            return(<ul className="news">
            {
                d.map((d,i) => {
                    return(
                        <li key={i} onClick={()=>{this.toNews(d.id)}}>
                            <p className='ht'>{d.title}</p>
                            <p>{d.from}  {this.dates().format(d.time,'Y-M-D h:m')}</p>
                        </li>
                    )
                }) 
            }
            <style>{`
            ul.news{
                width:100%;
            }
            ul.news li{
                border-bottom:.01rem solid #efefef;
                padding:.1rem 0;

            }
            ul.news li p{
                padding-left:.1rem;
                color:#B3B3B3;
                font-size:.12rem;
            }
            ul.news li p.ht{
                color:#0C0F16;
                line-height:.2rem;
                font-size:.15rem;
            }
            `}</style>
        </ul>)
        }else{
            return <Text_none text="暂无资讯！" />
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
                ilow = ['opinion_down.png','opinion_down_succeed.png','opinion_down_fail.png'];
            
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
                        background:none;
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
                        background-size: 0.17rem;
                        margin-right:.05rem;
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
            <span className="comment" onClick={this.handleCom}><em><img src="/static/future/futures_btn_opinion@3x.png" />发表观点</em></span>
            <span className="chooice" onClick={this.state.optional?this.optional:this.setOptional}><em>{this.state.optional?'取消自选':'+自选'}</em></span>
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
                    padding-left:.2rem;
                }

                .comment{

                    flex:2;
                    -webkit-flex:2;
                    position:relative;
                }
                .chooice{
                    border-left:0.01rem solid #fff;
                }
                .chooice,.trade{
                    
                    flex:1;
                    -webkit-flex:1;
                }
                .comment em img{
                    display:inline-block;
                    width:.25rem;
                    vertical-align:middle;
                } 
                .foot .chooice em{
                    color:#fff;
                    font-size:.14rem;
                    padding-left:0;
                }
                .trade em{
                    background:url(/static/future/futures_btn_trade@3x.png) left center no-repeat;
                    
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
        this.stockQuota = this.stockQuota.bind(this);
        this.toLoadView = this.toLoadView.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.mounted = true;
        this.quota = true;
        this.timer = null;
    }
    stockQuota(){
        var _this = this;
        clearTimeout(_this.timer);
        if(_this.quota){
         $.ajax({
                type:'get',
                url:'/stock/realtime',
                data:{stock_code:_this.props.data.varietyType},
                dataType:'JSON',
                success:function(e){
                    _this.setState({
                        data:e.result[0].data[0]
                    })
                }
            })
         if(_this.props.data.exchangeStatus){
            this.timer = setTimeout(function(){
                _this.stockQuota();
             },5000);
         }
         
        }
        
    }
    componentWillUnmount() {  
        this.serverRequest.abort();  
        this.mounted = false;
        this.quota = false;
    }
    componentDidMount(){
        var _this = this;
        _this.stockQuota();        
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
        var d = this.state.data,
            t = window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=='micromessenger'?'0':'0.5',
            s = {
                marginTop:t+'rem'
            };

        return <div className="content" style={s}>
            <div className={d?d.rise_pre>0?'mdata thigh':'mdata tlow':'mdata'}>
                <span className="nomarket">{this.props.data.exchangeStatus?'':'休市'}</span>
                <div className='tleft'>
                    <span>{d?d.last_price:''}</span>
                    <em>{d?d.rise_price>0?'+'+d.rise_price:d.rise_price:''}   {d?d.rise_pre>0?'+'+d.rise_pre+'%':d.rise_pre+'%':''}</em>
                </div>
                <div className='tright'>
                    <div>
                        <em>最高</em>
                        <span>{this.state.data?this.state.data.high_price:'--'}</span>
                        <em>最低</em>
                        <span>{this.state.data?this.state.data.low_price:'--'}</span>
                    </div>
                    <div>
                        <em>今开</em>
                        <span>{this.state.data?this.state.data.open_price:'--'}</span>
                        <em>昨收</em>
                        <span>{this.state.data?this.state.data.prev_price:'--'}</span>
                    </div>
                </div>
            </div>
            <InfiniteScroll next={this.toLoadView} height={800} hasMore={this.state.viewMore} loader={ <span className="view-bottom">加载更多</span>} endMessage={<span className="view-bottom">已加载全部</span>}>
            <div className="chart-content ">
            <ul className="chart-title">
                <li className={this.state.type==100?'on':''} onClick={()=>{this.handleChart(1,100)}}>分时图</li>
                <li className={this.state.type==6?'on':''} onClick={()=>{this.handleChart(2,6)}}>日K</li>
                <li className={this.state.type==7?'on':''} onClick={()=>{this.handleChart(2,7)}}>周K</li>
                <li className={this.state.type==8?'on':''} onClick={()=>{this.handleChart(2,8)}}>月K</li>
            </ul>
            <section>
            <Sline chart={this.state.chart} scale={this.props.data.marketPoint} peroid={this.props.data.openMarketTime} code={this.props.data.varietyType} data={this.state.data}/>
            <Kline chart={this.state.chart} type={this.state.type} code={this.props.data.varietyType} scale={this.props.data.marketPoint}/>
            </section>
            </div>
            <TabController>
            <View viewData={this.state.viewData} isLogin={this.state.isLogin}/>
            <News vId={this.props.data.varietyType}/>
            <FinanceInfo vId={this.props.data.varietyType}/>
            </TabController>
            </InfiniteScroll>
            <Foot model={this.showModel} vid={this.props.data.varietyId} vtype={this.props.data.varietyType} checkLogin={this.checkLogin}/>
            <Updown show={this.state.show} quota={this.state.data} model = {this.showModel} variety={this.props.data} bigVarietyTypeCode={'stock'}/>
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
                .mdata .nomarket{
                    display:block;
                    position:absolute;
                     top: -.17rem;
                    left: 50%;
                    margin-left: -.12rem;
                    color: #fff;
                    font-size:.12rem;
                }
                .mdata div{
                    flex:1;
                    -webkit-flex:1;
                }
                
                .mdata .tleft span{
                    font-size:.38rem;
                    display:block;
                    color:#fff;
                } 
                .thigh{
                    background:#cd4a47;
                }
                .tlow{
                    background:#33d37e;
                }
                .mdata .tleft em{
                    font-size:.14rem;
                    display:block;
                    color:#fff;
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
                    color:rgba(255, 255, 255, 0.4);
                    display:block;
                }
                .tright div span{
                    font-size:.12rem;
                    color:#fff;
                    display:block;
                }
                .tright div:last-child{
                    border-right:.01rem solid  rgba(255, 255, 255, 0.4);
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
export default  class  Stock extends React.Component {
    constructor(props){
        super(props)
        
        this.state={
            vId:null,
            future:null
        }
    }

    componentDidMount(){
        var _this = this;
       $.ajax({
            type:'get',
            url:'/order/stock/query/info.do',
            data:{code:_this.props.url.query.varietyType},
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
                <Header_title text='乐米股票行情'/>
                <Head text={this.state.future.varietyName+'('+this.state.future.varietyType+')'}/>
                 
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
