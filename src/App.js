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

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			artistNames: ['Nobuo Uematsu', 'Akira Yamaoka', 'Andrew Hale'],
			artistInfo: [],
			topTracks: []
		}
		// Use to bind functions
	}

	// Get Basic Info
	// Loop through names array
	// Get Data based on each name
	// Save the ID, other information we might need
	// Top Tracks
	// Pass artist id into request
	// Render Tracks as a grid
	// Name 1
	// Gird
	// Name 2
	// Grid
	// Name 3
	// Gird
	// Name 4
	// Grid
	// Runs after render();


	componentDidMount() {
	
		console.log("starting loop")

		for (let i = 0; i < this.state.artistNames.length; i++) {
			let name = this.state.artistNames[i]
			// Make a request for a user with a given ID
			let artistInfoCopy = this.state.artistInfo; //copy
			let topTracksCopy = this.state.topTracks;


			let $this = this; //need to keep context of the this 

			axios({
				method: 'get',
				url: `https://spotify-api-wrapper.appspot.com/artist/${name}`,
			})
				.then(function (response) {
					// handle success
					let obj = {}
					console.log('data', response);
					var id = response.data.artists.items[0].id;
					var name = response.data.artists.items[0].name;

					obj.name = name;
					obj.id = id;

					artistInfoCopy.push(obj)

					$this.setState({
						artistInfo: artistInfoCopy
					})

					console.log('looping through artist info for id')
					if ($this.state.artistInfo.length === 3) {
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

	render() {
		console.log("state:", this.state)

		console.log('this.state.topTracks BEFORE', this.state.topTracks)

		if (this.state.topTracks.length > 0) {
			return (
				<GridContainer>
					{
						this.state.topTracks.map(obj => {
							console.log("obj", obj)
							return obj.tracks.map(track => {
								
								var imgUrl = track.album.images[0].url;
								var name = track.artists[0].name;
								
								return (
									<GridItem>
										<a href={track.external_urls.spotify}><p>{name}</p></a>
										<div>
											<img src={imgUrl}/>
										</div>
									</GridItem>
								)
							})
						})
					}
        </GridContainer>
			)
		} 
		return (
			<div>
				Loading..
			</div>
		)
	}
}
export default App;