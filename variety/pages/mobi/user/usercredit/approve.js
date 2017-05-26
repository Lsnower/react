import React, {
  Component
} from 'react'
import Router from 'next/router'
import $ from 'jquery'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Confirm from '../../common/confirm.js';
import Style from './approvecss.js';



class Edite extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userimgY: null,
			userimgN: null,
			input1: null,
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
		
    }
	componentDidMount(){
        this.init()
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
							
							$(this.refs.mask).show();
							$(this.refs.input1).css('color','#b3b3b3');
							$(this.refs.input2).css('color','#b3b3b3');
							
							d.data.status==0 ? $(this.refs.btn_submit).html('审核中') : $(this.refs.btn_submit).hide();
							
							$(this.refs.input1).val(d.data.realName);
							$(this.refs.input2).val(d.data.certCode);
							
							this.setState({
								userimgY: d.data.certPositive,
								userimgN: d.data.certBack
							});
						}
						
					}
                }
            }.bind(this)
        });
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
		
		
		var str = judge == 0 ? '.sfz_z' : '.sfz_f';
		
		u.init({
			input: document.querySelector(str),
			callback: function (base64) {
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
							judge == 0 ? that.setState({ userimgY:i.data }) :  that.setState({ userimgN:i.data });
						}
					}
				})
			}
		});
		

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
						$(_this.refs.success_mask).show();
						$(_this.refs.success_mask).animate({'opacity':1},500,function(){
							
							$(_this.refs.success_mask).animate({'opacity':0},500,function(){
								$(_this.refs.success_mask).hide();
								$(_this.refs.btn_submit).css('background','#82848a');
								_this.init();
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
		var sure_submit = ''
		if( (this.state.input1!=null) && (this.state.input2!=null) && (this.state.userimgN!=null) && (this.state.userimgY!=null) ){
			sure_submit = 'sure_submit' 
		}
		
        return (
            <section className="approve_main">
               
                <div className="userName">
                	<input ref="input1" type="text" id="j_name" placeholder="真实姓名" onChange={()=>this.handleChange('input1','input_none1')} />
                	<img ref="input_none1" src="../../../static/realname_label_icon_delete.png" className="input_none1" onClick={()=>this.removeInput('input1','input_none1')} />
                	
                	<input ref="input2" type="text" placeholder="身份证号码" id="j_id" onChange={()=>this.handleChange('input2','input_none2')} />
                	<img ref="input_none2" src="../../../static/realname_label_icon_delete.png" className="input_none2" onClick={()=>this.removeInput('input2','input_none2')} />
                </div>
                
                <div className="userImg">
                
                	<div className="up_img">
                	
                		{
							this.state.userimgY == null ?
								<div className="up_img_content">
									<img src="../../../static/realname_icon_addIDcard.png" />
									<p>身份证正面照片</p>
								</div>
								:
								<div className="up_img_content">
									<img className="show_Img" src={this.state.userimgY+'?x-oss-process=image/resize,w_200'} />
								</div>
						}
                		
                		<input type="file" accept="image/*;capture=camera" className="sfz_z input_none" onClick={()=>this.updatePic(0)} />
                	</div>
                	
                	<div className="up_img up_imgL">
                		
                		{
							this.state.userimgN == null ?
								<div className="up_img_content">
									<img src="../../../static/realname_icon_addIDcard.png" />
									<p>身份证反面照片</p>
								</div>
								:
								<div className="up_img_content">
									<img className="show_Img" src={this.state.userimgN+'?x-oss-process=image/resize,w_200'} />
								</div>
						}
                		
                		<input type="file" accept="image/*;capture=camera" className="sfz_f input_none" onClick={()=>this.updatePic(1)} />
                	</div>
                	
                </div>
                
                <div ref="btn_submit" className={"btn_submit "+sure_submit} onClick={this.confirmation}>提 交</div>
                
                <Confirm type={this.state.confirmNum} confirm={this.state.confirm} isOk={this.state.confirmOk}/>
                
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png" />
					<p>提交成功</p>
                </div>
                
                <div ref="mask" className="all_mask"></div>
                
            </section>
        )
    }
}
export default () => (
  <div>
        <Header_title text="实名认证"/>
        <div><Header text="实名认证" /></div>
        <Style/>
        <Edite/>
    </div>
)