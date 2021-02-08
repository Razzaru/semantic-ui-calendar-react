import * as React from 'react';
import { Table } from 'semantic-ui-react';
import FooterCell from "./FooterCell";
var emptySellStyle = {
    borderTop: '1px solid rgba(34,36,38,.1)',
};
var Footer = function (_a) {
    var onCellClick = _a.onCellClick;
    var onLocalCellClick = function (event, itemPosition) {
        onCellClick(event, { value: itemPosition.toString() });
    };
    return (React.createElement(Table.Footer, null,
        React.createElement(Table.Row, null,
            React.createElement(FooterCell, { onClick: onLocalCellClick, text: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F" }),
            React.createElement(Table.Cell, { style: emptySellStyle }),
            React.createElement(FooterCell, { onClick: onLocalCellClick, text: "\u0417\u0430\u0432\u0442\u0440\u0430" }))));
};
export default Footer;
