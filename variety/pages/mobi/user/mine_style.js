export default () => ( < style jsx global > {
        `
html{background:#e7e7e8;}
body{overflow-x: hidden;}
.page-header{ font-size:0.15rem; width:100%; height:0.5rem; color:#FFF; background-color: #da2f35;}
.page-header h3{ font-weight:100; text-align:center; line-height:0.5rem;}
.page-header .right{ width:0.35rem; height:0.14rem; position:absolute; top:0.15rem; right:0.18rem;}

article#accounts{background:#fff;}
.imgvallet{background:url(../../static/mine/mine_list_icon_wallet@3x.png) no-repeat left top;background-size:100% 100%;}
.imgnews{background:url(../../static/mine/mine_list_icon_news@3x.png) no-repeat left top;background-size:100% 100%;}
.imgopinion{background:url(../../static/mine/userinformation_list_publish@3x.png) no-repeat left top;background-size:90% 100%;}
.imgsetting{background:url(../../static/mine/mine_list_icon_setting@3x.png) no-repeat left top;background-size:100% 100%;}
.imgaboutus{background:url(../../static/mine/mine_list_icon_aboutus@3x.png) no-repeat left top;background-size:100% 100%;}
.imgbowl{background:url(../../static/bowl/mine_cell_icon_jbp@3x.png) no-repeat left top;background-size:100% 100%;}

.nologin{height:0.5rem;width:1.5rem;border-radius:0.15rem;line-height:0.5rem;margin:0.5rem 0;font-size:0.16rem;color:#cd4a47;}
#accounts .user{display: flex;display: -webkit-flex; width:100%; height:1rem; overflow:hidden;text-align: center;color:#fff;}
#accounts .user a{flex: 1.2;-webkit-flex: 1.2;}
#accounts .user a.goDetail{display: inline-block;position:relative;}
#accounts .user .zh-type{font-size:.15rem; margin-bottom:.02rem;}
#accounts .user .img{ width:0.6rem; height:0.6rem;display:block; float: left;border-radius: 50%; margin: 0.3rem 0.1rem 0 0.1rem;}
#accounts .user .boy{
    background:url(./static/head_visitor.png) no-repeat;
    background-size:contain;
}
#accounts .user .girl{
    background:url(./static/head_visitor.png) no-repeat;
    background-size:contain;
}

.goDetail .rightBg {
     height:1.2rem;
     line-height: 1.2rem;
     display:block;
     font-size:0.15rem;
     color:#e43022;
     position: absolute;
     right: 2%;
     top:20%;
     text-align: right;   
}
#accounts .user .name{height:100%; display:block;line-height:1.2rem; color:#222222; font-size:0.16rem;float: left;}
.account .summary{display: flex; display: -webkit-flex; text-align: center;width: 90%;border-top: 1px solid #dddddd;margin: 0 auto;}
.account ul li{flex: 1; -webkit-flex: 1;;box-sizing:border-box;background:url('../../../static/mine/mine_heng.png') no-repeat center right;}
.account ul li:last-child{background:none;}
.account .account-text{color:#999999;margin:.05rem;}
.account .account-num{color:#222;margin:.05rem;height:.19rem;font-size:0.14rem;}

.account .action{ width:100%; height:0.53rem; display:-webkit-flex; display:-o-flex; display:-moz-flex; display:flex;}
.account .action div{ width:50%; height:100%; float:left;}
.account .action .do-rechange{ width:82%; height:0.3rem; display:block; text-align:center; line-height:0.3rem; color:#FFF; font-size:0.13rem; border-radius:5px; margin:0.1rem auto;}
.account .action .do-atm{ width:82%; height:0.3rem; display:block; text-align:center; line-height:0.3rem; font-size:0.13rem; border-radius:5px; margin:0.1rem auto;}

.mine-mod-list{ width:100%; height:0.53rem; background:#fff;color:#fff; margin:0.1rem 0; line-height:0.53rem; font-size:0.13rem;}
.bottom1{ margin-bottom:0;}
.bottom1 li:nth-child(1){border-bottom: 1px solid #252021;}
.mine-mod-list span{ float:left;}
.mine-mod-list span:nth-of-type(2){ text-indent:0.13rem;color:#222222;}
.mine-mod-list .leftBg{ margin-left:0.17rem;}
.mine-mod-list .rightBg{
     height:.53rem;
     line-height: .53rem;
     display:block;
     font-size:0.15rem;
     color:#e43022;
     position: absolute;
     right: 2%;
     top:0;
     text-align: right;
}
.mine-mod-list .leftBg{ width:0.22rem; height:0.22rem; font-size:0.2rem; display:block; margin-top: 0.15rem;}

.last0{ width:100%; height:1.06rem;}
.last0 li{ width:100%; height:0.53rem; line-height: .53rem; position:relative;}
.last0 li:after{
    content: "";
    display: block;
    position: absolute;
    left: 5%;
    width: 100%;
    height: 1px;
    background: #e7e7e8;
    transform:scale(1);
    -moz-transform:scale(1);
    -o-transform:scale(1);
    -webkit-transform:scale(1);
}


.last{ width:100%; height:2.12rem;margin-bottom:1.5rem;}
.last li{ width:100%; height:0.53rem; line-height: .53rem; position:relative;}
.last li:nth-of-type(1){ position:relative;}
.last li:after{
    content: "";
    display: block;
    position: absolute;
    left: 5%;
    width: 100%;
    height: 1px;
    background: #e7e7e8;
    transform:scale(1);
    -moz-transform:scale(1);
    -o-transform:scale(1);
    -webkit-transform:scale(1);
}
.last .leftBg1{  width:0.2rem; height:0.2rem; font-size:0.3rem; display:block; position:absolute; left:0; top:0; margin-left:0.17rem; line-height:0.53rem; margin-top: 0.15rem;}
.last .rightBg1{}

.last1{ margin-bottom:0.93rem;}

.height{ width:100%; height:100%;}
.height > a{ width:100%; height:100%;position:relative; display:block;}

.page-footer{ width:100%; height:0.45rem; background:#F7F7F7; position:fixed; bottom:0;border-top: .01rem solid #e5e3e3;}
.page-footer .content{ height:100%;}
.page-footer .content ul{ width:100%; height:100%; display: flex; display: -webkit-flex;}
.page-footer .content li{ width:25%; height:100%; text-align:center; float:left; flex: 1; -webkit-flex: 1;}
.page-footer .content li a{ width:100%; height:100%; display:block;}
.page-footer .content li .img{ width:0.24rem; height:0.24rem; display:block; margin:0 auto; margin-top:0.05rem;}
.page-footer .content .img{ font-size:0.22rem; color:#B5B5B5;}
.page-footer .content .icon-gerne{ color:#DA3333;}
.page-footer .content li span:nth-of-type(2){ display:block; color:#97abaf; font-size:0.106rem; line-height:0.16rem;}
.page-footer .content .mine .active{ color:#000;}

.loading>.content,.msgbox .action,.msgbox .main,.msgbox-toast,.text-center {
    text-align: center
}
.overlay,.overlay-top {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.4);
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
}

.loading,.overlay-top {
    z-index: 101
}

#renzheng{
    color:#999;
}

.loading {
    position: fixed;
    left: 46%;
    top: 40%;
    display: none;
}

.loading>.content {
    width: .4rem;
    height: .4rem;
    line-height: .38rem;
    border-radius: .06rem;
    background-color: rgba(51,51,51,.4)
}

.loading>.content>img {
    width: 60%;
    height: 60%
}

.hide {
    display: none!important;
}
.button {
    display: inline-block;
    height: .38rem;
    line-height: .36rem;
}

#pro_input{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0;
}
/*个人资料 start*/
.page-content{ width: 90%; margin: 0 auto;}
.page-content a{ width: 100%; height: 100%; display: block;color:#95979b;}
.page-borderL{ border: none;}
.page-mainC{ width: 100%; position: relative; background:#ffffff; color: #95979b;margin-bottom:0.1rem;font-size:0.16rem;}
.page-mainC li{line-height: .5rem; border-bottom: 1px solid #e5e5e5;}
.page-mainC .pic{height:.7rem;}
.page-mainC .pic .nameM{line-height: .7rem;}
.jiantou{ float: right; margin-right: -0.05rem; color: #ccc; font-size: 0.25rem;}
.text-lesser{ color: #000; float: right;}
.colorR{ color: #da2f35;}
.Phone{ margin-right: 0.2rem;}
.mod-list-sample{ margin-top: 0.1rem;}
.peopleImg{ width: 0.48rem; height: 0.48rem; float: right; border-radius: 50%; margin:.1rem .25rem 0 0;}
.page-content1{ width: 90%; margin: 0 auto;}
.page-content1 a{ width: 100%; height: 100%; display: block;}

.arrow-right{
    position: absolute;
    right: 2%;
    line-height: .5rem;
    text-align: right;
    color: #ccc;
}
#myImg .pic .arrow-right{line-height: .7rem;}
.mr14{ margin-left:.14rem;}
.userSex {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}
.text-lesser {
    color: #0c0f16;
    float: right;
    margin-right: .25rem;
    font-size:0.14rem;
}

.text1 {
    width: 80%;
    line-height: 0.25rem;
    margin:.13rem 0 0 .7rem;
    background: none;
    color:#fff;
    border: 0 none;
    resize: none;
    outline: none;
    -webkit-appearance: none;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
#quit{
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.15rem;
    background: #82848a;
    color: #cd4a47;
    text-align: center;
    position:fixed;
    bottom:0px;
    background:#fff;
}
.Phone{color:#fff;}
#changeName {
    width: 100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: none;
}
#changeName .content{
    width: 80%;
    background: #FFF;
    position: absolute;
    top: 25%;
    left: 50%;
    margin-left: -40%;
    border-radius: 5px;
}
#changeName .text{
    width: 90%;
    margin: 0 auto;
    padding: 0.3rem 0.1rem;
}
#changeName .text p{
    color: #555555;
    font-size: 0.14rem;
    padding-bottom: 0.2rem;
}
#changeName .text input{
    width: 100%;
    height: 0.3rem;
    border: 1px solid #ccc;
    font-size: 0.12rem;
    padding-left:.02rem;
}
#changeName .btn{
    width: 100%;
    height: 0.4rem;
    background: #25d79e;
    border-radius: 0 0 5px 5px;
    color: #FFF;
    display: flex;
    display: -webkit-flex;
}
#changeTip {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;
    display: none;
    opacity: 0;
}

#changeTip p{
    width: 1.5rem;
    height: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    font-size: 0.14rem;
    background: rgba(255,255,255,0.8);
    margin: 0 auto;
    color: #000;
    border-radius: 5px;
    margin-top: 50%;
}
#changeName .btn {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    height: 0.4rem;
    background: #25d79e;
    color: #FFF;
    border-radius: 0 0 5px 5px;
    margin-top: .1rem;
}
#changeName .btn .qx {
    border-right: 1px solid #e5e5e5;
}
#changeName .btn .qd1 {
    color: #aaa;
    background: #ddd;
    border-radius: 0 0 5px 0;
}
#changeName .btn div {
    flex: 1;
    -webkit-flex: 1;
    text-align: center;
    line-height: 0.4rem;
    box-sizing: border-box;
}
.realName{
    margin-top: 0.25rem;
    font-size: 0.14rem;
    width: 100%;
    height: 0.3rem;
    border: none;
    outline: none;
    border-bottom: 1px solid #e0dfdf;
    -webkit-appearance: none;
    outline: none;
    border-radius: 0;
}

.main{
    width: 90%;
    margin: 0 auto;
}
.sbtn {
    width: 94%;
    height: .42rem;
    line-height: .42rem;
    text-align: center;
    margin: 0.3rem auto 0;
    font-size: 0.14rem;
    background-color: #cd4a47;
    color: #fff;
    border-radius:4px;
    -webkit-border-radius:4px;
    -moz-border-radius:4px;
}
/*个人资料 end*/

/*省份 start*/
#province {
    width: 40%;
    background: #343334;
    position: fixed;
    top:.5rem;
    left: 0;
    padding-bottom: 100%;
}
.provinceMain {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color:#fff;
}
.provinceShoe {
    background: #000;
}
.provinceConrent {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid #000;
}
/*#city {
    width: 60%;
    height: 100%;
    position: absolute;
    right: 0;
    top: .5rem;
    z-index: 1;
    color:#fff;
}*/
#city {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    float: right;
}
.cityConrent {
    width: 90%;
    margin: 0 auto;
    text-indent: 1em;
    border-bottom: 1px solid #343334;
    height: 50px;
    line-height: 50px;
}
.cityShow {
    color: #fc603c;
}
/*省份 end*/
/*setting start*/
.link-num{
    position:absolute;
    right: 7%;
    top:0;
}
/*setting end*/

/*真实姓名 start*/
.real{
    padding: .1rem;
    background: #fff;
    margin-top:0.15rem;
    position:relative;
}
.real img{
    position: absolute;
    right:0.15rem;
    top:0.17rem;
    width:0.16rem;
}
.real .none{
    display: none;
}
.real input.real-name{
    width: 100%;
    height: 0.3rem;
    -webkit-appearance: none;
    font-size: 0.15rem;
    outline: none;
    color: #222222;
    border: 0 none;
    background: #fff;
    padding-left:.02rem;
}
.btnShow {
    color: #fff;
    background-color: #fc603c;
}
.introduction{
    width: 100%;
    height: 1.5rem;
    line-height: 0.3rem;
    margin: 0 auto;
    resize: none;
    outline: none;
    border: none;
    border-bottom: 1px solid #000;
    font-size: 0.14rem;
    -webkit-appearance: none;
    border-radius: 0;
    background:#160509;
    color:#fff;
}

.youjt:after{content: " ";
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
    right: 0px;
    top: 35%;
}

.youjt2:after{content: " ";
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
    top: 40%;
}
.goDetail .youjt2:after{
    top: 30%;
}
#citysel{width:40%;}
#areasel{width:30%;}
.newmestip{
    position: absolute;
    top:0.22rem;
    right:0.35rem;
    height:0.08rem;
    width:0.08rem;
    border-radius:50%;
    background:#e7423e;
}
.newmestip b{color:#cd4a47;}

.reply-wrap{
    width:100%;
    height: .49rem;
    line-height: .49rem;
    border: 1px solid #e5e5e5;
    color: #d8d8d8;
    background: #fff;
    font-size: .15rem;
    display: flex;
    display: -webkit-flex;
    position: fixed;
    bottom: 0;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
}
.reply-inp,.reply-txt{
    display: inline-block;
    box-sizing: border-box;
    padding-left: .1rem;
}
.reply-inp{
    width: 60%;
    color:#82848a;
    height:100%;
    resize:none;
    line-height:0.2rem;
    padding-top:0.14rem;
}
.reply-txt{
    border-left: 1px solid #e7e7e8;
    color:#5f6166;
}
.sfz_z{
    width:20%;
    opacity:0;
    z-index:10;
}
.upimg{
    position: absolute;
    top:0;
    left: 60%;
    background: url(../../../static/mine/releasehelp_addpic.png) no-repeat center;
    width:20%;
    height:100%;
    z-index: 0;
    background-size:0.3rem;
}

#ackmain{
    position:absolute;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    width:100%;
}
.success_mask{
		position: fixed;
		width: 2rem;
   		height: 1.55rem;
		top: 30%;
		left: 50%;
		margin-left: -1rem;
		z-index: 99;
		background: rgba(0,0,0,.8);
		font-size: 16px;
		text-align: center;
		color: #FFF;
		border-radius: 5px;
		overflow: hidden;
		display: none;
	}
	.success_mask img{
		width: 30%;
		display: block;
		margin: 0 auto;
		margin-top: 15%;
	}
	.success_mask p{
		font-size: 0.17rem;
		line-height: 0.5rem;
	}
    .realname_tip{
        font-size:0.12rem;
        color:#999999;
        text-indent: 1em;
        margin-top:0.1rem;
    }
`
    } < /style>)