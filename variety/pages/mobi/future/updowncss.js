export default () => ( < style >{ `
	.hide{
		display:none;
	}
	.overlayUp {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;
		background-color: rgba(0,0,0,.4);
		-webkit-transform: translateZ(0);
		transform: translateZ(0);
	}
	.msgboxUp {
		position: fixed;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: .16rem
	}

	.msgboxUp .content {
		-webkit-box-flex: 0;
		-webkit-flex: 0 0 auto;
		flex: 0 0 auto;
		width: 75%;
		background-color: #fff;
		border-radius: .05rem;
		box-shadow: 0 0 .05rem rgba(0,0,0,.4);
		padding:.1rem;
		position:relative;
	}
	.msgboxUp .content p{
		font-size:.13rem;
		color:#0c0f16;
		text-align:center;
		line-height:.4rem;
	}
	.msgboxUp .content .box{
		padding:.15rem 0 .2rem;
		zoom:1;
		display:flex;
		display:-webkit-flex;
		padding-bottom:.5rem;
	}
	.msgboxUp .content .box div{
		flex:1;
		-webkit-flex:1;
	}
	.msgboxUp .content div span{
		display:block;
		width:.6rem;
		height:.6rem;
		border-radius:.3rem;
		text-align:center;
		line-height:.6rem;
		color:#fff;
		font-size:.14rem;
	}
	.msgboxUp .content div span.thigh{
		background:#ef6d6a;
		float:right;
		margin-right:.1rem;
	}
	.msgboxUp .content div span.tlow{
		background:#2ecc9f;
		float:left;
		margin-left:.1rem;
	}

	.rule{
		clear:both;
		line-height:.45rem;                    
		text-align:center;
		background:#f5f5f5;
		position:absolute;
		width:100%;
		bottom:0;
		left:0;
		right:0;
		border-radius:0 0 .05rem .05rem;
	}
	.rule span{
		color:#666;
		font-size:.12rem;
	}
` }</style>)
