/*
 * @Author: Maolin
 * @Date:   2017-04-14 15:12:32
 * @Last Modified by:   Maolin
 * @Last Modified time: 2017-05-24 10:55:21
 */
import React from 'react';
import $ from 'jquery';
import Link from 'next/link';
import Router from 'next/router';
import Confirm from '../common/confirm.js';
class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: 'button-disabled',
			phone: false,
			msgCode: false,
			codeBtn: 'disabled',
			cancle: false,
			show: false,
			html: '获取验证码',
			wait: 60,
			v: false,
			tel: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.cancle = this.cancle.bind(this);
		this.getMsgCode = this.getMsgCode.bind(this);
		this.getTimeout = this.getTimeout.bind(this);
	}
	componentDidMount() {
        var f = this;
		var userphones = localStorage.getItem('userphone') || '';
		$(this.refs.phone).val(userphones);
        localStorage.getItem('userphone') !=''?$(f.refs.telCan).show():$(f.refs.telCan).hide()
		this.setState({
			phone: userphones
		});
		$(f.refs.telCan).css('display','none')
		$(f.refs.msgCode).focus(function(){
			$(f.refs.telCan).css('display', 'none')
		});
		$(f.refs.phone).focus(function() {
			if ($(f.refs.phone).val().length > 0) {
				$(f.refs.telCan).css('display', 'inline-block')
			}
		});
	}
	handleChange(e, m) {
		var t = e.target.name,
			v = e.target.value;
		var f = this;
		var mValue = $(f.refs.phone).val().replace(/[ ]/g, "");
		if (mValue != ' ') {
			var mLength = mValue.length;
			if (mLength <= 3) {
				$(f.refs.phone).val(mValue);
			} else {
				if (mLength <= 7) {
					$.trim($(f.refs.phone).val(mValue.substring(0, 3) + ' ' + mValue.substring(3, mLength)))
				} else {
					$.trim($(f.refs.phone).val(mValue.substring(0, 3) + ' ' + mValue.substring(3, 7) + ' ' + mValue.substring(7, 11)))
				}
			}
		}
		

		t == 'phone' ? this.setState({
			phone: v.length > 0 ? e.target.value : false,
			tel: v.length > 0 ? e.target.value : false
		}) : this.setState({
			msgCode: v.length > 0 ? e.target.value : false
		});
		$(this.refs[m]).css('display', v.length > 0 ? 'inline-block' : 'none');
	}

	cancle(m, n) {
		this.setState({
			cancle: true,
			tel: ''
		})
		$(this.refs[m]).val('');
		this.state[m] = '';
		$(this.refs[n]).css('display', 'none');
		$(this.refs.phone).focus();
	}
	getTimeout(t) {
		var that = this,
			html = that.state.html;
		if (that.state.wait == 0) {
			that.setState({
				html: '获取验证码',
				wait: 60,
				smsCode: false
			});
		} else {
			that.setState({
				v: true,
				html: that.state.wait + "s"
			});
			setTimeout(function() {
				that.state.wait--;
				that.getTimeout();
			}, 1000);
		}
	}
	getMsgCode(e) {
		e.preventDefault();
		if (!e.target.className.indexOf('disabled') > -1) {
			var t = this,
				html = e.target.innerHTML;

			$.ajax({
				url: '/user/registerLogin/sendMsgCode.do',
				type: 'get',
				data: {
					phone: t.state.phone.replace(/[ ]/g, "")
				},
				success: function(d) {
					if (d.code == 200) {
						t.getTimeout(html);
						$(t.refs.hints).html(d.msg);
						$(t.refs.hintsC).show();
						$(t.refs.telCan).hide();
						setTimeout(function() {
							$(t.refs.hintsC).hide();
							$(t.refs.msgCode).focus();

						}, 1000)
					} else {
						// t.setState({
						//   'show':true,
						//   'content':d.msg
						// })
						//console.log(123)
						$(t.refs.hints).html(d.msg);
						$(t.refs.hintsC).show();
						setTimeout(function() {
							$(t.refs.hintsC).hide();
							t.refs.phone.focus()
						}, 1000)

					}
				}
			})
		}

	}
	isOk() {
		var t = this;
		t.setState({
			show: !t.state.show
		})

	}

	handleClick(e) {
		if ((e.target.className.indexOf('button-disabled') > -1) == false) {
			var t = this;
			localStorage.setItem('userphone', t.state.phone);

			$.ajax({
				url: '/user/registerLogin/quickLogin.do',
				type: 'post',
				data: {
					phone: t.state.phone.replace(/[ ]/g, ""),
					msgCode: t.state.msgCode
				},
				success: function(d) {
					if (d.code == 200) {
						var userPortrait = d.data.userPortrait ? d.data.userPortrait : '/static/circle/headportrait64x64@3x.png';
						localStorage.setItem('userPortrait', userPortrait);
						Router.push({
							pathname: '/index',
							query: {}
						})
						t.setState({
								tel: t.state.phone.replace(/[ ]/g, "")
							})
							// if(t.props.login.url.query.login){
							//   Router.back();
							// }else{
						t.refs.denglu.innerHTML = "登录中"
						$(t.refs.rotate).show()
							// }
					} else {
						$(t.refs.hints).html(d.msg);
						$(t.refs.hintsC).show();
						$(t.refs.rotate).show();
						t.refs.denglu.innerHTML = "登录中"
						setTimeout(function() {
							$(t.refs.hintsC).hide();
							$(t.refs.rotate).hide();
							t.refs.denglu.innerHTML = '登录'
							t.refs.phone.focus()
						}, 1000)

					}
				}
			})
		}


	}
	protocol() {
		Router.push({
			pathname: '../../mobi/login/user_protocol'
		})
	}

	render(e) {
		this.state.codeBtn = this.state.phone.length >= 13 ? (this.state.smsCode ? 'disabled' : '') : 'disabled';
		this.state.disabled = this.state.phone.length >= 13 && this.state.msgCode.length >= 4 ? '' : 'button-disabled';

		return (
			<div>
	  	<div className='login_bg'>

		  <article className="logo_bg" >
			<img className="goback" src='/static/login/common_shut_down@2x.png' onClick={() => Router.back()}/>
			<div className='login'>登录</div>
			<div className="logo">
				
			</div>
	  	  </article>
		  <div id="login_user">
			<ul className="logo_user">
				<li className="login-tel clearfix">					

					<input type="tel" placeholder="手机号码" maxLength="13" name="phone" className="input tel" ref="phone" onChange={(e,m)=>{this.handleChange(e,'telCan')}} />
					<img className="cancle" src='/static/login/common_Clear@2x.png' ref='telCan' onClick={(m,n)=>{this.cancle('phone','telCan')}}/>
				</li>
				<li className="login-password clearfix">					

					<input type="password" placeholder="验证码" maxLength="10" name="password" className="input pass" ref="msgCode" onChange={(e,m)=>{this.handleChange(e,'passCan')}} />
					<span className={"right get-smscode"+' '+this.state.codeBtn} href="javascript:void(0)" onClick={(e)=>{this.getMsgCode(e)}}>{this.state.html}</span>					
				</li>
			</ul>
			<div className="login-btn">
				<img ref='rotate' className='img_rotate' src='/static/login/login_loading@3x.gif' />

				<a href="javascript:void(0)" className={"button button-stress"+' '+ this.state.disabled} data-value="0" onClick={this.handleClick} ref="denglu" >登 录</a>
			</div>
			<div className='login_xy'>登录即表示同意<span ><Link href="./mobi/login/user_protocol"><a>《乐米金融用户协议》</a></Link></span></div>
			<Confirm type={1} confirm={this.state} isOk={()=>{this.isOk()}}/>
			<div className='hint' ref='hintsC'><p><span ref='hints'></span></p></div>
	  </div>
	  </div> 
	  	<style jsx global>{`
			html,body{
				height: 100%;
				background: #FFF;
			}
		`}</style> 
		<style jsx>{`
			
			.login_bg{
				background:#fff;
				width:100%;
				height:100%;
				background:url(/static/login/logo_bg@3x.png) no-repeat ;
				background-size:100% 100%;
			}
			.login_user_bg{
				width:100%;
				height:100%;
			}
			.hint{
				display:none;
				width:100%;
				height:.44rem;
				position:fixed;
				top:38%;
				
			}
			.hint p{
			
				width:100%;
				height:.44rem;
				display:flex;
				flex-direction:column;
				justify-content:center;
				align-items:center;
			}
			.hint span{
				display:inline-block;
				margin:0 auto;
				background:rgba(0,0,0,0.75);
				border-radius:4px;
				padding:0 .1rem;
				line-height:.44rem;
				text-align:center;
				font-family:.PingFangSC-Regular;
				font-size:14px;
				color:#ffffff;
			}
			.img_rotate{
				display:none;
				width:.2rem;
				height:.2rem;
				vertical-align:middle;
				margin-right:.05rem;
				position:absolute;
			    top: 50%;
			    left: 50%;
			    margin-top: -.09rem;
			    margin-left: -.45rem;
				}
		  	.logo_bg{
				width: 100%;
				height:60%;
				text-align: center;
				padding-top: 1.22rem;
				padding-bottom: 1rem;
				background-size: cover;
				position: relative;
				
		   }
		   .logo_bg .login{
		   	position:fixed;
		   	left:50%;
		   	top:.05rem;
		   	margin-left:-0.16rem;
		   	font-size:.16rem;
		   	color:#222;
		   }
		   .logo_bg .goback{
				position: fixed;
				top: .1rem;
				left: .1rem;
				width:.15rem;
				height:.15rem;
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
				padding:0 .3rem;
		   }
		   .logo_user>li{
				margin: 0 .1rem;
				height: .5rem;
				padding: 0;
				position: relative;
				display: flex;
    			align-items: center;
				border-bottom: 1px solid #dddddd;
				box-shadow:inset 0 0 0 0 #dddddd;
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
		   		text-indent:.05rem;
				vertical-align: middle;
				background: #fff;
				color: #000;
				
		   }
		   .logo_user .input:-ms-input-placeholder{
				color:#999999;
		   }
		   .logo_user .input::-webkit-input-placeholder{
				color:#999999;
		   }
		   .login-tel .input,.login-password .input{
				width: 100%;
				border: 0;
		   }
		   
		  	.get-smscode{
				position: absolute;
				right: 0;
				top: .08rem;
				display: inline-block;
				width:.9rem;
				padding: .06rem .05rem;
				border-radius: 0.15rem;
				text-align: center;
				background: #f5f5f5;
				color:#222222;
		   }
		   .disabled{
				background:#f5f5f5;
				color:#999999;
		   }
		   .login-btn{
				display: block;
				margin: .24rem .15rem 0;
				height: .44rem;
				line-height: .44rem;
				padding:0 .25rem;
				text-align: center;
				font-size: .15rem;
				color: #fff;
				margin-bottom: 0.1rem;
				position:relative;
		   }
		   
		   .login_xy{
		   		display:block;
		   		text-align:center;
		   		height:.2rem;
		   		line-height:.2rem;
		   		color:#999;
		   		font-family:.PingFangSC-Regular;
		   		font-size:.1rem;
		   }
		   .login_xy span{
		   	color:#76a4f1;
		   }
		   .button-stress {
				background-color: #222222;
			}
			.button-disabled{
				background-color:#7b7b7b;
			}
			.button {
				display: inline-block;
				width: 100%;
				height: .44rem;
				line-height: .44rem;
				padding: 0 .1rem;
				color: #fff;
			}
		`}</style>
	  </div>
		);
	}
}
export default Login;
