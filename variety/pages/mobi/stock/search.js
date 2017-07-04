import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Text_none from '../common/text_none.js'
import Confirm from '../common/confirm.js';
class Flist extends React.Component {
    constructor(props){
        super(props)
        this.hanleClick = this.hanleClick.bind(this);
        this.state = {
                        confirm:{
                            show:false,
                            content:'',
                            code:''
                        }
                    };
    }
    hanleLink(e,d){
        var url = this.props.type=='future'?'/mobi/future/future_quota':'/mobi/stock/stock_quota'
        Router.push({
            pathname:url,
            query:{varietyType:e,varietyId:d}
        })
    }
    componentDidMount(){
         
    }
    hanleClick(){
        this.props.callback();
    }
    addOptional(v){
        var _this = this;
        $.ajax({
            type:'post',
            url:'/order/optional/addOptional.do',
            data:{varietyId:v},
            dataType:'JSON',
            success:function(e) {
                if(e.code==200){
                    _this.props.callback();
                }else{
                    _this.setState({
                        confirm:{
                            show:true,
                            content:e.msg,
                            code:e.code
                        }
                    });
                }
            }
        });
        return false;
    }
    isOk(){
        this.setState({
            confirm:{
                show:!this.state.confirm.show
            }
        });
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
                            <div key={i} className='list'>
                                <span onClick={()=>{this.hanleLink(e.varietyType,e.varietyId)}}>{e.varietyName}<em>{e.varietyType}</em></span>
                                <span className='price' onClick={()=>{this.hanleLink(e.varietyType,e.varietyId)}}></span>
                                <span className='percent' onClick={()=>this.addOptional(e.varietyId)}>{e.checkOptional?'已添加':''}<img className={e.checkOptional?'hide':''} src='/static/optional_add@2x.png' /></span>
                           </div>
                        )
                   
                    }) 
                }
                <p className="clearHis" onClick={this.hanleClick}></p>
                <Confirm type='1' confirm={this.state.confirm} isOk={this.isOk.bind(this)}/>

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
        var v = _this.refs.searchText.value,
            url = _this.props.url.query.type == 'future' ? '/order/future/query/search.do':'/order/stock/query/search.do'
        _this.timer=setTimeout(function(){
            $.ajax({
                type:'get',
                url:url,
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
    
    clearData(){
        this.setState({
            list:null
        })
    }
    render (){
        var t = this.props.url.query.type;
        return <div className="futures_main">
            <Header_title text='乐米股票、期货搜索'/>    
            <Head text={t?t=='stock'?'股票自选':'期货自选':"股票"} />
            <div className="search">
                <input type='text'  ref='searchText' onChange={this.searchStock} placeholder={t=='future'?'期货名称、代码':'股票名称、代码'}  />
                <div className='search_icon'><img src='/static/future/shares_icon_search@3x.png' /></div> 
            </div>
            <Flist data={this.state.list} quota={this.state.quota} callback={this.searchStock} type={t}/>
            <style>{`
                .futures_main,body{
                    background:#e7e7e8;
                }
                 
               
                 div.main{
                    background:#fff;
                }
                div.list{
                    width:100%;
                    display:flex;
                    display:-webkit-flex; 
                    padding:.1rem .15rem; 
                    border-bottom:.01rem solid #ddd;                  
                }
                div.list span{
                    flex:1;
                    -webkit-flex:1;
                    display:block;
                    font-size:.15rem;
                    color:#222;
                }
                div.list span em{
                    display:block;
                    font-size:.1rem;
                    font-style:normal;
                    color:#999;
                }
                div.list span.percent{
                    line-height:.32rem;
                    font-size:.15rem;
                    color:#999;
                    text-align:right;
                }
                span.thigh{
                    color:#cd4a47;
                }
               span.tlow{
                    color:#33d37e;
               }
               .percent img {
                    display:block;
                    width:.25rem;
                    float:right;
               }
               .percent img.hide{
                    display:none;
               }
               .clearHis{
                    line-height:.35rem;
                    text-align:center;
                    font-size:.13rem;
                    color:#838489;
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
            `}</style>
          </div>
        
    } 
}
