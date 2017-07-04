import React, {
  Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from '../setter/setter_css.js';
import Text_none from '../../common/text_none.js';
import Alert from '../../common/confirm.js';
import InfiniteScroll from 'react-infinite-scroll-component';
class Acclist extends Component {
  constructor(props) {
    super(props)
    this.state = {
        viewData:[],
        viewPage:0,
        viewMore:true,
        bigHeight:500,
        show:false,
        item:null,
        confirm:{
            show:false,
            content:'',
            title:'',
        },
        showdate:null,
        fun:null
    }
      this.handler = this.handler.bind(this);
      this.nohandler = this.nohandler.bind(this);
      this.showok = this.showok.bind(this);
      this.nobox = this.nobox.bind(this);
      this.clickimg = this.clickimg.bind(this);
      this.noshowok = this.noshowok.bind(this);
      this.showlistmsg = this.showlistmsg.bind(this);
  }
  
  componentDidMount() {
      this.showlistmsg()
  }
  isnoLogin(){
        Router.push({pathname: '/login'});
  }
  handler(e,r){
    let that = this;
    this.setState({
            item:e,
            confirm:{
                show:true,
                title:'',
                content:'是否关注'+r+'?'
            },
            fun:that.showok
        })
  }
  nohandler(e,r){
      let that = this;
      this.setState({
            item:e,
            confirm:{
                show:true,
                title:'',
                content:'是否不再关注'+r+'?'
            },
            fun:that.noshowok
        })
  }
    noshowok(){
      let that = this;
      $.ajax({
            url:'/coterie/userInterest/follow.do',
            data:{status:1,followId:that.state.item},
            success:function(d){
                if(d.code == 200){
                    that.setState({
                        viewData:[],
                        viewPage:0,
                        viewMore:true,
                        bigHeight:($(window).height()-50),
                        confirm:{
                            show:false,
                            title:'提示',
                            content: d.msg
                        }
                    })
                    that.showlistmsg();
                }else{
                    if(d.code == 503){
                        that.setState({
                            confirm:{
                                show:true,
                                title:'提示',
                                content: d.msg
                            },
                            fun:that.isnoLogin
                        })
                    }else{
                        that.setState({
                            confirm:{
                                show:true,
                                title:'提示',
                                content: d.msg
                            },
                            fun:that.nobox
                        })
                    }
                }
            }
        })
  }
    showlistmsg(){
        var t =this;
        var H = $('.screen_list').height() ? $('.screen_list').height() : ($(window).height()-50);
        t.serverRequest=$.ajax({
            type:'get',
            url:'/user/followShield/followMe.do',
            data:{page:t.state.viewPage,pageSize:15},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:t.state.viewData.concat(e.data),
                        viewPage:t.state.viewPage+1,
                        viewMore:e.resultCount>(t.state.viewPage+1)*15?true:false,
                        bigHeight:H
                    })
                }else{
                    if(d.code == 503){
                        t.setState({
                            confirm:{
                                show:true,
                                content:d.msg,
                            },
                            fun:t.isnoLogin
                        })
                    }else{
                        t.setState({
                            confirm:{
                                show:true,
                                content:d.msg,
                            }
                        })
                    }
                }
            }
        })
    }
  showok(){
      let that = this;
      $.ajax({
            url:'/coterie/userInterest/follow.do',
            data:{status:0,followId:that.state.item},
            success:function(d){
                if(d.code == 200){
                    that.setState({
                        viewData:[],
                        viewPage:0,
                        viewMore:true,
                        bigHeight:($(window).height()-50),
                        confirm:{
                            show:false,
                            title:'提示',
                            content: d.msg
                        }
                    })
                    that.showlistmsg();
                }else{
                    if(d.code == 503){
                        that.setState({
                            confirm:{
                                show:true,
                                title:'提示',
                                content: d.msg
                            },
                            fun:that.isnoLogin
                        })
                    }else{
                        that.setState({
                            confirm:{
                                show:true,
                                title:'提示',
                                content: d.msg
                            },
                            fun:that.nobox
                        })
                    }
                }
            }
        })
  }
  nobox(){
      this.setState({
            confirm:{
                show:false,
                title:'提示',
                content: ''
            }
        })
  }
    //点击头像
    clickimg(e){
        Router.push({
          pathname: '/mobi/user/circle_user/userInfo',
          query: { id: e }
        })
    }
  render() {
    let data = this.state.showdate,
      templete,that=this,fansimg;
      
    if (this.state.viewData.length>0) {
        
        return (
          <section className="page-main main-mine">
            <Style/>
            <div className="content">
              <ul className="screen_list">
                    <InfiniteScroll  next={this.showlistmsg} height={this.state.bigHeight} hasMore={this.state.viewMore} loader={ <div className="view-bottom">加载更多</div>} endMessage={<div className="view-bottom">已加载全部</div>}>
                 {
                    this.state.viewData.map(function(v,r){
                        let h = v.other == '0' ? '已关注' : '关注';
                        let p = v.other == '0' ? 'quxiao' : 'guanzhu';
                        let t = v.other == '0' ? <a id={p} href="javascript:;;" onClick={()=>{that.nohandler(v.userId,v.userName)}}>{h}</a> : <a id={p} href="javascript:;;" onClick={()=>{that.handler(v.userId,v.userName)}}>{h}</a>;
                        fansimg = v.userPortrait ? v.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : "../../../static/mine/headportrait160x160@3x.png";
                        return (
                            <li key={r} className="clear list_li">
								<div className="list_li_l" onClick={()=>{that.clickimg(v.userId)}}>
                                	<img src={fansimg}/>
                                	<div className="listcon">{v.userName}</div>
                                </div>
                                {t}
                                <style jsx global>{`
                                   a#guanzhu{
                                        background: url('../../../static/mine/fans_icon_follow@3x.png') no-repeat center 0.05rem;
                                        background-size:0.2rem 0.2rem;
                                    }
                                    a#quxiao{
                                        background: url('../../../static/mine/fans_icon_followed@3x.png') no-repeat center 0.05rem;
                                        background-size:0.2rem 0.2rem;
                                    }

                                `}</style>
                            </li>
                        )
                    })

                }
                </InfiniteScroll>
              </ul>
            <Alert type='2' confirm={this.state.confirm} isOk={that.state.fun}/>
            </div>
          </section>
        )
  }else{
      return <Text_none text=""/>;
  }
}
}

export default () => (
  <div>
    <Header_title text="乐米-粉丝"/>
    <div><Header text="粉丝" /></div>
    <Acclist/>
  </div>
)