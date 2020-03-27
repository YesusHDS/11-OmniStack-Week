import React, {useEffect, useState} from 'react'
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api'

import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Incidents(){
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page,setPage] = useState(1)
    const [load, setLoad] = useState(false)

    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident})
    }

    async function loadIncidents(){

         if (load){
             return
         }

         if (total > 0 && incidents.length == total){
             return
         }

         setLoad(true)

        const response = await api.get('incidents', {
            params: {page}
        })
        
        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-counts'])

        setPage(page + 1)
        setLoad(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logoImg}></Image>
                    <Text style={styles.headerText}>
                        Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                    </Text>
                </View>
                <Text style={styles.title}>Bem-Vindo!</Text>
                <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>

                <View style={styles.incidentList}>

                </View>


                    <FlatList
                    data={incidents}
                    style={styles.incidentList}
                    showsVerticalScrollIndicator={true}
                    onEndReached={loadIncidents}
                    onEndReachedThreshold={0.2}
                    keyExtractor={incident => String(incident.id)}
                    renderItem={({item: incident}) => (
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</Text>

                            <TouchableOpacity 
                                onPress={()=>navigateToDetail(incident)} 
                                style={styles.detailsButton}>

                                
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041"/>
                            </TouchableOpacity>
                        </View>
                    )}/>

                </View>
    )
}