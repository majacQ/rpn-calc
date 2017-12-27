import React, { Component } from 'react';
import './App.css';

const Stack = ({stack, editing}) => {
  return (
    <div>
      { stack.slice(-4).map((x, i) => <div key={i}>{x}</div>) }
    </div>
  );
}

const NumberButton = ({digit, callback}) => {
  return (
    <button onClick={ () => callback(digit) }>{digit}</button>
  );
}

const Operatorbutton = ({symbol, operation, callback}) => {
  return (
    <button onClick={ () => callback(operation) }>{symbol}</button>
  );
}

const EnterButton = ({callback}) => {
  return <button onClick={() => callback()} >Enter</button>
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      stack: [0, 0, 0, 0],
      editing: false
    };
  }

  enterPressed = () => {
    this.setState({editing: false});
  }

  digitPressed = (digit) => {
    let stack = this.state.stack.slice();

    if (this.state.editing) {
      stack.push(stack.pop() * 10 + digit);
    } else {
      stack.push(digit);
      stack.shift();
    }

    this.setState( { stack: stack, editing: true } );
  }

  performOperation = (op) => {
    const stack = this.state.stack.slice();

    stack.push(op(stack.pop(), stack.pop()));
    stack.unshift(0);

    this.setState( { stack: stack, editing: false } );
  }

  render() {
    return (
      <div className="App">
        <Stack stack={this.state.stack} editing={this.state.editing}/>
        <br/>
        <div>
          { [...Array(10).keys()].map(d => <NumberButton digit={d} key={d} callback={this.digitPressed}/>) }
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
          <EnterButton callback={this.enterPressed}/>
        </div>
      </div>
    );
  }
}

export default App;
