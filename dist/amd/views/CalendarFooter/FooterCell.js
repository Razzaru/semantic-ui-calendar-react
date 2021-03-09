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
define(["require", "exports", "react", "semantic-ui-react", "moment"], function (require, exports, react_1, semantic_ui_react_1, moment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importStar(react_1);
    moment_1 = __importDefault(moment_1);
    var cellStyle = function (hovered) { return (__assign({ cursor: 'pointer' }, (hovered ? { outline: '1px solid #85b7d9' } : {}), { borderTop: '1px solid rgba(34,36,38,.1)' })); };
    var FooterCell = function (_a) {
        var text = _a.text, onClick = _a.onClick;
        var _b = react_1.useState(false), hovered = _b[0], setHovered = _b[1];
        var currentDate = moment_1.default.utc().startOf('day');
        return (react_1.default.createElement(semantic_ui_react_1.Table.Cell, { onMouseEnter: function () { return setHovered(true); }, onMouseLeave: function () { return setHovered(false); }, onClick: function (event) {
                var dateToPass = text === 'Сегодня' ? currentDate : currentDate.clone().add(1, 'day');
                onClick(event, dateToPass);
            }, style: cellStyle(hovered), colSpan: "3" }, text));
    };
    exports.default = FooterCell;
});
