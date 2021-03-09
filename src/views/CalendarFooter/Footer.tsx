import * as React from 'react';
import { Table } from 'semantic-ui-react';

import FooterCell from "./FooterCell";

const emptySellStyle = {
  borderTop: '1px solid rgba(34,36,38,.1)',
}

const Footer = ({ onCellClick, setDate }) => {
  const onLocalCellClick = (event, date) => {
    setDate(date.clone().startOf('month'), () => {
      onCellClick(event, { value: date.date().toString() });
    });
  }

  return (
    <Table.Footer>
      <Table.Row>
        <FooterCell
          onClick={onLocalCellClick}
          text="Сегодня"
        />
        <Table.Cell style={emptySellStyle} />
        <FooterCell
          onClick={onLocalCellClick}
          text="Завтра"
        />
      </Table.Row>
    </Table.Footer>
  )
}

export default Footer;
