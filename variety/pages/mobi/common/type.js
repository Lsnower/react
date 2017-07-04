import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import UpdownStyle from '../future/updowncss.js'
export default  class Type extends React.Component{
    constructor(props){
        super(props)
        this.hanleClick = this.hanleClick.bind(this);
    }

    hanleClick(e){
        this.props.callback();
    }
    render(){
        var u;
		switch (this.props.type)
		{
			case 0:
				u = <Optional callback={this.hanleClick} /> 
				break;
			case 1:
				u = <Trade callback={this.hanleClick} vtype={this.props.vtype}/>
				break;
			case 2:
				u = <Message callback={this.hanleClick} /> 
				break;
		}
		
        return(<div className={this.props.show?'':'hide'}>
            <UpdownStyle />
            <div className="content">
                <div className="overlayUp msgboxUp" onClick={this.hanleClick}>
                    <div className="typeContent">
                        {u}
                    </div>

                </div>
            </div>
            <style>{`
                .typeContent{
                    -webkit-box-flex: 0;
                    -webkit-flex: 0 0 auto;
                    flex: 0 0 auto;
                    width: 100%;
                    padding: .1rem;
                    position: absolute;
                    bottom: 0;
                    left:0;
                }
                .typeContent .trade{
                    width:100%;
                }
                .typeContent .trade li{
                    width:100%;
                    background:#fff;
                    border-bottom:.01rem solid #ddd;
                    color:#a4aab3;
                    font-size:.17rem;
                    text-align:center;
                    height:.57rem;
                    line-height:.57rem;
                }
                .typeContent .trade li.top{
                    font-size:.12rem;
                    color:#999;
                    height:.45rem;
                    line-height:.45rem;
                    border-radius:.08rem .08rem 0 0;
                }
                .typeContent .trade li a{
                    color:#0076ff;
					width: 100%;
					height: 100%;
					display: block;
                }
                 .typeContent .trade li.radius{
                    border-radius:0 0 .08rem .08rem;
                 }
				.typeContent .trade li.radius_one{
                    border-radius:.08rem;
                 }
                .typeContent .trade li.bottom{
                    margin-top:.1rem;
                    border-radius:.08rem;
                }
            `}</style>
        </div>)
     }
}
class Trade extends React.Component{
    constructor(props){
        super(props)
        this.hanleClick = this.hanleClick.bind(this);
        this.routeRule = this.routeRule.bind(this);
    }
     
    routeRule(event){
		event.stopPropagation();
        var _this = this;
        Router.push({
            pathname:'/mobi/future/auth',
            query:{vtype:_this.props.vtype}
        })
    }
    hanleClick(e){
		e.stopPropagation();
        this.props.callback();
    }
    render(){
        return(<ul className='trade'>
                <li className='top'>选择交易类型</li>
                <li onClick={this.routeRule}><a href="javascript:;">快速交易</a></li>
                <li>策略买卖（暂未开放）</li>
                <li className='radius'>实盘开户（暂未开放）</li>
                <li className="bottom" onClick={this.hanleClick}><a href="javascript:;">取消</a></li>
            </ul>
        )
    }
}
class Optional extends React.Component{
    constructor(props){
        super(props)
        this.hanleClick = this.hanleClick.bind(this);
        this.routeSearch = this.routeSearch.bind(this);
    }
    hanleClick(e){
		e.stopPropagation();
        this.props.callback();
    }
    routeSearch(v){
        Router.push({
            pathname:'/mobi/stock/search',
            query:{type:v}
        })
        return false;
    }
    render(){
        return(<ul className='trade'>
                <li className='top'>选择自选类型</li>
                <li onClick={()=>this.routeSearch('stock')}><a href="javascript:;">股票</a></li>
                <li className='radius' onClick={()=>this.routeSearch('future')}><a href="javascript:;">期货</a></li>
                <li className="bottom" onClick={this.hanleClick}><a href="javascript:;">取消</a></li>
            </ul>
        )
    }
}
class Message extends React.Component{
    constructor(props){
        super(props);
		this.hanleClick = this.hanleClick.bind(this);
    }
	hanleClick(e){
		e.stopPropagation();
        this.props.callback();
    }
    render(){
        return(<ul className='trade'>
                <li className='radius_one'><Link href="/mobi/circle/components/message_list?from=1"><a>经济圈消息列表</a></Link></li>
                <li className="bottom" onClick={this.hanleClick}><a href="javascript:;">取消</a></li>
            </ul>
        )
    }
}

