import React from 'react';
import PropTypes from 'prop-types';

class TicketsList extends React.Component {

  render() {
    return (
      <div>
        Aucun ticket !! :D
      </div>
    );
  }

}

TicketsList.propTypes = {
  data: PropTypes.array
};

export default TicketsList;
