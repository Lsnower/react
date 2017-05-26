import Link from 'next/link'


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

const Footer = ({ active }) => (
    <div>
        <footer id="foot">
            <div className="content">
                <ul>
                    <FooterTab name="index" active={active}><span className="foot_text">乐米</span></FooterTab>
                    <FooterTab name="circle" active={active}><span className="foot_text">经济圈</span></FooterTab>
                    <FooterTab name="mine" active={active}><span className="foot_text">我的</span></FooterTab>
                </ul>
            </div>
        </footer>
        <style jsx>{`
		
        `}</style>
    </div>
);

export default Footer;
