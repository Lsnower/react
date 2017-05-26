import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
export default class Component extends React.Component {
    constructor(props){
        super(props)
        
    }

    render() {
        return <div>
       
            <Header_title text='观点预测规则'/>
            <Head text="预测规则" />
            <div className="rule-main">
                <p>1.当前交易日开市后到下一个交易日开市前，预测下一个交易日的价格涨跌</p> 
                <p>2.价格涨跌以开盘价与收盘价对比，开盘价高于收盘价则价格跌，开盘价低于收盘价，则价格涨</p>
                <p>3.每个预测时间段内预测一次后，将不能进行重复预测</p>
                <p>4.预测成功率高的用户，将会登上我们的观点大神排行榜</p>
            </div>

            <style>{`
                .rule-main{
                    position:relative;
                    padding:.1rem;
                    background:#fff;
                }
                .rule-main p{
                    font-size:.13rem;
                    color:0c0f16;
                    padding:0 .08rem;
                    line-height:.25rem;
                }
            `}
            
            </style>
        </div>;
    }
}