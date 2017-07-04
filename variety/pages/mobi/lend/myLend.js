/*
* @Author: Maolin
* @Date:   2017-05-08 10:21:54
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-23 16:50:56
*/
import Link from 'next/link';
import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_con from './lend_con.js';
import Text_none from '../common/text_none.js';
import InfiniteScroll from 'react-infinite-scroll-component';
class MyLend extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false,
            myuserid:null,
            viewData:[]
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
                        isLogin:true,
                        myuserid:d.data.id
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
        t.serverRequest=$.ajax({
            type:'get',
            url:'/coterie/help/loan/myLoan.do',
            data:{},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:e.data,
                    })
                }
            }
        })
    }
    render(){
        if(this.state.viewData.length>0){
            return (
                <div className="maxheig">
                    {
                        this.state.viewData.map((e,i)=>{
                            return(
                                <section className="finance" key={i}>
                                    <LendUserInfo user={e} userid={this.state.myuserid} isLogin={this.state.isLogin}/>
                                    <Lend_con info={e} />
                                </section>
                                )
                        })
                    }
                    <style jsx global>{`
                        body{
                            -webkit-text-size-adjust:none;
                            background: #e7e7e8;
                        }
                        .maxheig{
                            padding-bottom:0.4rem;
                            height:500px;
                            overflow: auto;
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
                    <Text_none text="暂无借款"/>
                </div>
            )
        }
    }
}
export default MyLend;
