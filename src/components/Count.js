import React from "react";
import { connect } from "dva";

const Count = ({ count, dispatch }) => {
  // console.log(count)
  
  let add = function(){
    dispatch({type:'count/add'});
  }

  return (
    <div>
      Example
      <p>record:{count.record}</p>
      <p>current:{count.current}</p>
      <button onClick={ add }>add</button>
    </div>
  );
};

Count.propTypes = {};

function mapStateToProps(state) {
  return { count: state.count };
}

export default connect(mapStateToProps)(Count);
