export default () => ( < style >{ `
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
		width: 100%;
		height: 100%;
		font-size:14px;
		font-family: Microsoft YaHei,Arial,Verdana,Sans-serif;
		color: #2b2b2b;
		background : #fff;
		overflow-x: hidden;
	}
	
	.share_top{
		width: 100%;
		background: url(/static/pk/futures_versus_bannerbg@2x.png) no-repeat;
		background-size: 100% 100%;
		border-top: 0.5px solid #222;
		border-bottom: 0.5px solid #2d283a;
		position: relative;
	}
	
	.top_main{
		width: 80%;
		margin: 0.6rem auto;
		margin-top: 3rem;
		min-height: 1rem;
		border-top: 1px solid rgba(0,0,0,0);
	}
	.top_main .top_div{
		margin: 0 .1rem;
		height: .5rem;
		padding: 0;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-align-items: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border-bottom: 1px solid #dddddd;
		box-shadow: inset 0 0 0 0 #dddddd;
		color: #999;
	}
	.getcode{
		width: 0.9rem;
		text-align: center;
		position: absolute;
		right: 0;
		top: 0.11rem;
		border: 1px solid #999;
		padding: 0.05rem 0.1rem;
		border-radius: 0.15rem;
		font-size: 0.1rem;
	}
	.share_cle{
		width: 0.2rem;
		position: absolute;
		right: 0;
		top: 0.15rem;
		display: none;
	}
	.share_submit{
		width: 1.8rem;
		height: 0.45rem;
		background: #ef6d6a;
		line-height: 0.45rem;
		text-align: center;
		color: #FFF;
		border-radius: 0.25rem;
		border-bottom: 3px solid #cd4a47;
		position: absolute;
		bottom: -0.225rem;
		left: 50%;
		margin-left: -0.9rem;
	}
	
	.share_bottom{
		width: 90%; 
		margin: 0 auto;
		margin-top: 0.6rem;
		line-height: 0.25rem;
		color: #999;
		padding-bottom: 0.3rem;
	}
	.getcode_show{
		color: #fff;
		border-color: #FFF;
	}
	.top_div input{
		color: #FFF;
	}
	
	.toastHide{
		display:none;
	}
	.toastBox{
		position:absolute;
		justify-content: center;
		align-items:center;
		z-index:10001;              
		width:100%;
		top:0;
		bottom:0;
		height:100%;
		display: flex;

	}
	.toast{
		height:.45rem;
		background:rgba(0,0,0,0.75);
		padding:0 .2rem;
		color:#fff;
		font-size:.14rem;
		border-radius:.04rem;  
		text-align:center;
		line-height:.45rem;
	}
	.share_toindex{
		width: 1.75rem;
		height: 0.45rem;
		display: block;
		margin: 0 auto;
		margin-top: -0.13rem;
	}
` }</style>)
