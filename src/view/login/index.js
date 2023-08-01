import React, { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import './login.css';

import firebaseConfig from '../../config/firebaseConfig'
import 'firebase/auth'

import state from '../../store/usuarioReducer';

import UsuarioRecuperarSenha from '../usuario-recuperar-senha/'

import { useSelector, useDispatch } from 'react-redux'



function Login(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState(); 
    const [msgTipo, setMsgTipo] = useState();

    const dispatch = useDispatch();

    function logar(){

        firebaseConfig.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            setMsgTipo('sucesso')
            setTimeout( () => {
                dispatch({type: 'LOG_IN', usuarioEmail: email})     
            },2000)
            
        }).catch(erro => {
            setMsgTipo('erro')            
        });
    } 

    return(
        <div className="login-content d-flex align-items-center">

            {
                useSelector(stade => stade.usuarioLogado) > 0 ? <Navigate to='/' /> : null
            }

            <form className="form-signin mx-auto">
                
                <div className="text-center mb-4">
                    <i className="far fa-smile-wink text-white fa-5x"></i>
                    <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">LOGIN</h1>          
                </div>
            
                
                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" class="form-control my-2" placeholder="Email" />          
                <input onChange={(e) => setSenha(e.target.value)} type="password" id="inputPassword" class="form-control my-2" placeholder="Senha" />          
            
                
                <button onClick={logar} class="btn btn-lg btn-block btn-login" type="button">Logar</button>

                <div className="msg-login text-white text-center my-5">
                        {msgTipo === 'sucesso' &&  <span><strong>WoW!</strong> Você está conectado! &#128526; </span>}
                        {msgTipo === 'erro' && <span><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos!! &#128546</span>}
                </div>

                <div className="opcoes-login mt-5 text-center">
                    <Link to='/recuperarsenha' className="mx-2">Recuperar Senha</Link>
                    <span className="text-white">&#9733;</span>
                    <Link to='/novousuario' className="mx-2">Quero Cadastrar</Link>
                </div>
            </form>   
        </div>   
    )
}
export default Login;