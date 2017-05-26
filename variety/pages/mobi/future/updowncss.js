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

	}
	.msgboxUp .content div span.thigh{
		background:#cd4a47;
		float:right;
		margin-right:.1rem;
	}
	.msgboxUp .content div span.tlow{
		background:#33d37e;
		float:left;
		margin-left:.1rem;
	}

	.rule{
		clear:both;
		line-height:.5rem;                    
		text-align:center;
	}
	.rule span{
		color:#869bcb;
		font-size:.12rem;
		background:url(/static/future/shares_popovers_icon_rule.png) left center no-repeat;
		padding-left:.15rem;
		background-size: 22%;
	}
` }</style>)
