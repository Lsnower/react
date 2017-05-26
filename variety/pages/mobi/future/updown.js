import React from 'react'
import Router from 'next/router'
import Mystyle from './updowncss.js'

export default  class Updown extends React.Component{
    constructor(props){
        super(props)

        this.hanleComment=this.hanleComment.bind(this);
        this.hanleClick=this.hanleClick.bind(this);
    }
     
    hanleComment(v){
        var o = {};
        var q = this.props.quota;
        o['lastPrice']= q.stock_code?q.last_price:q.lastPrice;
        o['risePre']=q.stock_code?q.rise_pre+"%":(q.upDropSpeed*100).toFixed(2)+'%';
        o['risePrice']=q.stock_code?q.rise_pre>0?('+'+q.rise_pre):q.rise_pre:q.upDropPrice>0?('+'+q.upDropPrice):q.upDropPrice;
        localStorage.setItem('viewQuota', JSON.stringify(o));
        Router.push({
            pathname:'/mobi/future/comment',
            query:{type:v,varietyId:this.props.variety.varietyId,bigVarietyTypeCode:this.props.bigVarietyTypeCode,varietyType:this.props.variety.varietyType},
           
        })
    }
    routeRule(){
        Router.push({
            pathname:'/mobi/future/rule'
        })
    }
    hanleClick(e){
        this.props.model()
    }
     render(){
        return(<div className={this.props.show?'':'hide'}>
           <Mystyle />
            <div className="content">
                <div className="overlayUp msgboxUp" onClick={this.hanleClick}>
                    <div className="content">
                        <p>大神，来预测下一个交易日的涨跌！</p>
                        <div className="box">
                            <div>
                            <span className="thigh" onClick={()=>{this.hanleComment(1)}}>看涨</span>
                            </div>
                            <div>
                            <span className="tlow" onClick={()=>{this.hanleComment(0)}}>看跌</span>
                            </div>
                        </div>
                        <p className="rule"><span  onClick={this.routeRule}>预测规则</span></p>
                    </div>
                </div>
            </div>
        </div>)
     }
}