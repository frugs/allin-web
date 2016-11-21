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

  renderIcon(race) {
    if (race === "Random") {
      return (
      <span>
        <img className="App-leaderboard-race-icon" src="/images/TerranIcon.png" alt="Terran"/>
        <img className="App-leaderboard-race-icon" src="/images/ZergIcon.png" alt="Zerg"/>
        <img className="App-leaderboard-race-icon" src="/images/ProtossIcon.png" alt="Protoss"/>
      </span>
      );
    } else {
      return <img className="App-leaderboard-race-icon" src={`/images/${race}Icon.png`} alt={race}/>
    }
  }

  getLeague(tier) {
    if ([0, 1, 2].indexOf(tier) !== -1) {
      return "bronze";
    } else if ([3, 4, 5].indexOf(tier) !== -1) {
      return "silver";
    } else if ([6, 7, 8].indexOf(tier) !== -1) {
      return "gold";
    } else if ([9, 10, 11].indexOf(tier) !== -1) {
      return "platinum";
    } else if ([12, 13, 14].indexOf(tier) !== -1) {
      return "diamond";
    } else if ([15, 16, 17].indexOf(tier) !== -1) {
      return "master";
    } else {
      return "grandmaster";
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo"
            src="/images/allin_official.png"
            alt="All Inspiration"/>
          <h2>Leaderboard</h2>
        </div>

        <div className="App-break"/>

        <div className="App-content">

          <table className="App-leaderboard">
              <col className="App-leaderboard-column-0"/>
              <col className="App-leaderboard-column-1"/>
              <col className="App-leaderboard-column-2"/>
              <col className="App-leaderboard-column-3"/>
              <col className="App-leaderboard-column-4"/>
              <thead>
                <tr className="App-leaderboard-header-row">
                  <th className="App-leaderboard-header-cell">League</th>
                  <th className="App-leaderboard-header-cell">BattleTag</th>
                  <th className="App-leaderboard-header-cell">Race</th>
                  <th className="App-leaderboard-header-cell">MMR</th>
                  <th className="App-leaderboard-header-cell">Percentile</th>
                </tr>
              </thead>
              <FlipMove className="App-leaderboard-data-group" enterAnimation="elevator" leaveAnimation="elevator">
              {
                this.state.leaderboard_entries.map(({battle_tag, race, tier, mmr, percentile}) => {
                  let lowerCaseRace = race.toLowerCase()
                  let battleTagName = battle_tag.split("#", 2)[0]

                   return <tr className="App-leaderboard-data-row" key={battle_tag + race}>
                     <td className={`App-leaderboard-data-cell App-leaderboard-middle-aligned-cell App-leaderboard-data-cell-${lowerCaseRace}`}>
                       <img className="App-leaderboard-league-emblem" src={`/images/${this.getLeague(tier)}.png`} alt={tier}/>
                     </td>
                     <td className={`App-leaderboard-data-cell App-leaderboard-left-aligned-cell App-leaderboard-data-cell-${lowerCaseRace}`}>{battleTagName}</td>
                     <td className={`App-leaderboard-data-cell App-leaderboard-centre-aligned-cell App-leaderboard-data-cell-${lowerCaseRace}`}>
                        {this.renderIcon(race)}
                     </td>
                     <td className={`App-leaderboard-data-cell App-leaderboard-right-aligned-cell App-leaderboard-data-cell-${lowerCaseRace}`}>{mmr}</td>
                     <td className={`App-leaderboard-data-cell App-leaderboard-centre-aligned-cell App-leaderboard-data-cell-${lowerCaseRace}`}>{percentile}</td>
                  </tr>
                })
              }
            </FlipMove>
          </table>

        </div>

      </div>
    );
  }
}

export default App;
