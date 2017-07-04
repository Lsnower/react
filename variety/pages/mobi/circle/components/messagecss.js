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
		color: #222;
		background : #fff;
		overflow: hidden;
	}
	.all_msg{
		height: 400px;
		overflow-y: auto;
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
	
	.message_li{
		border-bottom: 1px solid #ddd;
		margin-left: 0.18rem;
		padding-bottom: 0.05rem;
		overflow: hidden;
		position: relative;
	}
	.message_li .message_left,.message_li .message_right{
		display: inline-block;
	}
	.message_li .message_left{
		width: 100%;
	}
	.message_left img{
		display: inline-block;
		width: .33rem;
		height: .33rem;
		border-radius: 50%;
		margin-top: 0.15rem;
	}
	.message_left .message_left_text{
		width: 55%;
		display: inline-block;
		margin-left: 0.1rem;
	}
	.message_left .message_name{
		margin-top: 0.15rem;
		font-size: 0.16rem;
	}
	.message_left .message_span{
		margin-top: 0.1rem;
		line-height: 0.2rem;
		font-size: 0.14rem;
		min-height: 0.1rem;
		word-wrap: break-word;
	}
	.message_left .message_time{
		font-size: .12rem;
    	color: #b6b6b6;
		margin-top: 0.1rem;
	}
	.message_li .message_right{
		width: 0.8rem;
		height: 0.8rem;
		position: absolute;
		right: 0.1rem;
		top: 50%;
		margin-top: -0.4rem;
	}
	.message_right img{
		width: 0.8rem;
		height: 0.8rem;
	}
	.message_right .message_right_text{
		color: #999;
		overflow:hidden; 
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:3;
		word-wrap: break-word;
	}
	.message_right span{
		width: 100%;
		margin-top: 0.05rem;
		display: block;
		color: #999;
	}
	.message_more{
		width: 100%;
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
		color: #999;
		margin-bottom: 0.6rem;
		border-bottom: 1px solid #ddd;
	}
	.message_right .possiimg{
		position: absolute;
		bottom: 0;
		right: 0;
		width: 0.25rem;
		height: initial;
	}
	.message_right .possiimg_show{
		display: block;
	}
	.message_right .possiimg_hide{
		display: none;
	}
` }</style>)
