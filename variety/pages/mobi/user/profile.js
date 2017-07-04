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
					 localStorage.removeItem('userid');
					 localStorage.removeItem('userPortrait');
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
            landmsg:null
        }
        this.showmodel = this.showmodel.bind(this);
        this.showagemodel = this.showagemodel.bind(this);
        this.inputsex = this.inputsex.bind(this);
        this.inputage = this.inputage.bind(this);
        this.linkname = this.linkname.bind(this);
        this.showmessage = this.showmessage.bind(this);
        this.showtotal = this.showtotal.bind(this);
        this.getland = this.getland.bind(this);
        this.selectFileImage = this.selectFileImage.bind(this);
    }
    componentWillMount(){
        
    }
    componentDidMount() {
        this.showmessage();
        setTimeout(this.getland,100);
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
    }
    inputage(event) {
        let a = new Date().getFullYear() - event;
        this.setState({
            age: a
        })
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
    linkname(){
        let that = this;
        Router.push({
            pathname: '/mobi/user/realname',
            query:{
                _name:that.state.username
            }
        })
    }
    tolinkland(){
        Router.push({
            pathname: '/mobi/user/land/setland'
        })
    }
    getland(){
        let c,f,p,q;
        c = this.state.land == null ? '请选择' : this.state.land;
        p = localStorage.getItem('lands');
        q = c ? c : p;
        f = c.length >14 ? c.substring(0,13)+'...' : c;
        this.setState({
            landmsg:f
        })
    }
    //上传头像
    selectFileImage(fileObj) {
        //var file = fileObj.files['0'];
        var file = this.refs.ccc.files['0'];
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
                        url:"/user/user/updateUser.do",
                        data:{userPortrait:str},
                        type:'post',
                        dataType:'json',
                        success:function(i){
                            if(i.code == 200){
                               that.showmessage()
                            }
                        }
                    })
                };
            };
            oReader.readAsDataURL(file);
        }
    }

    render() {
        let a,b,d,e;
        a = this.state.sex == '0' ? '请选择' : (this.state.sex == '2' ? '男' : '女');
        b = this.state.age == null ? '' : this.state.age;
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
                            <input type="file" onChange={()=>this.selectFileImage()} accept="image/*;capture=camera" ref="ccc" className="input" id="pro_input"/>
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
                    <li ref="dsad" onClick={this.tolinkland}>
                        <div className="page-content">
                            <a href="#" style={{ position: 'relative' }}>
                                <span>地区</span>
                                <span className="youjt"></span>
                                <span className="right text-lesser" id="seaT">{this.state.landmsg!=null?this.state.landmsg:'请选择'}</span>
                            </a>
                        </div>
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
        <div><Header path="/mine" text="修改个人信息" /></div>
        <Style/>
        <Prolist/>
        <Quit/>
    </div>
)