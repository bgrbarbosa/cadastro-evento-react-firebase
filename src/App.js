import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {store, persistor} from '../src/store';
import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';

/* PÁGINAS*/
import Login from './view/login/';
import NovoUsuario from './view/usuario-novo/';
import UsuarioRecuperarSenha from './view/usuario-recuperar-senha/';
import EventoCadastro from './view/evento-cadastro/';
import EventoDetalhes from './view/evento-detalhes/';
import Home from './view/home/';


function App(props) {

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/eventos/:parametro" element={<Home/>} />
              <Route exact path="/novousuario" element={<NovoUsuario/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/recuperarsenha" element={<UsuarioRecuperarSenha/>} />
              <Route exact path="/eventocadastro" element={<EventoCadastro/>} />
              <Route path="/eventodetalhes/:id" element={<EventoDetalhes/>} />
              <Route path="/editarevento/:id" element={<EventoCadastro/>} />
            </Routes>
          </Router>
        </PersistGate>  
      </Provider>
    </div>
  );
} 
export default App;
