import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import moment from "moment";

const cellStyle = hovered => ({
  cursor: 'pointer',
  ...(hovered ? { outline: '1px solid #85b7d9' } : {}),
  borderTop: '1px solid rgba(34,36,38,.1)',
})

const FooterCell = ({ text, onClick }) => {
  const [hovered, setHovered] = useState(false)
  const currentDate = moment.utc().startOf('day')

  return (
    <Table.Cell
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={event => {
        const dateToPass = text === 'Сегодня' ? currentDate : currentDate.clone().add(1, 'day');

        onClick(event, dateToPass)
      }}
      style={cellStyle(hovered)}
      colSpan="3"
    >
      {text}
    </Table.Cell>
  )
}

export default FooterCell;
