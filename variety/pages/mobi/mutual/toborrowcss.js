
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
	}
	div .details ul{
		width:100%;
        background: #fff;
		list-style:none;
	}
	div .details ul li{
		line-height:.6rem;
		font-size:.16rem;
		width: 90%;
		margin: 0 auto;
		border-bottom:.01rem solid #efefef;
        overflow:hidden;
	}
	.details_left{
		float: left;
		color: #82848A;
        width:0.65rem;
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
        width: 68%;
	}
	div .details ul li span{
		color:#000;
	}
	div .details ul li input{
		border:none;
        text-indent: 0.1rem;
	}
	div .upload{
		width:100%;
		padding:0 .2rem;
	}
	div .upload p{
        padding:0.1rem 0;
		font-size:.1rem;

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
    
    .details_right textarea{
        display: block;
        line-height:0.2rem;
        font-size:0.14rem;
        resize: none;
        width:100%;
        -webkit-appearance: none;
        height:1rem;
        margin-top:0.1rem;
    }
    .up_img {
        width: 20%;
        display: inline-block;
        border: 1px dashed #CCC;
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
        width: 0.3rem;
        height: 0.3rem;
        display: block;
        margin: 0 auto;
        margin-top: 0.05rem;
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
        margin:0.1rem auto 0;
        height:0.4rem;
        text-align: center;
        line-height: 0.4rem;
        color: #fff;
        background:#82848a;
        border-radius:0.03rem;
        font-size:0.14rem;
    }
    .agreement{
        width:95%;
        text-align: center;
        margin:0.2rem auto 0;
        padding-bottom: 0.25rem;
    }
    .agreement a{
        color:#99aad1;
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
`
	} < /style>)