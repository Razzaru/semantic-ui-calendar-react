"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var semantic_ui_react_1 = require("semantic-ui-react");
var FooterCell_1 = __importDefault(require("./FooterCell"));
var emptySellStyle = {
    borderTop: '1px solid rgba(34,36,38,.1)',
};
var Footer = function (_a) {
    var onCellClick = _a.onCellClick, setDate = _a.setDate;
    var onLocalCellClick = function (event, date) {
        setDate(date.clone().startOf('month'), function () {
            onCellClick(event, { value: date.date().toString() });
        });
    };
    return (React.createElement(semantic_ui_react_1.Table.Footer, null,
        React.createElement(semantic_ui_react_1.Table.Row, null,
            React.createElement(FooterCell_1.default, { onClick: onLocalCellClick, text: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F" }),
            React.createElement(semantic_ui_react_1.Table.Cell, { style: emptySellStyle }),
            React.createElement(FooterCell_1.default, { onClick: onLocalCellClick, text: "\u0417\u0430\u0432\u0442\u0440\u0430" }))));
};
exports.default = Footer;
