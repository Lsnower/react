import React from 'react'
import $ from 'jquery'
import Link from 'next/link'
import Router from 'next/router';
import Header_title from '../common/header/header_title.js';
import Style from './sharecss.js';
import Toast from '../common/toast.js';

class Share extends React.Component {
    constructor(props){
        super(props)
		this.state = {
			html:'获取验证码',
			submit:0,
			codeOnff:false,
			toast:'',
			lqNum:0
        }
		this.handPhoneChange = this.handPhoneChange.bind(this);
		this.shareCle = this.shareCle.bind(this);
		this.getMsgCode = this.getMsgCode.bind(this);
		this.codeDs = this.codeDs.bind(this);
		this.submitBtn = this.submitBtn.bind(this);
		this.toastShow = this.toastShow.bind(this);
    }
	componentDidMount(){
		var _this = this;
		
		$.ajax({
			url: '/user/userTask/getRegisterreward.do',
			type: 'post',
			data: {},
			success:function(d){
				if(d.code == 200){
					_this.setState({
						lqNum : d.data
					});
				}
				else{
					_this.setState({
						toast:d.msg
					});
					_this.toastShow();
				}
			}
		});
	}
	handPhoneChange(){
		var _this = this
		var mInput = $(_this.refs.phone);
		var mValue = mInput.val().replace(/[ ]/g,"");
		
		if (mValue != ' ') {
			var mLength = mValue.length;
			if(mLength <= 3){
				mInput.val(mValue);
			}
			else{
				if (mLength <= 7) {
					$.trim(mInput.val(mValue.substring(0, 3) + ' ' + mValue.substring(3, mLength))) 
				}
				else{
					$.trim(mInput.val(mValue.substring(0, 3) + ' ' + mValue.substring(3, 7) + ' ' + mValue.substring(7, 11))) 
				}
			}
			if(mValue != ''){
				$(_this.refs.share_cle).show();
			}
			else{
				$(_this.refs.share_cle).hide();
			}
		}
		if( (mValue.length>10) && isNaN(_this.state.html) ){
			_this.setState({
				codeOnff:true
			});
		}
		else{
			_this.setState({
				codeOnff:false
			});
		}
		
	}
	shareCle(){
		$(this.refs.phone).val('');
		$(this.refs.share_cle).hide();
		this.setState({
			codeOnff:false
		});
	}
	getMsgCode(event){
		event.preventDefault();
		var _this = this
		var phone = $(this.refs.phone).val().replace(/[ ]/g,"");
		if( (phone.length>10) && _this.state.codeOnff ){
			$.ajax({
				url: '/user/registerLogin/sendMsgCode.do',
				type: 'get',
				data: {phone: phone},
				success:function(d){
					if(d.code == 200){
						_this.setState({
							codeOnff:false,
							html:60,
							toast:d.msg
						});
						_this.codeDs();
						_this.toastShow();
					}
					else{
						_this.setState({
							toast:d.msg
						});
						_this.toastShow();
					}
				}
			})
		}
		
	}
	codeDs(){
		var _this = this;
		var timer = null;
		var num = 60;
		timer = setInterval(function(){
			if(num>1){
				num--;
				_this.setState({
					codeOnff:false,
					html:num
				});
			}
			else{
				clearInterval(timer);
				var next = $(_this.refs.phone).val().replace(/[ ]/g,"").length>10 ? true : false;
				_this.setState({
					codeOnff:next,
					html:'重新获取'
				});
			}
		},1000)
	}
	submitBtn(){
		
		var _this = this;
		
		if(_this.state.submit==0){
			var phone = $(_this.refs.phone).val().replace(/[ ]/g,"");
			var code = $.trim($(_this.refs.msgCode).val());
			$.ajax({
				url: '/user/registerLogin/quickLogin.do',
				type: 'post',
				data: {phone:phone,msgCode:code},
				success:function(d){
					if(d.code == 200){
						receive();
					}
					else{
						_this.setState({
							toast:d.msg
						});
						_this.toastShow();
					}
				}
			});
			function receive(){
				$.ajax({
					url: '/user/userTask/registerTaskReceive.do',
					type: 'post',
					data: {},
					success:function(d){
						if(d.code == 200){
							_this.setState({
								submit:1
							});
						}
						else if(d.code == 300){
							_this.setState({
								submit:2
							});
						}
						else{
							_this.setState({
								toast:d.msg
							});
							_this.toastShow();
						}
					}
				});
			}
		}
		else{
			$(_this.refs.down_a).attr('href','https://www.baidu.com/');
		}
	}
	toastShow(){
		var mask = $(this.refs.toast);
		mask.show();
		setTimeout(function(){
            mask.hide();
        },1500)
	}
    render(){
		var bgImg,btnTxt;
		var onoff = this.state.submit;
		
		if(onoff == 0){
			bgImg = '/static/pk/futures_vs_share_bg1@2x.png';
			btnTxt = '领取'+this.state.lqNum+'元宝';
		}
		else if(onoff == 1){
			bgImg = '/static/pk/futures_vs_share_bg2@2x.png';
			btnTxt = '下载APP获得更好体验';
		}
		else{
			bgImg = '/static/pk/futures_vs_share_bg3@2x.png';
			btnTxt = '下载APP获得更好体验';
		}
		var code = this.props.url.query.code ? this.props.url.query.code : '';
		var indexUrl = '/index?code='+code;
		if(this.props.url.query.isWechat){
			indexUrl ='/index?code='+code+'&isWechat='+this.props.url.query.isWechat;
		}
        return (<div>
				<Header_title text='期货对战'/>
				<Style />
				<div className='share_top' style={{backgroundImage:'url('+bgImg+')'}}>
					
					<div className='top_main'>
						<div style={{display:onoff==0?'block':'none'}}>
							<div className='top_div'>					
								<input type="tel" placeholder='手机号码' className="share_input share_tel" onChange={this.handPhoneChange} maxLength="13" ref="phone" />
								<img ref='share_cle' className="share_cle" src='/static/pk/common_Clear_white@2x.png' onClick={this.shareCle}/>
							</div>
							<div className='top_div'>					
								<input type="text" placeholder='验证码' className="share_input share_code" onChange={this.handCodeChange} maxLength="10" ref="msgCode"/>
								<span className={this.state.codeOnff?"getcode getcode_show":"getcode"} onClick={this.getMsgCode}>{this.state.html}</span>
							</div>
						</div>
						<Link href={indexUrl}><a style={{display:onoff!=0?'block':'none'}} className='share_toindex'></a></Link>
					</div>
					
					<a className="share_submit" ref='down_a' onClick={this.submitBtn}>{btnTxt}</a>
				</div>
				<div className='share_bottom'>
					游戏规则：<br/>
					1.新用户注册并接受对战邀请即可获得300元宝；<br/>
					2.发布对战者已设置赏金，进入对战后系统会冻结您等同金额的赏金；<br/>
					3.对战结束，胜利方获得赏金的95%，平局不扣赏金；<br/>
					4.游戏最终解释权归乐米所有。
				</div>
				
				<div className='toastHide' ref='toast'>
					<div className='toastBox'>
						<div className='toast'>{this.state.toast}</div>
					</div>
				</div>
				
			</div>)
    }
}

export default Share