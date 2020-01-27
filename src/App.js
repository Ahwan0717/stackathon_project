import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import styled from 'styled-components';



const spotifyWebApi = new Spotify();


const GridContainer = styled.div`
	/* ... */
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

`;

const GridItem = styled.div`
	/* ... */
	display: flex;
	flex-direction: column;

	width: 200px;
	height: 200px;

	padding: 1rem;

	img {
		width: 100%;
		height: 100%;
	}

	a {
		display: block;
		margin: 0;
	}

	div {
		margin: 0;
	}

`
const Title = styled.h1`
/* ... */
font-size: 1.5em;
text-align: center;
color: palevioletred;

`

class App extends React.Component {
	constructor() {
		super()
		const params = this.getHashParams()

		this.state = {
			artistNames: ['Nobuo Uematsu', 'Akira Yamaoka', 'Andrew Hale', 'Koji Kondo', 'Norihiko Hibino', 'Yoko Shimomura'], 
			artistInfo: [],
			topTracks: [],
			loggedIn : params.access_token ? true : false,
			nowPlaying: {
				name: 'Not Checked',
				image: ''
			}
		}
		// Use to bind functions
		if(params.access_token){
			spotifyWebApi.setAccessToken(params.access_token)
		}
	}

	getHashParams = () => {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		while (e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		console.log("hashParams", hashParams)
		return hashParams;
	}


	// Get Basic Info

	componentDidMount() {
	
		console.log("starting loop")

			// Loop through names array

		for (let i = 0; i < this.state.artistNames.length; i++) {
			let name = this.state.artistNames[i]
			// Make a request for a user with a given ID
			let artistInfoCopy = this.state.artistInfo; //copy of state
			let topTracksCopy = this.state.topTracks;


			let $this = this; //need to keep context of the this 

				// Get Data based on each name to populate our state: artistInfo 
				// axios get request
				// Pass artist id into request
			axios({
				method: 'get',
				url: `https://spotify-api-wrapper.appspot.com/artist/${name}`,
			})
				.then(function (response) {
					// handle success
					let obj = {}
					console.log('data', response);

						// Save the ID, other information we might need
					var id = response.data.artists.items[0].id;
					var name = response.data.artists.items[0].name;

					obj.name = name;
					obj.id = id;

					artistInfoCopy.push(obj)

					$this.setState({
						artistInfo: artistInfoCopy
					})

					// Top Tracks
					console.log('looping through artist info for id')
					if ($this.state.artistInfo.length > 0) {
						for (let i = 0; i < $this.state.artistInfo.length; i++) {
							let id = $this.state.artistInfo[i].id;
							console.log('id', id)

							axios({
								method: 'get',
								url: `https://spotify-api-wrapper.appspot.com/artist/${id}/top-tracks`
							})
								.then(function (response) {
									var tempobj = {
										id: '',
										tracks: []
									}

									var tracks = response.data.tracks

									tempobj.id = id
									tempobj.tracks = tracks

									topTracksCopy.push(tempobj)
									// console.log('tempobj with data', tempobj)

									$this.setState({
										topTracks: topTracksCopy
									});

								})
								.catch(function (error) {
									// handle error
									console.log(error);
								})

						}
					}

					// console.log('ARTIST INFO', this.state)
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				});
		}

	}


	getNowPlaying = () => {
		spotifyWebApi.getMyCurrentPlaybackState()
			.then((response) => {
				console.log("response")
				this.setState({
					nowPlaying: {
						name: response.item.name,
						image: response.item.album.images[0].url
					}
				})
			})
	}

	// Render Tracks as a grid
	// Name 1
	// Grid
	// Name 2
	// Grid
	// Name 3
	// Grid
	// Name 4
	// Grid
	// Runs after render();



	render() {
		console.log("state:", this.state)

		console.log('this.state.topTracks BEFORE', this.state.topTracks)

		if (this.state.topTracks.length > 0) {
			return (
				
				<GridContainer>

					<Title>
					<div>
					<h1>Video Game Music Library</h1>
					</div>
					</Title>

					{/*
					<h3> Created using Spotify API</h3>
					<p>Discover the artists behind some of your favorite video games.</p>
					 */}


					{
						this.state.topTracks.map(obj => {
							console.log("obj", obj)
							return obj.tracks.map(track => {
								
								var imgUrl = track.album.images[0].url;
								var name = track.artists[0].name;
								
								return (
									<GridItem>
										<a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer"><p>{name}</p></a>
										<div>
											<img src={imgUrl}/>
										</div>
									</GridItem>
								)
							})
						})
					}					
					<div>
						<h3>Play one of these songs on Spotify and see what song is playing!</h3>
						<a href='http://localhost:8888'>
							<button>Login with Spotify</button>
						</a>
						<div>Now Playing {this.state.nowPlaying.name}</div>
						<div>
							<img src={this.state.nowPlaying.image} style={{ width: 100 }} />	
						</div>
						{this.state.loggedIn &&
							<button onClick={() => this.getNowPlaying()}>
								Check Now Playing
							</button>
						}
					</div>
        </GridContainer>

			)
		} 
		return (
			<div>
				Loading...
			</div>
		)
	}
}
export default App;