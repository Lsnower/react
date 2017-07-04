import React, {
  Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router';
import Alert from '../../common/confirm.js';
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from './setter_css.js';
import Text_none from '../../common/text_none.js';
class Acclist extends Component {
  constructor(props) {
    super(props)
    this.state={
        item:null,
        scrdate:null,
        confirm:{
            show:false,
            content:'',
            title:'',
        },
        fun:null,
        viewData:[]
    }
    this.handler = this.handler.bind(this);
    this.showok = this.showok.bind(this);
    this.nobox = this.nobox.bind(this);
    this.showlistmsg = this.showlistmsg.bind(this);
  }
  componentDidMount() {
      let that = this;
      this.showlistmsg();
  }
    
    showlistmsg(){
        var t =this;
        var H = $('.screen_list').height() ? $('.screen_list').height() : ($(window).height()-50);
        t.serverRequest=$.ajax({
            type:'get',
            url:'/user/followShield/myShield.do',
            data:{},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:e.data
                    })
                }else{
                    if(e.code == 503){
                        t.setState({
                            confirm:{
                                show:true,
                                content:e.msg,
                            },
                            fun:t.isnoLogin
                        })
                    }else{
                        t.setState({
                            confirm:{
                                show:true,
                                content:e.msg,
                            }
                        })
                    }
                }
            }
        })
    }
//点击出现弹框
  handler(e,r){
      let that = this;
      this.setState({
            item:r,
            confirm:{
                show:true,
                title:'是否对‘'+e+'’解除屏蔽',
                content:'解除屏蔽后'+e+'发表的观点将再次出现在你的经济圈。'
            },
            fun:that.showok
        })
      this.showlistmsg()
  }
  isnoLogin(){
        Router.push({pathname: '/login'});
  }
//点击弹框ok
  showok(){
      let that = this;
      $.ajax({
            url:'/coterie/userInterest/shield.do',
            data:{status:1,shieldId:that.state.item},
            success:function(d){
                if(d.code == 200){
                    var arr=[];
                    for(var i=0;i<that.state.viewData.length;i++){
                        if(that.state.item!=that.state.viewData[i].shielduserId){
                            arr.push(that.state.viewData[i]);
                        }
                    }
                    that.setState({
                        viewData:arr
                    })
                    that.nobox()
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
                                title:'',
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
  render() {
    let mydata = this.state.scrdate,myimg,templete,that=this;
    if (this.state.viewData.length>0){
        return (
          <section className="page-main main-mine">
            <Style/>
            <div className="content">
              <ul className="screen_list" >
                 {
                        this.state.viewData.map(function(v,r){
                            myimg = v.shielduserPortrait ? v.shielduserPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : "../../../static/mine/headportrait160x160@3x.png";
                            return (
                                <li key={r} className="clear">
                                    <img src={myimg}/>
                                    <div className="listcon">{v.shielduserName}</div>
                                    <a href="javascript:;" onClick={()=>{that.handler(v.shielduserName,v.shielduserId)}}>解除</a>
                                </li>
                            )
                        })
                }
              </ul>
            </div>
            <Alert type='2' confirm={this.state.confirm} isOk={this.state.fun}/>
          </section>
        )
    
  }else{
      return <Text_none text=""/>;
  }
}
}

export default () => (
  <div>
    <Header_title text="屏蔽设置"/>
    <div><Header text="屏蔽设置" /></div>
    <Acclist/>
  </div>
)