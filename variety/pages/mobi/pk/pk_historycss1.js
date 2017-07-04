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
		font-size:14px;
		font-family: Microsoft YaHei,Arial,Verdana,Sans-serif;
		color: #2b2b2b;
		background-color : #f5f5f5;
		height: 100%;
		overflow-x: hidden;
		background: url(/static/pk/futures_versus_bannerbg@2x.png) no-repeat;
		background-size: 100%;
		background-attachment:fixed;
		
	}
	.pk_main{
		background-image:url('/static/pk/futures_versus_bannerbg@2x.png');
		width:100%;
		min-height:5.2rem;
		background-size: cover;
		padding-top:.15rem;
		padding-bottom:.55rem;
	}
	.pk_list {
		margin-top:.1rem;
	}
	.pk_user{
		margin:0 .1rem;
		height:.32rem;
		border-radius:.16rem;
		background:rgba(255,255,255,0.1);
		font-size:.12rem;
	}
	.pk_user img{
		display:inline-block;
		height:.32rem;
		width:.32rem;
		border-radius:.16rem;
		vertical-align: middle;
	}
	.pk_user span{
		color:#fff;
		display:inline-block;
		line-height:.32rem;
		margin-left:.05rem;
		padding-left:.25rem;
	}
	.pk_user span.point{
		background:url('/static/pk/futuresvs_list_integral@2x.png') .02rem .06rem  no-repeat;
		background-size:.2rem;
	}
	.pk_user span.treasure{
		background:url('/static/pk/futuresvs_list_wing@2x.png') .02rem .05rem  no-repeat;
		background-size:.2rem;
	}
	.pk_user span.recharge{
		float:right;
		padding-right:.1rem;
		background:url('/static/pk/futuresvs_list_topup@2x.png') .06rem .09rem  no-repeat;
		background-size:.12rem;
	}
	.pk_logo{
		margin:.4rem 0 0; 
		position:relative;
		padding-bottom:.1rem;
	}
	 .pk_logo img{
		display:block;
		width:100%;
	 }
	 .pk_logo p{
		position:absolute;
		color:#fff;
		bottom:.1rem;
		left:50%;
		font-size:.12rem;
		margin-left:-.67rem;
	 }
	 .pk_result{
		display:inline-block;
		background:#878787;
		height:.16rem;
		line-height:.16rem;
		text-align:center;
		border-radius:.07rem;
		padding:0 .05rem;
		margin-right:.15rem;
	 }
	 .pk_rule{
		color:#999;
	 }
	 .pk_item{
		background:#564f68;
		box-shadow:0 .02rem .04rem 0 #251943;
		height:.8rem;
		margin:.3rem 0;
		position:relative;
	 }
	.pk_item a{
		width: 100%;
		height: 100%;
		display: block;
	}
	 .pk_left{
		width:.9rem;
		float:left;
		height:.8rem;
		margin-left:-100%;
		 padding:0 .15rem;
	 }
	 .pk_right{
		width:.9rem;
		float:left;
		height:.8rem;
		margin-left:-.9rem;
		padding:0 .15rem;
	 }
	 .pk_mid{
		float:left;
		width:100%;
		height:.8rem;
		padding: 0  .9rem;
	 }
	 .pk_left,.pk_right{
		margin-top:-.1rem;

	 }
	 .pk_left img,.pk_right img{
		width:.6rem;
		height: .6rem;
		display:block;
		border-radius:.3rem;

	 }
	 .pk_left p,.pk_right p{
		width:.6rem;
		color:#fff;
		text-align:center;
		font-size:.12rem;
		line-height:.3rem;
		text-overflow:ellipsis;
		overflow:hidden; 
		height:.3rem;
		white-space: nowrap;
	 }
	 .pk_mid p{
		width:100%;
		color:#fff;
		text-align:center;
		line-height:.3rem;
		font-size:.12rem;

	 }
	 .pk_mid p:last-child{
		color:#9c9c9c;
	 }
	 .pk_mid .range{
		width:100%;
		height:.14rem;
		border-radius:.07rem;
		background:#645c78;
		position:relative;
		overflow:hidden;

	 }
	 .pk_mid .range .range_left{
		float:left;
		height:.14rem;
		background:#f3b071;
		border-radius:.07rem 0 0 .07rem ;
		color:#fff;
		font-size:.12rem;
		line-height:.14rem;
	 }
	 .pk_mid .range .range_right{
		float:right;
		height:.14rem;
		background:#ef6d6a;
		border-radius:0 .07rem  .07rem 0;
		color:#fff;
		font-size:.12rem;
		line-height:.14rem;
		text-align:right;
	 }
	 .pk_mid .range span em{
		position:absolute;
		top:0;
		z-index:19;
	 }
	 .pk_mid .range span.range_left em{
		left:.05rem;
	 }
	 .pk_mid .range span.range_right em{
		right:.05rem;
	}
	 img.ko{
		position: absolute;
		top: -.1rem;
	 }
	 .pk_buttons{
		width:3rem;
		position:fixed;
		left:50%;
		margin-left:-1.5rem;
		bottom:.1rem;
		z-index:20;
	 }
	 .infinite-scroll-component{
		margin-top:-.1rem;
	 }
	 span.more{
		color:#fff;
		margin: 0 auto;
		display: block;
		text-align:center;
	 }
	 .lookingfor{
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 99;
			background-color: rgba(0,0,0,.4);
			-webkit-transform: translateZ(0);
			transform: translateZ(0);
		}
		.lookingfor .main{
			padding: .15rem .18rem .25rem;
		}
		.lookingfor .main .title{
			text-align: center;
			font-size; .14rem;
			color: #0c0f16;
			line-height: .24rem;
		}
		.lookingfor .main .sub-title{
			text-align: left;
			font-size: .12rem;
			color: #7a7b7f;
			padding-top: .16rem;
			line-height: .18rem;
			text-align:center;
		}
		.lookingfor .main .sub-title img{
			display:block;
			width:80%;
			margin:0 auto;
		}
		.lookingfor .btn{
			margin:0;
			height:.45rem;
			line-height:.45rem;
			color:#222;
			background:#f5f5f5;
		}
	.tipmodel{
		height:100%;
		width:100%;
		background:rgba(0,0,0,0.40);
		position: fixed;
		top:0;
		z-index: 20;
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
		height:1.9rem;
		background: #fff;
		padding-top:0.2rem;
	}
	.tiptitle{
		height:0.2rem;
		line-height:0.2rem;
		text-align: center;
		font-size:0.16rem;
		color:#222222;
		position: relative;
	}
	.tipcontent{
		width:100%;
		margin-top: 0.1rem;
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
` }</style>)
