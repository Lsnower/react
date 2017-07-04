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
            clearTimeout(this.timer);
            var _this=this,v = _this.state.codes.join(',');
            $.ajax({
                type:'post',
                url:'/stk/stk/list.do',
                data:{codes:v},
                dataType:'JSON',
                success:function(e) {
                    var d = e.data,o={};
                    for(var i=0;i<d.length;i++){
                            o[d[i].instrumentId] = d[i]
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
						var isTp = '';
						var isTpclass1 = '';
						var isTpclass2 = '';
						if((o[e.varietyType]?o[e.varietyType].status:1)==0){
							isTp = '停牌';
							isTpclass1 = 'price';
							isTpclass2 = 'percent tpnone'
						}
						else{
							isTp = o[e.varietyType]?(parseFloat(o[e.varietyType].upDropPrice)<0?'':'+')+(o[e.varietyType].upDropSpeed*100).toFixed(2)+'%':'';
							isTpclass1 = o[e.varietyType]&&parseFloat(o[e.varietyType].upDropPrice)<0?'price tlow':'price thigh';
							isTpclass2 = o[e.varietyType]&&parseFloat(o[e.varietyType].upDropPrice)<0?'percent tlow':'percent thigh';
						}
                        return(
                            <div key={i} className='list' onClick={()=>{this.hanleLink(e.varietyType,e.varietyId)}}>
                                <span>{e.varietyName}<em>{e.varietyType}</em></span>
                                <span className={isTpclass1}>{o[e.varietyType]?o[e.varietyType].lastPrice.toFixed(e.marketPoint):''}</span>
                                <span><b className={isTpclass2}>{isTp}</b></span>
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
                type:'post',
                url:'/stk/stk/list.do',
                data:{codes:v},
                dataType:'JSON',
                success:function(e) {
                    var d = e.data,o={};
                    for(var i=0;i<d.length;i++){
                            o[d[i].instrumentId] = d[i]
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

                                <span className={o[e.varietyType]&&parseFloat(o[e.varietyType].upDropPrice)<0?'price tlow':'price thigh'}>{o[e.varietyType]?o[e.varietyType].lastPrice.toFixed(2):''}</span>
                                <span className='range'>{o[e.varietyType]?(parseFloat(o[e.varietyType].upDropPrice)<0?'':'+')+o[e.varietyType].upDropPrice.toFixed(2)+'  '+(parseFloat(o[e.varietyType].upDropPrice)<0?'':'+')+(o[e.varietyType].upDropSpeed*100).toFixed(2)+'%':''}</span>
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
                        color:#222;

                    }
                    .Exponent .item span.price{
                        font-size:.18rem;
                        font-weight:bold;

                    }
                    .Exponent .item span.range{
                        font-size:.1rem;
                        color:#999;
                    }
                    .Exponent .item span.thigh{
                        color:#cd4a47;
                    }
                    .Exponent .item span.tlow{
                        color:#2ecc9f;
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
                <div className='search_icon'><img src='/static/future/shares_icon_search@3x.png' /></div> 
                <input type='text' placeholder='股票名称、代码' onFocus={this.hanleFocus}/>
            </div>
            <Exponent />
            <Flist data={this.state.viewData}/>
            </InfiniteScroll>

            <style>{`
                .futures_main{
                    background:#e7e7e8;
                }
               
                div.con{
                    display:none;
                }
                div.active{
                    display:block;
                }
                .search {
                    padding: .1rem;
                    background: #c9c9ce;
                    position: relative;
                }
                .search input {
                    display: block;
                    width: 100%;
                    padding-left: .35rem;
                    font-size: .14rem;
                    height: .30rem;
                    line-height: .30rem;
                    background: #fff;
                    border-radius: .05rem;
                    color: #8e8e93;
                }
                .search_icon {
                    position: absolute;
                    top: .1rem;
                    left: .1rem;
                    width: .3rem;
                    height: .3rem;
                }
                .search_icon img {
                    display: block;
                    margin: .06rem auto;
                    height: 60%;
                }
                ul.top{
                    width:100%;
                    display:flex;
                    background:#f5f5f5;
                    border-bottom:.01rem solid #f0efef;
                    padding-right:.1rem;
                }
                ul.top li{
                    flex:1;
                    text-align:left;
                    padding-left:.12rem;
                    font-size:.1rem;
                    color:#999;
                    line-height:.32rem;
                }
                ul.top li:first-child{
                    flex:2;
                    -webkit-flex:2;
                }
                 ul.top li:last-child{
                    text-align:right;
                }
                 div.main{
                    background:#fff;
                }
                div.list{
                    width:100%;
                    display:flex;
                    display:-webkit-flex; 
                    padding:.12rem 0; 
                    border-bottom:.01rem solid #f0efef; 
                    padding-right:.1rem;                 
                }
                div.list span{
                    flex:1;
                    -webkit-flex:1;
                    display:block;
                    padding-left:.12rem;
                    
                }
                 div.list span:first-child{
                    flex:2;
                    -webkit-flex:2;
                    color:#222;
                    font-size:.15rem;
                }
                div.list span em{
                    display:block;
                    font-size:.1rem;
                    font-style:normal;
                    color:#999;
                }
                span.price,span.percent{
                    line-height:.32rem;
                    color:#838489;
                    font-size:.17rem;
                }
                span.thigh{
                    color:#cd4a47;
                }
               span.tlow{
                    color:#2ecc9f;
               }
               div.list span b{
                    width:.7rem;
                    height:.27rem;
                    display:block;
                    color:#fff;
                    text-align:center;
                    line-height:.27rem;
                    font-size:.15rem;
                    float: right;
                    font-weight: normal;
               }
               div.list span b.thigh{
                background:#ef6d6a;
               }
                div.list span b.tlow{
                background:#2ecc9f;
               }
				div.list span b.tpnone{
					background: #838489;
				}
            `}</style>
          </div>
        
    } 
}
