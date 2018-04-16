import React, { Component } from 'react';
import axios from 'axios';
import SongList from './SongList/SongList.jsx';
import Loading from '../Common/Loading.jsx';
import '../../styles.scss';

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotCreatedSong: true,
      songsArray: [],
      upVoteCount: 0,
      downVoteCount: 0,
      didVote: false,
      userId: 10,
    };
    this.makeMagic = this.makeMagic.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
  }

  componentDidMount() {
    const thisHolder = this;
    axios
      .get('/home')
      .then((response) => {
        console.log('Response: ', response.data);
        thisHolder.setState({
          songsArray: response.data,
          upVoteCount: response.data.upvotes,
          downVoteCount: response.data.downvotes,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  makeMagic() {
    this.setState({ gotCreatedSong: false });
  }

  // getVoteData() {
  //   return axios.get('/votes');
  // }

  postVoteData(vote) {
    axios
      .post('/votes', { vote })
      .then((res) => {
        console.log('successful post to /votes => ', res);
        res.send();
      })
      .catch((err) => {
        throw error;
      });
  }

  upVote(e) {
    let voteData;
    axios
      .get('/votes')
      .then((vote) => {
        voteData = vote.data;
        return voteData;
      })
      .then((data) => {
        this.postVoteData(data);
      })
      .catch((error) => {
        throw error;
      });
  }

  downVote() {
    // console.log(this, 'DownVote');
  }

  render() {
    return (
      <div className="MainDiv">
        <button onClick={this.makeMagic} className="MagicButton">
          Make Magic
        </button>
        <div className="wrapper" />

        {this.state.gotCreatedSong === false ? <Loading /> : null}
        <SongList
          upVoteCount={this.state.upVoteCount}
          downVoteCount={this.state.downVoteCount}
          songsArray={this.state.songsArray}
          upVote={this.upVote}
          downVote={this.downVote}
          didVote={this.didVote}
          userId={this.userId}
        />
      </div>
    );
  }
}

export default Music;
