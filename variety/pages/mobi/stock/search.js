import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Text_none from '../common/text_none.js'

class Flist extends React.Component {
    constructor(props){
        super(props)
        this.hanleClick = this.hanleClick.bind(this);
    }
    hanleLink(e,d){
          Router.push({
            pathname:'/mobi/stock/stock_quota',
            query:{varietyType:e,varietyId:d}
        })
    }
    componentDidMount(){
        // 
    }
    hanleClick(){
        this.props.callback();
    }
    render(){
        console.log(this.props.data)
        if(this.props.data){
            {var o = this.props.quota}
            return (
            <div className="main">
               
               <div>
                {

                    this.props.data.map((e,i) => {
                        return(
                            <div key={i} className='list' onClick={()=>{this.hanleLink(e.varietyType,e.varietyId)}}>
                                <span>{e.varietyName}<em>{e.varietyType}</em></span>
                                 <span className='price'></span>
                                <span className='percent'></span>
                           </div>
                        )
                   
                    }) 
                }
                <p className="clearHis" onClick={this.hanleClick}></p>
                </div>

            </div>)
        }else{
            return <div></div>
        }       
    }
}

export default  class  search extends React.Component {
    constructor(props){
        super(props)
        this.searchStock = this.searchStock.bind(this);
        this.getQuota = this.getQuota.bind(this);
        this.clearData = this.clearData.bind(this);
        this.timer = null;
        this.state={
            value:'',
            list:null,
            quota:{}
        }
    }

    componentDidMount(){
        this.refs.searchText.focus();
    }
    searchStock(e){
        var _this = this;
        clearTimeout(_this.timer);
        var v = _this.refs.searchText.value;
        _this.timer=setTimeout(function(){
            $.ajax({
                type:'get',
                url:'/order/order/getStockVarietySearch.do',
                data:{search:v},
                dataType:'JSON',
                success:function(e) {
                    if(e.code==200){
                        _this.setState({
                            list:e.data
                        })
                        
                    }
                }
            })
        },300)
    }
    getQuota(d){
        if(d.length<=0){
            return false;
        }
        var a = [],_this = this;
        for(var i=0;i<d.length;i++){
            a.push(d[i].varietyType);
        }
        var v = a.join(',');
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
    }
    clearData(){
        this.setState({
            list:null
        })
    }
    render (){

        return <div className="futures_main">
           
            <Header_title text='乐米股票'/>    
            <Head text="股票" />
            <div className="search">
                <input type='text'  ref='searchText' onChange={this.searchStock} placeholder='股票名称、代码'  />
                <div className='search_icon'><img src='/static/future/shares_icon_search@3x.png' /></div> 
            </div>
            <Flist data={this.state.list} quota={this.state.quota} callback={this.clearData}/>
            <style>{`
                .futures_main,body{
                    background:#e7e7e8;
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
               .clearHis{
                    line-height:.35rem;
                    text-align:center;
                    font-size:.13rem;
                    color:#838489;
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
