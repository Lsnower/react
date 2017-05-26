import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Link from 'next/link';
import Text_none from '../common/text_none.js'
import Style from './toborrowcss.js'
import Confirm from '../common/confirm.js';
class Notice extends React.Component{
    constructor(props) {
        super(props)
        
		
    }
    render(){

        return(
            <div className='news'>
            	平台只做信息发布，一切用户行为与平台无关，请谨慎借款。
            </div>
        )
    }
}
class Detail extends React.Component{
	constructor(props){
        super(props)
        this.state = {
            userimgone: null,
			userimgtwo: null,
            userimgthree: null,
			userimgfour: null,
            upimgone:null,
            upimgtwo:null,
            upimgthree:null,
            upimgfour:null,
            input1: null,
			input2:null,
            input3:null,
            input4:null,
			confirm:{
                show:false,
                content:'',
            },
			confirmNum:1,
			confirmOk:function(){},
            tipcontent:null,
            tipshow:false,
            asytt:false
		}
        this.updatePic = this.updatePic.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.confirmation = this.confirmation.bind(this);
        this.toSubmit = this.toSubmit.bind(this);
        this.handClick = this.handClick.bind(this);
    }
    componentDidMount(){

    }
    isChecked(a){
        var s = !0;
        return s == a.prop("checked");
    }
    handClick(){
        if($(this.refs.agreement).prop("checked")){
            this.setState({
                asytt:true
            })
        }else{
            this.setState({
                asytt:false
            })
        }
    }
    updatePic(judge){

        var that = this;

		var u = new UploadPic();
		function UploadPic() {
			that.sw = 0;
			that.sh = 0;
			that.tw = 0;
			that.th = 0;
			that.scale = 0;
			that.maxWidth = 0;
			that.maxHeight = 0;
			that.maxSize = 0;
			that.fileSize = 0;
			that.fileDate = null;
			that.fileType = '';
			that.fileName = '';
			that.input = null;
			that.canvas = null;
			that.mime = {};
			that.type = '';
			that.callback = function () {};
			that.loading = function () {};
		}

		UploadPic.prototype.init = function (options) {
			options
			this.maxWidth = options.maxWidth || 800;
			this.maxHeight = options.maxHeight || 600;
			this.maxSize = options.maxSize || 3 * 1024 * 1024;
			this.input = options.input;
			this.mime = {'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg', 'bmp': 'image/bmp'};
			this.callback = options.callback || function () {};
			this.loading = options.loading || function () {};

			this._addEvent();
		};

		/**
		 * @description 绑定事件
		 * @param {Object} elm 元素
		 * @param {Function} fn 绑定函数
		 */
		UploadPic.prototype._addEvent = function () {
			var _this = this;

			function tmpSelectFile(ev) {
				_this._handelSelectFile(ev);
			}

			this.input.addEventListener('change', tmpSelectFile, false);
		};

		/**
		 * @description 绑定事件
		 * @param {Object} elm 元素
		 * @param {Function} fn 绑定函数
		 */
		UploadPic.prototype._handelSelectFile = function (ev) {
			var file = ev.target.files[0];

			this.type = file.type

			// 如果没有文件类型，则通过后缀名判断（解决微信及360浏览器无法获取图片类型问题）
			if (!this.type) {
				this.type = this.mime[file.name.match(/\.([^\.]+)$/i)[1]];
			}

			if (!/image.(png|jpg|jpeg|bmp)/.test(this.type)) {
				alert('选择的文件类型不是图片');
				return;
			}

			if (file.size > this.maxSize) {
				alert('选择文件大于' + this.maxSize / 1024 / 1024 + 'M，请重新选择');
				return;
			}

			this.fileName = file.name;
			this.fileSize = file.size;
			this.fileType = this.type;
			this.fileDate = file.lastModifiedDate;

			this._readImage(file);
		};

		/**
		 * @description 读取图片文件
		 * @param {Object} image 图片文件
		 */
		UploadPic.prototype._readImage = function (file) {
			var _this = this;

			function tmpCreateImage(uri) {
				_this._createImage(uri);
			}

			this.loading();

			this._getURI(file, tmpCreateImage);
		};

		/**
		 * @description 通过文件获得URI
		 * @param {Object} file 文件
		 * @param {Function} callback 回调函数，返回文件对应URI
		 * return {Bool} 返回false
		 */
		UploadPic.prototype._getURI = function (file, callback) {
			var reader = new FileReader();
			var _this = this;

			function tmpLoad() {
				// 头不带图片格式，需填写格式
				var re = /^data:base64,/;
				var ret = this.result + '';

				if (re.test(ret)) ret = ret.replace(re, 'data:' + _this.mime[_this.fileType] + ';base64,');

				callback && callback(ret);
			}

			reader.onload = tmpLoad;

			reader.readAsDataURL(file);

			return false;
		};

		/**
		 * @description 创建图片
		 * @param {Object} image 图片文件
		 */
		UploadPic.prototype._createImage = function (uri) {
			var img = new Image();
			var _this = this;

			function tmpLoad() {
				_this._drawImage(this);
			}

			img.onload = tmpLoad;

			img.src = uri;
		};

		/**
		 * @description 创建Canvas将图片画至其中，并获得压缩后的文件
		 * @param {Object} img 图片文件
		 * @param {Number} width 图片最大宽度
		 * @param {Number} height 图片最大高度
		 * @param {Function} callback 回调函数，参数为图片base64编码
		 * return {Object} 返回压缩后的图片
		 */
		UploadPic.prototype._drawImage = function (img, callback) {
			this.sw = img.width;
			this.sh = img.height;
			this.tw = img.width;
			this.th = img.height;

			this.scale = (this.tw / this.th).toFixed(2);

			if (this.sw > this.maxWidth) {
				this.sw = this.maxWidth;
				this.sh = Math.round(this.sw / this.scale);
			}

			if (this.sh > this.maxHeight) {
				this.sh = this.maxHeight;
				this.sw = Math.round(this.sh * this.scale);
			}

			this.canvas = document.createElement('canvas');
			var ctx = this.canvas.getContext('2d');

			this.canvas.width = this.sw;
			this.canvas.height = this.sh;

			ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.sw, this.sh);

			this.callback(this.canvas.toDataURL(this.type));

			ctx.clearRect(0, 0, this.tw, this.th);
			this.canvas.width = 0;
			this.canvas.height = 0;
			this.canvas = null;
		};
		
		
		var z;
        if(judge == '0'){
            z = '.sfz_one'
        }else if(judge == '1'){
            z = '.sfz_two'
        }else if(judge == '2'){
            z = '.sfz_three'
        }else{
            z = '.sfz_four'
        }
		
		u.init({
			input: document.querySelector(z),
			callback: function (base64) {
				var re = /,/;
				var num = base64.search(re)+1;
				var str = '';
				str = base64.substr(num);
                    if(judge == 0){
                    that.setState({ userimgone:str })
                    }else if(judge == 1){
                        that.setState({ userimgtwo:str })
                    }else if(judge == 2){
                        that.setState({ userimgthree:str })
                    }else{
                        that.setState({ userimgfour:str })
                    }
                that.setState({
			confirm:{
				show:false,
				content:''
			}
		});
				$.ajax({
					url:"/user/user/upload.do",
					data:{picture:str},
					type:'post',
					dataType:'json',
					success:function(i){
						if(i.code == 200){
                            if(judge == 0){
                                that.setState({upimgone:i.data })
                                $('.sfz_two').parent().removeClass('noimg');
                            }else if(judge == 1){
                                that.setState({ upimgtwo:i.data })
                                $('.sfz_three').parent().removeClass('noimg');
                            }else if(judge == 2){
                                that.setState({ upimgthree:i.data })
                                $('.sfz_four').parent().removeClass('noimg');
                            }else{
                                that.setState({ upimgfour:i.data })
                            }
						}
					}
				})
			}
		});
		

	}
    handleChange(e){
        let that = this;
        var Inp = $(that.refs[e]);
        var val = Inp.val();
        val = val == '' ? null : val;
        if(e == 'input1'){
            that.setState({input1:val})
        }else if(e == 'input2'){
            that.setState({input2:val})
        }else if(e == 'input3'){
            that.setState({input3:val})
        }else if(e == 'input4'){
            that.setState({input4:val})
        }
        this.setState({
			confirm:{
				show:false,
				content:''
			}
		});
    }
    confirmation(){
        let a = this.refs.agreement;
		if(this.isChecked($(a)) && (this.state.input1!=null) && (this.state.input2!=null) && (this.state.input3!=null) && (this.state.input4!=null)){
                var r = /^\+?[1-9][0-9]*$/;
				var _this = this;
                if(this.state.input1 < 500 || this.state.input1 > 2000){
                    _this.setState({
                        tipcontent:'借款金额，最低500元，最高2000元',
                        tipshow:true
                    });
                }else if(!r.test(this.state.input1)){
                    _this.setState({
                        tipcontent:'借款金额，必须为整数',
                        tipshow:true
                    });
                }else if(this.state.input2 < 1 || this.state.input2 > 200){
                    _this.setState({
                        tipcontent:'借款利息，最低一元,最高200元',
                        tipshow:true
                    });
                }else if(!r.test(this.state.input2)){
                    _this.setState({
                        tipcontent:'借款利息，必须为整数',
                        tipshow:true
                    });
                }else if(this.state.input3 < 1 || this.state.input3 > 60){
                    _this.setState({
                        tipcontent:'借款时间，最短一天，最长60天',
                        tipshow:true
                    });
                }else if(!r.test(this.state.input3)){
                    _this.setState({
                        tipcontent:'借款时间，必须为整数',
                        tipshow:true
                    });
                }else if(this.state.input4.length > 300){
                     _this.setState({
                        tipcontent:'备注，最多300个字符；',
                        tipshow:true
                    });    
                }
                else{
                    _this.setState({
                        tipshow:false,
                        confirm:{
                            show:true,
                            content:'是否确认提交借款信息？'
                        },
                        confirmNum:2,
                        confirmOk:_this.toSubmit
                    });
                }
				
		}
        
	}
    toSubmit(){
        let a = this.refs.agreement;
		if( this.isChecked($(a)) && (this.state.input1!=null) && (this.state.input2!=null) && (this.state.input3!=null) && (this.state.input4!=null)){
			var _this = this;
			var _img = [],_array=[],_userimg;
            _img[0] = this.state.userimgone;
            _img[1] = this.state.userimgtwo;
            _img[2] = this.state.userimgthree;
            _img[3] = this.state.userimgfour;
            
            for(var i=0;i<_img.length;i++){
                if(_img[i]!= null){
                    _array.push(_img[i])
                }
            }
            if(_array.length > 1){
                _userimg = _array.toString();
            }else{
                _userimg = _array[0];
            }
            
			var json = {};
			json.money = this.state.input1;
			json.interest = this.state.input2;
			json.days = this.state.input3;
			json.content = this.state.input4;
			json.contentImg = _userimg;
			$.ajax({
				url:"/coterie/help/loan/addLoan.do",
				data:json,
				type:'post',
				dataType:'json',
				success:function(i){
					if(i.code == 200){
						$(_this.refs.success_mask).show();
						$(_this.refs.success_mask).animate({'opacity':1},500,function(){
							
							$(_this.refs.success_mask).animate({'opacity':0},500,function(){
								$(_this.refs.success_mask).hide();
                                Router.push({
                                    pathname: '/mobi/lend/myLend',
                                })
							})
							
						})
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
								show:true,
								content:i.msg
							},
							confirmNum:1,
							confirmOk:function(){}
						});
					}
				}
			})
		}
	}
    render(){
        let that = this,g="";
        if(this.state.asytt && (this.state.input1!=null) && (this.state.input2!=null) && (this.state.input3!=null) && (this.state.input4!=null)){
			g = 'selthat'
		}
    	return(
			<div className='details'>
            	<ul>
            		<li>
            			<div className="details_left">借款金额</div>
            			<div className="details_right">
                            <span className="have_padding">¥</span>
                            <input style={{'width':'150px'}} ref="input1" type='number' placeholder='500~2000' onChange={()=>this.handleChange('input1')}/></div>
            		</li>
            		<li>
            			<div className="details_left">愿付利息</div>
            			<div className="details_right">
                            <span className="have_padding">¥</span>
                            <input style={{'width':'150px'}} ref="input2" type='number' placeholder='1-200' onChange={()=>this.handleChange('input2')}/>
                        </div>
            		</li>
            		<li>
            			<div className="details_left">借款期限</div>
            			<div style={{ marginRight:'0.08rem' }} className="details_right"><input ref="input3" style={{ width: '0.45rem',textIndent:'0'}} type='number' placeholder='1~60' onChange={()=>this.handleChange('input3')}/><span>天</span></div>
            		</li>
            		<li style={{ border:'0' }}>
            			<div className="details_left">备注</div>
            			<div className="details_right">
                            <textarea placeholder='请填写有助于借款的信息哦，但不能填写联系方式哦' ref="input4" maxLength='300' onChange={()=>this.handleChange('input4')}></textarea>
                        </div>
            		</li>
            	</ul>
            	<div className='upload'>
					<p>最多可上传四张照片，不得带有联系方式和不好的照片哦！</p>
					<div className="up_img">
                        {   
							that.state.userimgone == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/realname_icon_addIDcard.png" />
                                    <p>添加照片</p>
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgone} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" className="sfz_one input_none" onClick={()=>this.updatePic(0)}/>
                	</div>
                    <div className="up_img noimg">
				        {
							that.state.userimgtwo == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/realname_icon_addIDcard.png" />
                                    <p>添加照片</p>
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgtwo} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" className="sfz_two input_none" onClick={()=>this.updatePic(1)}/>
                	</div>
                    <div className="up_img noimg">
				        {
							that.state.userimgthree == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/realname_icon_addIDcard.png" />
                                    <p>添加照片</p>
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgthree} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" className="sfz_three input_none" onClick={()=>this.updatePic(2)}/>
                	</div>
                    <div className="up_img noimg">
				        {
							that.state.userimgfour == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/realname_icon_addIDcard.png" />
                                    <p>添加照片</p>
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgfour} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" className="sfz_four input_none" onClick={()=>that.updatePic(3)}/>
                	</div>
				</div>
                <div className="showtip">{this.state.tipcontent}</div>
                <div className={"issue "+g} onClick={this.confirmation}>确认发布</div>
                <div className="agreement">
                    <label onClick={()=>this.handClick()}>
                        <input name="agreement" id="select" type="checkbox" ref="agreement"/>
                        <span>我已阅读并同意</span>
                    </label>
                    <Link href="./rules">
                        <a href="javascript:;;">《乐米借款规则与用户须知》</a>
                    </Link>
                </div>
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png" />
					<p>提交成功</p>
                </div>
                <Confirm type={this.state.confirmNum} confirm={this.state.confirm} isOk={this.state.confirmOk}/>
            </div>
    	)
    }
}

export default  class  Future extends React.Component {
	constructor(props){
        super(props);
    }
	render(){
		
			return <div>
			
			<Header_title text='乐米互助'/>
            <Head text="我要借款" />
            <Style />
            <Notice />
			<Detail/>
				
		</div>
		
	}
}
