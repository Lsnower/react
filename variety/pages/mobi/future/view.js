/*
* @Author: Maolin
* @Date:   2017-05-09 10:13:35
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-18 09:39:03
*/

import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Text_none from '../common/text_none.js'
import Confirm from '../common/confirm.js';

class View extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:[],isLogin:false}
        this.handler = this.handler.bind(this);
    }
    componentDidMount(){
        var t = this;
        // 判断用户是否登录
        $.ajax({
            type:'post',
            url:'/user/user/findUserInfo.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        isLogin:true
                    });
                }else{
                    t.setState({
                        isLogin:false
                    });
                }
                
            }
        });

        //观点大神
        $.ajax({
            type:'post',
            url:'/statistics/statistics/viewpointGod.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
                    t.setState({
                        data:d.data
                    });
                }else{
                    t.setState({
                        show:true,
                        content:d.msg
                    });
                }
                
            }
        });
    }
    handler(id){
        if(this.state.isLogin){
                Router.push({
                  pathname: '/mobi/user/circle_user/userInfo',
                  query: { id: id }
                })
            }else{
                this.setState({
                    show:true,
                    content: '您未登录，请重新登录',
                    code: 503
                })
            }
    }
    render(){
        if(this.state.data.length){
            var adeptType={'future':'期货','forex':'外汇','stock':'股票'}
            return (
                <div>
                    <Header_title text='观点大神'/>    
                    <Head text="观点大神" />
                    <ul className="top">
                        <li className='frist'>观点大神</li>
                        <li>擅长类型</li>
                        <li>看盘准确率</li>
                    </ul>
                    <div className="con active">
                        <ul className="main">
                        {
                            this.state.data.map((e,i)=>{
                                var passRat = Number(e.passRat)*100;
                                return (
                                    <li className="list" key={i} onClick={()=>{this.handler(e.userId?e.userId:'')}}>
                                        <span className="userInfo"><img src={e.userPortrait?e.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200':"/static/circle/headportrait64x64@3x.png"} />{e.userName?e.userName:'-'}</span>
                                        <span>{e.adeptType?adeptType[e.adeptType]:'-'}</span>
                                        <span>{e.passRat?(parseInt(passRat) == passRat?(passRat+'%'):passRat.toFixed(0)+'%'):'0'}</span>
                                    </li>
                                )
                            })
                        }
                            
                        </ul>
                        <Confirm type={2} confirm={this.state} />
                    </div>
                    <style jsx>{`
                        body{
                            background:#f5f5f5;
                        }
                        ul.top{
                            width: 100%;
                            display: flex;
                            background: #f5f5f5;
                            border-bottom: .01rem solid #ddd;
                            padding:0 .1rem;

                        }
                        ul.top li {
                            flex: 1;
                            text-align: left;
                            font-size: .1rem;
                            color: #999;
                            line-height: .32rem;
                            text-align:right;
                        }
                        ul.top li.frist{
                            flex:2;
                            -webkit-flex:2;
                            text-align:left;
                        }
                        ul li.list{
                            width: 100%;
                            display: -webkit-flex;
                            display: flex;
                            height: .6rem;
                            line-height: .6rem;
                            border-bottom: .01rem solid #ddd;
                            padding:0 .1rem;
                            background:#fff;
                        }
                        li.list span{
                            flex: 1;
                            -webkit-flex: 1;
                            display: block;
                            font-size: .1rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color:#666;
                            text-align:right;
                        }
                        li.list .userInfo{
                            flex:2;
                            -webkit-flex:2;
                            color:#222;
                            font-size: .16rem;
                            text-align:left;
                        }
                        li.list img{
                            height: .32rem;
                            width: .32rem;
                            border-radius:.16rem;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right:.05rem;

                        }
                    `}</style>
                </div>
            )
        }else{
            return(
                <div>
                    <Header_title text='观点大神'/>    
                    <Head text="观点大神" />
                    <Text_none text="现在还没有大神上榜哦！"/>
                </div>
            )
        }
        
    }
}

export default View;
