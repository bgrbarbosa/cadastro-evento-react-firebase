import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import firebaseConfig from '../../config/firebaseConfig';

import './evento-card.css';

function EventoCard({id, img, titulo, detalhes, visualizacoes}){

    const [urlImage, setUrlImage] = useState();

    useEffect(() => {
        firebaseConfig.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImage(url));
    }, [urlImage]);

    return(
        <>
            <div className='col-md-3 col-sm-12 mt-3'>
                <img src={urlImage} className='card-img-top img-cartao' alt='Imagem Evento' />

                <div className='card-body'>
                    <h5>{titulo}</h5>
                    
                    <p className='card-text text-justify'>
                        {detalhes}
                    </p>

                    <div className='row rodape-card d-flex align-items-center'>
                        <div className='col-6 text-right'>
                            <Link to={'/eventodetalhes/' + id} className='btn btn-sm btn-detalhes'>+ Detalhes</Link>
                        </div>
                        <div className='col-6 text-right'>
                            <i className='fas fa-eye'></i><span>{visualizacoes}</span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default EventoCard;