import React, { Component } from 'react';

class CounterApp extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      count: 0,
      loading: true
    };

    this.decrement = this.decrement.bind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  increment = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  };

  decrement() {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  }

  render() {
    const { title } = this.props; 
    const { count, loading } = this.state; 

    if (loading) {
      return <h2>Loading application...</h2>;
    }

    return (
      <div style={{ padding: '20px', border: '1px solid #ccc' }}>
        <h1>{title}</h1>
        <p>Current Count: <strong>{count}</strong></p>
        
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement} style={{ marginLeft: '10px' }}>
          Decrement
        </button>
      </div>
    );
  }
}

export default CounterApp;
