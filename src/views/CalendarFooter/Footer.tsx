import * as React from 'react';
import { Table } from 'semantic-ui-react';

import FooterCell from "./FooterCell";

const emptySellStyle = {
  borderTop: '1px solid rgba(34,36,38,.1)',
}

const Footer = ({ onCellClick }) => {
  const onLocalCellClick = (event, itemPosition) => {
    onCellClick(event, { value: itemPosition.toString() });
  }

  return (
    <Table.Footer>
      <Table.Row>
        <FooterCell onClick={onLocalCellClick} text="Сегодня"/>
        <Table.Cell style={emptySellStyle} />
        <FooterCell onClick={onLocalCellClick} text="Завтра"/>
      </Table.Row>
    </Table.Footer>
  )
}

export default Footer;
