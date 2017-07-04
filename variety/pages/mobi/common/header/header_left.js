import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router'
import Style from '../style.js';



class Header extends React.Component {
	constructor(props){
        super(props)
		this.state = {};
		this.maskChange = this.maskChange.bind(this);
    }
	componentDidMount(){
		
	}
	maskChange(){
		this.props.messClick('true');
	}
    render() {
		var text = this.props.text;
		var little = this.props.little;
		var path = this.props.path;
        var color = this.props.color;
		var mess_jj = this.props.messg ? this.props.messg : 'false';
		var classN = mess_jj=='true' ? '' : 'hide';
        var a = color ? color : '';
        var b = color ? 'whrite' : 'demozuo';
		return <div>
			<header id="head" className={a}>
				<div className="head_content">
					<h3 className="productName">
						<span>{text}</span>
						<em>{little||''}</em>
					</h3>
					<div className="left">
						<a href={path?path:"javascript:window.history.back()"} className={b}></a>
					</div>

					<div className={"right "+classN}>
						<img src='/static/circle/helpdetail_icon_more@3x.png' onClick={this.maskChange} />
					</div>
				</div>
				
			</header>
			<style jsx>{`
				.hide{
					display:none;
				}
				.productName{
					position:relative;
				}
				.productName em{
					position: absolute;
					top: .18rem;
					font-size: .12rem;
					left: 50%;
					margin-left: -.32rem;
				}
                .headcolor{
                    background:#424242 !important;
                    color:#ffffff !important;
                    border:0 !important;
                }
			`}</style>
		</div>;
    }
}


export default Header;
