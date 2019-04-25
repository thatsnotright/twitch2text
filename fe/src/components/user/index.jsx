import React from 'react';
import PropTypes from 'prop-types';


const User = ({ description, display_name, profile_image_url }) => {
  return (
    <div className="task">
      <div className='row'>
        <div className="col-4">{display_name}</div>
        <div className="col-2">{description}</div>
        <div className="col-2"><img src={profile_image_url} /></div>
        <div className="col-2"></div>
        <div className="col-2">
        </div>
      </div>
    </div>
  )
}

User.propTypes = {
  description: PropTypes.string,

};

export default User;