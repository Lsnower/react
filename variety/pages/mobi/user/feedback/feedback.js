import React, {
  Component
} from 'react'
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Style from '../mine_style.js';
import Text_none from '../../common/text_none.js';
import Alert from '../../common/confirm.js';
import $ from 'jquery'
class Send extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            userimgY:null,
            viewData:[],
            type:true,
            confirm:{
                show:false,
                content:'',
                title:'',
            },
            fun:null,
            login:false
        }
        this.send = this.send.bind(this);
        this.updatePic = this.updatePic.bind(this);
        this.atten = this.atten.bind(this);
        this.showlistmsg = this.showlistmsg.bind(this);
        this.clickMenu = this.clickMenu.bind(this);
    }
    componentWillMount(){
        let that = this;
        
    }
    componentDidMount() {
        let that = this;
        that.showlistmsg();
        setTimeout(that.clickMenu,300);
    }

    atten(e){
        if(!this.state.login){
            Router.push({pathname: '/login'});
        }else{
            Router.push({
                    pathname: '/mobi/user/circle_user/userInfo',
                    query: { id: e }
            });
        }
    }
    
    showlistmsg(){
        this.setState({
            confirm:{
                show:false,
                content:'',
            }
        })
        var t =this,p,q;
        var H = $('.content').height() ? $('.content').height() : ($(window).height()-50);
        t.serverRequest=$.ajax({
            type:'get',
            url:'/user/userFeedback/seeFeedback.do',
            data:{page:t.state.viewPage,pageSize:500},
            dataType:'JSON',
            success:function(e){
                if(e.code==200){
                    t.setState({
                        viewData:e.data,
                        login:true
                    })
                }else{
                    if(d.code == 503){
                        t.setState({
                            login:false,
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
                            },
                            fun:function(){
                                t.setState({
                                    confirm:{
                                        show:false,
                                        content:'',
                                    }
                                })
                            }
                        })
                    }
                }
            }
        })
    }
    isnoLogin(){
        Router.push({pathname: '/login'});
    }
    //时间戳
    formattime(n){
		var time = new Date(n).getTime();
		var year = new Date(n).getFullYear();
		var mon = new Date(n).getMonth() +1;
		mon = mon >= 10? mon:'0'+mon;
		var day = new Date(n).getDate();
		day = day >= 10? day:'0'+day;
		var hour=new Date(n).getHours()<10?"0"+new Date(n).getHours():new Date(n).getHours();
		var min=new Date(n).getMinutes()<10?"0"+new Date(n).getMinutes():new Date(n).getMinutes();
		var now = new Date().getTime(),
		nowYear = new Date().getFullYear(),
		nowMon = new Date().getMonth()+1,
		nowDay = new Date().getDate(),
		nowHour = new Date().getHours(),
		nowMin = new Date().getMinutes();

		var t=[];
        if(year == nowYear){
			if(mon == nowMon){
				if(day == nowDay){
					t[0] ='今日'
				}
				else{
					var f = nowDay-day;
					t[0] = f == 1?'昨日':mon+'月'+day+'日';
				}
			}
		}else{
            t[0] =year+'年'+mon+'月'+day+'日';
        }
        t[1] = hour+':'+min;
        t[2] = year+'年'+mon+'月'+day+'日'+hour+':'+min;
		return t
	}
    csstime(n){
        var time = new Date(n).getTime();
		var year = new Date(n).getFullYear();
		var mon = new Date(n).getMonth() +1;
		mon = mon >= 10? mon:'0'+mon;
		var day = new Date(n).getDate();
		day = day >= 10? day:'0'+day;
		var t = year+'年'+mon+'月'+day+'日';
		return t
    }
    send(){
        let usermain = $(this.refs.usercontent).val();
        let that = this;
            $.ajax({
                url:'/user/userFeedback/addFeedback.do',
                data:{content:usermain,contentType:1},
                success:function(d){
                    if(d.code == 200){
                        that.setState({
                            viewData:[],
                            type:true,
                            viewPage:0,
                            viewMore:true,
                            bigHeight:500,
                        })
                        that.showlistmsg();
                        $(that.refs.usercontent).val('');
                        setTimeout(that.clickMenu,300);
                    }else{
                        that.setState({
                                confirm:{
                                    show:true,
                                    content:d.msg,
                                },
                                fun:function(){
                                    that.setState({
                                        confirm:{
                                            show:false,
                                            content:'',
                                        }
                                    })
                                }
                            })
                    }
                }
            })
        
    }
    updatePic(){

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

		u.init({
			input: document.querySelector('.sfz_z'),
			callback: function (base64) {
				var re = /,/;
				var num = base64.search(re)+1;
				var str = '';
				str = base64.substr(num);
                $.ajax({
                    url:'/user/userFeedback/addFeedback.do',
                    type:'post',
                    data:{content:str,contentType:2},
                    success:function(d){
                        if(d.code == 200){
                            that.setState({
                                viewData:[],
                                type:true,
                                viewPage:0,
                                viewMore:true,
                                bigHeight:($(window).height()-50),
                            })
                            that.showlistmsg();
                            setTimeout(that.clickMenu,300);

                        }
                    }
                })
			}
		});
		

	}
    clickMenu(){
        let that = this;
        var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            if(isiOS){
                window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=='micromessenger' ? $(that.refs.allmain).find('.reply-wrap').css({'position':'fixed'}) : $(that.refs.allmain).find('.reply-wrap').css({'position':'absolute'})
            }
        let z = $(window).height()-50;
            $(that.refs.allmain).css({'height':z,'position':'relative'});
            let o = $(that.refs.feedback).find('li');
            let brray=[];
            let h=0;
            for (let j = 0;j<o.length;j++){
                brray.push(o[j].clientHeight)
            }
            for(let k=0;k<brray.length;k++){
                h += brray[k];
            }
            let t = o.length*2;
            $(that.refs.feedback).css({'height':z});
            $(that.refs.feedback).scrollTop(h+t);
    }
    render() {
        let that=this,a,b,c,d,e,h,p,q,z,userourid;
        let _datalist = that.state.viewData;
        let _array=[];
        for(var i=0;i<_datalist.length;i++){
            var o={}
            o['haomiao'] = _datalist[i].createDate;
            o['time'] =  that.formattime(_datalist[i].createDate)[1]
            o['createDate'] = that.formattime(_datalist[i].createDate)[0];
            o['data']=_datalist[i];
            _array.push(o);
        }
        var  newList = [];
        p = _array.length;
        q = 90 * p;
        _array.reverse().forEach(function(data){
            for(var i=0;i<newList.length;i++){
              if(newList[i].title === data.createDate){
                newList[i].nodeList.push(data);
                return;
              }
            }
              newList.push({
                title:data.createDate,
                nodeList:[data]
              });
          });
        var doc = '',_hodt = '';
        if (newList.length>0) {
                 _hodt = <section className="page-main main-mine" id="ackmain">
                    <Style/>
                     
                    <div className="content">
                    
                    <ul className="feedback_list" ref='feedback'>
                        {
                            newList.map(function(v,r){
                                doc = v.nodeList.map(function(m,n){
                                    h = m.data.replyName;
                                    userourid = m.data.userId;
                                    if(h != undefined){
                                        z = h
                                    }
                                    a = m.time;
                                    b = m.data.type == '0' ? 'right' : 'left';
                                    c = m.data.userPortrait ? m.data.userPortrait+'?x-oss-process=image/resize,m_fill,h_200,w_200' : "../../../static/mine/headportrait160x160@3x.png";
                                    if(m.data.contentType == '2'){
                                        e = <img src={m.data.content} className="sendpic"/>
                                    }else if(m.data.contentType == '1'){
                                        e = <p>{m.data.content}</p>
                                    }else{
                                        e = <p>{m.data.content}</p>
                                    }
                                    if(m.data.type == '0'){
                                        d = <img className="usertpix" src={c} onClick={()=>{that.atten(userourid)}} />
                                    }else{
                                        d = <img className="usertpix" src="../../../static/mine/service@2x.png" />
                                    }
                                    return(
                                        <li key={n}>
                                            <div className={b}>
                                            <div className="top">
                                                <h6>{a}</h6>
                                                {e}
                                            </div>
                                                {d}
                                            </div>
                                        </li> 
                                    )
                                })
                                return (
                                        <div key={r}>
                                            <div className="tip">
                                                <hr/>
                                                <p>{v.title}</p>
                                                <hr/>
                                            </div>
                                            {doc}
                                        </div>
                                    )
                            })
                            
                        }
                      </ul>
                      <Alert type='2' confirm={this.state.confirm} isOk={that.state.fun}/>
                    </div>
                    < style jsx global > {
                        `
                        .infinite-scroll-component{
                            overflow: scroll !important;
                        }
                        html{
                            height:100%;
                        }
                        body{
                            height:100%;
                        }
                        .content{
                            
                            overflow:auto;
                        }
                        .tip{
                            text-align:center;
                            padding:0.2rem 0;
                        }
                        .tip p{
                            display: inline-block;
                            margin:0px 0.1rem;
                            color:#82848a;
                            font-size:0.12rem;
                        }
                        hr{
                            height:1px;border:none;border-top:1px solid #82848a;
                            display: inline-block;
                            width:20%;
                            padding-bottom:0.03rem;
                        }
                        .feedback_list{
                            padding:0 0.2rem 0.5rem 0.2rem;
                            box-sizing: border-box;
                            -webkit-box-sizing:border-box;
                            -moz-box-sizing:border-box;
                            overflow: scroll;
                            box-sizing: border-box;
                            -webkit-box-sizing:border-box;
                            -moz-box-sizing:border-box;
                        }
                        .feedback_list .right{
                            text-align:right;
                            background: url(../../../static/mine/opinion_bg_rightcorner.png) no-repeat;
                            background-position:80% 25px;
                            background-size:7px 14px;
                            width:2.8rem;

                        }
                        .feedback_list li{
                            overflow: auto;
                            padding-bottom: 0.2rem;
                            box-sizing: border-box;
                            -webkit-box-sizing:border-box;
                            -moz-box-sizing:border-box;
                            
                        }
                        .right .top{
                            max-width:220px;
                            
                            display:inline-block;
                            padding-right:0.1rem;
                        }
                        .right .top h6{
                            color:#82848a;
                            font-size:0.12rem;
                            margin-bottom:0.05rem;
                        }
                        .right .top p{
                            border-radius:3px;
                            text-align: left;
                            background:#cd4a47;
                            padding:0.1rem;
                            color:#fff;
                            font-size:0.14rem;
                            word-wrap: break-word;
                        }
                        .right .usertpix{
                            width:0.5rem;
                            height:0.5rem;
                            border-radius:50%;
                            float:right;
                        }
                        .right .sendpic{
                            border-radius:0;
                            border:3px solid #cd4a47;
                            margin:0;
                            width:70%;
                        }
                        
                        .feedback_list .left{
                            text-align:left;
                            width:2.8rem;
                            background: url(../../../static/mine/opinion_bg_leftcorner.png) no-repeat;
                            background-position:2% 25px;
                            background-size:7px 14px;
                        }
                        .feedback_list li{
                            overflow: auto;
                        }
                        .left .top{
                            max-width:220px;
                            background: url(../../../static/mine/opinion_bg_leftcorner.png) no-repeat;
                            background-position:2% 25px;
                            background-size:7px 14px;
                            display:inline-block;
                            padding-left:0.1rem;
                        }
                        .left .top h6{
                            color:#82848a;
                            font-size:0.12rem;
                            margin-bottom:0.05rem;
                        }
                        .left .top p{
                            border-radius:3px;
                            text-align: left;
                            background:#fff;
                            padding:0.1rem;
                            color:#0c0f16;
                            font-size:0.14rem;
                            word-wrap: break-word;
                        }
                        .left .usertpix{
                            width:0.5rem;
                            height:0.5rem;
                            border-radius:50%;
                            margin-top: 0.2rem;
                            float:left;
                        }
                        `
                    } < /style>
                    
                  </section>
        }else{
             _hodt = '';
        }
        return (
            <div><Header text={z?'意见反馈-'+z:'意见反馈'} />
            <div ref="allmain">
                {_hodt}
                <div className="reply-wrap">
                        <input maxlength="400" ref="usercontent" className="reply-inp" type="text" placeholder="请在此输入......"/>
                        <input type="file" accept="image/*;capture=camera" className="sfz_z input_none" onClick={()=>this.updatePic()} />
                        <div className="upimg"></div>
                        <div className="reply-txt" onClick={()=>{this.send()}}>发送</div>
                    </div>
            </div>
            </div>
        )
    }
}

export default class Feedback extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {

        return <div>
                    <Header_title text="意见反馈"/>
                    <Style/>
                    <Send/>
                </div>
    }
}