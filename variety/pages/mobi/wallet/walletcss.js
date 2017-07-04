
export default () => ( < style jsx global > {
    `
html {
    background: #e7e7e8;
}
.showmoney{
    height:1rem;
    width:100%;
    background:url(../../static/wallet/mine_bankcard_money@2x.png) no-repeat right;
    background-size:0.82rem;
    background-color: #424242;
}
.showmoney p{
    color:#fff;
    font-size:0.15rem;
    text-indent:0.14rem;
    padding-top:0.1rem;
}
.showmoney span{
    font-size: 0.4rem;
    display: block;
    color: #fff;
    text-indent:0.14rem;
}
.imgrecharge{background:url(../../static/wallet/mine_wallet_topup@2x.png) no-repeat left top;background-size:100% 100%;}
.imgwithdraw{background:url(../../static/wallet/mine_wallet_withdrawal@2x.png) no-repeat left top;background-size:100% 100%;}
.imgdetail{background:url(../../static/wallet/mine_wallet_detail@2x.png) no-repeat left top;background-size:100% 100%;}
.imgcard{background:url(../../static/wallet/mine_wallet_bankcard@2x.png) no-repeat left top;background-size:100% 100%;}
.mine-mod-list{ width:100%; background:#fff;color:#fff; line-height:0.53rem; font-size:0.13rem;}
.bottom1{ margin-bottom:0;}
.bottom1 li:nth-child(1){border-bottom: 1px solid #252021;}
.mine-mod-list span{ float:left;}
.mine-mod-list span:nth-of-type(2){ text-indent:0.15rem;color:#222222;}
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
.last{ width:100%;}
.gotspy{
    margin:0.1rem 0;
}
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

`
    } < /style>)