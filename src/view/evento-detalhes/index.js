import React, { useEffect, useState } from 'react';
import './evento-detalhes.css';
import {Link, Navigate} from 'react-router-dom';
import firebaseConfig from '../../config/firebaseConfig';
import { useSelector } from 'react-redux';
import NavBar from '../../componentes/navbar';
import { useParams } from "react-router-dom";


function EventoDetalhes(){

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const [carregando, setCarregando] = useState(1);
    const usuarioLogado = useSelector(state => state.usuarioEmail);
    const {id} = useParams();
    const [excluido, setExcluido] = useState(0);

    function remover(){
        firebaseConfig.firestore().collection('eventos').doc(id).delete().then(() => {
            setExcluido(1);
        })
    }

    useEffect(() =>{

        if (carregando) {
        
            firebaseConfig.firestore().collection('eventos').doc(id).get().then(resultado => {
            setEvento(resultado.data())

            firebaseConfig.firestore().collection('eventos').doc(id).update('visualizacoes', resultado.data().visualizacoes + 1)
        
            /*firebaseConfig.storage.ref(`imagens/${resultado.data().foto}`).getDownloadUrl().then(url => {
                setUrlImg(url)
                setCarregando(0);
            });*/
            setCarregando(0);
            
        });
    } else{
        firebaseConfig.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => setUrlImg(url))
    }       
    },[])

    return(
        <>
            <NavBar/>

                {excluido ? <Navigate to='/' /> : null}

            <div className='container-fluid'>
                {

                    carregando ? <div className="row mt-5"> <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only"></span></div> </div>
                    :
                <div>
                    <div className='row'>
                        <img src={ urlImg } className='img-banner' alt='Banner'></img>
                        <div className='col-12 text-right mt-1 visualizacoes'>
                            <i className='fas fa-eye'></i><span>{evento.visualizacoes + 1}</span>
                        </div>
                        <h3 className='mx-auto'><strong>{evento.titulo}</strong></h3>
                    </div>

                    <div className='row mt-5 d-flex justify-content-around'>
                        
                        <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                            <i className='fas fa-ticket-alt fa-2x'></i>
                            <h5><strong>Tipo</strong></h5>
                            <span className='mt-3'>{evento.tipo}</span>
                        </div>

                        <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                            <i className='fas fa-calendar-alt fa-2x'></i>
                            <h5><strong>Data</strong></h5>
                            <span className='mt-3'>{evento.data}</span>
                        </div>

                        <div className='col-md-3 col-sm-12 box-info p-3 my-2'>
                            <i className='fas fa-clock fa-2x'></i>
                            <h5><strong>Hora</strong></h5>
                            <span className='mt-3'>{evento.hora}</span>
                        </div>

                    </div>

                    <div className='row boz-detalhes mt-5'>
                        <div className='col-12 text-center'>
                            <h5><strong>Detalhes do Evento:</strong></h5>
                        </div>
                        <div className='col-12 text-center'>
                            <p>{evento.detalhes}</p>
                        </div>
                        
                    </div>
                    {
                        usuarioLogado === evento.usuario ?
                        <Link to={`/editarevento/${id}`} className='btn-editar'><i className="fas fa-pen-square fa-3x"></i></Link>
                        : ''
                    }

                    {
                        usuarioLogado === evento.usuario ? <button onClick={remover} type="button" className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro">Remover Evento </button>
                        : null
                    }
                </div>
                }
            </div>
        </>
    )
}
export default EventoDetalhes;