import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Confirm from '../common/confirm.js';
export default  class Pk extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chooice:false,
            selectedFuture:null,
            config:null,
            coinType:0,
            coinNum:0,
            time:0
        }
        this.chooiceFuture=this.chooiceFuture.bind(this);
        this.future = this.future.bind(this);
        this.hanleChangeCoinType = this.hanleChangeCoinType.bind(this);
        this.hanleChangeCoinNum = this.hanleChangeCoinNum.bind(this);
        this.hanleChangeTime = this.hanleChangeTime.bind(this);
    }
    chooiceFuture(){
        this.setState({
            chooice:!this.state.chooice
        })
    }
    future(d){
        this.setState({
            selectedFuture:d,
            chooice:!this.state.chooice
        })
    }
    componentDidMount(){
        var that = this;
        $.ajax({
            type:'get',
            url:'/game/battleconfig/findBattleConfig.do',
            data:{},
            dataType:'json',
            success:function(e){
                if(e.code == 200){
                    that.setState({
                        config:e.data
                    });
                }
            }
        }) 
    }
    hanleChangeCoinType(e){
        this.setState({
            coinType:e
        })
    }
    hanleChangeCoinNum(e){
        this.setState({
            coinNum:e
        })
    }
    hanleChangeTime(e){
        this.setState({
            time:e
        })
    }
    render(){
        var config = this.state.config,
            gold = config?config.gold.split(','):[],
            integral = config?config.integral.split(','):[],
            times = config?config.time.split(','):[],
            coin = this.state.coinType != 3?gold:integral;
        return(<div>
            <Header_title text='期货PK'/> 
            <Head text="创建对战" />
            <div className='pk_main '>
                <div className='create_item clearfix'>
                    <span className="create_left name">期货</span>
                    <div className='create_right'>
                       <em className={this.state.selectedFuture?'selected double':'double'} onClick={this.chooiceFuture}>{this.state.selectedFuture?this.state.selectedFuture.varietyName:'选择期货'}</em> 
                    </div>
                </div>
                <div className='create_item clearfix'>
                    <span className="create_left type">模式</span>
                    <div className='create_right'>
                        <em className={this.state.coinType==2?'selected':''} onClick={()=>this.hanleChangeCoinType(2)}>元宝战</em> 
                        <em className={this.state.coinType==3?'selected':''} onClick={()=>this.hanleChangeCoinType(3)}>积分战</em>                     
                    </div>
                </div>
                 <div className='create_item clearfix'>
                    <span className="create_left money">赏金</span>
                    <div className='create_right'>
                        {
                            coin.map((e,i)=>{
                                var m = i%3==2?"nomargin":'';
                                return <em onClick={()=>this.hanleChangeCoinNum(e)} key={i} className={this.state.coinNum==e?'selected '+m:m}>{e}</em> 
                            })
                        }
                    </div>
                </div>
                 <div className='create_item clearfix'>
                    <span className="create_left time">时长</span>
                    <div className='create_right'>
                       {
                            times.map((e,i)=>{
                                var m = i%3==2?"nomargin":'';
                                return <em onClick={()=>this.hanleChangeTime(e)} key={i} className={this.state.time==e?'selected '+m:m}>{e}分钟</em> 
                            })
                        }
                    </div>
                </div>
                <div className='pk_buttons'>
                    <One vid={this.state.selectedFuture?this.state.selectedFuture.varietyId:0} coinType ={this.state.coinType} reward={this.state.coinNum} endTime={this.state.time}/>
                </div>
                <Selector show={this.state.chooice} callBack={this.future}/>
            </div>
           <style>{`
            .pk_main{
                background-image:url(/static/pk/futures_versus_bannerbg@2x.png);
                width:100%;
                min-height:95%;
                background-size: cover;
                padding:.1rem;
                position:absolute;
                padding-bottom:1rem;
            }
            .clearfix{overflow:hidden;}
            .create_item{
                clear:both;
                margin-top:.2rem;
            }
            .create_left{
                float:left;
                display:block;
                color:#999;
                font-size:.15rem;
                padding-left:.25rem;
                height:.3rem;
                line-height:.3rem;
            }
            span.name{
                background:url(/static/pk/futuresvs_create_futures@2x.png) .02rem no-repeat;
                background-size:.2rem;
            }
            span.type{
                background:url(/static/pk/futuresvs_create_model@2x.png) .02rem no-repeat;
                background-size:.2rem;
            }
             span.money{
                background:url(/static/pk/futuresvs_create_bounty@2x.png) .02rem no-repeat;
                background-size:.2rem;
            }
            span.time{
                background:url(/static/pk/futuresvs_create_time@2x.png) .02rem no-repeat;
                background-size:.2rem;
            }
            .create_right{
                float:left;
                padding-left:.15rem;
                width:2.45rem;
            }
            .create_right em{
                display:block;
                float:left;
                border:1px solid #4c4065;
                width:68px;
                height:30px;
                color:#fff;
                text-align:center;
                line-height:.3rem;
                font-size:.14rem;
                margin-right:.1rem;
                margin-bottom:.15rem;
            }
            .create_right em.nomargin{
                margin-right:0;
            }
            .create_right em.double{
                width:1.45rem;
            }
            .create_right em.selected{
                border:.01rem solid #ef6d6a;
            }
            .pk_buttons{
                width:100%;
                position:absolute;
                bottom:.1rem;
				left: 0rem;
             }
            `}</style>
        </div>)
     }
}

class One extends React.Component{
    constructor(props){
        super(props);
        this.create = this.create.bind(this);
        this.state = {
            confirm:{
                show:false,
                content:''
            }
        }
    }
    create(e){
        if(!e){return false;}
        var that = this,p = this.props;
        $.ajax({
            type:'post',
            url:'/game/battle/createBattle.do',
            data:{vartietyId:p.vid,coinType:p.coinType,reward:p.reward,endtime:p.endTime-0},
            dataType:'json',
            success:function(e){
               if(e.code==200){
                    Router.push({
                      pathname: '/mobi/pk/trade',
                      query:{varietyId:p.vid,battleId:e.data.id,batchCode:e.data.batchCode}
                    })
               }else{
                    that.setState({
                        confirm:{
                            show:true,
                            content:e.msg,
                            isOk:function(){
                                that.setState({
                                    confirm:{
                                        show:false
                                    }
                                });
                            }
                        }
                    })
               }
            }
        }) 
    }
    render(){
        {var flag = this.props.vid && this.props.coinType && this.props.reward && this.props.endTime}
        return(<div>
            <a onClick={()=>this.create(flag)} className={flag?'one_btn':'one_btn noselect'}></a>
            <p className='note'>发起对战成功后，赏金将会暂时冻结，对战胜利后返还，失败扣除</p>
            <Confirm type='1' confirm={this.state.confirm}/>
            <style>{`
               .one_btn{
                    display:block;
                    margin: .15rem auto;
                    background-image:url(/static/pk/futuresvs_create_btn_press@2x.png);
                    background-size:cover;
                    height:.45rem;
                    width:1.65rem;
               } 
               .noselect{
                    background-image:url(/static/pk/futuresvs_create_btn_failure@2x.png);
                    background-size:cover;
               }
               .note{
                	width:90%;
				    margin: 0 auto;
                	text-align:center;
                	font-size:.12rem;
                	color:#999;
               }
               
            `}</style>
        </div>)
    }
}
class Selector extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:props.show,
            data:null,
            selected:0
        }
        this.hanleClick = this.hanleClick.bind(this);
        this.hanleSelect = this.hanleSelect.bind(this);
        this.hanleOk = this.hanleOk.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            show:nextProps.show
        })
    }
    hanleClick(){
        this.setState({
            show:!this.state.show
        })
    }
    hanleOk(){
        var d = this.state.data[this.state.selected];
        this.hanleClick();
        this.props.callBack(d);
    }
    hanleSelect(e,i){
        this.setState({
            selected:i
        })
    }
    componentDidMount(){
        var that = this;
        $.ajax({
            type:'get',
            url:'/game/battleconfig/selectBattleVariety.do',
            data:{},
            dataType:'json',
            success:function(e){
                if(e.code == 200){
                    that.setState({
                        data:e.data
                    });
                }
            }
        }) 
    }
    render(){
        if(this.state.data){
            var d = this.state.data;
            return(<div className={this.state.show?'selector':'selector hide'}>
                <div className='selector_title'>
                    <span className="selector_title_left" onClick={this.hanleClick}>取消</span>
                    <span className="selector_title_right" onClick={this.hanleOk}>确定</span>
                </div>
                <div className="selector_main">
                    <ul >{
                        d.map((e,i) => {
                            {var index = i;}
                            return <li key={i} onClick={()=>{this.hanleSelect(e,index)}}className={i===this.state.selected?'on':''}>{e.varietyName+''+e.contractsCode}</li>
                        })
                    }
                    </ul>
                </div>
                <style>{`
                    .hide{display:none;}
                   .selector{
                        width:100%;
                        height:2rem;
                        position:fixed;
                        bottom:0;
                        left:0;
                        z-index:99;
                        background:#fff;
                        overflow:hidden;
                   }
                   .selector_title{
                        height:.32rem;
                        color:#999;
                        font-size:.16rem;
                        line-height:.32rem;
                        background:#f5f5f5;

                   }
                   .selector_title_left{
                        font-size:.16rem;
                        float:left;
                        padding-left:.1rem;
                   }
                   .selector_title_right{
                        font-size:.16rem;
                        float:right;
                        padding-right:.1rem;
                        color:#cd4a47;
                   }
                   .selector_main{
                        height:1.68rem;
                        overflow:scroll;
                        width:100%;
                   }
                   .selector_main ul{
                        width:100%;
                   }
                   .selector_main ul li{
                        height:.32rem;
                        width:100%;
                        text-align:center;
                        color:#999;
                        line-height:.32rem;
                   }
                   .selector_main ul li.on{
                        color:#222;
                        border-top:.01rem solid #ddd;
                        border-bottom:.01rem solid #ddd
                   }
                `}</style>
            </div>)
        }else{
            return <div></div>
        }
        
    }
}