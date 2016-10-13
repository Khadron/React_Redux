import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { filter, fetchPostsIfNeeded } from '../actions'
import CFilter from '../components/CFilter'
import CTable from '../components/CTable'
import PubSub from '../PubSub'


class App extends Component {
  static propTypes = {
    filterData: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    console.log(this.pubSub = new PubSub());
    // this.pubSub.on('hehe',function (){alert('hehe');});
  }

  componentDidMount() {
  	const { dispatch,filterData } = this.props
    dispatch(fetchPostsIfNeeded(filterData))
  }

  componentWillReceiveProps(nextProps) {

    const { dispatch, filterData } = nextProps
    dispatch(fetchPostsIfNeeded(filter))

  }

  handleClick = (selected,datetime) => {

    var filterData=this.state.filterData;
    this.setState({filterData:{selected:filterData.selected,datetime:filterData.datetime}});
    // this.pubSub.emit('hehe');
  }

  render() {
    const { filterData, posts,isFetching }= this.props
    const isEmpty = posts.length === 0
    return (
      <div>
      <CFilter selected={filterData.selected}
      onClick={this.handleClick}
      datetime={filterData.datetime} />
      {isEmpty ? 
        (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
        : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
        <CTable posts={posts} />
        </div>
      }
      </div>
      )
  }
}

const mapStateToProps = state => {
  const {postsByFilter} = state
  const {
    isFetching,
    lastUpdated,
    items: posts,
    filterData
  } = postsByFilter || {
    isFetching: true,
    items: []
  }

  return {
    filterData,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
