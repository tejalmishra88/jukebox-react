import { Component } from "react"

export default class AudioPlayer extends Component {
  state = {
    status: "paused",
    currentTime: 0,
    duration: 0
  }

  audioElement = null

  componentDidMount() {
    this.loadAudio(this.props.audioURL)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.audioURL !== this.props.audioURL) {
      this.stopAudio()
      this.loadAudio(this.props.audioURL)
    }
  }

  componentWillUnmount() {
    this.stopAudio()
  }

  loadAudio = (url) => {
    this.audioElement = new Audio(url)
    this.audioElement.addEventListener("loadedmetadata", () => {
      if (this.audioElement) {
        this.setState({ duration: this.audioElement.duration })
      }
    })
    this.audioElement.addEventListener("timeupdate", () => {
      if (this.audioElement) {
        this.setState({ currentTime: this.audioElement.currentTime })
      }
    })
    this.audioElement.addEventListener("ended", () => {
      this.setState({ status: "finished" })
    })
    this.audioElement.autoplay = true
    this.setState({ status: "playing" })
  };

  stopAudio = () => {
    if (this.audioElement) {
      this.audioElement.pause()
      this.audioElement = null
      this.setState({ status: "paused", currentTime: 0 })
    }
  };

  togglePlayback = () => {
    if (this.state.status === "playing") {
      this.audioElement.pause()
      this.setState({ status: "paused" })
    } else {
      this.audioElement.play()
      this.setState({ status: "playing" })
    }
  }

  handleSeek = (e) => {
    const time = e.target.value
    console.log('handleseek---time-',time)
    if (this.audioElement) {
      this.audioElement.currentTime = time
      this.setState({
        currentTime: time
      })
    }
  }

  render() {
    const { audioURL } = this.props
    const { status, currentTime, duration } = this.state
    console.log('this.state--',this.state)
    return (
      <div>
        <p>Playing {audioURL}</p>
        <button onClick={this.togglePlayback}>
          {status === "playing" ? "Pause" : "Play"}
        </button>
        {status === "finished" ? (  <span style={{paddingLeft: '10px'}}>Finished</span>)
        : (
        <span style={{paddingLeft: '10px'}}>
          {Math.floor(currentTime * 100) / 100} seconds / {Math.floor(duration * 100) / 100} seconds
        </span>
        )}
        <br />
        <input type="range" min={0} max={`${duration}`} value={currentTime}  onChange={this.handleSeek}/>
      </div>
    );
  }
}
