
export default () => ( < style jsx global > {
    `
html {
    background: #e7e7e8;
}
.page-main .withdrawtip{
    height:0.26rem;
    width:100%;
    line-height:0.26rem;
    background:#f3b071;
    color:#ffffff;
    font-size:0.12rem;
    text-indent: 0.15rem;
}
.bankcardid{
    height:0.44rem;
    line-height:0.44rem;
    font-size:0.15rem;
    color:#222222;
    background:#ffffff;
    text-indent:0.15rem;
}
.bankcardid span{
    margin-left:0.15rem;
}
.withdrawmoney{
    background:#ffffff;
}
.nei{
    width:90%;
    margin:0.15rem auto;
}
.nei span{
    color:#999999;
    font-size:0.14rem;
    line-height:0.3rem;
}

.nei p{
    height:0.45rem;
    line-height:0.45rem;
    font-size:0.24rem;
}
.nei input{
    height:0.3rem;
    line-height:0.3rem;
    text-indent:0.1rem;
    font-size:0.2rem;
}
.nei p:after {
    content: "";
    display: block;
    position: absolute;
    left: 5%;
    width: 100%;
    height: 1px;
    background: #e7e7e8;
    transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -webkit-transform: scale(1);
}
.cantix{
    font-size:0.12rem;
    color:#999999;
    position: relative;
    line-height: 0.3rem;
}
.redtip{
    position:absolute;
    right:0;
    top:0.02rem;
    font-size:0.12rem !important;
    color:#cd4a47 !important;
}
.linkbu{
    width:90%;
    height:0.44rem;
    line-height:0.44rem;
    text-align: center;
    margin:0.2rem auto;
    background:#999999;
    color:#ffffff;
    font-size:0.15rem;
    border-radius:0.05rem;
}
.selthat{
    background:#cd4a47;
    color:#fff;
}
.tipmodel{
    height:100%;
    width:100%;
    background:rgba(0,0,0,0.40);
    position: fixed;
    top:0;
    z-index: 1;
}
.tipshow{
    display: none;
}
.tipmain{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width:2.5rem;
    height:1.4rem;
    background: #fff;
    padding-top:0.2rem;
}
.tiptitle{
    height:0.2rem;
    line-height:0.2rem;
    text-align: center;
    font-size:0.15rem;
    color:#222222;
    position: relative;
}
.tipcontent{
    width:100%;
}
.tipcontent p{
    width:90%;
    margin:0 auto;
    font-size:0.12rem;
    color:#222222;
    line-height: 0.2rem;
}
.tipclose{
    position: absolute;
    top: -0.8rem;
    right: 0;
    width: 0.3rem;
}
.thisfree{
    margin:0.15rem;
    color:#999999;
    font-size:0.12rem;
}
.linkkf{
    width:100%;
    text-align: center;
    color:#999999;
    font-size:0.15rem;
}
.layer-content {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100%;
    max-width: 640px;
    height: auto;
    z-index: 12;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    display: none;
}
.layershow{
    display: block !important;
}
/* 输入表单 */

.edit_cash {
    display: block;
    margin-top: 15px;
    padding: 15px;
    margin: 0 auto;
    width: 90%;
    border: 1px solid #CFCFCF;
    border-radius: 10px;
    background-color: #fff;
}
.shuru span {
    position: absolute;
    top: 5px;
    font-size: 25px;
}
.form_edit {
    width: 100%;
    background: #D1D4DD;
}

.form_edit> div {
    margin-bottom: 2px;
    margin-right: 0.5%;
    float: left;
    width: 33%;
    height: 45px;
    text-align: center;
    color: #333;
    line-height: 45px;
    font-size: 18px;
    font-weight: 600;
    background-color: #fff;
}

.form_edit> div:nth-child(3n) {
    margin-right: 0;
}

.form_edit> div:last-child {
    background-color: #DEE1E9;
}
.showpay{
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.40);
    position: fixed;
    top: 0;
    z-index: 1;
}
.showpaymain{
    position: fixed;
    top:-30%;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width:2.7rem;
    height:1.65rem;
    background: #f3f3f3;
    border-radius:0.12rem;
}
    .showpaytitle{
        height:0.45rem;
        line-height:0.45rem;
        text-align: center;
        width:100%;
        color:#030303;
        font-size:0.17rem;
        border-bottom:1px solid #ccc;
        position: relative;
    }
    .showpaycontent p{
        text-align: center;
        color:#222222;
    }
    .showpaycontent p:nth-child(1){
        line-height:0.35rem;
        font-size:0.14rem;
    }
    .showpaycontent p:nth-child(2){
        font-size:0.24rem;
        padding-bottom:0.05rem;
    }
    .inputBoxContainer{
        width: 90%;
        height: 0.45rem;
        margin: 0 auto;
        position: relative;
    }
    .inputBoxContainer .bogusInput{
        width: 2.2rem;
        height: 100%;
        z-index: 0;
        margin:0 auto;
    }
    .inputBoxContainer .realInput{
        width: 100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        z-index: 1;
        filter:alpha(opacity=0);
        -moz-opacity:0;
        opacity:0;
        background:#ffffff;
    }
    .inputBoxContainer .bogusInput input{
        padding: 0;
        width: 0.36rem;
        height: 0.36rem;
        float: left;
        background: #ffffff;
        text-align: center;
        font-size: 20px;
        border:1px solid #ccc;
        border-right:0;
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }
    .inputBoxContainer .bogusInput input:first-child{
        border-left: 1px solid #ccc;
    }
    .inputBoxContainer .bogusInput input:last-child{
        border-right: 1px solid #ccc;
    }
    .nopayshow{
        display: none;
    }
    .showpaytitle img{
        position: absolute;
        left: 0.25rem;
        top: 0.15rem;
        width: 0.15rem;
    }
    .withdrawdetail{
        height:1.8rem;
        width:100%;
        text-align: center;
        line-height:2.8rem;
        background:url(../../../../static/wallet/mine_submit_withdrawal@2x.png) no-repeat center 0.2rem;
        background-size:0.8rem;
    }
    .withdrawdetaillist{
        background: #ffffff;
    }
    .withdrawdetaillist li{
        height:0.4rem;
        background:#ffffff;
        line-height:0.4rem;
        width:90%;
        margin:0 auto;
    }
    .withdrawdetaillist li span{
        color:#999999;
        font-size:0.15rem;
        display: inline-block;
        float: left;
    }
    .withdrawdetaillist li b{
        float: right;
        display: inline-block;
        font-size:0.15rem;
        color:#222222;
    }

.nonum{
    background-color: #DEE1E9 !important;
}
`
    } < /style>)