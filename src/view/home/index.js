import React, { useState, useEffect } from "react";

import './home.css';

import NavBar from '../../componentes/navbar/index';
import { useSelector } from 'react-redux';
import firebaseConfig from "../../config/firebaseConfig";
import EventoCard from "../../componentes/evento-card";
import { useParams } from "react-router-dom";

function Home({props}){

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const usuarioEmail = useSelector(state => state.usuarioEmail);
    const {parametro} = useParams();
    let listaEventos = [];

    useEffect(() => {
        if (parametro) {
            firebaseConfig.firestore().collection('eventos').where('usuario','==',usuarioEmail).get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                   if(doc.data().titulo.indexOf(pesquisa) >= 0)
                   {
                    listaEventos.push({
                       id: doc.id,
                       ...doc.data()
                   })
                   }
               })
       
               setEventos(listaEventos);
           });
        } else{
            firebaseConfig.firestore().collection('eventos').get().then(async (resultado) => {
                await resultado.docs.forEach(doc => {
                   if(doc.data().titulo.indexOf(pesquisa) >= 0)
                   {                   
                   listaEventos.push({
                       id: doc.id,
                       ...doc.data()
                   })
                   }
               })   
               setEventos(listaEventos);
           })
        }
       
    });

    return(
        <>
            <NavBar/>
            <div className="row">
                <h2 className="mx-auto p-3">Eventos Publicados</h2>
                <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar evento pelo título..." />
           </div>

            <div className="row">
                {eventos.map(item => 
                <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}   />) }
            </div>
        </>
        )
}
export default Home;