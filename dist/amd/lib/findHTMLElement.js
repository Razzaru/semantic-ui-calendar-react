var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "react-dom"], function (require, exports, ReactDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ReactDOM = __importStar(ReactDOM);
    function findHTMLElement(e) {
        var el = ReactDOM.findDOMNode(e);
        if (el && el.focus) {
            return el;
        }
        return undefined;
    }
    exports.default = findHTMLElement;
});
