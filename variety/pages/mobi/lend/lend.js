/*
* @Author: Maolin
* @Date:   2017-05-08 10:21:54
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-23 16:50:56
*/
import Link from 'next/link';
import Router from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_con from './lend_con.js';
import Text_none from '../common/text_none.js';

class Lend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
            viewData:[],
            viewPage:0,
            viewMore:true,
            bigHeight:500
        }
        this.toLoadView = this.toLoadView.bind(this);
    }
    componentDidMount(){
        var t = this;
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
        t.toLoadView();   
    }
    toLoadView(){
        var t =this;
        var H = $('.finance').height() ? $('.finance').height() : ($(window).height()-50) ;
        t.serverRequest=$.ajax({
            type:'get',
            url:'/coterie/help/loan/showList.do',
            data:{page:t.state.viewPage,pageSize:15},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data.length){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.resultCount>(t.state.viewPage+1)*15?true:false,
                        bigHeight:H
                    })
                }
            }
        })
    }
    render(){
        if(this.state.viewData.length){
            return (
                <div>
                    <Header_title text="借款有道"/>
                    <Header text="借款有道"/>
                    <InfiniteScroll  next={this.toLoadView} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <p className="view-bottom">加载更多</p>} endMessage={<p className="view-bottom">已加载全部</p>}>
                    {
                        this.state.viewData.map((e,i)=>{
                            return(
                                <section className="finance" key={i}>
                                    <LendUserInfo user={e} isLogin={this.state.isLogin} query={''}/>
                                    <Lend_con info={e}/>
                                </section>
                                )
                        })
                    
                    }
                    </InfiniteScroll>
                    <style jsx global>{`
                        body{
                            -webkit-text-size-adjust:none;
                            background: #e7e7e8;
                        }
                    `}</style>
                    <style jsx>{`
                        .finance {
                            padding: .1rem .13rem;
                            margin-top: .1rem;
                            background: #fff;
                        }
                        
                    `}</style>
                </div>
            ) 
        }else{
            return(
                <div>
                    <Header_title text="借款有道"/>
                    <Header text="借款有道"/>
                    <Text_none text=""/>
                </div>
            )
        }
    }
}
export default Lend;
