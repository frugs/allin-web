import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {leaderboard_entries: []}
  }

  refreshLeaderboard() {
    fetch("/leaderboard_data/").then((response) => {
      return response.json();
    }).then((json) => {
      console.log("refreshing leaderboard")
      this.setState({leaderboard_entries: json.data})
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.refreshLeaderboard();
    }, 50000);

    this.refreshLeaderboard();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo"
            src="http://d1mt9jmphk9kik.cloudfront.net/allinspirationsc2/image1440372391.png"
            alt="All Inspiration"/>
          <h2>Leaderboard</h2>
        </div>

        <div className="App-break"/>

          <table className="App-leaderboard">
            <FlipMove className="App-leaderboard-content" enterAnimation="fade" leaveAnimation="fade">
              <col className="App-leaderboard-column-1"/>
              <col className="App-leaderboard-column-2"/>
              <col className="App-leaderboard-column-3"/>
              <col className="App-leaderboard-column-4"/>
              <thead>
                <tr className="App-leaderboard-header-row">
                  <th className="App-leaderboard-header-cell">BattleTag</th>
                  <th className="App-leaderboard-header-cell">Race</th>
                  <th className="App-leaderboard-header-cell">MMR</th>
                  <th className="App-leaderboard-header-cell">Percentile</th>
                </tr>
              </thead>
              {
                this.state.leaderboard_entries.map(({battle_tag, race, mmr, percentile}) => {
                  let lowerCaseRace = race.toLowerCase()
                  let battleTagName = battle_tag.split("#", 2)[0]

                   return <tr className="App-leaderboard-data-row" key={battle_tag}>
                     <td className={`App-leaderboard-data-cell-left-${lowerCaseRace}`}>{battleTagName}</td>
                     <td className={`App-leaderboard-data-cell-centre-${lowerCaseRace}`}>
                       <img className="App-leaderboard-race-icon" src={`/images/${race}Icon.png`} alt={race}/>
                     </td>
                     <td className={`App-leaderboard-data-cell-right-${lowerCaseRace}`}>{mmr}</td>
                     <td className={`App-leaderboard-data-cell-right-${lowerCaseRace}`}>{percentile}</td>
                  </tr>
                })
              }
            </FlipMove>
          </table>
      </div>
    );
  }
}

export default App;
