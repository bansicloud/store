import React, { Component } from 'react';

export default class BlockStats extends Component {
  constructor(props) {
    super (props);
    this.state = {
      currentBlockText: '1',
      currentBlockStat: '10',
      totalText: '10',
      totalStat: '100'
    };

    // Used for React Motion
    this.currentBlockStatPrev = '0';
    this.totalStatPrev = '0';
  }

  componentDidMount() {
    this.fetchRepoInfo();
  }

  fetchRepoInfo() {
    fetch(`${this.props.API_ROOT}/stats`, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      // Keeping minimal value of currentBlockStat = 20%
      const receivedBlockStat = Math.floor(data.currentBlockSize * 80 / (data.maxBlockSizeMB * 1000));
      const currentBlockStat = receivedBlockStat + 20;
      this.setState({
        ...this.state,
        currentBlockText: data.currentBlock,
        currentBlockStat,
        totalText: data.totalUploaded / 1000
      })
      console.log('Got blocks stats', data);
    })
  }

  render() {
    return (
      <div className="block-stats">
      
        <div className="stats-outer">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={this.statecurrentBlockStat} aria-valuemin="0" aria-valuemax="100" style={{width: `${this.state.currentBlockStat}%`}}>
              <p>Current block:</p><p>{this.state.currentBlockText}</p>
            </div>
          </div>
        </div>

        <div className="stats-outer">
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: `${this.state.totalStat}%`}} aria-valuenow={this.state.totalStat} aria-valuemin="0" aria-valuemax="100">
              <p>Total uploaded:</p><p id="totalText">{this.state.totalText}</p><p>mb</p>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}