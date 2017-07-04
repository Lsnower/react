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
	
	.textNone_content{
		width: 100%;
		height: 100%;
		padding-top: 0.5rem;
	}
	.textNone_content div{
		width: 1.5rem;
		height: 1.7rem;
		margin: 0 auto;
	}
	.textNone_content p{
		width: 100%;
		text-align: center;
		color: #B3B3B3;
		font-size: 0.15rem;
		line-height: 0.4rem;
	}
	.textNone_img{
		background: url(/static/dackbg_pic_none@2x.png) no-repeat;
		background-size: 100% 100%;
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
	
	.pxh_main{
		width: 100%;
		color: #fff;
	}
	.pxh_main li{
		width: 100%;
		height: 0.78rem;
		background: #564f68;
		margin-top: 0.18rem;
	}
	.pxh_main li a{
		width: 100%;
		height: 100%;
		display: block;
		display: flex;
	}
	.pxh_left{
		flex: 1;
	}
	.pxh_left .pxh_bt{
		margin-top: 0.15rem;
	}
	.pxh_left .pxh_bt img{
		width: 0.23rem;
		margin-left: 0.15rem;
	}
	.pxh_left .pxh_bt span{
		line-height: 0.23rem;
		font-size: 0.17rem;
	}
	.pxh_left .pxh_game{
		font-size: 0.1rem;
		margin-left: 0.38rem;
		margin-top: 0.105rem;
	}
	.pxh_right{
		flex: 1.3;
		display: flex;
		position: relative;
	}
	.pxh_right .pxh_user{
		display: inline-block;
		text-align: center;
		flex: 1;
	}
	.pxh_right .pxh_userR{
		margin-right: 0.1rem;
		
	}
	.pxh_right .pxh_people{
		width: 0.33rem;
		height: 0.33rem;
		display: inline-block;
		border-radius: 50%;
		margin-top: 0.1rem;
	}
	.pxh_right .pxh_user div{
		width: 95%;
		margin: 0 auto;
		font-size: 0.1rem;
		margin-top: 0.06rem;
	}
	.pxh_right .pxh_pk{
		width: 0.22rem;
		position: absolute;
		left: 50%;
		top: 0.2rem;
		margin-left: -0.16rem;
	}
	
	.pxh_win{
		color: #ef6d6a;
	}
	.pxh_low{
		color: #e9e8ec;
	}
	.pk_bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	
	.pro{
		width:100%;
		height: 100%;
		background-size:cover;
		padding-bottom:.45rem;
		position: relative;
		overflow: hidden;
	}
	.pro_line{
		width: 0.02rem;
		height: 100%;
		background: #362d4d;
		position: absolute;
		left: 50%;
		top: 0;
		z-index: -1;
		margin-left: -0.01rem;
	}
	.process{
		position: relative;
	}
	.process li{
		height:.5rem;
		width:50%;
		position:relative;
		color:#fff;
		box-sizing:border-box;
	}
	.process li.pro_left{
		left:0;
		padding-right:.1rem;
		border-right:.01rem solid #362d4d;
	}
	.process li.pro_left:before{
		content:'';
		display:block;
		width:.06rem;
		height:.06rem;
		border-radius:.03rem;
		background:#f3b071;
		position:absolute;
		right:-.03rem;
		top:.13rem;
	}
	.process li.pro_right{
		left:50%;
		padding-left:.1rem;
		border-left:.01rem solid #362d4d;
		margin-left:-.01rem;
	}
	.process li.pro_right:before{
		content:'';
		display:block;
		width:.06rem;
		height:.06rem;
		border-radius:.03rem;
		background:#ef6d6a;
		position:absolute;
		left:-.03rem;
		top:.13rem;
	}
	.process li span{
		display:block;
		background:rgba(255,255,255,0.10);
		border-radius:.04rem;
		width:1.1rem;
		height:.28rem;
		color:#fff;
		line-height:.28rem;
		text-align:center;
		font-size:.14rem;
	}
	.process li.pro_left span,.process li.pro_left em{
		float:right;
	}
	.process li em{
		color:#666;
		font-size:.12rem;
		line-height:.2rem;
		display:block;
		clear:both;
	}
	
	.pk_item{
		background:#564f68;
		box-shadow:0 .02rem .04rem 0 #251943;
		height:.8rem;
		position:relative;
	 }
	 .pk_left{
		width:.9rem;
		float:left;
		height:.8rem;
		margin-left:-100%;
	 }
	 .pk_right{
		width:.9rem;
		float:left;
		height:.8rem;
		margin-left:-.9rem;
	 }
	 .pk_mid{
		float:left;
		width:100%;
		height:.8rem;
		padding: 0  .9rem;
	 }
	 .pk_left,.pk_right{
		margin-top:-.1rem;
		position: relative;
	 }
	.img_ko{
		position: absolute;
		top: 0;
	}
	 .pk_left img,.pk_right img{
		width:.6rem;
		display:block;
		border-radius:.3rem;
		margin-left: 0.15rem;
	 }
	 .pk_left p,.pk_right p{
		color: #fff;
		text-align: center;
		font-size: .12rem;
		line-height: .3rem;
		text-overflow: ellipsis;
		overflow: hidden;
		height: .3rem;
		white-space: nowrap;
	 }
	 .pk_mid p{
		width:100%;
		color:#9c9c9c;
		text-align:center;
		line-height:.2rem;
		font-size:.12rem;
	 }

	 .pk_mid p span:first-child{
		float:left;
	 }
	 .pk_mid p span:last-child{
		float:right;
	 }
	 .pk_mid .range{
		width:100%;
		height:.14rem;
		border-radius:.07rem;
		background:#645c78;
		margin:.1rem 0;
		position: relative;
		border-radius:.07rem;
		 overflow: hidden;
	 }
	 .pk_mid .range .range_left{
		float:left;
		width:40%;
		height:.14rem;
		background:#f3b071;
		color:#fff;
		font-size:.12rem;
		line-height:.14rem;
	 }
	.pk_mid .range .range_right{
		float:right;
		width:60%;
		height:.14rem;
		background:#ef6d6a;
		color:#fff;
		font-size:.12rem;
		line-height:.14rem;
		text-align:right;
	}
	.process{
		min-height: 400px;
	}
	.processDiv{
		width:100%;
		height: 400px;
		margin-top: 0.5rem;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}
	@media all and (max-width:375px) {
		.processDiv{
			height: 350px;
		}
		.process{
			min-height: 350px;
		}
	}
	@media all and (max-width:320px) {
		.processDiv{
			height: 250px;
		}
		.process{
			min-height: 250px;
		}
	}
	
	
	.gold_left{
		color: #fff;
		font-size: .12rem;
		line-height: .14rem;
 		position: absolute;
		left: 0.05rem;
		top: 0;
	}
	.gold_right{
		color: #fff;
		font-size: .12rem;
		line-height: .14rem;
 		position: absolute;
		right: 0.05rem;
		top: 0;
	}
` }</style>)
