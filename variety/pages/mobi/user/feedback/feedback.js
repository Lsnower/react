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
        this.atten = this.atten.bind(this);
        this.showlistmsg = this.showlistmsg.bind(this);
        this.clickMenu = this.clickMenu.bind(this);
        this.selectFileImage = this.selectFileImage.bind(this);
    }
    componentWillMount(){
        let that = this;
        
    }
    componentDidMount() {
        let that = this;
        that.showlistmsg();
        setTimeout(that.clickMenu,500);
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
			}else{
                t[0] = mon+'月'+day+'日';
            }
		}else{
            t[0] =year+'年'+mon+'月'+day+'日';
        }
        t[1] = hour+':'+min;
        t[2] = year+'年'+mon+'月'+day+'日'+hour+':'+min;
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
                                setTimeout(that.clickMenu,500);

                            }
                        }
                    })
                };
            };
            oReader.readAsDataURL(file);
        }
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
                            background-position:19.5% 25px;
                            background-size:7px 14px;
                        }
                        .feedback_list li{
                            overflow: auto;
                        }
                        .left .top{
                            max-width:220px;
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
                        <textarea className="reply-inp" ref="usercontent" placeholder="请在此输入......" maxLength="400" data-jsx="314864650"></textarea>
                        <input type="file" accept="image/*;capture=camera" className="sfz_z input_none" onChange={()=>this.selectFileImage()} ref="ccc"/>
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