import React, {
  Component
} from 'react'
import Router from 'next/router'
import $ from 'jquery'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Confirm from '../../common/confirm.js';
import Style from './approvecss.js';

export default class Approve extends Component{
	 constructor(props) {
        super(props);
    }
     render() {
        return (<div>
		        <Header_title text="实名认证"/>
		        <Header text="实名认证" />
		        <Style/>
		        <Edite  id={this.props.url.query.id}/>
		    </div>
		)
    }
} 


 class Edite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userimgY: null,
			userimgN: null,
			input1:null,
			input2:null,
			confirm:{
                show:false,
                content:'',
            },
			confirmNum:1,
			confirmOk:function(){}
		}
		
		this.handleChange = this.handleChange.bind(this);
		this.toSubmit = this.toSubmit.bind(this);
		this.init = this.init.bind(this);
		this.confirmation = this.confirmation.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.removeInput = this.removeInput.bind(this);
		this.historyUser = this.historyUser.bind(this);
        this.selectFileImage = this.selectFileImage.bind(this);
    }
	componentDidMount(){
        this.init();
        if(this.props.id){
        	this.historyUser()
        }
	}
	init(){
		
		$.ajax({
            type:'get',
            url:'/user/user/userCertification.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){

					if(d.data){
						if( (d.data.status==0) || d.data.status ){
							
							if (d.data.status==0) {
								$(this.refs.mask).show();
								$(this.refs.btn_submit).html('审核中');
								$(this.refs.input1).val(d.data.realName);
								$(this.refs.input2).val(d.data.certCode);
								this.setState({
									userimgY: d.data.certPositive,
									userimgN: d.data.certBack
								});
							}else if(d.data.status==1) {
								$(this.refs.mask).show();
								$(this.refs.btn_submit).hide() && $(this.refs.userImg).hide() && $(this.refs.certified).show() && $(this.refs.user_userimg).hide();
								$(this.refs.certified).parent().css('margin-top','0');
								var str = ''
								for(var i=0;i<(d.data.realName.length-1);i++){
									str += '*'
								}
								$(this.refs.input1).val(d.data.realName.substring(0,1)+str);
								
								$(this.refs.input2).val(d.data.certCode.replace(d.data.certCode.substring(4,16),'************'));
							}else{
								$(this.refs.btn_submit).html('重新提交');
								$(this.refs.input1).val(d.data.realName);
								$(this.refs.input2).val(d.data.certCode);
								this.setState({
									input1:d.data.realName,
									input2:d.data.certCode,
									userimgY: d.data.certPositive,
									userimgN: d.data.certBack
								});
							}
						}
					}
                }
            }.bind(this)
        });
	}
	historyUser(){
		var _this=this;
		$.ajax({
            type:'get',
            url:'/user/user/queryCertification.do',
            data:{id:_this.props.id},
            dataType:'json',
            success:function(d){
            	if(d.code==200){
					if(d.data){
						if( (d.data.status==0) || d.data.status ){

							if (d.data.status==0) {
								$(_this.refs.mask).show();
								$(_this.refs.input1).val(d.data.realName);

								$(_this.refs.input2).val(d.data.certCode);
								_this.setState({
									userimgY: d.data.certPositive,
									userimgN: d.data.certBack
								});
							}else if(d.data.status==1) {
								$(_this.refs.mask).show();
								$(_this.refs.btn_submit).hide() && $(_this.refs.userImg).hide() && $(_this.refs.certified).show() && $(_this.refs.user_userimg).hide();
								$(_this.refs.certified).parent().css('margin-top','0');
								var str = ''
								for(var i=0;i<(d.data.realName.length-1);i++){
									str += '*'
								}
								$(_this.refs.input1).val(d.data.realName.substring(0,1)+str);
								
								$(_this.refs.input2).val(d.data.certCode.replace(d.data.certCode.substring(4,16),'************'));
							}else{
								$(_this.refs.input1).val(d.data.realName);
								$(_this.refs.input2).val(d.data.certCode);
								_this.setState({
									input1:d.data.realName,
									input2:d.data.certCode,
									userimgY: d.data.certPositive,
									userimgN: d.data.certBack
								});
							}
						}
					}
                }
        }
    })
		
	}
     
     selectFileImage(judge) {
        //var file = fileObj.files['0'];
        var file = this.refs[judge].files['0'];
        //图片方向角 added by lzk
        var Orientation = null;
        var that = this;
        if (file) {
            var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
            var maxSize = 50 * 1024 * 1024;
            if (!rFilter.test(file.type)) {
                alert("请选择jpeg、png格式的图片", false);
                return;
            }
            if (file.size > maxSize) {
				alert('选择文件大于' + maxSize / 1024 / 1024 + 'M，请重新选择');
				return;
			}
            // var URL = URL || webkitURL;
            //获取照片方向角属性，用户旋转控制
            EXIF.getData(file, function() {
                EXIF.getAllTags(this);
                Orientation = EXIF.getTag(this, 'Orientation');
            });

            var oReader = new FileReader();
            oReader.onload = function(e) {
                //var blob = URL.createObjectURL(file);
                //_compress(blob, file, basePath);
                var image = new Image();
                image.src = e.target.result;
                image.onload = function() {
                    var expectWidth = this.naturalWidth;
                    var expectHeight = this.naturalHeight;

                    if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 300) {
                        expectWidth = 300;
                        expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                    } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 400) {
                        expectHeight = 400;
                        expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                    }
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    canvas.width = expectWidth;
                    canvas.height = expectHeight;
                    ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                    var base64 = null;
                    //修复ios
                    if (navigator.userAgent.match(/iphone/i)) {
                        //如果方向角不为1，都需要进行旋转 added by lzk
                        if(Orientation != "" && Orientation != 1){
                            switch(Orientation){
                                case 6://需要顺时针（向左）90度旋转
                                    ctx.rotate(90 * Math.PI / 180);
                                    ctx.drawImage(this,0,-expectWidth,expectHeight,expectWidth);
                                    break;
                                case 8://需要逆时针（向右）90度旋转
                                    ctx.rotate(270 * Math.PI / 180);
                                    ctx.drawImage(this,-expectHeight,0,expectHeight,expectWidth);
                                    break;
                                case 3://需要180度旋转
                                    ctx.rotate(180 * Math.PI / 180);
                                    ctx.drawImage(this,-expectWidth,-expectHeight,expectWidth,expectHeight);
                                    break;
                            }
                        }

                        /*var mpImg = new MegaPixImage(image);
                        mpImg.render(canvas, {
                            maxWidth: 800,
                            maxHeight: 1200,
                            quality: 0.8,
                            orientation: 8
                        });*/
                        
                    }
                    base64 = canvas.toDataURL("image/png", 0.8);
                    var re = /,/;
                    var num = base64.search(re)+1;
                    var str = '';
                    str = base64.substr(num);
                    $.ajax({
                        url:"/user/user/upload.do",
                        data:{picture:str},
                        type:'post',
                        dataType:'json',
                        success:function(i){
                            if(i.code == 200){
                                judge == 'input3' ? that.setState({ userimgY:i.data }) :  that.setState({ userimgN:i.data });
                            }
                        }
                    })
                };
            };
            oReader.readAsDataURL(file);
        }
    }
    handleChange(e,e1){
		var Inp = $(this.refs[e]);
		var val = Inp.val();
		if(val.length>0){
			$(this.refs[e1]).show();
		}
		else{
			$(this.refs[e1]).hide();
		}
		
		val = val == '' ? null : val;
		
		e == 'input1' ? this.setState({ input1:val }) : this.setState({ input2:val });
		this.setState({
			confirm:{
				show:false,
				content:''
			}
		});
		
	}
	removeInput(e,e1){
		var Inp = $(this.refs[e]);
		var val = Inp.val('');
		$(this.refs[e1]).hide();
	}
	toSubmit(){

		if( (this.state.input1!=null) && (this.state.input2!=null) && (this.state.userimgN!=null) && (this.state.userimgY!=null) ){
			
			var _this = this;
			
			var json = {};
			json.Back = this.state.userimgN;
			json.Positive = this.state.userimgY;
			json.certCode = this.state.input2;
			json.realName = this.state.input1;
			
			$.ajax({
				url:"/user/user/updateUserCertification.do",
				data:json,
				type:'post',
				dataType:'json',
				success:function(i){
					if(i.code == 200){
						_this.init();
						$(_this.refs.hints).html('提交成功');
						$(_this.refs.hintsC).show();
						setTimeout(function(){
							$(_this.refs.hintsC).hide();
						},1000)
						$(_this.refs.btn_submit).css('background','#999');
						$(_this.refs.input_none1).hide();
						$(_this.refs.input_none2).hide();											
						_this.setState({
							confirm:{
								show:false,
								content:i.msg
							},
							confirmNum:1,
							confirmOk:function(){}
						});
						
						
						
					}
					else{
						_this.setState({
							confirm:{
								show:false,
								content:i.msg
							},
							confirmNum:1,
							confirmOk:function(){}
						});
						$(_this.refs.hints).html(i.msg);
						$(_this.refs.hintsC).show();
						$(_this.refs.btn_submit).html('重新提交') 
						setTimeout(function(){
							$(_this.refs.hintsC).hide();
						},1000)
					}
				}
			})
		}
	}
	confirmation(){
		if( (this.state.input1!=null) && (this.state.input2!=null) && (this.state.userimgN!=null) && (this.state.userimgY!=null) ){
				var _this = this
				_this.setState({
					confirm:{
						show:true,
						content:'是否确认提交实名认证？'
					},
					confirmNum:2,
					confirmOk:_this.toSubmit
				});
		}
	}
    render() {
		var sure_submit = '';
		if( (this.state.input1!=null) && (this.state.input2!=null) && (this.state.userimgN!=null) && (this.state.userimgY!=null) ){
			sure_submit = 'sure_submit' 
		}
		
        return (
            <section className="approve_main">
               
                <div className="userName">
                	<p className='certified' ref='certified'>已认证信息</p>
                	<input ref="input1" type="text" id="j_name" placeholder="姓名" value={this.state.input1} onChange={()=>this.handleChange('input1','input_none1')} />
                	<img ref="input_none1" src="../../../static/realname_label_icon_delete.png" className="input_none1" onClick={()=>this.removeInput('input1','input_none1')} />
                	
                	<input ref="input2" type="text" placeholder="身份证" id="j_id" onChange={()=>this.handleChange('input2','input_none2')} />
                	<img ref="input_none2" src="../../../static/realname_label_icon_delete.png" className="input_none2" onClick={()=>this.removeInput('input2','input_none2')} />
                </div>
                <div className='hint' ref='hintsC'><p><span ref='hints'></span></p></div>
                <div className='user_userimg' ref='user_userimg'>身份证照片</div>
                <div className="userImg" ref='userImg'>
                
                	<div className="up_img">
                	
                		{
							this.state.userimgY == null ?
								<div className="up_img_content">
									<img src="../../../static/Group 2@3x.png" />
									<p>正面照片</p>
								</div>
								:
								<div className="up_img_content">
									<img className="show_Img" src={this.state.userimgY+'?x-oss-process=image/resize,w_200'} />
								</div>
						}
                		
                		<input type="file" accept="image/*;capture=camera" className="sfz_z input_none" onChange={()=>this.selectFileImage('input3')} ref="input3"/>
                	</div>
                	
                	<div className="up_img up_imgL">
                		
                		{
							this.state.userimgN == null ?
								<div className="up_img_content">
									<img src="../../../static/Group 1@3x.png" />
									<p>背面照片</p>
								</div>
								:
								<div className="up_img_content">
									<img className="show_Img" src={this.state.userimgN+'?x-oss-process=image/resize,w_200'} />
								</div>
						}
                		
                		<input type="file" accept="image/*;capture=camera" className="sfz_f input_none" onChange={()=>this.selectFileImage('input4')} ref="input4"/>
                	</div>
                	
                </div>
                
                <div ref="btn_submit" className={"btn_submit "+sure_submit} onClick={this.confirmation}>提 交</div>
                
                <Confirm type={this.state.confirmNum} confirm={this.state.confirm} isOk={this.state.confirmOk}/>
                
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png"/>
					<p>提交成功</p>
                </div>
                
                <div ref="mask" className="all_mask"></div>
            <style jsx>{`
				.hint{
				display:none;
				width:100%;
				height:.44rem;
				position:fixed;
				top:37%;
				z-index:2;
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
					padding:.0 .1rem;
					line-height:.44rem;
					text-align:center;
					font-family:.PingFangSC-Regular;
					font-size:14px;
					color:#ffffff;
				}
				.userName .certified{
					display:none;
					width:100%;
					height:.3rem;
					line-height:.3rem;
					font-size:12px;
					color:#999999;
					background:#f5f5f5;
					text-indent:0.22rem;
				}
				.user_userimg{
					height:.4rem;
					line-height:.4rem;
					width:100%;
					font-size:14px;
					color:#999999;
					letter-spacing:0;
					text-indent:0.22rem;
				}
		`}</style> 
            </section>
        )
    }
}
