import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'





const spotifyWebApi = new Spotify();

class App extends React.Component {
  constructor(){
    super()
    const params = this.getHashParams()
    console.log('PARAMS!!!', params)
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        image: ''
      },
      singleAlbum: {
        // album_type: '',
        // artists: [],
        id: '',
        images: '',
        name: '',
        // uri: ''
      }
    }
    if(params.access_token){
      console.log("params.access_token", params.access_token)
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }
  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  
  getNowPlaying = () => {
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })
  }

  // fetchAlbum = (albumId ='5rsJCTSppss2cccM8a9V0u') => {
  //   spotifyWebApi.getAlbum()
  //   .then((response) => {
  //     this.setState({
  //       singleAlbum: {
  //         id: albumId,
  //         name: response.item.name,
  //         image: response.item.album.images[0].url
  //       }
  //     })
  //   })
  // }

  fetchAlbum = async (albumId = '5rsJCTSppss2cccM8a9V0u') => {
    try{
      let res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`)
      let data = await res.json()
      console.log('DATA', data)
      return data
    }catch(error){
      console.log('ERROR')
    }
  }


  // The ids of the albums. If you know their Spotify URI it is easy to find their album id (e.g. spotify:album:<here_is_the_album_id>)
  // Fetches multiple albums from the Spotify catalog. See Get Several Albums on the Spotify Developer site for more information about the endpoint.
  // https://api.spotify.com/v1/albums/{id}

  // fetchAlbum = (albumId = '4tZwfgrHOc3mvqYlEYSvVi') => {
  //   spotifyWebApi.getAlbum(albumId)
  //   .then((response) => {
  //     this.setState({
  //       album: {
  //         album_type: '',
  //         artists: [],
  //         id: '',
  //         images: '',
  //         name: '',
  //         uri: ''
  //       }
  //     })
  //   })
  // }

  // fetchAlbums = async(albumId = '4tZwfgrHOc3mvqYlEYSvVi', callback) => {
  //   try{
  //    const res = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`)
  //     callback(res)
  //   }catch(error){
  //     console.log('ERROR')
  //   }
  // }






  render(){
    return (
      <div className="App">
        <div className ='Title'>
          <h1>Juke Player One</h1>
            </div>
            <h2>START HERE</h2>
            <div className ='Instructions'>
              <h3>>Choose your favorite game.</h3>
              <h3>>Pick your soundtrack.</h3>
              <h3>>Stream a song.</h3>
            </div>
            {/* <div>{this.fetchAlbum()}</div> */}
        <a href='http://localhost:8888'>
       <button>Login with Spotify</button>
       </a>
       <div>Now Playing {this.state.nowPlaying.name}</div>
       <div>
         <img src= {this.state.nowPlaying.image} style={{width: 100}}/>
       </div>
       {this.state.loggedIn &&
       <button onClick={() => this.getNowPlaying()}>
         Check Now Playing
       </button>
        }
      </div>
    );
  }
}

export default App;
