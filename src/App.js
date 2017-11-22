import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const Stack = ({stack, editing}) => {
  const cursor = editing ? '_' : '';

  return (
    <div>
      { [4, 3, 2].map((x, i) => <div key={i} className="text-left h4">x{4 - i}: {stack[stack.length - x]}</div>) }

      <div key={1} className="text-left h4">x1: {stack[stack.length - 1] + cursor}</div>
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
  return <button className="btn btn-success btn-lg btn-block" onClick={() => callback()} >&#10004;</button>
}

const EraseButton = ({callback}) => {
  return <button className="btn btn-warning btn-lg btn-block" onClick={() => callback()}>&#8592;</button>
}

const ShiftButton = ({callback}) => {
  return <button className="btn btn-warning btn-lg btn-block" onClick={() => callback()}>R&#8595;</button>
}

const SwapButton = ({callback}) => {
  return <button className="btn btn-warning btn-lg btn-block" onClick={() => callback()}>&#x267A;</button>
}

const InvertButton = ({callback}) => {
  return <button className="btn btn-warning btn-lg btn-block" onClick={() => callback()}>+/-</button>
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
    const stack = this.state.stack.slice();
    const x = stack.pop();
    stack.push(Number(x).toString());
    stack.push(Number(x).toString());

    this.setState({stack: stack, editing: false, x1Transient: true});
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

    const x = stack.pop();
    if (this.state.editing) {
      stack.push(x ? x + digit.toString() : digit);
    } else {
      if (!this.state.x1Transient) {
        stack.push(x);
      }
      stack.push(digit);
    }

    this.setState( { stack: stack, editing: true } );
  }

  performOperation = (op) => {
    const stack = this.state.stack.slice();
    const x = Number(stack.pop());
    const y = Number(stack.pop());

    stack.push(op(x,y).toString());

    this.setState( { stack: [0, ...stack], editing: false, x1Transient: false } );
  }

  invertButtonPressed = () => {
    const stack = this.state.stack.slice();

    const x = Number(stack.pop());
    const y = (x * -1).toString();

    stack.push(y);
    this.setState({stack: stack, x1Transient: false});
  }

  eraseButtonPressed = () => {
    const stack = this.state.stack.slice();

    const x = stack.pop();
    if (this.state.editing && x.length > 1) {
      stack.push(x.slice(0, -1));
    } else {
      stack.push('0');
      this.setState({editing: false, x1Transient: true});
    }

    this.setState({ stack: stack});
  }

  swapButtonPressed = () => {
    const stack = this.state.stack.slice();

    const x = stack.pop();
    const y = stack.pop();

    stack.push(x);
    stack.push(y);

    this.setState({ stack: stack, editing: false, x1Transient: false});
  }

  shiftButtonPressed = () => {
    const toShift = this.state.stack[this.state.stack.length - 1];
    const stack = this.state.stack.slice(this.state.stack.length - 4, this.state.stack.length - 1);

    this.setState({ stack: [toShift, ...stack], editing: false, x1Transient: false});
  }

  render() {
    return (
      <div className="App">
        <div className="panel panel-default panel-body ">
          <Stack stack={this.state.stack} editing={this.state.editing}/>
        </div>
        <div className="row top-buffer">
          <div className="col-xs-3"><InvertButton callback={this.invertButtonPressed}/></div>
          <div className="col-xs-3"><SwapButton callback={this.swapButtonPressed} /></div>
          <div className="col-xs-3"><ShiftButton callback={this.shiftButtonPressed}/></div>
          <div className="col-xs-3"><EraseButton callback={this.eraseButtonPressed} /></div>
        </div>

        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={7} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={8} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={9} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="&#247;" operation={(x, y) => y / x} callback={this.performOperation} /></div>
        </div>

        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={4} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={5} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={6} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="&#215;" operation={(x, y) => x * y} callback={this.performOperation} /></div>
        </div>

        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={1} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={2} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><NumberButton digit={3} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="&#8722;" operation={(x, y) => y - x} callback={this.performOperation} /></div>
        </div>

        <div className="row top-buffer">
          <div className="col-xs-3"><NumberButton digit={0} callback={this.digitPressed}/></div>
          <div className="col-xs-3"><DotButton callback={this.dotPressed}/></div>
          <div className="col-xs-3"><EnterButton callback={this.enterPressed}/></div>
          <div className="col-xs-3"><Operatorbutton symbol="&#43;" operation={(x, y) => x + y} callback={this.performOperation} /></div>
        </div>
      </div>
    );
  }
}

export default App;
