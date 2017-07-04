import React, {
    Component
} from 'react'
import Link from 'next/link';
import Router from 'next/router'
import Header_title from '../../common/header/header_title.js';
import Header from '../../common/header/header_left.js';
import Clickland from './land.js';
import Style from '../../user/mine_style.js';
class Prolist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            sex: null,
            age:new Date().getFullYear()-1990,
            land:null,
            asy: false,
            ageasy: false,
            landasy:false,
            userimg:null,
            username:null,
            dwland:'点击重新获取位置'
        }
        this.showtotal = this.showtotal.bind(this);
        this.inputland = this.inputland.bind(this);
         this.showlandmodel = this.showlandmodel.bind(this);
        this.dingwei = this.dingwei.bind(this);
        this.dingweicss = this.dingweicss.bind(this);
    }
    componentWillMount(){
        
    }
    componentDidMount() {
        setTimeout(this.dingwei,200);
    }
    inputland(event){
        this.setState({
            land: event
        })
        this.showtotal();
    }
     showlandmodel() {
        this.setState({
            asy: false,
            ageasy:false,
            landasy: !this.state.landasy
        })
    }
    dingweicss(){
        var that = this;
        that.dingwei();
        localStorage.setItem('borrowlands',that.state.dwland);
        Router.push({
            pathname: '/mobi/mutual/toborrow',
            query:{
                lendslinkcs:'1'
            }
        })
    }
    dingwei(){
        var that = this;
        that.setState({
            
            land:localStorage.getItem('sdborrowlands')
        })
        var geolocation = new BMap.Geolocation();
        var geoc = new BMap.Geocoder();
            geolocation.getCurrentPosition(function(e){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    console.log(e)
                    var pt = e.point;
                    localStorage.setItem('locationLng',pt.lng);
                    localStorage.setItem('locationLat',pt.lat);
                    geoc.getLocation(pt, function(rs){
                        var addComp = rs.addressComponents;
                        var myland =addComp.province+'-'+ addComp.city+'-'+ addComp.district;
                        that.setState({
                            dwland:myland
                        })
                        
                    });
                }else {
                    that.setState({
                        dwland:'点击重新获取位置'
                    })
                    localStorage.setItem('borrowlands','');
                }
          })
    }
    showtotal(){
       var that = this;
        $(that.refs.success_mask).show();
        $(that.refs.success_mask).animate({'opacity':1},500,function(){	
			$(that.refs.success_mask).animate({'opacity':0},500,function(){
				$(that.refs.success_mask).hide();
                                
			})					
		}) 
    }
    render() {
        let a,b,c,d,e,f;
         c = this.state.land == '' ? '请选择' : (this.state.land == '--'?'请选择':this.state.land);
        if(c){
            f = c.length >14 ? c.substring(0,13)+'...' : c
        }
        return (
            <section className="page-main main-mine-profile main-profile">
                <p className="landtipmsg">定位到当前位置</p>
                <ul className="page-mainC">
                    <li onClick={this.dingweicss}>
                        <div className="page-content dingwei">
                            <span>{this.state.dwland}</span>
                        </div>
                    </li>
                </ul>
                <p className="landtipmsg">手动选择地区</p>
                <ul className="page-mainC">
                    
                    <li>
                        <div className="page-content">
                            <a href="#" style={{ position: 'relative' }} onClick={this.showlandmodel}>
                                <span style={{'fontSize':'0.15rem','color':'#222'}}>选择地区</span>
                                <span className="youjt"></span>
                                <span className="right text-lesser" id="seaT">{f}</span>
                            </a>
                        </div>
                        <Clickland model={this.showlandmodel} inputland={this.inputland} text={this.state.landasy} showland={this.state.land}/>
                    </li>
                </ul>
                <style jsx global>{`
                    .page-mainC li{
                        height:0.45rem;
                        line-height:0.45rem;
                    }
                    .landtipmsg{
                        font-size:0.14rem;
                        color:#999999;
                        text-indent:5%;
                        line-height:0.3rem;
                    }
                    .page-mainC{
                        margin-bottom:0;
                    }
                    .landtipmsg:nth-child(1){
                        margin-top:0.3rem;
                    }
                    .dingwei{
                        font-size:0.15rem;
                        color:#222;
                        background:url(../../../../static/mine/mine_data_geo@2x.png) no-repeat 0rem center;
                        text-indent:0.2rem;
                        background-size:0.15rem;
                        height:100%;
                    }
                `}</style>
            </section>
        )
    }
}



export default () => (
    <div>
        <Header_title text="地区"/>
        <div><Header text="地区" /></div>
        <Style/>
        <Prolist/>
        
    </div>
)