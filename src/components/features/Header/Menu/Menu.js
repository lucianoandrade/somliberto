import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Botao from "../../../elements/Botao";
import { useMedia } from "../../../../hooks/useMedia";
import avatarDefault from "../../../../assets/img/avatarDefault.png"
import Dropdown from "./Dropdown";

import './menu.scss';

const Menu = props => {
    const { isBlack } = props;
    const color = isBlack ? "black" : "";
    const colorBtb = isBlack? "black" : "";
    const [menuActive, setMenuActive] = useState(false);
    const activeMenu = menuActive ? " active " : "";
    const { isLarge } = useMedia();

    const toggleMenu = () => {
        if(isLarge) return;
        setMenuActive(!menuActive);
    }

    const user = useSelector(state => state.user.data);
    const userPicture = useSelector(state => state.user.picture);
    const siteInfo = useSelector(store => store.siteInfo.data);

    return (
        <>
            <span id="icoMenu" className={colorBtb} onClick={toggleMenu}><span></span><span></span><span></span></span>

            <div  id="opacity" className={color+activeMenu}></div>
            <nav id="Menu" className={color+activeMenu}>

                <span id="closeMenu" onClick={toggleMenu}>
                    <span>
                        <span className="h"></span>
                        <span className="v"></span>
                    </span>
                </span>

                {user.full_name && menuActive ?
                <>
                <div className="userInfo">
                  {userPicture ?
                    <img className="userAvatar" src={userPicture} alt="" />
                  :
                    <img className="userAvatar" src={avatarDefault} alt="" />

                  }
                    <div className="contact">
                        <div className="userName">{user.full_name}</div>
                        <div className="userEmail">{user.email}</div>
                    </div>
                </div>
                </>
                : <span></span>}

                <NavLink className="link" exact activeClassName="active" to="/"onClick={toggleMenu}>Início</NavLink>
                <NavLink className="link" activeClassName="active" to="/quemsomos" onClick={toggleMenu}>Quem somos</NavLink>
                {siteInfo && siteInfo.current_event && <NavLink className="link" activeClassName="active" to={`/eventos${siteInfo.current_event.url_name}`} onClick={toggleMenu}>Detalhes do show</NavLink>}
                {user.full_name && menuActive ? <Link className="link" to="/perfil">Meu Perfil</Link> : <span></span>}
                {user.full_name && menuActive ?<Link className="link" to="/logout" >Sair</Link> : <span></span>}
                {user.full_name && !menuActive ? <span className="link"><Dropdown /></span> : <span></span>}
                {!user.full_name && !menuActive ?  <Link to="/login"><Botao classes={colorBtb}>Entrar</Botao></Link> : <span></span>}
                {!user.full_name && menuActive ?  <Link className="link" to="/login">Entrar</Link> : <span></span>}

            </nav>
        </>
    );
};

export default Menu;
