export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const FILTER_DATA = 'FILTER_DATA'

export const filter = filterData =>({
	type: FILTER_DATA,
	filterData
});

export const requestPosts = filterData => ({
	type: REQUEST_POSTS,
	filterData
});

export const receivePosts = (filterData, json) => ({
	type: RECEIVE_POSTS,
	filterData,
	posts: json.data.map(csvObj => csvObj),
	receivedAt: Date.now()
})

const fetchPosts = filterData => dispatch => {
	// dispatch(requestPosts(filterData));

	return fetch(`http://localhost:4000/csv?filename=nmvc`,{method:'GET',mode:'no-cors'})
	.then(response => {
		console.log(response.json())
		return response.json();
	})
	.then(json => dispatch(receivePosts(filterData, json))).catch(function(err){
		console.log(err);
	});
}

const shouldFetchPosts = (state) => {
	if (!state.isFetching) {
		return true;
	}
}

export const fetchPostsIfNeeded = filterData => (dispatch, getState) => {
	if (shouldFetchPosts(getState())) {
		return dispatch(fetchPosts(filterData))
	}
}
