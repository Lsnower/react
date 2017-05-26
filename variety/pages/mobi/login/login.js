
/*
* @Author: Maolin
* @Date:   2017-04-14 15:12:32
* @Last Modified by:   Maolin
* @Last Modified time: 2017-05-24 10:55:21
*/
import $ from 'jquery';
import Router from 'next/router';
import Confirm from '../common/confirm.js';
class Login extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		disabled: 'button-disabled',
		phone:false,
		msgCode:false,
		codeBtn:'disabled',
		cancle:false,
		show:false,
		html:'获取验证码',
		wait:60,
		v:false,
		tel:null
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleClick = this.handleClick.bind(this);
	this.cancle = this.cancle.bind(this);
	this.getMsgCode = this.getMsgCode.bind(this);
	this.getTimeout = this.getTimeout.bind(this);
  }

  handleChange(e,m) {
	  var t = e.target.name,v=e.target.value;
	  var f = this;
	  $(f.refs.phone).focus(function(event) {
		$("#login_user,.logo_bg").animate({'top':'-.8rem'},500)
	  });
	  t == 'phone' ?this.setState({phone:v.length>0?e.target.value:false,tel:v.length>0?e.target.value:false}):this.setState({msgCode:v.length>0?e.target.value:false});

	  $(this.refs[m]).css('display',v.length>0?'inline-block':'none');
  }

  cancle(m,n){
	this.setState({cancle:true,tel:''})
	$(this.refs[m]).val('');
	this.state[m]='';
	$(this.refs[n]).css('display',$(this.refs[m]).val().length>0?'inline-block':'none');
  }
  getTimeout(t){
  	var that = this,html = that.state.html;
	if(that.state.wait == 0){
		that.setState({html:'获取验证码',wait:60,smsCode:false});
	}else{
		that.setState({
			v:true,
			html: that.state.wait + "s"
		});
        setTimeout(function(){
            that.state.wait--;
            that.getTimeout();
        },1000);
	}
  }
  getMsgCode(e){
	e.preventDefault();
	if(!e.target.className.indexOf('disabled')>-1){
		var t = this,html = e.target.innerHTML;
		$.ajax({
		  url: '/user/registerLogin/sendMsgCode.do',
		  type: 'get',
		  data: {phone: t.state.phone},
		  success:function(d){
			if(d.code == 200){
				t.setState({
				  show:true,
				  code:d.code,
				  content: d.msg,
				  t:html,
				  smsCode:true
				});
				t.getTimeout(html)

			}else{
				t.setState({
				  'show':true,
				  'content':d.msg
				})
			}
		  }
		})
	}
	
  }
  isOk(){
	this.setState({
	  show:!this.state.show
	})
  }
  handleClick(e){
  	if((e.target.className.indexOf('button-disabled')>-1) == false){
  		var t = this;
		$.ajax({
		  url: '/user/registerLogin/quickLogin.do',
		  type: 'post',
		  data: {phone: t.state.phone,msgCode:t.state.msgCode},
		  success:function(d){
			if(d.code == 200){
			  Router.push({
				  pathname:'/index',
				  query:{}
			  })
			  t.setState({tel:t.state.phone})
			  // if(t.props.login.url.query.login){
			  //   Router.back();
			  // }else{
				
			  // }
			}else{
			  t.setState({
				'show':t.state.show?false:true,
				'content':d.msg
			  })
			}
		  }
		})
  	}
	
	
  }

  render(e) {
	this.state.codeBtn = this.state.phone?(this.state.smsCode?'disabled':''):'disabled';
	this.state.disabled = this.state.phone&&this.state.msgCode?'':'button-disabled';
	return (
	  <div>
	  <article className="logo_bg" >
		<img className="goback" src='/static/login/login_label_icon_delete@2x.png' onClick={() => Router.back()}/>
		<div className="logo">
			<img className="logo_img" src="/static/login/Icon-Small-60@3x.png" ref="logo"/>
		</div>
	  </article>
	  <div id="login_user">
		<ul className="logo_user">
			<li className="login-tel clearfix">
				<span className="left logo_txt">手机号</span>
				<input className="input tel" onChange={(e,m)=>{this.handleChange(e,'telCan')}} type="tel" name="phone" maxLength="11" placeholder="请输入手机号码" ref="phone" value={this.state.tel}/>
				<img className="cancle" src='/static/login/login_label_icon_delete@2x.png' ref='telCan' onClick={(m,n)=>{this.cancle('phone','telCan')}}/>
				
			</li>
			<li className="login-password clearfix">
				<span className="left logo_txt">验证码</span>
				<input className="input pass" onChange={(e,m)=>{this.handleChange(e,'passCan')}} type="password" name="password" ref="msgCode" placeholder="请输入验证码" />
				<span className={"right get-smscode"+' '+this.state.codeBtn} href="javascript:void(0)" onClick={(e)=>{this.getMsgCode(e)}}>{this.state.html}</span>
				
			</li>
		</ul>
		<div className="login-btn">
			<a href="javascript:void(0)" className={"button button-stress"+' '+ this.state.disabled} data-value="0" onClick={this.handleClick}>登 录</a>
		</div>
		<Confirm type={1} confirm={this.state} isOk={()=>{this.isOk()}}/>
	  </div>  
		<style jsx>{`
		  .logo_bg{
				width: 100%;
				text-align: center;
				padding-top: 1.22rem;
				padding-bottom: 1rem;
				background: url(/static/login/login_bg@3x.png) no-repeat left top #090f1e;
				background-size: cover;
				position: relative;
		   }
		   .logo_bg .goback{
				position: fixed;
				top: .1rem;
				right: .1rem;
				width:.24rem;
				height:.24rem;
		   }
		   .logo_bg img{
				display:inline-block;
		   }
		   .logo{
			  height: 1rem;
		   }
		   .logo_bg .logo_img{
				width: 1rem;
				height: 1rem;
		   }
		   #login_user{
				position: relative;
		   }
			.logo_user{
				width: 100%;
				height: 100%;
				position: relative;
		   }
		   .logo_user>li{
				margin: 0 .1rem;
				height: .5rem;
				padding: 0;
				position: relative;
				border-bottom: 1px solid #878182;
		   }
		   .logo_user li .cancle{
				position: absolute;
				right: 0;
				top: .1rem;
				width: .22rem;
				display:none;
		   }
		   .logo_user .logo_txt{
				color: #9fa2ae;
				line-height: .5rem;
				margin: 0 .16rem 0 .02rem;
		   }

		   .logo_user .input{
				min-width: .5rem;
				height: .48rem;
				line-height: .44rem;
				padding: 0 .05rem;
				resize: none;
				vertical-align: middle;
				background: #0d1122;
				color: #fff;
				margin-bottom: .08rem
		   }
		   .logo_user .input:-ms-input-placeholder{
				color: #82848A;
		   }
		   .logo_user .input::-webkit-input-placeholder{
				color: #82848A;
		   }
		   .login-tel .input,.login-password .input{
				width: 1.3rem;
				border: 0;
		   }
		   
		  	.get-smscode{
				position: absolute;
				right: 0;
				top: .08rem;
				display: inline-block;
				width:.8rem;
				padding: .04rem .05rem;
				border-radius: 0.04rem;
				text-align: center;
				background: #e5b96c;
				color: #fff;
		   }
		   .disabled{
				background: #82848a;
				color: #fff;
		   }
		   .login-btn{
				display: block;
				margin: .24rem .15rem 0;
				height: .4rem;
				line-height: .4rem;
				border-radius: .05rem;
				text-align: center;
				font-size: .15rem;
				color: #fff;
				margin-bottom: 0.6rem;
		   }
		   .button-stress {
				background-color: #e5b96c;
			}
			.button-disabled{
				background-color: #82848a;
			}
			.button {
				display: inline-block;
				width: 100%;
				height: .44rem;
				line-height: .44rem;
				padding: 0 .1rem;
				border-radius: .05rem;
				color: #fff;
			}
		`}</style>
	  </div>
	);
  }
}
export default Login;
