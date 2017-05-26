/*
* @Author: Maolin
* @Date:   2017-05-08 16:47:06
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-26 00:10:42
*/
import React from 'react';
import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import LendUserInfo from './lend_userInfo.js';
import Lend_con from './lend_con.js';
import Confirm from '../common/confirm.js';
class List extends React.Component{
    constructor(props) {
        super(props);
        this.state = {isLogin:false}
    }
    render(){
        return(
            <div>
                <LendUserInfo user={this.props.info} isLogin={this.props.isLogin} query={this.props.query} lendType = {this.props.lendType}/>
                <Lend_con info={this.props.info} query={this.props.query} />
            </div>
        )
    }
}
class Lending_detail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
                userPortrait:null,
                data:null,
                helpData:[],
                show:false,
                isLogin:false,
                btnHtml:'给予帮助',
                show:false,
                not: true,
                isClick:false,
                self: false
            };
        this.handler = this.handler.bind(this);
        this.canOk = this.canOk.bind(this);
        this.canNot = this.canNot.bind(this);
        this.toHelperList = this.toHelperList.bind(this);
        this.getIntentCount = this.getIntentCount.bind(this);
    }
    componentDidMount(){
        var t = this;
        var id = t.props.url.query.id,userId = t.props.url.query.userId;
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
         // 判断是否是自己
       $.ajax({
          url: '/coterie/userInterest/checkMyself.do',
          type: 'get',
          data: {userId: userId},
          success:function(d){
            if(d.code == 200 &&d.data){
                t.setState({
                    self:true
                });
            }
          }
        })

       t.getIntentCount();
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/showDetails.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        data:d.data,
                        num:parseInt(screen.width/40)-1

                    });
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code
                    })
                }
                
            }
        });

        

    }
    getIntentCount(){
        var t = this;
        var id = t.props.url.query.id
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/intentionCount.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({helpData:d.data});
                }else{
                    t.setState({
                        show:true,
                        content: d.msg,
                        code: d.code,
                        not: false
                    })
                }
                
            }
        });
    }
    handler(e){
        if(this.state.isLogin){
            if(e.target.className.indexOf('help-ok')>-1){
                var _target = e.target;
                this.setState({
                    show:true,
                    title:'是否要帮助“'+this.state.data.userName+'”？',
                    content:'注意：本平台只做信息发布，一切用户行为与本平台无关，请谨慎借款。'
                })
            }
            
        }else{
            this.setState({
                show: true,
                title:'提示',
                content: '您未登录，请先登录',
                code: 503
            })
        }
        
    }
    canNot(){
        this.setState({
            not: !this.state.not
        })
    }

    // 给予帮助
    canOk(e){
        var id = this.props.url.query.id;
        var t = this;
        //t.setState({not:false})
        $.ajax({
            type:'post',
            url:'/coterie/help/loan/intention.do',
            data:{id:id},
            dataType:'json',
            success:function(d){
                if(d.code == 200){
                    t.setState({
                        show:false,
                        isClick: true,
                        not: false
                    })
                    t.getIntentCount();
                    t.state.data.intentionCount++;
                    $("#btn-help").html('等候确认中');
                    $("#btn-help").removeClass('help-btn help-ok').addClass('help-btn help-disabled');
                }else{
                    //多终端同时操作，需要刷新页面
                    //location.reload();
                    t.setState({
                        show:true,
                        title: '',
                        content: d.msg,
                        code: d.code,
                        not:false
                    })
                }
                
            }
        });
        

    }
    toHelperList(e){
        var t = this;
        if(this.state.isLogin){
            Router.push({
              pathname: '/mobi/lend/want_helplist',
              query: {type:this.state.self?'ni':'TA',sex:this.state.data.sex,id: t.props.url.query.id,lendType:this.state.self?'lendin':t.props.url.query.lendType}
            })
        }else{
            this.setState({
                show: true,
                title:'提示',
                content: '您未登录，请先登录',
                code: 503
            })
        }
        
    }
    render(){

        if(this.state.data){
            var contentImg = this.state.data.contentImg?this.state.data.contentImg.split(','):[];
            var query = this.props.url.query.type,lendType = this.props.url.query.lendType;
            var btnHtml=['给予帮助','等待确认中','给予帮助'];
            return (
                <div>
                    <Header_title text="借款详情"/>
                    <Header text={this.props.url.query.lendType.length?(this.props.url.query.lendType == 'lendin'?'借入详情':'借出详情'):'借款详情'}/>
                    <section className="wrap">
                       <ul className="list">
                            <li>
                                <List info={this.state.data} isLogin={this.state.isLogin} query={query} lendType = {lendType}/>
                            </li>
                        </ul>

                    </section>
                    {
                        this.state.data.status == 1?(<p className="help-status">审核中</p>):(<div >
                        <div className="discuss">
                            <p className='discuss-title'>想要帮助{this.state.self?'你':(this.state.data.sex == 1?'她':'他')}的人 <span className="discuss-num">({this.state.data.intentionCount?this.state.data.intentionCount:0})</span></p>
                        </div>
                        <ul className="help-wrap" onClick={()=>{this.toHelperList(this.props.url.query.id)}}>
                        {
                            this.state.helpData.slice(0,this.state.num).map((e,i)=>{
                                return(
                                    <li className="help-user" key={i} style={{background:e.portrait?('url('+e.portrait+'?x-oss-process=image/resize,m_fill,h_200,w_200) no-repeat left center'):('url(/static/circle/headportrait64x64@3x.png) no-repeat left center'),backgroundSize:'cover'}}>
                                    </li>
                                )
                            })
                        }
                            <li className="help-other" style={{display:this.state.helpData.length>8?'block':'none'}}></li>
                        </ul>
                    </div>)
                    }
                    
                    <div className="help-wrap btn-wrap" onClick={(e)=>{this.handler(e)}} style={{display:this.state.self?'none':'block'}}>
                        <a className={this.state.data.isIntention == 1?'help-btn help-disabled':'help-btn help-ok'} id="btn-help">{btnHtml[this.state.data.isIntention]}</a>
                    </div>
                    <Confirm type={2} confirm={this.state} isOk={()=>{this.state.not?this.canOk():this.state.canNot()}}/>
                    <style jsx global>{`
                        html,body{
                           background: #e7e7e8; 
                        }
                    `}</style>
                    <style jsx>{`
                        .wrap{
                            padding: .1rem .13rem;
                            background: #fff;
                        }
                        .wrap:not(nth-child(1)){
                            padding-bottom:0;
                        }
                        .colorR{
                            color: #cd4a47;
                        }
                        .help-status{
                            text-align: center;
                            height: .6rem;
                            line-height: .6rem;
                            color: #82848A;
                            border-top: 1px solid #e7e7e8;
                            background: #fff;
                        }
                        .discuss{
                            width:100%;
                            height: .32rem;
                            line-height: .32rem;
                            background: #e7e7e8;
                            color: #82848A;
                            font-size: .14rem;
                        }
                        .discuss-title{
                            background: url(/static/circle/helpdetail_icon_person@3x.png) no-repeat .09rem .04rem;
                            background-size: .24rem;
                            padding-left: .36rem;
                        }
                        .discuss-num{
                            margin-left: .06rem
                        }
                        .help-wrap{
                            padding: .1rem .13rem;
                            height: .42rem;
                        }
                        .help-user{
                            width: .32rem;
                            height: .32rem;
                            float: left;
                            border-radius: 50%;
                            border: 1px solid #eee;
                            margin-right: .05rem;
                            background-size: cover;
                        }
                        .help-other{
                            width: .32rem;
                            height: .32rem;
                            float: left;
                            background: url('/static/circle/helpdetail_icon_more@3x.png');
                            background-size:cover;
                        }
                        .btn-wrap{
                            margin-top:.5rem;
                        }
                        .help-btn{
                            display:inline-block;
                            width: 100%;
                            height: .44rem;
                            line-height: .44rem;
                            text-align: center;
                            color: #fff;
                            font-size: .15rem;
                            border-radius: .04rem;
                        }
                        .help-ok{
                            background: #cd4a47;
                        }
                        .help-disabled{
                            background: #82848a;
                        }
                    `}</style>
                </div>
            )
        }else{
            return <div></div>
        }
       
    }
}

export default Lending_detail;
