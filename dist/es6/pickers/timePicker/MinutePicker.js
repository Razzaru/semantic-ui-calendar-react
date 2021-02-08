var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import range from 'lodash/range';
import isArray from 'lodash/isArray';
import concat from 'lodash/concat';
import uniq from 'lodash/uniq';
import sortBy from 'lodash/sortBy';
import * as React from 'react';
import MinuteView from '../../views/MinuteView';
import { SingleSelectionPicker, } from '../BasePicker';
import { buildTimeStringWithSuffix, getCurrentDate, isNextPageAvailable, isPrevPageAvailable, } from './sharedFunctions';
var MINUTES_STEP = 5;
var MINUTES_ON_PAGE = 12;
var PAGE_WIDTH = 3;
var MinutePicker = /** @class */ (function (_super) {
    __extends(MinutePicker, _super);
    function MinutePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (e, _a) {
            var value = _a.value;
            var data = __assign({}, _this.props, { value: {
                    year: _this.state.date.year(),
                    month: _this.state.date.month(),
                    date: _this.state.date.date(),
                    hour: _this.state.date.hour(),
                    minute: _this.buildCalendarValues().indexOf(value) * MINUTES_STEP,
                } });
            _this.props.onChange(e, data);
        };
        _this.switchToNextPage = function (e, data, callback) {
            _this.setState(function (_a) {
                var date = _a.date;
                var nextDate = date.clone();
                nextDate.add(1, 'day');
                return { date: nextDate };
            }, callback);
        };
        _this.switchToPrevPage = function (e, data, callback) {
            _this.setState(function (_a) {
                var date = _a.date;
                var prevDate = date.clone();
                prevDate.subtract(1, 'day');
                return { date: prevDate };
            }, callback);
        };
        _this.PAGE_WIDTH = PAGE_WIDTH;
        return _this;
    }
    MinutePicker.prototype.render = function () {
        var _a = this.props, onChange = _a.onChange, value = _a.value, initializeWith = _a.initializeWith, closePopup = _a.closePopup, inline = _a.inline, isPickerInFocus = _a.isPickerInFocus, isTriggerInFocus = _a.isTriggerInFocus, onCalendarViewMount = _a.onCalendarViewMount, minDate = _a.minDate, maxDate = _a.maxDate, disable = _a.disable, timeFormat = _a.timeFormat, localization = _a.localization, rest = __rest(_a, ["onChange", "value", "initializeWith", "closePopup", "inline", "isPickerInFocus", "isTriggerInFocus", "onCalendarViewMount", "minDate", "maxDate", "disable", "timeFormat", "localization"]);
        return (React.createElement(MinuteView, __assign({}, rest, { values: this.buildCalendarValues(), onNextPageBtnClick: this.switchToNextPage, onPrevPageBtnClick: this.switchToPrevPage, onValueClick: this.handleChange, hoveredItemIndex: this.state.hoveredCellPosition, onCellHover: this.onHoveredCellPositionChange, onBlur: this.handleBlur, inline: this.props.inline, onMount: this.props.onCalendarViewMount, hasNextPage: this.isNextPageAvailable(), hasPrevPage: this.isPrevPageAvailable(), disabledItemIndexes: this.getDisabledPositions(), currentHeadingValue: this.getCurrentDate(), activeItemIndex: this.getActiveCellPosition(), localization: localization })));
    };
    MinutePicker.prototype.getCurrentDate = function () {
        /* Return currently selected month, date and year(string) to display in calendar header. */
        return getCurrentDate(this.state.date);
    };
    MinutePicker.prototype.buildCalendarValues = function () {
        var _this = this;
        /*
          Return array of minutes (strings) like ['16:15', '16:20', ...]
          that used to populate calendar's page.
        */
        var hour = this.state.date.hour() < 10
            ? '0' + this.state.date.hour().toString()
            : this.state.date.hour().toString();
        return range(0, 60, MINUTES_STEP)
            .map(function (minute) { return "" + (minute < 10 ? '0' : '') + minute; })
            .map(function (minute) { return buildTimeStringWithSuffix(hour, minute, _this.props.timeFormat); });
    };
    MinutePicker.prototype.getSelectableCellPositions = function () {
        var disabled = this.getDisabledPositions();
        var all = range(0, MINUTES_ON_PAGE);
        if (disabled) {
            return all.filter(function (pos) {
                return disabled.indexOf(pos) < 0;
            });
        }
        return all;
    };
    MinutePicker.prototype.getInitialDatePosition = function () {
        var selectable = this.getSelectableCellPositions();
        if (selectable.indexOf(getMinuteCellPosition(this.state.date.minute())) < 0) {
            return selectable[0];
        }
        return getMinuteCellPosition(this.state.date.minute());
    };
    MinutePicker.prototype.getDisabledPositions = function () {
        var _this = this;
        var _a = this.props, disable = _a.disable, minDate = _a.minDate, maxDate = _a.maxDate;
        var disabledByDisable = [];
        var disabledByMaxDate = [];
        var disabledByMinDate = [];
        if (isArray(disable)) {
            disabledByDisable = concat(disabledByDisable, disable.filter(function (date) { return date.isSame(_this.state.date, 'day'); })
                .map(function (date) { return getMinuteCellPosition(date.minute()); }));
        }
        if (minDate) {
            if (minDate.isSame(this.state.date, 'hour')) {
                disabledByMinDate = concat(disabledByMinDate, range(0, minDate.minute()).map(function (m) { return getMinuteCellPosition(m); }));
            }
        }
        if (maxDate) {
            if (maxDate.isSame(this.state.date, 'hour')) {
                disabledByMaxDate = concat(disabledByMaxDate, range(maxDate.minute() + MINUTES_STEP, 60).map(function (m) { return getMinuteCellPosition(m); }));
            }
        }
        var result = sortBy(uniq(concat(disabledByDisable, disabledByMaxDate, disabledByMinDate)));
        if (result.length > 0) {
            return result;
        }
    };
    MinutePicker.prototype.getActiveCellPosition = function () {
        /*
          Return position of a minute that should be displayed as active
          (position in array returned by `this.buildCalendarValues`).
        */
        var value = this.props.value;
        if (value && value.isSame(this.state.date, 'date')) {
            return Math.floor(this.props.value.minutes() / MINUTES_STEP);
        }
    };
    MinutePicker.prototype.isNextPageAvailable = function () {
        return isNextPageAvailable(this.state.date, this.props.maxDate);
    };
    MinutePicker.prototype.isPrevPageAvailable = function () {
        return isPrevPageAvailable(this.state.date, this.props.minDate);
    };
    MinutePicker.defaultProps = {
        timeFormat: '24',
    };
    return MinutePicker;
}(SingleSelectionPicker));
function getMinuteCellPosition(minute) {
    return Math.floor(minute / MINUTES_STEP);
}
export default MinutePicker;
