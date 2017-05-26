/*
* @Author: Maolin
* @Date:   2017-05-08 17:42:11
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-25 10:11:20
*/
import React from 'react';
import Router from 'next/router';
import Bigger from '../user/circle_user/bigger_pic.js'
class Issure_con extends React.Component{
    constructor(props) {
        super(props);
        this.state={bigger:false,img:null,info:props.info}
        this.detail = this.detail.bind(this);
        this.bigger = this.bigger.bind(this);
    }
    componentWillUnmount(){
    }
    componentDidMount(){
        var t = this;
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            info:nextProps.info
        })
    }
    detail(e){
        if(this.props.query !== 'detail'){
            var t = this,
            id = isNaN(t.props.info.id)?t.props.info.dataId:t.props.info.id,
            userId = t.props.info.userId,
            lendType = t.props.lendType;
            Router.push({
              pathname: '/mobi/lend/lend_detail',
              query: {id:id,userId:userId,type:'detail',lendType:lendType}
            })
        }
         
    }
    bigger(img){
        this.setState({bigger:!this.state.bigger,img:img});
    }
    render(){
        if(this.state.info){
             var contentImg = this.state.info.contentImg ? this.state.info.contentImg.split(','):[];
                return(
                    <div>
                        <div>
                            <div onClick={()=>{this.detail()}}>
                                <ul className="lending">
                                    <li className="title">借款</li>
                                    <li>
                                        <p className="txt">需要金额</p>
                                        <strong className="num">{this.state.info.money?'￥'+this.state.info.money:'￥0'}</strong>
                                    </li>
                                    <li>
                                        <p className="txt">借款时间</p>
                                        <strong className="num">{this.state.info.days?this.state.info.days+'天':'0天'}</strong>
                                    </li>
                                    <li>
                                        <p className="txt">借款利息</p>
                                        <strong className="num colorR">{this.state.info.interest?'￥'+this.state.info.interest:'￥0'}</strong>
                                    </li>
                                </ul>

                                <p>{this.state.info.content?(this.props.query == 'detail'?this.state.info.content:(this.state.info.content.length>23?(this.state.info.content).substring(0,40)+'...':this.state.info.content)):'-'}</p>
                            </div>
                            <ul className="help-info" style={{height:contentImg.length?'':'.2rem'}}>
                            {
                                contentImg.map((e,i)=>{
                                    var bgImg = e?e+'?x-oss-process=image/resize,m_fill,h_200,w_200':'/static/circle/headportrait64x64@3x.png';
                                    return(
                                        <li className="help-img" key={i} style={{background:'url('+bgImg+') no-repeat left center',backgroundSize:'cover'}} onClick={()=>{this.bigger(bgImg)}}>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                            <Bigger show={this.state.bigger} hand={this.bigger} pic={this.state.img} type="lend"/>
                        </div>
                        <style jsx global>{`
                            html{-webkit-text-size-adjust:none;}
                        `}</style>
                        <style jsx>{`
                            .lending{
                                display: flex;
                                display: -webkit-flex;
                                width: 100%;
                                height: .66rem;
                                margin: .12rem 0; 
                                background: #f0f0f0;
                                border-radius: .04rem;
                            }
                            .lending .title{
                                display: inline-block;
                                width: .18rem;
                                padding: .16rem .03rem;
                                margin: 0 auto;
                                line-height: .14rem;
                                background: #cd4a47;
                                color: #fff;
                                border-radius: .04rem/.04rem 0 0 .04rem;
                                font-size: .12rem;
                            }
                            .lending li{
                                padding: .1rem 0;
                                text-align: center;
                                line-height: .2rem;
                            }
                            .lending li:nth-child(1){
                            }
                            .lending li:not(:nth-child(1)){
                                flex: 1;
                                -webkit-flex: 1;
                            }
                            .lending .txt{
                                font-size: .12rem;
                                color: #b7b8bb;
                                margin-bottom:.05rem;
                            }
                            .lending .num{
                                font-size: .18rem;
                                letter-spacing:.01rem;
                            }
                            .colorR{
                                color: #cd4a47;
                            }
                            .help-info{
                                width: 100%;
                                height: .8rem;
                                padding: .16rem 0 0;
                                overflow: hidden;
                            }
                            .help-img{
                                display: inline-block;
                                width: 23.7%;
                                height: .6rem;
                                background:#333;
                                border-radius: .04rem;
                                background:url('/static/circle/headportrait64x64@3x.png') no-repeat top center;
                                background-size: contain;
                                margin-right: 1.3%;
                            }
                            .help-info li:last-child{
                                margin-right:0;
                            }
                        `}</style>
                    </div>
                )
            }else{
                return <div></div>
            }
       
    }
}
export default Issure_con;
