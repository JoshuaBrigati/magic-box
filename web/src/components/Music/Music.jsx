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
        thisHolder.setState({
          // currentUserId:
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

  getRefreshedSongData() {
    axios
      .get('/music')
      .then((response) => {
        console.log('I am the response from the getRefreshedSongData method => ', response);
        this.setState({
          songsArray: response.data,
          upVoteCount: response.data.upvotes,
          downVoteCount: response.data.downvotes,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  postVoteData(voteType, vote) {
    return axios
      .post('/votes', { voteType, vote })
      .then((res) => {
        console.log('I made it to the postVoteData method and here is the result => ', res);
        res.send(res);
      })
      .catch((err) => {
        throw err;
      });
  }

  upVote(user, song) {
    const voteType = 'upvote';
    const clickedSongId = song.id;
    const currentUserId = this.state.userId;
    console.log('this is the song in the upvote method => ', song);
    axios
      .get('/votes', { params: { clickedSongId, currentUserId } })
      .then((vote) => {
        const voteData = vote.data;
        return voteData;
      })
      .then((voteData) => {
        console.log('voteData => ', voteData);
        this.postVoteData(voteType, voteData);
      })
      .then(() => {
        this.getRefreshedSongData();
      })
      .catch((error) => {
        throw error;
      });
  }

  downVote(user, song) {
    const voteType = 'downvote';
    const clickedSongId = song.id;
    const currentUserId = this.state.userId;
    console.log('this is the song in the upvote method => ', song);
    axios
      .get('/votes', { params: { clickedSongId, currentUserId } })
      .then((vote) => {
        const voteData = vote.data;
        return voteData;
      })
      .then((voteData) => {
        console.log('voteData => ', voteData);
        this.postVoteData(voteType, voteData);
      })
      .then(() => {
        this.getRefreshedSongData();
      })
      .catch((error) => {
        throw error;
      });
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
