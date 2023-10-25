import { StyleSheet, Text, View,ImageBackground, TextInput,TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { useState,useEffect } from 'react';
import emailjs from '@emailjs/browser';

import backgroundImage from './assets/sde.jpg';

export default function App() {
  // useEffect(() => emailjs.init("YOUR-PUBLIC-KEY-HERE"), []);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const emailjs = require('emailjs-com');
  emailjs.init('ZZeSA_qerjEO72olO')

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const submit = () => {
    if (!name || !email || !number || !message) {
      setSubmitMessage("Please fill in all the required fields.");
    } 
    else if(name.length<3){
      setSubmitMessage("Name should be more than 2 letters.");
    }
    else if(!regex.test(email)){
      setSubmitMessage("Invalid email.");
    }
    else{
      var templateParams = {
        'name': name,
        'number': number,
        'email': email,
        'message': message
    };
    emailjs.send('service_iqucknn', 'template_xv2y72q', templateParams)
        .then(function(response) {
        setSubmitMessage("Thank you! We'll get back to you soon.");
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
    }
  };
  const handleReset = () => {
    setName('');
    setNumber('');
    setEmail('');
    setMessage('');
    setSubmitMessage('');
  };
  return (
    <SafeAreaView style={styles.container}>
       <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
       <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Contact us!</Text>
        <View style={styles.box}>

        <Text style={styles.text}>Enter your name:</Text>
        <TextInput
        style={styles.input}
        placeholder="Type name here..."
        value={name}
        onChangeText={(name) => setName(name)}/>

        <Text style={styles.text}>Enter mobile number</Text>
        <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="Type name here..."
        value={number}
        onChangeText={(number) => setNumber(number)}/>

        <Text style={styles.text}>Enter your email</Text>
        <TextInput
        style={styles.input}
        placeholder="Type name here..."
        value={email}
        onChangeText={(email) => setEmail(email)}/>

        <Text style={styles.text}>Enter message</Text>
        <TextInput
        style={[styles.input,styles.multilineStyles]}
        placeholder="Type name here..."
        value={message}
        onChangeText={(msg) => setMessage(msg)}
        numberOfLines={4}
        multiline={true}/>

        <TouchableOpacity style={styles.submit} onPress={submit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
        {submitMessage ? <Text style={styles.submitMessage}>{submitMessage}</Text> : null}
        </View>
        </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  title:{
    textAlign: 'center',
    marginTop: '15%',
    fontSize: 25,
    fontWeight: 'bold',
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    width: '80%',
    height:'65%',
    padding: 20,
    // marginTop: 20,
    marginLeft:40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  input:{
    borderWidth:1,
    padding:3,
    marginLeft:40,
    marginTop:3,
    width:200,
    marginBottom:40
  },
  text:{
    textAlign:'center'
  },
  submit: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center'
  },
  multilineStyles:{
    paddingVertical:4
  },
  submitMessage: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: 'green',
  },
  resetButton: {
    backgroundColor: 'red', // Customize the button's style here
    padding: 3,
    borderRadius: 5,
    alignItems: 'center',
    marginTop:50,
    marginBottom:0,
    marginLeft:6,
    width:70
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});