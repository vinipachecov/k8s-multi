import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    try {
      const values = await axios.get('/api/values/current', {
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log(values);
      this.setState({ values: values.data });      
    } catch (error) {
      console.log('[fetchValues] error fetching values ', error);      
    }    
  }

  async fetchIndexes() {
    try {
      const seenIndexes = await axios.get('/api/values/all', {
        headers: {
          'Accept': 'application/json'
        }
      });      
      console.log(seenIndexes);
      this.setState({
        seenIndexes: seenIndexes.data
      });      
    } catch (error) {
      console.log('[fetchIndexes] error fetching seen indexeses.',error);           
    }    
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    if (this.state.seenIndexes.length > 0) {
      return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }    
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
