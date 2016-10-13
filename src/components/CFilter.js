import React, {PropTypes} from 'react'

const CFilter = ({datetime,onClick,selected}) => (
<div>
	<p>
		<label>日期: <input type="datetime-local" defaultValue={datetime} /></label>
	</p>
	<p>
	<label>
			伤亡人数: 
			<select defaultValue={selected} >
				<option value="gt37" >大于37人</option>
				<option value="lte37" >小于等于37人</option>
			</select>
			</label>
	</p>
	<p>
		<button onClick={e=>onClick(e)}>过滤</button>
	</p>
</div>

);

CFilter.propTypes ={
	datetime:PropTypes.string.isRequired,
	selected:PropTypes.string.isRequired,
	onClick:PropTypes.func.isRequired
};

export default CFilter


