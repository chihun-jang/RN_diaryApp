import React from 'react';
import { StyleSheet, Text, View,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars';


export default class  MainScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name="calendar-multiselect" size={30} style={{ color: tintColor }}/>
      ) 
    }

    constructor(props){
        super(props)
        this.state = {
            selectedDate: '',

            Posts: [{
                title: '8월 30일에 쓴 글',
                content: '본문',
                id: 1,
                date: '2019-08-30',
            },
            {
                title: '8월 29일에 쓴 글',
                content: '본문',
                id: 2,
                date: '2019-08-29',
            },

            ]
        }
    }
    

   
componentDidMount(){
    this.props.navigation.addListener(
        'didFocus',
        payload => {
            newpost = this.props.navigation.getParam('myparam')
            if (newpost ) {
                const PrevPosts = [...this.state.Posts]
                // console.log("*********************")
                // console.log(PrevPosts)
                // console.log("###############")
                // console.log(newpost)
                this.setState({Posts: PrevPosts.concat(newpost)} )
                // console.log("%%%%%%%%%%%%%%%%")
                // console.log(this.state.Posts)
                console.log(this.props.navigation)
                this.props.navigation.setParams(" ")
                console.log(this.props.navigation)
                this.props.navigation.navigate('MainScreen',{myparam: false })
            }else{
                console.log("다시실행한 증거")
            }
        }
    );
}
        
    _mysetting = () => {
        console.log("cech")

        const PrevPosts = [...this.state.Posts]
        this.setState({ Posts: PrevPosts.concat(this.newpost) })
    }
    


    render(){
        // newpost = this.props.navigation.getParam('myparam')
        
        // {newpost ? console.log(newpost) : console.log("안넘어옴") }

        return (
            // console.log(this.props),
            // console.log(this.state.Posts),
            <SafeAreaView style={styles.container}>
                {/* {this.myNewPost? this._addposts :null} */}
                <Calendar
                    onDayPress={(day) => { this.setState(this.state.selectedDate = day)} }
                    // Initially visible month. Default = Date()
                    current={new Date()}/>
                <ScrollView>
                    <FlatList
                      data ={this.state.Posts.filter(data => { return data.date == this.state.selectedDate.dateString })}
                      renderItem ={({item, index})=>{
                          return (
                              <TouchableOpacity
                                onPress={() => {this.props.navigation.navigate('Detail',{post:item})}}
                                style = {styles.listitem}>
                                  <View>
                                      <Text style = {styles.listtext}>
                                          제목 : {item.title}
                                      </Text>
                                      <Text style={styles.listtext}>
                                          내용 : {item.content}
                                      </Text>
                                  </View>
                              </TouchableOpacity>
                          )
                      }}
                      keyExtractor = {(item, index) => { return item.id }}  />
                </ScrollView>
            </SafeAreaView>
        );
    }
    
}

const styles = StyleSheet.create({
    listitem:{
        marginLeft:50,
        marginTop:20,
        borderLeftColor: "black",
        borderLeftWidth: 4,
        paddingLeft:30,
    },

    container: {
        flex: 1,
        paddingTop:50,
    },
    textstyle:{
        fontSize:40,
    },
    listtext:{
        fontSize : 20,
    }
});
