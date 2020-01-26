// import CoverFlow from 'coverflow-react';


// const Albums = () => {
//     const imagesArr = [
//         'img/1.jpg',
//         'img/2.jpg',
//         'img/3.jpg',
//         'img/4.jpg',
//         'img/5.jpg'
//     ];
//     return (
//         <div>
//             {imagesArr}
//         </div>
//     )
// }

// export default Albums;




// import React from 'react';
// import ReactDOM from 'react-dom';
// import Coverflow from 'react-coverflow';
// import { StyleRoot } from 'radium';

// ReactDOM.render(
//   <StyleRoot>
//     <Coverflow
//       displayQuantityOfSide={2}
//       navigation
//       infiniteScroll
//       enableHeading
//       media={{
//         '@media (max-width: 900px)': {
//           width: '600px',
//           height: '300px'
//         },
//         '@media (min-width: 900px)': {
//           width: '960px',
//           height: '600px'
//         }
//       }}
//     >
//       <img src='images/album-1.png' alt='Album one' data-action="https://facebook.github.io/react/"/>
//       <img src='images/album-2.png' alt='Album two' data-action="http://passer.cc"/>
//       <img src='images/album-3.png' alt='Album three' data-action="https://doce.cc/"/>
//       <img src='images/album-4.png' alt='Album four' data-action="http://tw.yahoo.com"/>
//     </Coverflow>
//   </StyleRoot>
//   ,
//   document.querySelector('.example_2')
// );

// import React from 'react';
// import './App.css';
// import Spotify from 'spotify-web-api-js';
// import axios from 'axios'

// const spotifyWebApi = new Spotify();


// class Albums extends React.Component {
//     constructor(){
//         super()
//         const params = this.getHashParams()
//         this.state = {
//             loggedIn: params.access_token ? true : false,
//             item: {
//                 album: {
//                     images: [{url: ""}]
//                 },
//                 name: "",
//                 artists: [{name: ""}]
//             }
//         }
//         if(params.access_token){
//             spotifyWebApi.setAccessToken(params.access_token)
//         }
//     }
//     getHashParams = () => {
//         var hashParams = {};
//         var e, r = /([^&;=]+)=?([^&;]*)/g,
//             q = window.location.hash.substring(1);
//         while ( e = r.exec(q)) {
//            hashParams[e[1]] = decodeURIComponent(e[2]);
//         }
//         return hashParams;
//       }

//       fetchAlbum = () => {
//         spotifyWebApi.getAlbum()
//         .then((response) => {
//             this.setState({
//                 item: response.item
//             })
//         })
//       }


//     render(){
//         return (
//             <div>

//             </div>
//         )
//     }
// }