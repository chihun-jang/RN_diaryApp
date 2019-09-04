import React from 'react';
import { TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import WriteHeader from '../components/WriteHeader'
import uuid from 'uuid/v1';
import * as ImagePicker from 'expo-image-picker';


const { width, height } = Dimensions.get('window');

export default class WriteScreen extends React.Component {


    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='lead-pencil' size={25} style={{ color: tintColor }} />
        ),
        tabBarOnPress: ({ navigation }) => {
            navigation.navigate('Write');
        }

    }
    state = {
        inputtitle :'',
        inputcontent : '',
        imageUrl: '',

    }

    _showTitle = (value) => {
        // console.log(value)
        this.setState({inputtitle:value})
    }
    _showContent = (value) =>{
        // console.log(value)
        this.setState({inputcontent:value})
    }
    _saveText = () =>{
        if(this.state.inputtitle !== ''){
            const id = uuid()
            const date = this._gettoday()
            const newpost = {
                id  : id,
                title: this.state.inputtitle,
                content: this.state.inputcontent,
                date: date,
            }
            // console.log(newPost)
            this.setState(
                {
                    inputtitle: '',
                    inputcontent: '',
                }
            )
            console.log("***********************")
            // console.log(newpost)
            console.log("**********************")
            
            this.props.navigation.navigate('MainScreen',{myparam :newpost})
            // console.log(newPost)

        }
        else{
            this.props.navigation.navigate('MainScreen')
            console.log("이건 else")
        }
        
    }
    _gettoday = () => {
        tyear = (new Date().getFullYear()).toString()
        tmonth = (new Date().getMonth() + 1).toString()
        tday = (new Date().getDate()).toString()
        if (tmonth < 10) {
            tmonth = '0' + tmonth
        }
        if (tday < 10) {
            tday = '0' + tday
        }
        return (tyear + "-" + tmonth + "-" + tday)
        // console.log(tyear + "-" + tmonth + "-" + tday)
    } 
    
    
    render() {
        return (
           
            <SafeAreaView style={styles.container}>
                <View style={styles.contentContainer}>
                    <WriteHeader saveProps={this._saveText}/>
                    <TextInput
                        value = {this.state.inputtitle}
                        onChangeText={this._showTitle}
                       

                        placeholder="제목을 입력하세요"
                        style={styles.title}
                        returnKeyType="done" />
                    <TextInput
                        value={this.state.inputcontent}
                        onChangeText={this._showContent}

                        placeholder="내용을 입력하세요"
                        multiline={true}
                        style={styles.content}
                        returnKeyType="done" />

                </View>
            </SafeAreaView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop:50,
    },

    contentContainer: {
        width: width - 60,
    },
    title: {
        marginVertical: 30,
        fontSize: 30,
        paddingBottom: 12,
        borderBottomWidth: 2,
    },
    content: {
        fontSize: 20,
        
    },

});