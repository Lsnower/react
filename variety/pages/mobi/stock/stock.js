import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Text_none from '../common/text_none.js'
import InfiniteScroll from 'react-infinite-scroll-component'

class Flist extends React.Component {
    constructor(props){
        super(props)
        this.state={
            quota:{},
            codes:[]
        }
        this.getQuota = this.getQuota.bind(this);
          this.timer=null;
        this.isMouted=true;
    }
    hanleLink(e,d){
        Router.push({
            pathname:'/mobi/stock/stock_quota',
            query:{varietyType:e,varietyId:d}
        })
    }
    componentWillReceiveProps(nextProps){
         var a = [],_this = this;
        for(var i=0;i<nextProps.data.length;i++){
            a.push(nextProps.data[i].varietyType);
        }
        _this.setState({
            codes:a
        },function(){
            _this.getQuota();
        })
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        this.isMouted = false;
    }
    getQuota(){   
        if(this.isMouted){
            var _this=this,v = _this.state.codes.join(',');
            $.ajax({
                type:'post',
                url:'/stock/comb',
                data:{stock_code:v},
                dataType:'JSON',
                success:function(e) {
                    var d = e.result[0].data,o={};
                    for(var i=0;i<d.length;i++){
                            o[d[i].stock_code] = d[i]
                       }
                        _this.setState({
                            quota:o
                        })
                }
            })
             _this.timer=setTimeout(function(){
                _this.getQuota();
            },5000)  
        }
        
    }
    render(){
        if(this.props.data){
            {var o = this.state.quota}
            return (
            <div className="main">

                <ul className='top'>
                    <li>名称</li>
                    <li>最新价格</li>
                    <li>涨跌幅</li>
                </ul>

               <div>
                {

                    this.props.data.map((e,i) => {
                        return(
                            <div key={i} className='list' onClick={()=>{this.hanleLink(e.varietyType,e.varietyId)}}>
                                <span>{e.varietyName}<em>{e.varietyType}</em></span>
                                 <span className={o[e.varietyType]&&parseFloat(o[e.varietyType].rise_price)<0?'price tlow':'price thigh'}>{o[e.varietyType]?o[e.varietyType].last_price:''}</span>
                                <span className={o[e.varietyType]&&parseFloat(o[e.varietyType].rise_price)<0?'percent tlow':'percent thigh'}>{o[e.varietyType]?(parseFloat(o[e.varietyType].rise_price)<0?'':'+')+o[e.varietyType].rise_pre+'%':''}</span>
                           </div>
                        )
                   
                    }) 
                }
                </div>
            </div>)
        }else{
            return <div><Text_none text="暂无品种" /></div>
        }       
    }
}
class Exponent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            exponent:null,
            quota:{},
            exponentIds:null
        }
        this.timer=null;
        this.isMouted=true;
    }
    hanleLink(e,d){
          Router.push({
            pathname:'/mobi/stock/exponent_quota',
            query:{varietyType:e,varietyId:d}
        })
    }
    componentDidMount(){
        var _this = this;
        $.ajax({
            type:'get',
            url:'/order/order/getStockExponentVariety.do',
            data:{},
            dataType:'JSON',
            success:function(e) {
                if(e.code==200&&e.data.length>0){
                    _this.setState({
                        exponent:e.data
                    })
                    var a = [];
                    for(var i=0;i<e.data.length;i++){
                        a.push(e.data[i].varietyType);
                    }
                    _this.setState({
                        exponentIds:a
                    })
                    _this.getQuota(a);
                };
            }
        })
    }
    componentWillUnmount(){
        this.isMouted = false;
    }
    getQuota(d){
        if(this.isMouted){
            clearTimeout(this.timer);
            var v = d?d.join(','):this.state.exponentIds.join(','),_this=this;
            $.ajax({
                type:'get',
                url:'/stock/comb',
                data:{stock_code:v},
                dataType:'JSON',
                success:function(e) {
                    var d = e.result[0].data,o={};
                    for(var i=0;i<d.length;i++){
                            o[d[i].stock_code] = d[i]
                       }
                        _this.setState({
                            quota:o
                        })
                }
            })
            _this.timer=setTimeout(function(){
                _this.getQuota();
            },5000)  
        }
        
       
    }
    render(){
        if(this.state.exponent){
            {var o = this.state.quota}
            return(<div className="Exponent">
                {

                    this.state.exponent.map((e,i) => {
                        return(
                            <div className='item' key={i} onClick={()=>{this.hanleLink(e.varietyType,e.varietyId)}}>
                                <span className="name">{e.varietyName}</span>
                                <span className={o[e.varietyType]&&parseFloat(o[e.varietyType].rise_price)<0?'price tlow':'price thigh'}>{o[e.varietyType]?o[e.varietyType].last_price:''}</span>
                                <span className={o[e.varietyType]&&parseFloat(o[e.varietyType].rise_price)<0?'range tlow':'range thigh'}>{o[e.varietyType]?o[e.varietyType].rise_price+'  '+(parseFloat(o[e.varietyType].rise_price)<0?'':'+')+o[e.varietyType].rise_pre+'%':''}</span>
                               
                            </div>
                        )
                   
                    }) 
                }
                
                <style>{`
                    .Exponent{
                        width:100%;
                        padding:.1rem;
                        display:flex;
                        display:-webkit-flex;
                        background:#fff;
                        margin-bottom:.1rem;
                    }
                    .Exponent .item{
                        flex:1;
                        -webkit-flex:1;
                    }
                    .Exponent .item:nth-child(2){
                        border-left:.01rem solid #f0efef;
                        border-right:.01rem solid #f0efef;
                    }
                    .Exponent .item span{
                        display:block;
                        width:100%;
                        text-align:center;
                        line-height:.22rem;
                    }
                    .Exponent .item span.name{
                        font-size:.15rem;
                        color:#0c0f16;

                    }
                    .Exponent .item span.price{
                        font-size:.17rem;
                        font-weight:bold;

                    }
                    .Exponent .item span.range{
                        font-size:.1rem;
                    }
                    .Exponent .item span.thigh{
                        color:#cd4a47;
                    }
                    .Exponent .item span.tlow{
                        color:#33d37e;
                    }
                `}</style>
            </div>)
        }else{
            return <div className="Exponent"></div>
        }
        
    }
}

export default  class  Stock extends React.Component {
    constructor(props){
        super(props)
         this.state={
            viewData:[],
            viewPage:0,
            viewMore:true
        }
        this.toLoadView=this.toLoadView.bind(this);
    }

    componentDidMount(){
         var _this = this;
         _this.toLoadView()
    }
    toLoadView(){
        var _this =this;
        _this.serverRequest=$.ajax({
            type:'get',
            url:'/order/order/getStockVariety.do',
            data:{page:_this.state.viewPage,pageSize:15},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data.length){
                    _this.setState({
                        viewData:_this.state.viewData.concat(e.data),
                        viewPage:_this.state.viewPage+1,
                        viewMore:e.resultCount>(_this.state.viewPage+1)*15?true:false
                    })
                }
            }
        })
    }
   hanleFocus(){
        Router.push({
            pathname:'/mobi/stock/search'
        })
   }
    render (){

        return <div className="futures_main">
           
            <Header_title text='乐米股票'/> 
            <InfiniteScroll next={this.toLoadView} height={800} hasMore={this.state.viewMore} loader={ <span className="view-bottom">加载更多</span>} endMessage={<span className="view-bottom">已加载全部</span>}>
   
            <Head text="股票" />
            <div className="search">
                <input type='text' placeholder='股票名称、代码' onFocus={this.hanleFocus}/>
                <div className='search_icon'><img src='/static/future/shares_icon_search@3x.png' /></div> 
            </div>
            <Exponent />
            <Flist data={this.state.viewData}/>
            </InfiniteScroll>

            <style>{`
                .futures_main{
                    background:#e7e7e8;
                }
                 nav{
                    width:100%;
                    display:flex;
                    display:-weblit-flex;
                    background:#fff;
                }
                nav div{
                    flex:1;
                    -webkit-flex:1;
                    text-align:center;
                }
                nav  span{
                    line-height:.5rem;
                    color:#0c0f16;
                    font-size:.16rem;
                    display:block;
                    position:relative;
                }
                 nav span.on{
                    color:#869bcb;
                }
                 nav span.on:after{
                    content:'';
                    border-bottom:.02rem solid #869bcb;
                    width:.5rem;
                    position:absolute;
                    left:50%;
                    top:.48rem;
                    margin-left:-.25rem;
                }
                div.con{
                    display:none;
                }
                div.active{
                    display:block;
                }
                ul.top{
                    width:100%;
                    display:flex;
                    margin-top:.1rem;
                    background:#fff;
                    border-bottom:.01rem solid #f0efef;
                }
                ul.top li{
                    flex:1;
                    text-align:left;
                    padding-left:.12rem;
                    font-size:.14rem;
                    color:#82848a;
                    line-height:.36rem;
                }
                 div.main{
                    background:#fff;
                }
                div.list{
                    width:100%;
                    display:flex;
                    display:-webkit-flex; 
                    padding:.1rem 0; 
                    border-bottom:.01rem solid #f0efef;                  
                }
                div.list span{
                    flex:1;
                    -webkit-flex:1;
                    display:block;
                    padding-left:.12rem;
                    font-size:.16rem;
                }
                div.list span em{
                    display:block;
                    font-size:.12rem;
                    font-style:normal;
                    color:#82848a;
                }
                span.price,span.percent{
                    line-height:.32rem;
                    
                    font-size:.16rem;
                }
                span.thigh{
                    color:#cd4a47;
                }
               span.tlow{
                    color:#33d37e;
               }
               .search{
                 padding:.15rem;
                 background:#160509;
                 position:relative;
               }
               .search input{
                    display:block;
                    width:100%;
                    padding-left:.13rem;
                    font-size:.15rem;
                    height:.35rem;
                    line-height:.35rem;
                    background:#fff;
                    border-radius:.05rem;
                    color:#e7e7e8;
               }
               .search_icon{
                    position:absolute;
                    top:.15rem;
                    right:.15rem;
                    width:.63rem;
                    height:.35rem;
                    border-left:.01rem solid #f0efef;
               }
               .search_icon img{
                    display:block;
                    margin:.03rem auto;
                    height:80%;
               }
            `}</style>
          </div>
        
    } 
}
