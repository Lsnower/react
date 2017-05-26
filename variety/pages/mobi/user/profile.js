import React, {
    Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from '../common/header/header_title.js';
import Header from '../common/header/header_left.js';
import Footer from '../common/footer.js';
import Clickage from './age.js';
import Clicksex from './sex.js';
import Clickland from './land.js';
import Style from './mine_style.js';
class Quit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false
        }
    }
    componentDidMount() {

    }
    tuiLogin() {
        $.ajax({
            url:'/user/out/logout.do',
            success:function(d){
                if(d.code == 200){
                     Router.push({
                        pathname: '/mine'
                    })
                }
            }
        })
    }
    render() {
        return (
            <div id="quit" onClick={this.tuiLogin}>退出登录</div>
        )
    }
}


class Prolist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            sex: null,
            age:new Date().getFullYear()-1990,
            land:null,
            asy: false,
            ageasy: false,
            landasy:false,
            userimg:null,
            username:null,
        }
        this.showmodel = this.showmodel.bind(this);
        this.showagemodel = this.showagemodel.bind(this);
        this.showlandmodel = this.showlandmodel.bind(this);
        this.inputsex = this.inputsex.bind(this);
        this.inputage = this.inputage.bind(this);
        this.inputland = this.inputland.bind(this);
        this.linkname = this.linkname.bind(this);
        this.showmessage = this.showmessage.bind(this);
        this.showtotal = this.showtotal.bind(this);
    }
    componentWillMount(){
        
    }
    componentDidMount() {
        this.updatePic();
        this.showmessage();
    }
    showmessage(){
        let that = this;
        let url = '/user/user/findUserInfo.do';
        $.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			success: function(d){
				if(d.code==200) {
					that.setState({
                        sex:d.data.userSex,
                        age:d.data.age != null ? d.data.age : (new Date().getFullYear()-1990),
                        username:d.data.userName,
                        userimg:d.data.userPortrait,
                        land:d.data.land
                    })
				}    
			}
		})
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
    inputsex(event) {
        this.setState({
            sex: event
        })
        this.showtotal();
    }
    inputage(event) {
        let a = new Date().getFullYear() - event;
        this.setState({
            age: a
        })
        this.showtotal();
    }
    inputland(event){
        this.setState({
            land: event
        })
        this.showtotal();
    }
    showmodel() {
        this.setState({
            ageasy: false,
            landasy:false,
            asy: !this.state.asy
        })
    }
    showagemodel() {

        this.setState({
            asy: false,
            landasy:false,
            ageasy: !this.state.ageasy
        })
        
    }
    showlandmodel() {
        this.setState({
            asy: false,
            ageasy:false,
            landasy: !this.state.landasy
        })
    }
    linkname(){
        let that = this;
        Router.push({
            pathname: '/mobi/user/realname',
            query:{
                _name:that.state.username
            }
        })
    }
    //上传头像
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
                        input: document.querySelector('.input'),
                        callback: function (base64) {
                            var re = /,/;
                            var num = base64.search(re)+1;
                            var str = '';
                            str = base64.substr(num);
                            $.ajax({
                                url:"/user/user/updatePic.do",
                                data:{pic:str},
                                type:'post',
                                dataType:'json',
                                success:function(i){
                                    if(i.code == 200){
                                       that.showmessage()
                                    }
                                }
                            })
                        }
                    });
                
                
            }
    render() {
        let a,b,c,d,e,f;
        a = this.state.sex == '0' ? '请选择' : (this.state.sex == '2' ? '男' : '女');
        b = this.state.age == null ? '' : this.state.age;
        c = this.state.land == null ? '请选择' : this.state.land;
        f = c.length >14 ? c.substring(0,13)+'...' : c
        d = this.state.username;
        e = this.state.userimg == null ? '/static/mine/headportrait160x160@3x.png':this.state.userimg+'?x-oss-process=image/resize,m_fill,h_200,w_200';
        return (
            <section className="page-main main-mine-profile main-profile">
                <ul className="page-mainC" id="myImg">
                    <li>
                        <div className="page-content pic" style={{ position: 'relative' }}>
                            <span className="nameM">头像</span>
                            <span className="youjt"></span>
                            <img src={e} className="peopleImg" />
                            <input type="file" accept="image/*;capture=camera" className="input" id="pro_input"/>
                        </div>
                    </li>
                    <li>
                        <div id="myName">
                            <div className="page-content page-borderL" style={{ position: 'relative' }} onClick={this.linkname}>
                                <span className="nameM">昵称</span>
                                <span className="youjt" id="nameArrow"></span>
                                <span className="nameX text-lesser" id="nick"><span style={{ color: '#0c0f16' }}>{d}</span></span>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul className="page-mainC">
                    <li>
                        <div className="page-content">
                            <a href="#" style={{ position: 'relative' }} onClick={this.showmodel}>
                                <span>性别</span>
                                <span className="youjt"></span>
                                <span className="right text-lesser" id="gender">{a}</span>

                            </a>

                        </div>
                        <Clicksex model={this.showmodel} inputsex={this.inputsex} text={this.state.asy} cellsex={this.state.sex}/>
                    </li>
                    <li>
                        <div className="page-content">
                            <a href="#" style={{ position: 'relative' }} onClick={this.showagemodel}>
                                <span>年龄</span>
                                <span className="youjt"></span>
                                <span className="right text-lesser">{b}</span>

                            </a>
                        </div>
                        <Clickage model={this.showagemodel} inputage={this.inputage} text={this.state.ageasy} showsage={this.state.age} ref = 'abc'/>
                    </li>
                    <li ref="dsad">
                        <div className="page-content">
                            <a href="#" style={{ position: 'relative' }} onClick={this.showlandmodel}>
                                <span>地区</span>
                                <span className="youjt"></span>
                                <span className="right text-lesser" id="seaT">{f}</span>
                            </a>
                        </div>
                        <Clickland model={this.showlandmodel} inputland={this.inputland} text={this.state.landasy} showland={this.state.land}/>
                    </li>
                </ul>


                <ul className="page-mainC">
                    <li>
                        <div className="page-content">
                            <Link  href="/mobi/user/usercredit/usercredit"><a style={{ position: 'relative' }}>
                                <span>信用</span>
                                <span className="youjt"></span>
                                
                            </a></Link>
                        </div>
                    </li>
                </ul>
                <div ref="success_mask" className="success_mask">
					<img src="/static/circle/popovers_icon_succeed@3x.png" />
					<p>提交成功</p>
                </div>
            </section>
        )
    }
}



export default () => (
    <div>
        <Header_title text="修改个人信息"/>
        <div><Header text="修改个人信息" /></div>
        <Style/>
        <Prolist/>
        <Quit/>
    </div>
)