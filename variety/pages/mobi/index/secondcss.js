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
		background : #e7e7e8;
		overflow-x: hidden;
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
	
	/*箭头*/
	.arrow{
		position: relative;
	}
	.arrow_top{
		z-index: 2;
	}
	.arrow_top, .arrow_bottom {
		border: 12px solid transparent;
		border-left: 12px solid #fff;
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		right: -20px;
	}

	.arrow_bottom {
		border-left-color: #cdcccc;
		right: -21px;
	}
	/*箭头*/
	
	/*大事件start*/
	
	.bigeventcontent ul{
		background: #FFF;
		overflow: hidden;
	}

	.bigeventcontent li{ 
		width: 100%;
		position: relative;
	}
	.bigevent_lic{
		width: 90%;
		margin: 0 auto;
	}
	.bigeventcontent li h5{
		font-size: 0.15rem;
		line-height: 0.28rem;
		margin-top: 0.1rem;
		color: #0C0F16;
		
		word-break: break-all;

		text-overflow: ellipsis;

		display: -webkit-box;

		-webkit-box-orient: vertical;

		-webkit-line-clamp: 2; 

		overflow: hidden; 
		
	}
	.bigeventcontent .bigevent_li_time{
		font-size: 0.12rem;
		margin-top: 0.1rem;
		color: #B3B3B3;
		padding-bottom: 0.18rem;
	}
	.bigeventcontent .bigevent_li_time p{
		float: left;
		margin-right: 0.25rem;
	}
	
	/*大事件end*/

	
	
	/*专题 start*/
	
	.special_top{
		width: 100%;
		min-height: 1.3rem;
		position: relative;
		z-index: 1
	}
	.special_top img{
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -2;
	}
	.special_mask{
		width: 100%;
		height: 95%;
		background: rgba(0,0,0,0.4);
		position: absolute;
		top: 0;
		z-index: -1;
	}
	.special_top p{
		width: 90%;
		color: #FFF;
		font-size: 0.13rem;
		line-height: 0.23rem;
		margin: 0 auto;
		padding: 0.1rem 0;
		word-wrap: break-word;
	}

	.special_content{
		width: 100%;
		margin-bottom: 0.5rem;
		background: #FFF;
		margin-top: -3%;
	}
	.special_content li{
		width: 100%;
		height: 0.55rem;
		position: relative;
	}
	.special_content .special_cleft{
		width: 40%;
		float: left;
		text-indent: 0.2rem;
	}
	.special_content .special_cleft div{
		font-size: 0.15rem;
		line-height: 0.2rem;
		margin-top: 0.1rem;
	}
	.special_content .special_cleft span{
		display: block;
		font-size: 0.12rem;
		color: #82848a;
	}
	.special_content .special_cright{
		width: 60%;
		height: 100%;
		line-height: 0.55rem;
		float: left;
		font-size: 0.16rem;
	}
	.special_content .special_cright span{
		display: block;
		float: left;
		color: #838489;
	}
	.special_content .special_cright span.special_red{
		color: #cd4a47;
	}
	.special_content .special_cright span.special_green{
		color: #33d37e;
	}
	.special_bd{
		width: 38%;
	}
	.special_bf{
		margin-left: 15%;
	}
` }</style>)
