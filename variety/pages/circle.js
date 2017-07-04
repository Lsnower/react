
import Link from 'next/link'
import Header_title from './mobi/common/header/header_title.js';
import Header from './mobi/common/header/header_noleft.js';
import Footer from './mobi/common/footer.js';
import Finance from './mobi/circle/components/finance.js';

class Circle extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data:'',news:0};
		this.toNews = this.toNews.bind(this);
    }
    toNews(num){
		
		this.setState({
			news : num
		});
	}
    render(){
		
        return (
            <div>
                <Header_title text="经济圈"/>
                <Header text="经济圈"/>
                <div className="content">
					<Finance news={this.state.news} />
                </div>
                <Footer active="circle" toNews={this.toNews} />
                <style jsx global>{`
                    body{
                        -webkit-text-size-adjust:none;
                        background: #f5f5f5;
                    }
					.finance{
						border-top: 1px solid #ddd;
    					border-bottom: 1px solid #ddd;
					}
					.news_main{
						width: 100%;
						height: 0.24rem;
						line-height: 0.24rem;
						margin: 0 auto;
						margin-top: 0.1rem;
						text-align: center;
					}
					.news_main a{
						background-color: #4a4040;
						padding-left: 0.15rem;
						padding-right: 0.1rem;
						color: #fff;
						border-radius: 0.15rem;
						font-size: 0.1rem;
						display: inline-block;
						height: 0.24rem;
						line-height: 0.24rem;
					}
					.news_main a img{
						float: right;
						width: 0.15rem;
						margin-top: 0.04rem;
					}
					.news_show{
						display: block;
					}
					.news_hide{
						display: none;
					}
                `}</style>
                <style jsx>{`
                    .content{
                        margin-bottom:.5rem;
                    }
                `}</style>
            </div>
        )
    }    
}

export default Circle;
