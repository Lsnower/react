import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Text_none from '../common/text_none.js'

class TabController extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            item:['国际期货','国内期货'],
            current: 0
        };
    }

    itemNav = (index) => {
        return index === this.state.current ? 'on' : '';
    }

    itemCon = (index) => {
        return index === this.state.current ? 'con active' : 'con';
    }

    render(){
        return (
            <div>
                <nav>
                    {
                        this.state.item.map((element,index) => {
                            return (
                                <div key={index} onClick={ () => { this.setState({ current: index }) } } ><span className={ this.itemNav(index) }>{this.state.item[index] }</span></div>
                            )
                        })
                    }
                </nav>
                 <ul className='top'>
                    <li>名称</li>
                    <li>最新价格</li>
                    <li>涨跌幅</li>
                </ul>
                <div>
                    {
                        React.Children.map(this.props.children, (element,index) => {
                            return (
                                <div key={index} onClick={ () => { this.setState({ current: index }) } } className={ this.itemCon(index) }>{ element }</div>
                            )
                        })
                    }
                </div>
                
            </div>
        );
    }
}
class Flist extends React.Component {
    constructor(props){
        super(props)

    }
    hanleLink(e){
          Router.push({
            pathname:'/mobi/future/future_quota',
            query:{varietyId:e}
        })
    }
    render(){
        if(this.props.data){
            {var o = this.props.quota}
            return (
            <div className="main">
               <div>
                {

                    this.props.data.map((e,i) => {
                        return(
                            <div key={i} className='list' onClick={()=>{this.hanleLink(e.varietyId)}}>
                                <span>{e.varietyName}<em>{e.contractsCode}</em></span>
                                 <span className={o[e.contractsCode]?parseFloat(o[e.contractsCode].upDropPrice)<0?'price tlow':'price thigh':''}>{o[e.contractsCode]?o[e.contractsCode].lastPrice.toFixed(e.marketPoint):'--'}</span>
                                <span><b className={o[e.contractsCode]?parseFloat(o[e.contractsCode].upDropPrice)<0?'percent tlow':'percent thigh':''}>{o[e.contractsCode]?(parseFloat(o[e.contractsCode].upDropPrice)<0?'':'+')+o[e.contractsCode].upDropSpeed:'--'}</b></span>
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
class Slist extends React.Component {
    constructor(props){
        super(props)

    }
    hanleLink(e){
          Router.push({
            pathname:'/mobi/future/future_quota',
            query:{varietyId:e}
        })
    }
    render(){
        if(this.props.data){
            {var o = this.props.quota}
            return (
            <div className="main">
               <div>
                {

                    this.props.data.map((e,i) => {
                        return(
                            <div key={i} className='list' data-id={e.varietyId} onClick={()=>{this.hanleLink(e.varietyId)}}>
                                <span>{e.varietyName}<em>{e.contractsCode}</em></span>
                                <span className={o[e.contractsCode]?parseFloat(o[e.contractsCode].upDropPrice)<0?'price tlow':'price thigh':''}>{o[e.contractsCode]?o[e.contractsCode].lastPrice.toFixed(e.marketPoint):'--'}</span>
                                <span><b className={o[e.contractsCode]?parseFloat(o[e.contractsCode].upDropPrice)<0?'percent tlow':'percent thigh':''}>{o[e.contractsCode]?(parseFloat(o[e.contractsCode].upDropPrice)<0?'':'+')+o[e.contractsCode].upDropSpeed:'--'}</b></span>
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

export default  class  Future extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            guoji:[],
            guonei:[],
            quota:{}
        }
         this.timer = null;
         this.getQuota = this.getQuota.bind(this);
    }
    componentWillUnmount() {  
        this.serverRequest.abort();  
        clearTimeout(this.timer);
    }
    componentDidMount(){
        var that = this;
        this.serverRequest=$.ajax({
            type:'get',
            url:'/order/order/getVariety.do',
            data:{bigVarietyTypeCode:'future',page:0,pageSize:100},
            dataType:'json',
            success:function(e){
                if(e.code == 200){
                    var c = [],f = [];
                    localStorage.setItem('future', JSON.stringify(e.data));
                    for(var i=0;i<e.data.length;i++){
                        e.data[i].smallVarietyTypeCode == 'china' ? c.push(e.data[i]):f.push(e.data[i]);
                    }

                    that.setState({
                        guoji:f,
                        guonei:c
                    });
                }
            }
        }) 
        
        this.getQuota();
    }
    getQuota(){
        var that = this;
        $.ajax({
            type:'get',
            url:'/fut/quota/all.do',
            data:{},
            dataType:'json',
            success:function(e){
                if(e.code == 200&&e.data.length){
                    var o = {}
                   for(var i=0;i<e.data.length;i++){
                        o[e.data[i].instrumentId] = e.data[i]
                   }
                   that.setState({
                        quota:o
                   })
                }
            }
        });
        this.timer = setTimeout(function(){
            that.getQuota();
        },30000);
    }
    render (){

        return <div className="futures_main">
           
            <Header_title text='乐米期货'/>    
            <Head text="期货" />
            <TabController>
                <Flist data={this.state.guoji} quota={this.state.quota}/>
                <Slist data={this.state.guonei} quota ={this.state.quota}/>
           </TabController>

            <style>{`
                .futures_main{
                    background:#e7e7e8;
                }
                nav{
                    width:100%;
                    display:flex;
                    display:-webkit-flex;
                    background:#fff;
                }
                nav div{
                    flex:1;
                    -webkit-flex:1;
                    text-align:center;
                }
                nav  span{
                    line-height:.44rem;
                    color:#666;
                    font-size:.15rem;
                    display:block;
                    position:relative;
                }
                 nav span.on{
                    color:#222;
                }
                 nav span.on:after{
                    content:'';
                    border-bottom:.02rem solid #222;
                    width:.5rem;
                    position:absolute;
                    left:50%;
                    top:.42rem;
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
                    display:-webkit-flex;
                    background:#f5f5f5;
                    border-bottom:.01rem solid #f0efef;
                    padding-right:.1rem;
                }
                ul.top li{
                    flex:1;
                    -webkit-flex:1;
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
                background:#cd4a47;
               }
                div.list span b.tlow{
                background:#2ecc9f;
               }
            `}</style>
          </div>
        
    } 
}
