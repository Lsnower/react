

export default ({text}) => (
    <div className="textNone_content">
        
        <div className="textNone_img"></div>
        
        <p>{text}</p>
         
		< style jsx >{`
			.textNone_content{
				width: 100%;
				height: 100%;
				padding-top: 0.5rem;
			}
			.textNone_content div{
				width: 1.5rem;
				height: 1.5rem;
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
				background: url(/static/bigevent_pic_noevent@3x.png) no-repeat;
				background-size: 100% 100%;
			}
		`}
   		</style>
    </div>
)

