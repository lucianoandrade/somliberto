import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SetTitle = () => {

    const location = useLocation();
    const pageRoute = "/" + location.pathname.split('/')[1]
    const pages = [
        {
            path: '/',
            name: 'Home',
            title: 'Som Livre'
        },
        {
            path: '/login',
            name: 'Login',
            title: 'Som Livre | Login'
        },
        {
            path: '/cadastro',
            name: 'Register',
            title: 'Som Livre | Cadastro'
        },
        {
            path: '/codconfirmacao',
            name: 'confirmationcode',
            title: 'Som Livre | Codigo de confirmacao'
        },
        {
            path: '/seusdados',
            name: 'Userdata',
            title: 'Som Livre | Seus dados'
        },
        {
            path: '/esquecisenha',
            name: 'forgotPassword',
            title: 'Som Livre | Esqueci senha'
        },
        {
            path: '/redefinirsenha',
            name: 'RedefinePassword',
            title: 'Som Livre | Redefinir senha'
        },
        {
            path: '/perfil',
            name: 'Profile',
            title: 'Som Livre | Meu Perfil'
        },
        {
            path: '/quemsomos',
            name: 'AboutUs',
            title: 'Som Livre | Quem Somos'
        },
        {
            path: '/eventos',
            name: 'eventDetail',
            title: 'Som Livre | Eventos'
        },
        {
            path: '/editarperfil',
            name: 'editProfile',
            title: 'Som Livre | Editar Perfil'
        }
    ];

    useEffect(() => {
        const filterPages = pages.find(page => {
            return page.path === pageRoute
        })
        document.title = (filterPages && filterPages.title) || 'Som Livre';
    }, [location, pages, pageRoute])
    
 
    return (
       <div />
    )
}

export default SetTitle;
