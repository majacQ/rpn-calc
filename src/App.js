import React, { Component } from 'react';
import './App.css';

const Stack = ({stack, editing}) => {
  const cursor = editing ? '_' : '';

  return (
    <div>
      { [4, 3, 2].map((x, i) => <div key={i}>{stack[stack.length - x] ? stack[stack.length - x] : 0}</div>) }

      <div key={1}>{stack[stack.length - 1] ? stack[stack.length - 1] + cursor : 0}</div>
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
      stack: [],
      editing: false
    };
  }

  enterPressed = () => {
    this.setState({editing: false});
  }

  digitPressed = (digit) => {
    let stack = this.state.stack.slice();

    if (this.state.editing) {
      const x = stack.pop();
      stack.push(x ? x * 10 + digit : digit);
    } else {
      stack.push(digit);
    }

    this.setState( { stack: stack, editing: true } );
  }

  performOperation = (op) => {
    const stack = this.state.stack.slice();
    const x = stack.pop();
    const y = stack.pop();

    stack.push(op(x,y));

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
