var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import moment from "moment";
var cellStyle = function (hovered) { return (__assign({ cursor: 'pointer' }, (hovered ? { outline: '1px solid #85b7d9' } : {}), { borderTop: '1px solid rgba(34,36,38,.1)' })); };
var FooterCell = function (_a) {
    var text = _a.text, onClick = _a.onClick;
    var _b = useState(false), hovered = _b[0], setHovered = _b[1];
    var currentDate = moment.utc().startOf('day');
    return (React.createElement(Table.Cell, { onMouseEnter: function () { return setHovered(true); }, onMouseLeave: function () { return setHovered(false); }, onClick: function (event) { return onClick(event, text === 'Сегодня' ? currentDate.date() : currentDate.clone().add(1, 'day').date()); }, style: cellStyle(hovered), colSpan: "3" }, text));
};
export default FooterCell;
