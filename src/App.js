import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const Stack = ({stack, editing}) => {
  const cursor = editing ? '_' : '';

  return (
    <div>
      { [4, 3, 2].map((x, i) => <div key={i} className="text-left h4">x{4 - i}: {stack[stack.length - x] ? stack[stack.length - x] : 0}</div>) }

      <div key={1} className="text-left h4">x1: {stack[stack.length - 1] ? stack[stack.length - 1] + cursor : 0}</div>
    </div>
  );
}

const NumberButton = ({digit, callback}) => {
  return (
    <button className="btn btn-primary btn-lg btn-block" onClick={ () => callback(digit) }>{digit}</button>
  );
}

const Operatorbutton = ({symbol, operation, callback}) => {
  return (
    <button className="btn btn-warning btn-lg btn-block" onClick={ () => callback(operation) }>{symbol}</button>
  );
}

const DotButton = ({callback}) => {
  return <button className="btn btn-primary btn-lg btn-block" onClick={() => callback()} >.</button>
}

const EnterButton = ({callback}) => {
  return <button className="btn btn-success btn-lg btn-block" onClick={() => callback()} >E</button>
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
    const stack = this.state.stack.slice();
    const x = stack.pop();
    stack.push(Number(x).toString());

    this.setState({stack: stack, editing: false});
  }

  dotPressed = () => {
    const stack = this.state.stack.slice();

    if (this.state.editing) {
      const x = stack.pop();
      if (x.toString().indexOf('.') === -1) {
        stack.push(x + '.');
        this.setState( { stack: stack, editing: true } );
      }
    } else {
      stack.push('0.');
      this.setState( { stack: stack, editing: true } );
    }
  }

  digitPressed = (digit) => {
    const stack = this.state.stack.slice();

    if (this.state.editing) {
      const x = stack.pop();
      stack.push(x ? x + digit.toString() : digit);
    } else {
      stack.push(digit);
    }

    this.setState( { stack: stack, editing: true } );
  }

  performOperation = (op) => {
    const stack = this.state.stack.slice();
    const x = Number(stack.pop());
    const y = Number(stack.pop());

    stack.push(op(x,y).toString());

    this.setState( { stack: stack, editing: false } );
  }

  render() {
    return (
      <div className="App">
        <div className="panel panel-default panel-body ">
          <Stack stack={this.state.stack} editing={this.state.editing}/>
        </div>
        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={7} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={8} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={9} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="/" operation={(x, y) => y / x} callback={this.performOperation} /></div>
        </div>

        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={4} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={5} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={6} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="*" operation={(x, y) => x * y} callback={this.performOperation} /></div>
        </div>

        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={1} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={2} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={3} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="-" operation={(x, y) => y - x} callback={this.performOperation} /></div>
        </div>

        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={0} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><DotButton callback={this.dotPressed}/></div>
          <div className="col-xs-3"><EnterButton callback={this.enterPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="+" operation={(x, y) => x + y} callback={this.performOperation} /></div>
        </div>
      </div>
    );
  }
}

export default App;
