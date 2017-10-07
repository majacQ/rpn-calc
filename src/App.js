import React, { Component } from 'react';
import './App.css';

const Stack = ({stack}) => {
  return (
    <div>
      { [4, 3, 2, 1].map((x, i) => <div key={i}>{stack[stack.length - x] ? stack[stack.length - x] : 0}</div>) }
    </div>
  );
}

const NumberButton = ({digit, callback}) => {
  return (
    <button className="Digit-button" onClick={ () => callback(digit) }>{digit}</button>
  );
} 

const Operatorbutton = ({symbol, operation, callback}) => {
  return (
    <button onClick={ () => callback(operation) }>{symbol}</button> 
  );
}

const EnterButton = () => {
  return <button>Enter</button>
}

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      stack: []
    };

    this.digitPressed = this.digitPressed.bind(this);
    this.performOperation = this.performOperation.bind(this);
  }

  digitPressed(digit) {
    console.log(this.state.stack);

    let stack = this.state.stack.slice();
    stack.push(digit);
    this.setState( { ...this.state, stack: stack } );  
  }

  performOperation(op) {
    let stack = this.state.stack.slice();
    let x = stack.pop();
    let y = stack.pop();

    stack.push(op(x,y));
    this.setState( { ...this.state, stack: stack } );  
  }

  render() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <div className="App">
        <Stack stack={this.state.stack}/>
        <br/>
        <div>
          { digits.reverse().map(d => <NumberButton digit={d} key={d} callback={this.digitPressed}/>) }
        </div>
        <br/>
        <div>
          <Operatorbutton symbol="+" operation={(x, y) => x + y} callback={this.performOperation} />
          <Operatorbutton symbol="-" operation={(x, y) => y - x} callback={this.performOperation} />
          <Operatorbutton symbol="*" operation={(x, y) => x * y} callback={this.performOperation} />
          <Operatorbutton symbol="/" operation={(x, y) => y / x} callback={this.performOperation} />
        </div>
        <br/>
        <div>
          <EnterButton />
        </div>
      </div>  
    );
  }
}

export default App;