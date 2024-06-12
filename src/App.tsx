import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import Task from './components/task'

const App = () => {
  //create a state for the task
  const [task,setTask] = useState<string>('');
  const [taskItems,setTaskItems] = useState<string[]>([]);
  const handleAddTask=()=>{
    Keyboard.dismiss();
    setTaskItems([...taskItems,task]);
    setTask('');
  }
  
  const completeTask = (index:number)=>{
    let itemsCopy=[...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }
  return (
    
    <View style={styles.container}>
      {/* today's tasks */}
        <SafeAreaView/>
        
        <View style={styles.taskWrapper}>
            <Text style={styles.SectionTitle}>Today's Task</Text>
            {/* tasks */}
            <ScrollView>
            <View style={styles.items}>
                 {/* This is where the tasks will go! */}
                  {
                    taskItems.map((item,index)=>{
                      return (
                        <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                          <Task text={item}/>
                        </TouchableOpacity>
                      )
                      
                    })
                  }
                  
            </View>
            </ScrollView>
            
        </View>
        {/* write a task */}
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
          <TextInput 
          style={styles.input}
          placeholder={'Write a task'}
          value={task}

          onChangeText={text=>setTask(text)}
          />
          <TouchableOpacity
          onPress={()=>handleAddTask()}
          >
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#E8EAED'
  }
  ,taskWrapper:{
    paddingTop:50,
    paddingHorizontal:20
  },
  SectionTitle:{
    color:'#1A1A1A',
    fontSize:24,
    fontWeight:'700'
  },
  items:{
    marginTop:30
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center'

  },
  input:{
    color:'#1A1A1A',
    paddingVertical:15,
    width:250,
    paddingHorizontal:15,
    backgroundColor:'#FFF',
    borderRadius:60,
    
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:4
    },
    shadowOpacity:0.30,
  },
  addWrapper:{
      width:60,
      height:60,
      backgroundColor:'#FFF',
      borderRadius:52,
      justifyContent:'center',
      alignItems:'center',

      shadowColor:'#000',
      shadowOffset:{
        width:0,
        height:4
      },
      shadowOpacity:0.30,
  },
  addText:{
    color:'#C0C0C0',
    fontSize:32,
    
    fontWeight:'700'
  }
})
export default App

