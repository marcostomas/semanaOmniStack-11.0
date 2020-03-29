import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './styles.css'
// Abstrai o conteúdo para o que se quer importar, através das chaves
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            // console.logresponse.data.name;
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile')
        }catch(err){
            alert('Falha no login! Você esqueceu de passar uma diretiva using ou referência assembly?')
        }
    }

    return(
        <div className="logon-container">
        <section className="form">
            <img src={logoImg} alt="Be The Hero" />
            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>

                <input 
                placeholder="Sua ID"
                value={id}
                onChange={e => setId(e.target.value)}
                />
                <button className="button" type="submit">Entrar</button>
            </form>

            <Link className="back-link"to="/register">
                {/* Altura do ícone */}
                <FiLogIn size={ 16 } color="E02041"/>
                Não tenho cadastro
            </Link>
        </section>
        
        <img src={heroesImg} alt="Heroes" />
        </div>
    )
}