/*
* @Author: Maolin
* @Date:   2017-04-14 17:46:11
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-23 16:33:40
*/

import Router from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import Userinfo from './userInfo.js';
import LendUserInfo from '../../lend/lend_userInfo.js'
import Lend_con from '../../lend/lend_con.js';
import Issure_con from './issure_con.js';
import Confirm from '../../common/confirm.js';
import Text_none from '../../common/text_none.js';


class Service extends React.Component{
    constructor(props) {
        super(props);
        this.state = {disabled: 'button-disabled',mobile:false,code:false};
    }
    handleClick(e){
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <section className="finance">
                    <Userinfo user={this.props.data} isLogin={this.props.isLogin}/>
                    <Issure_con info={this.props.data} varietyDate={this.props.data} quota={this.props.quota} circle={1}/>
                </section>  
              <style jsx>{`
                    .finance {
                        padding: .1rem .13rem;
                        margin-top: .1rem;
                        background: #fff;

                    }
                    .content{
                        width:100%;
                        height: .4rem;
                        line-height: .4rem;
                        padding-left: .09rem
                    }
                    .content .title{
                        font-size: .16rem;
                        letter-spacing: .01rem;
                    }
                    .ratio{ 
                        font-size: .18rem;
                        position: absolute;
                        right: .66rem;
                    }
                    .colorR{
                        color: #cd4a47;
                    }
                    .count{
                        position: absolute;
                        width: .5rem;
                        right: .1rem;
                        font-size: .1rem;
                    }
                    .count i{
                        position: absolute;
                        left:0;
                    }
                    .count .float{
                        top:-.07rem;
                    }
                    .count .profit{
                        margin-top: .02rem;
                        top:.05rem;
                    }
              `}</style>
            </div>
        )
    }
}
class Lending extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
      return (
        <div>
        <section className="finance">
            <LendUserInfo user={this.props.data} isLogin={this.props.isLogin}/>
            <Lend_con info={this.props.data} isLogin={this.props.isLogin}/>
        </section>
        <style jsx>{`
            .finance {
                padding: .1rem .13rem;
                margin-top: .1rem;
                background: #fff;
            }
        `}</style>
        </div>
        
      )
    }
}   
class Finance extends React.Component{
    constructor(props) {
        super(props);
        this.state={
                data:null,
                show:false,
                viewData:[],
                viewPage:0,
                viewMore:true,
                isLogin:false,
                bigHeight:500,
                createTime:null
            }
        this.toLoadView = this.toLoadView.bind(this);
    }
    componentDidMount() {
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
        var H = $('.infinite').height() ? $('.infinite').height() : ($(window).height()-50) ;

        t.serverRequest=$.ajax({
            type:'get',
            url:'/coterie/coterie/coterieList.do',
            data:{createTime:t.state.createTime,pageSize:15},
            dataType:'JSON',
            success:function(e){
                if(e.code==200&&e.data.length){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.resultCount>(t.state.viewPage+1)*15?true:false,
                        bigHeight:H,
                    })
                    t.setState({
                        createTime: t.state.viewPage == 0? '':t.state.viewData[t.state.viewData.length-1].createTime
                    })

                
                }
            }
        })
    }
    render(){
        if(this.state.viewData.length){
             return (<div >
                <div className="infinite">
            <InfiniteScroll  next={this.toLoadView} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
        {     
            this.state.viewData.map((e,i) => {
                e.viewPage = this.state.viewPage;
                return (<div key={i}>{e.type == 1?<Lending key={i} data={e} isLogin={this.state.isLogin}/>:<Service key={i} data={e} isLogin={this.state.isLogin}/>}</div>)
            })
           
        }
            </InfiniteScroll>
            </div>
        </div>)
         }else{
            return <div>
                <Confirm type={1} confirm={this.state.show} />
                <Text_none text=""/>
            </div>
         }
       
    }
}
export default Finance;
