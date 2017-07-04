
export default () => ( < style jsx global > {
    `
html {
    background: #e7e7e8;
}
.rechargelist{
    width:100%;
    background:#ffffff;
    margin-bottom:0.15rem;
    margin-top:0.15rem;
}
@media all and (max-width:319px) {
    .ourbank{
			position: relative;
            padding-bottom:0.5rem;
		}
		
}
.right{
    float:left;
}
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
    display: inline-block;
    width:1.7rem !important;
    height:100%;
    line-height:0.44rem;
    font-size:0.15rem;
    color:#222222;
    float: right;


}
.text-bank{
    display: inline-block;
    width:1.5rem;
    height:100%;
    font-size:0.15rem;
    color:#222222;
    float: right;
}
.text-bank em{
    display: block;
}
.text-bank em:nth-child(1){
    margin-top:0.05rem;
    font-size: 0.15rem;
    color:#222222;
}
.text-bank em:nth-child(2){
    font-size:0.14rem;
    color:#999999;
}
.rechargelist li{
    height:0.44rem;
    width:90%;
    margin:0 auto;
    display: -webkit-flex;
    display: flex;
    position: relative;
}
.rechargelist li:after{
    content: "";
    display: block;
    position: absolute;
    left: 0;
    width: 200%;
    height: 1px;
    background: #e7e7e8;
    transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
    -webkit-transform: scale(1);
    top:0.44rem;
}
.rechargelist li span{
    display: inline-block;
    width:0.8rem;
    height:100%;
    line-height:0.44rem;
    font-size:0.15rem;
    color:#222222;
}
.rechargelist li input{
    flex-grow: 1;
    height:0.3rem;
    line-height:0.3rem;
    color:#222222;
    font-size:0.15rem;
    margin-top:0.08rem;
}
.rechargelist .rightBg {
    height: .53rem;
    line-height: .53rem;
    display: block;
    font-size: 0.15rem;
    color: #e43022;
    position: absolute;
    right: 2%;
    top: 0;
    text-align: right;
}
.youjt2:after {
    content: " ";
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
    top: 30%;
}
.showtip{
    text-indent:0.15rem;
    font-size:0.14rem;
    color:#999999;
}
.showtip span{
    color:#de9290;
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
    margin-bottom:0.6rem;
}
.selthat{
    background:#cd4a47;
    color:#fff;
}
.linkkf{
    width:100%;
    text-align: center;
    color:#999999;
    font-size:0.15rem;
}
.bankpay{
    background:#ffffff;
    padding-top:0.1rem;
}
.bankpay li{
    height:0.4rem;
    width:100%;
    width:90%;
    margin:0 auto;
}
    .bankpay li p{
        float: left;
        height:100%;
    }
    .bankpay li p:nth-child(1){
        line-height:0.4rem;
        font-size:0.14rem;
        color:#999999;
        width:0.7rem;
        text-align: right;
    }
    
    .bankpay li p:nth-child(2){
        font-size:0.14rem;
        color:#222222;
        line-height:0.4rem;
        margin-left:0.1rem;
    }
    .showmoney{
        color:#cd4a47 !important;
        font-size:0.22rem !important;
    }
    .getyanzcode{
        position: relative;
        background:#ffffff;
        height:0.5rem;
        border-top:1px solid #dddddd;
    }
    .getyanzcode p {
        float: left;
        height:100%;
        width:0.7rem;
        text-align: right;
        line-height:0.5rem;
        color:#222222;
    }
    .getyanzcode input{
        height: 0.3rem;
        width:1.4rem;
        line-height:0.3rem;
        text-indent:0.1rem;
        margin-top:0.09rem;
    }
    .getyanzcode span{
        display: block;
        width:0.9rem;
        height:0.25rem;
        background:#f5f5f5;
        border-radius:0.1rem;
        position: absolute;
        top:0.11rem;
        right:.21rem;
        text-align: center;
        line-height:0.25rem;
        font-size: 0.14rem;
        color:#222222;
    }
    .noshow{
        display:none !important;
    }
    
.agreement{
    font-size: 0.12rem;
    width: 100%;
    text-align: center;
}
.agreement span{
	color: #999999;
}
.agreement a{
	color: #0497db;
}
.action .button {
	display: inline-block;
	height: .48rem;
	line-height: .48rem;
	padding: 0 .1rem;
	width: 100%;
	color: #fff;
	border-radius: .05rem;
	font-size: 0.18rem;
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
`
    } < /style>)