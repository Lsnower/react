
export default () => ( < style > {
		`
	*{
		margin:0; padding:0;
	}
	li{
		list-style:none;
	}
	img{
		border:none;
		vertical-align:top;
	}
	a{
		text-decoration:none;
		color:inherit;
	}
	.clear{
		zoom:1;
	}
	.clear .clear_span{
		display:block;
		clear:both;
	}

	body{
		font-size:14px;
		font-family: Microsoft YaHei,Arial,Verdana,Sans-serif;
		background:#e7e7e8;
		color: #050100;
	}
	.bottom_line {
		display: block;
		position: absolute;
		left: -50%;
		bottom: 0;
		width: 200%;
		height: 1px;
		background: #efefef;
		-webkit-transform: scale(0.5);
	}

	div .news{
		width:100%;
		height:.3rem;
		line-height:.3rem;
		text-align:center;
		background:#cd4a47;
		font-size:.12rem;
		color:#fff;

	}
	div .details{
		width:100%;
		color:#82848a;
        margin-top:0.1rem;
		padding-bottom: 0.5rem;
	}
	@media all and (max-width:319px) {
		
		div .details{
			position: relative;
		}
		
	}
	div .details ul{
		width:100%;
        background: #fff;
		list-style:none;
	}
	div .details ul li{
		line-height:.45rem;
		font-size:.16rem;
		margin: 0 0 0 0.15rem;
		border-bottom:.01rem solid #efefef;
        overflow:hidden;
        display:flex;
        display:-webkit-flex;
	}
	.details_left{
		float: left;
		color: #222222;
        width:1rem;
        margin-right: 0.15rem;
	}
	.details_left span.have_padding{
		position:absolute;
        
	}
    .details_left span.no_padding{
        display: inline-block;
        padding-right:0.18rem;
    }
	.details_right{
		float: left;
		color: #0c0f16;
        position:relative;
        flex-grow:1;
	}
	
	div .details ul li input{
		border:none;
        text-align:right;
        margin-right:0.15rem;
        float:right;
        display:block;
        line-height: 0.2rem;
        height:0.2rem;
		width: 80%;
        margin-top:0.12rem;
	}
    div .details ul li span{
		color:#000;
        float:right !important;
        display:block;
	}
	div .upload{
		width:100%;
		padding:0 .15rem;
        background:#fff;
        padding-bottom:0.1rem;
	}
	div .upload p{
        padding:0.1rem 0;
		font-size:.12rem;
        color:#bfbfbf;
	}
	div .upload .images{
		width:100%;
		height:.8rem;
	}
	div .affirms{
		width:100%;
		margin-top:.2rem;
		padding:0 .2rem;
		color:#fff;
	}
	div .affirms p{
		height:.4rem;
		line-height:.4rem;
		font-size:.12rem;
		color:#cd4a47;
	}
	div .affirms .issue{
		width:100%;
		height:.5rem;
		line-height:.5rem;
		text-align:center;
		background:#82848a;
		border-radius:.04rem;
	}
    .selthat{
        background:#cd4a47 !important;
    }
	div .potocol{
		width:100%;
		height:.3rem;
		line-height.3rem;
		text-align:center;
		position:fixed;
		left:0;
		bottom:0;
	}
    
    .details_main textarea{
        display: block;
        line-height:0.2rem;
        font-size:0.14rem;
        resize: none;
        width:96%;
        -webkit-appearance: none;
        height:0.8rem;
        margin:0.1rem 0 0 0.15rem;
        border-bottom:1px solid #efefef;
        padding-top:0.1rem;
    }
    .up_img {
        width: 20%;
        display: inline-block;
        border-radius: 5px;
        position: relative;
        height:0.6rem;
        margin-right: 0.1rem;
    }
    .up_img_content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
    .up_img_content .show_Img {
        width: 100%;
        height: 100%;
        display: block;
    }
    .up_img_content .up_Img{
        width:100%;
        height:100%;
    }
    .noimg{
        display: none;
    }
    .up_img input {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        opacity: 0;
    }
    .up_img_content p{
        text-align: center;
        color:#b6b6b6;
        padding:0 !important;
    }
    .issue{
        width:90%;
        margin:0.2rem auto 0;
        height:0.4rem;
        text-align: center;
        line-height: 0.4rem;
        color: #fff;
        background:#82848a;
        border-radius:0.03rem;
        font-size:0.14rem;
        margin-bottom:0.3rem;
    }
    .agreement{
        width:95%;
        text-align: center;
        margin:0 auto;
        font-size:0.12rem;
        color:#999999;
    }
    .agreement a{
        color:#aac5f2;
    }
    .agreement span{
        margin-left: 0.05rem;
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
    .showtip{
        color:#cd4a47;
        text-indent:0.42rem;
        background: url(../../../static/mine/prompt.png) no-repeat 0.2rem center;
        background-size:0.15rem 0.15rem;
        margin-top: 0.1rem;
    }
    .maindetail{
        width:90%;
        margin:0.1rem auto;
    }
    .details_right .rightBg {
         height:1.2rem;
         line-height: 1.2rem;
         display:block;
         font-size:0.15rem;
         color:#e43022;
         position: absolute;
         right: 2%;
         top:4.4%;
         text-align: right;   
    }
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
    div.details_main{
		width:100%;
        background:#fff;
    }
    #seaT{
        margin-right:0.35rem;
        color:#999999;
        font-size:0.14rem;
    }
    .error{
        color:#cd4a47;
    }
    .toastHide{
        display:none;
    }
    .hint{
        display:none;
        width:100%;
		height:.44rem;
        position:fixed;
        top:38%;
    }
	.hint p{
        width:100%;
        height:.44rem;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    }
    .hint span{
        display:inline-block;
        margin:0 auto;
        background:rgba(0,0,0,0.75);
        border-radius:4px;
        padding:0 .1rem;
        line-height:.44rem;
        text-align:center;
        font-family:.PingFangSC-Regular;
        font-size:14px;
        color:#ffffff;
    }
`
	} < /style>)