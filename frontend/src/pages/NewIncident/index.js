import React,{useState} from 'react'
import api from '../../services/api'

import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'

import logoHeroes from '../../assets/logo.svg'
import './styles.css'

export default function NewIncident(){

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    async function handleCreateIncident(e){
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            alert (`Caso criado com sucesso!`)
            history.push('/profile')
        } catch(err){
            alert ('Problema ao criar o caso!')
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoHeroes} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleCreateIncident}>
                    <input 
                    type="text" 
                    placeholder="Título do Caso"
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>

                    <textarea  
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>

                    <input 
                    type="text" 
                    placeholder="Valor em reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}