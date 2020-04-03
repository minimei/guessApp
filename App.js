import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';

export default class Game extends Component {
  //set initial state
  state = {
    secret : 0,
    input: '',
    feedback: '',
    limit: 5,
    turns: 1,
    feedback2: ''
  }

  //function to pick a random number
  generateRandom() {
    return Math.round( Math.random() * 100 )
  }
  //function to initialise the game
  init() {
    const secretNumber = this.generateRandom()
    this.setState({ secret: secretNumber
    })
  }
//lifecycle function
componentDidMount() {
  this.init()
}

//update input state
updateInput = (value) => { this.setState({ input: value }) }
increment = () => { this.setState({turns: this.state.turns + 1})}

checkGuess = () => {

  const userGuess = parseInt(this.state.input);
  const secretNumber = this.state.secret;
  const guessLimit = this.state.limit;
  const guessCount = this.state.turns;

  if( guessCount < guessLimit ){

      if( userGuess < secretNumber ) {
      this.setState({ feedback: ' The number is larger than ' + userGuess })
      this.setState({ feedback2: ' Guess ' + guessCount })
      return
      }

      if( userGuess > secretNumber ){
      this.setState({ feedback: ' The number is smaller than ' + userGuess })
      this.setState({ feedback2: ' Guess ' + guessCount })
      return
      }

      if(userGuess == secretNumber){
      this.setState({ feedback: ' You guessed right, the number is ' + secretNumber})
      this.setState({ feedback2: ' Guess ' + guessCount })
    
      //restart the game
      this.init()
      return
      }
  }
  else{
    this.setState({ feedback: ' You run out of guesses. The correct number is ' + secretNumber })
    this.setState({ feedback2: '' })
     //restart the game
     this.init()
     return
  }
}

  


render () {
  return(
    <View style={styles.container}>
      <Text>Guess my number, now!</Text>
      <Text>You have 5 tries to guess the number correct</Text>
      <TextInput
      style={styles.input}
      keyboardType='number-pad'
      onChangeText={this.updateInput}>
      </TextInput>
      <TouchableHighlight style={styles.button}
      underlayColor = 'white'
      onPressIn={this.increment}
      onPress={this.checkGuess}>
        <Text>Submit Guess</Text>
      </TouchableHighlight>
  <Text>{this.state.feedback}</Text>
  <Text>{this.state.feedback2}</Text>
    </View>
  )
}
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 10,
    backgroundColor: 'lightblue',
    marginTop: 20,
    alignItems: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#ff33ff',
    fontSize: 32
  },

  input: {
    backgroundColor: '#ffffff',
    width: 100,
    marginTop: 20,
    padding: 10,
    textAlign: 'center'
  },

});
