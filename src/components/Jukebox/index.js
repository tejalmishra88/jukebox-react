import { Component } from 'react'

import AudioPlayer from '../AudioPlayer'

export default class Jukebox extends Component {
  state = {
    song: '',
    displayAudioPlayer: false,
  }

  chooseSong = (song) => {
    this.setState({ song })
    this.setState({ displayAudioPlayer: true })
  }

  handleDisplayPlayer = () => {
    this.setState({ displayAudioPlayer: !this.state.displayAudioPlayer })
  }

  render() {
    return (
      <div>
        <h1>Jukebox</h1>
        {this.state.displayAudioPlayer && (
          <p>
            <button onClick={this.handleDisplayPlayer}>
              Disable Audio Player
            </button>
          </p>
        )}

        <span>Play song: </span>
        <button
          style={{ marginRight: 10 }}
          onClick={() => this.chooseSong('/songs/fantasy-classical.mp3')}
        >
          Fantasy Classical
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => this.chooseSong('/songs/gates-of-heaven.mp3')}
        >
          Gates of Heaven
        </button>
        <button
          style={{ marginRight: 10 }}
          onClick={() => this.chooseSong('/songs/grand-orchestra.mp3')}
        >
          Grand Orchestra
        </button>
        <button onClick={() => this.chooseSong('/songs/piano-song.mp3')}>
          Piano Song
        </button>

        {this.state.displayAudioPlayer ? (
          <AudioPlayer audioURL={this.state.song} />
        ) : (
          <p>Audio Player disabled!!</p>
        )}
      </div>
    )
  }
}
