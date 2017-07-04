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
		background : #f5f5f5;
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
		display: flex;
	}
	.special_content .special_cright span{
		display: block;
		color: #838489;
		flex: 1;
	}
	.special_content .special_cright span.special_red{
		color: #cd4a47;
	}
	.special_content .special_cright span.special_green{
		color: #33d37e;
	}
	.special_bd{
		text-indent: 0.35rem;
	}
	.special_bf{
		
	}
	
	.special_main ul.top{
		width:100%;
		display:flex;
		background:#f5f5f5;
		border-bottom:.01rem solid #ddd;
		padding:0 .1rem;
		margin-top: -2%;
	}
	.special_main ul.top li{
		flex:1;
		text-align:left;
		font-size:.1rem;
		color:#999;
		line-height:.32rem;
	}
	.special_main ul.top li.name{
		flex:2;
	}
	.special_main ul.top li:last-child{
		text-align:right;
	}
	
	.special_main div.list{
		width:100%;
		display:flex;
		display:-webkit-flex; 
		padding:.1rem; 
		border-bottom:.01rem solid #ddd; 
		position: relative;
		background:#fff;
	}
	.special_main div.list span{
		flex:1;
		-webkit-flex:1;
		display:block;
		font-size:.15rem;
	}
	.special_main div.list span.pz_bt{
		color: #0c0f16;
	}


	.special_main div.list span:first-child{
		flex:2;
		-webkit-flex:2;
		color:#222;
		font-size:.15rem;
	}
	.special_main div.list span em{
		display:block;
		font-size:.1rem;
		font-style:normal;
		color:#999;
	}
	.special_main span.price,span.percent{
		line-height:.32rem;
		color:#838489;
		font-size:.17rem;
	}
	.special_main span.thigh{
		color:#cd4a47;
	}
    .special_main span.tlow{
		color:#2ecc9f;
    }
    .special_main div.list span b{
	 	width:.7rem;
		height:.27rem;
		display:block;
		color:#fff;
		text-align:center;
		line-height:.27rem;
		font-size:.15rem;
		float: right;
		font-weight: normal;
    }
    .special_main div.list span b.thigh{
		background:#cd4a47;
   	}
	.special_main div.list span b.istp_class{
		background:#838489;
   	}
	.special_main div.list span b.tlow{
		background:#2ecc9f;
  	}
	
	
` }</style>)
