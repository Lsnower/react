import Link from 'next/link'
import $ from 'jquery'

const FooterTab = ({ name, active, children }) => (
    <li className={name}>
        <Link href={'/'+name}>
            <a style={{color: (active == name)? '#cd4a47': '#82848a'  }}>
               	<span className={ (active == name) ? "icon-foot icon_"+name+"_show" : "icon-foot icon_"+name }></span>
                {children}
            </a>
        </Link>
    </li>
	
)



class Footer extends React.Component {
	constructor(props){
        super(props)
		this.state = {news:0};
		this.goNews = this.goNews.bind(this);
    }
	componentDidMount(){
		var t = this;
		t.goNews();
		t.goPlay();
	}
    componentWillUnmount(){
		var t = this;
        t.pausePlay();
    }
    goPlay() {
        var t = this;
		t.autoPlayFlag = setInterval(t.goNews,10000);
    }
    pausePlay() {
        clearInterval(this.autoPlayFlag);
    }
	goNews(){
		var t = this;
		
		
		$.ajax({
            type:'post',
            url:'/msg/msg/count.do',
            data:{},
            dataType:'json',
            success:function(d){
                if(d.code==200){
					var xxNum = 0;
					var xxNum2 = 0;
					for(var i=0;i<d.data.length;i++){
						if(d.data[i].classify != 1){
							//xxNum = 10000;
							xxNum += d.data[i].count;
							xxNum2 += d.data[i].count;
						}
					}
					xxNum = xxNum > 999 ? "999+" : xxNum;
					
					if(t.props.toNews){
						t.props.toNews(xxNum2);
					}
					t.setState({news : xxNum});
                }
                
            }.bind(this)
        });
	}
    render() {
		var active = this.props.active;
		var newsNum = parseInt(this.state.news)
       	return <div>
				<footer id="foot">
					<div className="content">
						<ul>
							<FooterTab name="index" active={active}><span className="foot_text">乐米</span></FooterTab>
							<FooterTab name="circle" active={active}><span className="foot_text">经济圈</span><span className={newsNum>0?'foot_red foot_red_show':'foot_red foot_red_hide'}>{this.state.news}</span></FooterTab>
							<FooterTab name="mine" active={active}><span className="foot_text">我的</span></FooterTab>
						</ul>
					</div>
				</footer>
				<style jsx>{`

				`}</style>
		</div>;
    }
}


export default Footer;
