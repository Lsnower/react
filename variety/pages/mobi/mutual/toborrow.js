import React from 'react'
import Header_title from '../common/header/header_title.js'
import Head from '../common/header/header_left.js'
import Router from 'next/router'
import Link from 'next/link';
import Text_none from '../common/text_none.js'
import Style from './toborrowcss.js'
import Confirm from '../common/confirm.js';
class Detail extends React.Component{
	constructor(props){
        super(props)
        this.state = {
            upimgone:null,
            upimgtwo:null,
            upimgthree:null,
            upimgfour:null,
            input1: null,
			input2:null,
            input3:null,
            input4:null,
            input5:null,
			confirm:{
                show:false,
                content:'',
            },
			confirmNum:1,
			confirmOk:function(){},
            tipcontent:null,
            asytt:false,
            landmsg:null
		}
        this.handleChange = this.handleChange.bind(this);
        this.confirmation = this.confirmation.bind(this);
        this.toSubmit = this.toSubmit.bind(this);
        this.toland = this.toland.bind(this);
        this.getland = this.getland.bind(this);
        this.selectFileImage = this.selectFileImage.bind(this);
    }
    componentDidMount(){
        var t = this;
        setTimeout(function(){
            t.getland();
            var lendmsg = JSON.parse(localStorage.getItem('landmsg'));
            t.setState({
                input1:lendmsg.money,
                input2:lendmsg.interest,
                input3:lendmsg.days,
                input4:lendmsg.content
            })
            $(t.refs.input1).val(lendmsg.money);
            $(t.refs.input2).val(lendmsg.interest);
            $(t.refs.input3).val(lendmsg.days);
            $(t.refs.input4).val(lendmsg.content);
        },100);
        
    }
    showtotal(){
       var that = this;
        $(that.refs.success_mask).show();
        $(that.refs.success_mask).animate({'opacity':1},500,function(){	
			$(that.refs.success_mask).animate({'opacity':0},500,function(){
				$(that.refs.success_mask).hide();
                                
			})					
		}) 
    }
    showtol(){
       var that = this;
        $(that.refs.hintsC).show();
        $(that.refs.hintsC).animate({'opacity':1},1000,function(){	
			$(that.refs.hintsC).animate({'opacity':0},1000,function(){
				$(that.refs.hintsC).hide(); 
			})					
		}) 
    }
    toland(e){
        var longmsg={
            money:this.state.input1,
            interest:this.state.input2,
            days:this.state.input3,
            content:this.state.input4
        }
        localStorage.setItem('landmsg',JSON.stringify(longmsg));
        Router.push({
            pathname: e
        })
    }
    getland(){
        let c,f,p,q,o;
        p = localStorage.getItem('borrowlands') == '' ? (localStorage.getItem('sdborrowlands') == '--' ? null : localStorage.getItem('sdborrowlands')) : localStorage.getItem('borrowlands');
		
        if(p){
            q = p.split('-')[1]+'-'+p.split('-')[2];
            o = q.length>10 ? q.substring(0,9)+'...':q;
        }else{
            f = null;
        }
        this.setState({
            landmsg:o,
            input5:q
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
                        url:"/user/upload/image.do",
                        data:{picture:str},
                        type:'post',
                        dataType:'json',
                        success:function(i){
                            if(i.code == 200){
                                if(judge == 'img0'){
                                    that.setState({upimgone:i.data })
                                    $('.sfz_two').parent().removeClass('noimg');
                                }else if(judge == 'img1'){
                                    that.setState({ upimgtwo:i.data })
                                    $('.sfz_three').parent().removeClass('noimg');
                                }else if(judge == 'img2'){
                                    that.setState({ upimgthree:i.data })
                                    $('.sfz_four').parent().removeClass('noimg');
                                }else{
                                    that.setState({ upimgfour:i.data })
                                }
                            }
                        }
                    })
                };
            };
            oReader.readAsDataURL(file);
        }
    }

    handleChange(e){
        let that = this;
        var Inp = $(that.refs[e]);
        var val = Inp.val();
        $(this.refs.borrlist).find('input').removeClass('error');
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
			},
            tipcontent:null
		});
    }
    confirmation(){
        let a = this.refs.agreement;
		if((this.state.input1!=null) && (this.state.input2!=null) && (this.state.input3!=null) && (this.state.input5!=null)){
                var r = /^\+?[1-9][0-9]*$/;
				var _this = this;
                $(this.refs.borrlist).find('input').removeClass('error');
                if(this.state.input1 < 500){
                    _this.setState({
                        tipcontent:'借款金额小于500元'
                    });
                    this.showtol();
                    $(this.refs.input1).addClass('error');
                }else if(this.state.input1 > 2000){
                    _this.setState({
                        tipcontent:'借款金额最多2000元'
                    });
                    this.showtol();
                    $(this.refs.input1).addClass('error');
                }else if(!r.test(this.state.input1)){
                    _this.setState({
                        tipcontent:'借款金额，必须为整数'
                    });
                    this.showtol();
                    $(this.refs.input1).addClass('error');
                }else if(this.state.input2 < 1){
                    _this.setState({
                        tipcontent:'借款利息最少一元'
                    });
                    this.showtol();
                    $(this.refs.input2).addClass('error');
                }else if(this.state.input2 > 200){
                    _this.setState({
                        tipcontent:'借款利息最多200元'
                    });
                    this.showtol();
                    $(this.refs.input2).addClass('error');
                }else if(!r.test(this.state.input2)){
                    _this.setState({
                        tipcontent:'借款利息，必须为整数'
                    });
                    this.showtol();
                    $(this.refs.input2).addClass('error');
                }else if(this.state.input3 < 1){
                    _this.setState({
                        tipcontent:'借款期限最少一天'
                    });
                    this.showtol();
                    $(this.refs.input3).addClass('error');
                }else if(this.state.input3 > 60){
                    _this.setState({
                        tipcontent:'借款期限最多60天'
                    });
                    this.showtol();
                    $(this.refs.input3).addClass('error');
                }else if(!r.test(this.state.input3)){
                    _this.setState({
                        tipcontent:'借款时间，必须为整数'
                    });
                    this.showtol();
                    $(this.refs.input3).addClass('error');
                }else if(this.state.input5==null){
                    _this.setState({
                        tipcontent:'借款地址必填'
                    });
                    this.showtol();
                }else{
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
		if((this.state.input1!=null) && (this.state.input2!=null) && (this.state.input3!=null) && (this.state.input5!=null)){
			var _this = this;
			var _img = [],_array=[],_userimg;
            _img[0] = this.state.upimgone;
            _img[1] = this.state.upimgtwo;
            _img[2] = this.state.upimgthree;
            _img[3] = this.state.upimgfour;
            
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
            if(this.state.input4){
                json.content = $.trim((this.state.input4).replace(/(^\n*)|(\n*$)/g, ""));
            }
			json.contentImg = _userimg;
            json.location = this.state.input5;
            json.locationLng = localStorage.getItem('locationLng');
            json.locationLat = localStorage.getItem('locationLat');
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
                                var _path = _this.props.lend == '2' ? '/mobi/mutual/borrowmy' : '/mobi/mutual/borrow';
                                Router.push({
                                    pathname: _path
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
     myTrim(x) {
         return x.replace(/^\n+|\n+$/gm,'');
     }
    render(){
        let that = this,g="";
        if((this.state.input1!=null) && (this.state.input2!=null) && (this.state.input3!=null) &&(this.state.input5!=null)){
			g = 'selthat'
		}
    	return(
			<div className='details'>
            	<ul ref="borrlist">
            		<li>
            			<div className="details_left">借款金额</div>
            			<div style={{ marginRight:'0.15rem' }} className="details_right">
                            <span>元</span>
                            <input ref="input1" type='number' placeholder='500~2000' onChange={()=>this.handleChange('input1')}/>
                        </div>
            		</li>
            		<li>
            			<div className="details_left">愿付利息</div>
            			<div style={{ marginRight:'0.15rem' }} className="details_right">
                            <span>元</span>
                            <input ref="input2" type='number' placeholder='1~200' onChange={()=>this.handleChange('input2')}/>
                            
                        </div>
            		</li>
            		<li>
            			<div className="details_left">借款期限</div>
            			<div style={{ marginRight:'0.15rem' }} className="details_right">
                            <span>天</span>
                            <input ref="input3" type='number' placeholder='1~60' onChange={()=>this.handleChange('input3')}/></div>
            		</li>
                    <li onClick={()=>{this.toland('/mobi/mutual/land/setland')}}>
            			<div className="details_left">所在地址</div>
            			<div className="details_right">
                            <span className="right text-lesser" id="seaT" ref="input5">{this.state.landmsg!=null?this.state.landmsg:''}</span>
                            <span className="rightBg youjt2"></span>
                        </div>
                        
            		</li>
            	</ul>
                <div className="details_main">
                    
                    <textarea placeholder='简单描述一下您的借款需求，有助快速达成借款' ref="input4" maxLength='300' onChange={()=>this.handleChange('input4')}></textarea>
                </div>
                
            	<div className='upload'>
					<p>添加照片：最多可以上传4张</p>
					<div className="up_img">
                        {   
							that.state.upimgone == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/help/releasehelp_icon_addpic@2x.png" />
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgone} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" ref="img0" className="sfz_one input_none" onChange={()=>this.selectFileImage('img0')}/>
                	</div>
                    <div className="up_img noimg">
				        {
							that.state.upimgtwo == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/help/releasehelp_icon_addpic@2x.png" />
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgtwo} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" className="sfz_two input_none" onChange={()=>this.selectFileImage('img1')} ref="img1"/>
                	</div>
                    <div className="up_img noimg">
				        {
							that.state.upimgthree == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/help/releasehelp_icon_addpic@2x.png" />
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgthree} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" className="sfz_three input_none" onChange={()=>this.selectFileImage('img2')} ref="img2"/>
                	</div>
                    <div className="up_img noimg">
				        {
							that.state.upimgfour == null ?
								<div className="up_img_content">
                                    <img className="show_Img" src="../../../static/help/releasehelp_icon_addpic@2x.png" />
                                </div>
								:
								<div className="up_img_content">
									<img className="up_Img" src={this.state.upimgfour} />
								</div>
						}
                		<input type="file" accept="image/*;capture=camera" className="sfz_four input_none" onChange={()=>this.selectFileImage('img3')} ref="img3"/>
                	</div>
				</div>
                <div className={"issue "+g} onClick={this.confirmation}>确认发布</div>
                <div className="agreement">
                    <label>
                        <span>发布即同意</span>
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
                <div className='hint' ref='hintsC'><p><span>{this.state.tipcontent}</span></p></div>
                <style jsx global>{`
				    .details_right .youjt2:after{content: " ";
                        display: inline-block;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                        height: 10px;
                        width: 10px;
                        border-width: 1px 1px 0 0;
                        border-color: #95979c;
                        border-style: solid;
                        position: relative;
                        top: -2px;
                        position: absolute;
                        right: 15px;
                        top: 13%;
                    }
                `}</style>
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
			<Header_title text='发布借款'/>
            <Head path={this.props.url.query.lendslinkcs?'/mobi/mutual/borrow':"javascript:window.history.back()"} text="发布借款" />
            <Style />
			<Detail lend={this.props.url.query.lendslink}/>
				
		</div>
		
	}
}
