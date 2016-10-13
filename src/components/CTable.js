import React, { PropTypes } from 'react'




const CTable = ({posts,filterData}) => (
	<table className="CTable">
	<thead>
	<tr><th>日期</th><th>时间</th><th>坐标</th><th>发生地</th><th>受伤人数</th><th>死亡人数</th></tr>
	</thead>
	<tbody>{
		posts.map((post, i) => {

			var date = new Date(this.DATE+' ' +this.TIME);
			var curDatetime = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'T'
			+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();

			var expr = filterData.selected ==='gt37'?
			(this.NUMBER_OF_PERSONS_INJURED>37):(this.NUMBER_OF_PERSONS_INJURED <=37);
			if(filterData.datetime == curDatetime && expr){
				<tr> key={i}>
				<td>{post.DATE}</td>
				<td>{post.TIME}</td>
				<td>{post.LOCATION}</td>
				<td>{post.NUMBER_OF_PERSONS_INJURED}</td>
				<td>{post.NUMBER_OF_PERSONS_KILLED}</td>
				</tr>
			}

		})
	}
	</tbody>
	</table>
	);

CTable.propTypes = {
	posts: PropTypes.array.isRequired
}

export default CTable
