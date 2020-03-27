import React from 'react'
import {View,Text,Image,TouchableOpacity,FlatList,Linking} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import styles from './styles'

import {Feather} from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'

export default function Detail(){

    const route = useRoute()
    const incident = route.params.incident

    const navigation = useNavigation()
    const message = `Olá ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do Caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWpp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack} >
                    <Feather name="arrow-left" size={28} color="#E82041"></Feather>
                </TouchableOpacity>
            </View>

            <FlatList 
            data={[1]}
            keyExtractor={key =>String(key)}
            showsVerticalScrollIndicator={false}
            renderItem={() => (
                <View>
                    <View style={styles.incident}>
                        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.UF}</Text>
                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
                    </View>

                    <View style={styles.contactBox}>
                        <Text style={styles.heroTitle}>Salve o dia!</Text>
                        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                        <Text style={styles.heroDescription}>Entre em contato:</Text>

                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.action} onPress={sendWpp}>
                                <Text style={styles.actionText}>WhatsApp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.action} onPress={sendMail}>
                                <Text style={styles.actionText}>E-Mail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}/>

        </View>
    )
}