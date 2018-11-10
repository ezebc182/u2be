import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
import YTSearch from 'youtube-api-search';

const API_KEY = '<your-api-key>';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		}

		this.videoSearch('angkor wat');
	}

	videoSearch(term) {
		YTSearch({ key: API_KEY, term }, (videos) => {
			this.setState({ videos, selectedVideo: videos[0] });
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 300);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<div className="row">
					<VideoDetail video={this.state.selectedVideo} />
					<VideoList onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
						videos={this.state.videos} />
				</div>
				
			</div>
		);
	}
}

ReactDOM.render( < App /> , document.querySelector('.container'));