(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ionic/angular'), require('moment'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ion2-calendar', ['exports', '@angular/core', '@ionic/angular', 'moment', '@angular/forms', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ion2-calendar'] = {}, global.ng.core, global.angular, global.moment, global.ng.forms, global.ng.common));
}(this, (function (exports, core, angular, moment, forms, common) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var moment__namespace = /*#__PURE__*/_interopNamespace(moment);

    var CalendarMonth = /** @class */ (function () {
        function CalendarMonth() {
        }
        return CalendarMonth;
    }());
    var CalendarResult = /** @class */ (function () {
        function CalendarResult() {
        }
        return CalendarResult;
    }());
    var CalendarComponentMonthChange = /** @class */ (function () {
        function CalendarComponentMonthChange() {
        }
        return CalendarComponentMonthChange;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __createBinding(o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (p !== "default" && !exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var defaults = {
        DATE_FORMAT: 'YYYY-MM-DD',
        COLOR: 'primary',
        WEEKS_FORMAT: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        MONTH_FORMAT: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    };
    var pickModes = {
        SINGLE: 'single',
        RANGE: 'range',
        MULTI: 'multi'
    };

    var DEFAULT_CALENDAR_OPTIONS = new core.InjectionToken('DEFAULT_CALENDAR_MODAL_OPTIONS');

    var isBoolean = function (input) { return input === true || input === false; };
    var ɵ0 = isBoolean;
    var CalendarService = /** @class */ (function () {
        function CalendarService(defaultOpts) {
            this.defaultOpts = defaultOpts;
        }
        Object.defineProperty(CalendarService.prototype, "DEFAULT_STEP", {
            get: function () {
                return 12;
            },
            enumerable: false,
            configurable: true
        });
        CalendarService.prototype.safeOpt = function (calendarOptions) {
            if (calendarOptions === void 0) { calendarOptions = {}; }
            var _disableWeeks = [];
            var _daysConfig = [];
            var _a = Object.assign(Object.assign({}, this.defaultOpts), calendarOptions), _b = _a.from, from = _b === void 0 ? new Date() : _b, _c = _a.to, to = _c === void 0 ? 0 : _c, _d = _a.weekStart, weekStart = _d === void 0 ? 0 : _d, _e = _a.step, step = _e === void 0 ? this.DEFAULT_STEP : _e, _f = _a.id, id = _f === void 0 ? '' : _f, _g = _a.cssClass, cssClass = _g === void 0 ? '' : _g, _h = _a.closeLabel, closeLabel = _h === void 0 ? 'CANCEL' : _h, _j = _a.doneLabel, doneLabel = _j === void 0 ? 'DONE' : _j, _k = _a.monthFormat, monthFormat = _k === void 0 ? 'MMM YYYY' : _k, _l = _a.title, title = _l === void 0 ? 'CALENDAR' : _l, _m = _a.defaultTitle, defaultTitle = _m === void 0 ? '' : _m, _o = _a.defaultSubtitle, defaultSubtitle = _o === void 0 ? '' : _o, _p = _a.autoDone, autoDone = _p === void 0 ? false : _p, _q = _a.canBackwardsSelected, canBackwardsSelected = _q === void 0 ? false : _q, _r = _a.closeIcon, closeIcon = _r === void 0 ? false : _r, _s = _a.doneIcon, doneIcon = _s === void 0 ? false : _s, _t = _a.clearIcon, clearIcon = _t === void 0 ? false : _t, _u = _a.showYearPicker, showYearPicker = _u === void 0 ? false : _u, _v = _a.isSaveHistory, isSaveHistory = _v === void 0 ? false : _v, _w = _a.pickMode, pickMode = _w === void 0 ? pickModes.SINGLE : _w, _x = _a.color, color = _x === void 0 ? defaults.COLOR : _x, _y = _a.weekdays, weekdays = _y === void 0 ? defaults.WEEKS_FORMAT : _y, _z = _a.daysConfig, daysConfig = _z === void 0 ? _daysConfig : _z, _0 = _a.disableWeeks, disableWeeks = _0 === void 0 ? _disableWeeks : _0, _1 = _a.showAdjacentMonthDay, showAdjacentMonthDay = _1 === void 0 ? true : _1, _2 = _a.defaultEndDateToStartDate, defaultEndDateToStartDate = _2 === void 0 ? false : _2, _3 = _a.clearLabel, clearLabel = _3 === void 0 ? null : _3;
            return {
                id: id,
                from: from,
                to: to,
                pickMode: pickMode,
                autoDone: autoDone,
                color: color,
                cssClass: cssClass,
                weekStart: weekStart,
                closeLabel: closeLabel,
                closeIcon: closeIcon,
                doneLabel: doneLabel,
                doneIcon: doneIcon,
                canBackwardsSelected: canBackwardsSelected,
                isSaveHistory: isSaveHistory,
                disableWeeks: disableWeeks,
                monthFormat: monthFormat,
                title: title,
                weekdays: weekdays,
                daysConfig: daysConfig,
                step: step,
                showYearPicker: showYearPicker,
                defaultTitle: defaultTitle,
                defaultSubtitle: defaultSubtitle,
                defaultScrollTo: calendarOptions.defaultScrollTo || from,
                defaultDate: calendarOptions.defaultDate || null,
                defaultDates: calendarOptions.defaultDates || null,
                defaultDateRange: calendarOptions.defaultDateRange || null,
                showAdjacentMonthDay: showAdjacentMonthDay,
                defaultEndDateToStartDate: defaultEndDateToStartDate,
                clearLabel: clearLabel,
                clearIcon: clearIcon,
            };
        };
        CalendarService.prototype.createOriginalCalendar = function (time) {
            var date = new Date(time);
            var year = date.getFullYear();
            var month = date.getMonth();
            var firstWeek = new Date(year, month, 1).getDay();
            var howManyDays = moment__namespace(time).daysInMonth();
            return {
                year: year,
                month: month,
                firstWeek: firstWeek,
                howManyDays: howManyDays,
                time: new Date(year, month, 1).getTime(),
                date: new Date(time),
            };
        };
        CalendarService.prototype.findDayConfig = function (day, opt) {
            if (opt.daysConfig.length <= 0)
                return null;
            return opt.daysConfig.find(function (n) { return day.isSame(n.date, 'day'); });
        };
        CalendarService.prototype.createCalendarDay = function (time, opt, month) {
            var _time = moment__namespace(time);
            var date = moment__namespace(time);
            var isToday = moment__namespace().isSame(_time, 'days');
            var dayConfig = this.findDayConfig(_time, opt);
            var _rangeBeg = moment__namespace(opt.from).valueOf();
            var _rangeEnd = moment__namespace(opt.to).valueOf();
            var isBetween = true;
            var disableWee = opt.disableWeeks.indexOf(_time.toDate().getDay()) !== -1;
            if (_rangeBeg > 0 && _rangeEnd > 0) {
                if (!opt.canBackwardsSelected) {
                    isBetween = !_time.isBetween(_rangeBeg, _rangeEnd, 'days', '[]');
                }
                else {
                    isBetween = moment__namespace(_time).isBefore(_rangeBeg) ? false : isBetween;
                }
            }
            else if (_rangeBeg > 0 && _rangeEnd === 0) {
                if (!opt.canBackwardsSelected) {
                    var _addTime = _time.add(1, 'day');
                    isBetween = !_addTime.isAfter(_rangeBeg);
                }
                else {
                    isBetween = false;
                }
            }
            var _disable = false;
            if (dayConfig && isBoolean(dayConfig.disable)) {
                _disable = dayConfig.disable;
            }
            else {
                _disable = disableWee || isBetween;
            }
            var title = new Date(time).getDate().toString();
            if (dayConfig && dayConfig.title) {
                title = dayConfig.title;
            }
            else if (opt.defaultTitle) {
                title = opt.defaultTitle;
            }
            var subTitle = '';
            if (dayConfig && dayConfig.subTitle) {
                subTitle = dayConfig.subTitle;
            }
            else if (opt.defaultSubtitle) {
                subTitle = opt.defaultSubtitle;
            }
            return {
                time: time,
                isToday: isToday,
                title: title,
                subTitle: subTitle,
                selected: false,
                isLastMonth: date.month() < month,
                isNextMonth: date.month() > month,
                marked: dayConfig ? dayConfig.marked || false : false,
                cssClass: dayConfig ? dayConfig.cssClass || '' : '',
                disable: _disable,
                isFirst: date.date() === 1,
                isLast: date.date() === date.daysInMonth(),
            };
        };
        CalendarService.prototype.createCalendarMonth = function (original, opt) {
            var days = new Array(6).fill(null);
            var len = original.howManyDays;
            for (var i = original.firstWeek; i < len + original.firstWeek; i++) {
                var itemTime = new Date(original.year, original.month, i - original.firstWeek + 1).getTime();
                days[i] = this.createCalendarDay(itemTime, opt);
            }
            var weekStart = opt.weekStart;
            if (weekStart === 1) {
                if (days[0] === null) {
                    days.shift();
                }
                else {
                    days.unshift.apply(days, __spread(new Array(6).fill(null)));
                }
            }
            if (opt.showAdjacentMonthDay) {
                var _booleanMap = days.map(function (e) { return !!e; });
                var thisMonth = moment__namespace(original.time).month();
                var startOffsetIndex = _booleanMap.indexOf(true) - 1;
                var endOffsetIndex = _booleanMap.lastIndexOf(true) + 1;
                for (startOffsetIndex; startOffsetIndex >= 0; startOffsetIndex--) {
                    var dayBefore = moment__namespace(days[startOffsetIndex + 1].time)
                        .clone()
                        .subtract(1, 'd');
                    days[startOffsetIndex] = this.createCalendarDay(dayBefore.valueOf(), opt, thisMonth);
                }
                if (!(_booleanMap.length % 7 === 0 && _booleanMap[_booleanMap.length - 1])) {
                    for (endOffsetIndex; endOffsetIndex < days.length + (endOffsetIndex % 7); endOffsetIndex++) {
                        var dayAfter = moment__namespace(days[endOffsetIndex - 1].time)
                            .clone()
                            .add(1, 'd');
                        days[endOffsetIndex] = this.createCalendarDay(dayAfter.valueOf(), opt, thisMonth);
                    }
                }
            }
            return {
                days: days,
                original: original,
            };
        };
        CalendarService.prototype.createMonthsByPeriod = function (startTime, monthsNum, opt) {
            var _array = [];
            var _start = new Date(startTime);
            var _startMonth = new Date(_start.getFullYear(), _start.getMonth(), 1).getTime();
            for (var i = 0; i < monthsNum; i++) {
                var time = moment__namespace(_startMonth)
                    .add(i, 'M')
                    .valueOf();
                var originalCalendar = this.createOriginalCalendar(time);
                _array.push(this.createCalendarMonth(originalCalendar, opt));
            }
            return _array;
        };
        CalendarService.prototype.wrapResult = function (original, pickMode) {
            var _this = this;
            var result;
            switch (pickMode) {
                case pickModes.SINGLE:
                    result = this.multiFormat(original[0].time);
                    break;
                case pickModes.RANGE:
                    result = {
                        from: this.multiFormat(original[0].time),
                        to: this.multiFormat((original[1] || original[0]).time),
                    };
                    break;
                case pickModes.MULTI:
                    result = original.map(function (e) { return _this.multiFormat(e.time); });
                    break;
                default:
                    result = original;
            }
            return result;
        };
        CalendarService.prototype.multiFormat = function (time) {
            var _moment = moment__namespace(time);
            return {
                time: _moment.valueOf(),
                unix: _moment.unix(),
                dateObj: _moment.toDate(),
                string: _moment.format(defaults.DATE_FORMAT),
                years: _moment.year(),
                months: _moment.month() + 1,
                date: _moment.date(),
            };
        };
        return CalendarService;
    }());
    CalendarService.decorators = [
        { type: core.Injectable }
    ];
    CalendarService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [DEFAULT_CALENDAR_OPTIONS,] }] }
    ]; };

    var NUM_OF_MONTHS_TO_CREATE = 3;
    var CalendarModal = /** @class */ (function () {
        function CalendarModal(_renderer, _elementRef, params, modalCtrl, ref, calSvc) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this.params = params;
            this.modalCtrl = modalCtrl;
            this.ref = ref;
            this.calSvc = calSvc;
            this.ionPage = true;
            this.datesTemp = [null, null];
            this._scrollLock = true;
        }
        CalendarModal.prototype.ngOnInit = function () {
            this.init();
            this.initDefaultDate();
        };
        CalendarModal.prototype.ngAfterViewInit = function () {
            this.findCssClass();
            if (this._d.canBackwardsSelected)
                this.backwardsMonth();
            this.scrollToDefaultDate();
        };
        CalendarModal.prototype.init = function () {
            this._d = this.calSvc.safeOpt(this.options);
            this._d.showAdjacentMonthDay = false;
            this.step = this._d.step;
            if (this.step < this.calSvc.DEFAULT_STEP) {
                this.step = this.calSvc.DEFAULT_STEP;
            }
            this.calendarMonths = this.calSvc.createMonthsByPeriod(moment__namespace(this._d.from).valueOf(), this.findInitMonthNumber(this._d.defaultScrollTo) + this.step, this._d);
        };
        CalendarModal.prototype.initDefaultDate = function () {
            var _this = this;
            var _a = this._d, pickMode = _a.pickMode, defaultDate = _a.defaultDate, defaultDateRange = _a.defaultDateRange, defaultDates = _a.defaultDates;
            switch (pickMode) {
                case pickModes.SINGLE:
                    if (defaultDate) {
                        this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDate), this._d);
                    }
                    break;
                case pickModes.RANGE:
                    if (defaultDateRange) {
                        if (defaultDateRange.from) {
                            this.datesTemp[0] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.from), this._d);
                        }
                        if (defaultDateRange.to) {
                            this.datesTemp[1] = this.calSvc.createCalendarDay(this._getDayTime(defaultDateRange.to), this._d);
                        }
                    }
                    break;
                case pickModes.MULTI:
                    if (defaultDates && defaultDates.length) {
                        this.datesTemp = defaultDates.map(function (e) { return _this.calSvc.createCalendarDay(_this._getDayTime(e), _this._d); });
                    }
                    break;
                default:
                    this.datesTemp = [null, null];
            }
        };
        CalendarModal.prototype.findCssClass = function () {
            var _this = this;
            var cssClass = this._d.cssClass;
            if (cssClass) {
                cssClass.split(' ').forEach(function (_class) {
                    if (_class.trim() !== '')
                        _this._renderer.addClass(_this._elementRef.nativeElement, _class);
                });
            }
        };
        CalendarModal.prototype.onChange = function (data) {
            var _a = this._d, pickMode = _a.pickMode, autoDone = _a.autoDone;
            this.datesTemp = data;
            this.ref.detectChanges();
            if (pickMode !== pickModes.MULTI && autoDone && this.canDone()) {
                this.done();
            }
            this.repaintDOM();
        };
        CalendarModal.prototype.onCancel = function () {
            this.modalCtrl.dismiss(null, 'cancel');
        };
        CalendarModal.prototype.done = function () {
            var pickMode = this._d.pickMode;
            this.modalCtrl.dismiss(this.calSvc.wrapResult(this.datesTemp, pickMode), 'done');
        };
        CalendarModal.prototype.canDone = function () {
            if (!Array.isArray(this.datesTemp)) {
                return false;
            }
            var _a = this._d, pickMode = _a.pickMode, defaultEndDateToStartDate = _a.defaultEndDateToStartDate;
            switch (pickMode) {
                case pickModes.SINGLE:
                    return !!(this.datesTemp[0] && this.datesTemp[0].time);
                case pickModes.RANGE:
                    if (defaultEndDateToStartDate) {
                        return !!(this.datesTemp[0] && this.datesTemp[0].time);
                    }
                    return !!(this.datesTemp[0] && this.datesTemp[1]) && !!(this.datesTemp[0].time && this.datesTemp[1].time);
                case pickModes.MULTI:
                    return this.datesTemp.length > 0 && this.datesTemp.every(function (e) { return !!e && !!e.time; });
                default:
                    return false;
            }
        };
        CalendarModal.prototype.clear = function () {
            this.datesTemp = [null, null];
        };
        CalendarModal.prototype.canClear = function () {
            return !!this.datesTemp[0];
        };
        CalendarModal.prototype.nextMonth = function (event) {
            var _a;
            var len = this.calendarMonths.length;
            var final = this.calendarMonths[len - 1];
            var nextTime = moment__namespace(final.original.time)
                .add(1, 'M')
                .valueOf();
            var rangeEnd = this._d.to ? moment__namespace(this._d.to).subtract(1, 'M') : 0;
            if (len <= 0 || (rangeEnd !== 0 && moment__namespace(final.original.time).isAfter(rangeEnd))) {
                event.target.disabled = true;
                return;
            }
            (_a = this.calendarMonths).push.apply(_a, __spread(this.calSvc.createMonthsByPeriod(nextTime, NUM_OF_MONTHS_TO_CREATE, this._d)));
            event.target.complete();
            this.repaintDOM();
        };
        CalendarModal.prototype.backwardsMonth = function () {
            var _a;
            var first = this.calendarMonths[0];
            if (first.original.time <= 0) {
                this._d.canBackwardsSelected = false;
                return;
            }
            var firstTime = (this.actualFirstTime = moment__namespace(first.original.time)
                .subtract(NUM_OF_MONTHS_TO_CREATE, 'M')
                .valueOf());
            (_a = this.calendarMonths).unshift.apply(_a, __spread(this.calSvc.createMonthsByPeriod(firstTime, NUM_OF_MONTHS_TO_CREATE, this._d)));
            this.ref.detectChanges();
            this.repaintDOM();
        };
        CalendarModal.prototype.scrollToDate = function (date) {
            var _this = this;
            var defaultDateIndex = this.findInitMonthNumber(date);
            var monthElement = this.monthsEle.nativeElement.children["month-" + defaultDateIndex];
            var domElemReadyWaitTime = 300;
            setTimeout(function () {
                var defaultDateMonth = monthElement ? monthElement.offsetTop : 0;
                if (defaultDateIndex !== -1 && defaultDateMonth !== 0) {
                    _this.content.scrollByPoint(0, defaultDateMonth, 128);
                }
            }, domElemReadyWaitTime);
        };
        CalendarModal.prototype.scrollToDefaultDate = function () {
            this.scrollToDate(this._d.defaultScrollTo);
        };
        CalendarModal.prototype.onScroll = function ($event) {
            var _this = this;
            if (!this._d.canBackwardsSelected)
                return;
            var detail = $event.detail;
            if (detail.scrollTop <= 200 && detail.velocityY < 0 && this._scrollLock) {
                this.content.getScrollElement().then(function () {
                    _this._scrollLock = !1;
                    // const heightBeforeMonthPrepend = scrollElem.scrollHeight;
                    _this.backwardsMonth();
                    setTimeout(function () {
                        //  const heightAfterMonthPrepend = scrollElem.scrollHeight;
                        // this.content.scrollByPoint(0, heightAfterMonthPrepend - heightBeforeMonthPrepend, 0).then(() => {
                        _this._scrollLock = !0;
                        // });
                    }, 180);
                });
            }
        };
        /**
         * In some older Safari versions (observed at Mac's Safari 10.0), there is an issue where style updates to
         * shadowRoot descendants don't cause a browser repaint.
         * See for more details: https://github.com/Polymer/polymer/issues/4701
         */
        CalendarModal.prototype.repaintDOM = function () {
            var _this = this;
            return this.content.getScrollElement().then(function (scrollElem) {
                // Update scrollElem to ensure that height of the container changes as Months are appended/prepended
                scrollElem.style.zIndex = '2';
                scrollElem.style.zIndex = 'initial';
                // Update monthsEle to ensure selected state is reflected when tapping on a day
                _this.monthsEle.nativeElement.style.zIndex = '2';
                _this.monthsEle.nativeElement.style.zIndex = 'initial';
            });
        };
        CalendarModal.prototype.findInitMonthNumber = function (date) {
            var startDate = this.actualFirstTime ? moment__namespace(this.actualFirstTime) : moment__namespace(this._d.from);
            var defaultScrollTo = moment__namespace(date);
            var isAfter = defaultScrollTo.isAfter(startDate);
            if (!isAfter)
                return -1;
            if (this.showYearPicker) {
                startDate = moment__namespace(new Date(this.year, 0, 1));
            }
            return defaultScrollTo.diff(startDate, 'month');
        };
        CalendarModal.prototype._getDayTime = function (date) {
            return moment__namespace(moment__namespace(date).format('YYYY-MM-DD')).valueOf();
        };
        CalendarModal.prototype._monthFormat = function (date) {
            return moment__namespace(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
        };
        CalendarModal.prototype.trackByIndex = function (index, momentDate) {
            return momentDate.original ? momentDate.original.time : index;
        };
        return CalendarModal;
    }());
    CalendarModal.decorators = [
        { type: core.Component, args: [{
                    selector: 'ion-calendar-modal',
                    template: "\n    <ion-header>\n      <ion-toolbar [color]=\"_d.color\">\n          <ion-buttons slot=\"start\">\n            <ion-button type='button' slot=\"icon-only\" fill=\"clear\" (click)=\"onCancel()\">\n              <span *ngIf=\"_d.closeLabel !== '' && !_d.closeIcon\">{{ _d.closeLabel }}</span>\n              <ion-icon *ngIf=\"_d.closeIcon\" name=\"close\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n\n          <ion-title>{{ _d.title }}</ion-title>\n\n          <ion-buttons slot=\"end\">\n            <ion-button type='button' slot=\"icon-only\" fill=\"clear\" *ngIf=\"!!_d.clearLabel || !!_d.clearIcon\"\n              [disabled]=\"!canClear()\" (click)=\"clear()\">\n              <span *ngIf=\"_d.clearLabel !== '' && !_d.clearIcon\">{{ _d.clearLabel }}</span>\n              <ion-icon *ngIf=\"_d.clearIcon\" name=\"refresh\"></ion-icon>\n            </ion-button>\n            <ion-button type='button' slot=\"icon-only\" *ngIf=\"!_d.autoDone\" fill=\"clear\" [disabled]=\"!canDone()\" (click)=\"done()\">\n              <span *ngIf=\"_d.doneLabel !== '' && !_d.doneIcon\">{{ _d.doneLabel }}</span>\n              <ion-icon *ngIf=\"_d.doneIcon\" name=\"checkmark\"></ion-icon>\n            </ion-button>\n          </ion-buttons>\n      </ion-toolbar>\n\n      <ng-content select=\"[sub-header]\"></ng-content>\n\n      <ion-calendar-week\n        [color]=\"_d.color\"\n        [weekArray]=\"_d.weekdays\"\n        [weekStart]=\"_d.weekStart\">\n      </ion-calendar-week>\n\n    </ion-header>\n\n    <ion-content (ionScroll)=\"onScroll($event)\" class=\"calendar-page\" [scrollEvents]=\"true\"\n                 [ngClass]=\"{'multi-selection': _d.pickMode === 'multi'}\">\n\n      <div #months>\n        <ng-template ngFor let-month [ngForOf]=\"calendarMonths\" [ngForTrackBy]=\"trackByIndex\" let-i=\"index\">\n          <div class=\"month-box\" [attr.id]=\"'month-' + i\">\n            <h4 class=\"text-center month-title\">{{ _monthFormat(month.original.date) }}</h4>\n            <ion-calendar-month [month]=\"month\"\n                                [pickMode]=\"_d.pickMode\"\n                                [isSaveHistory]=\"_d.isSaveHistory\"\n                                [id]=\"_d.id\"\n                                [color]=\"_d.color\"\n                                (change)=\"onChange($event)\"\n                                [(ngModel)]=\"datesTemp\">\n            </ion-calendar-month>\n          </div>\n        </ng-template>\n\n      </div>\n\n      <ion-infinite-scroll threshold=\"25%\" (ionInfinite)=\"nextMonth($event)\">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n      </ion-infinite-scroll>\n\n    </ion-content>\n  ",
                    styles: [":host ion-select{max-width:unset}:host ion-select .select-icon>.select-icon-inner,:host ion-select .select-text{color:#fff!important}:host ion-select.select-ios{max-width:unset}:host .calendar-page{background-color:#fbfbfb}:host .month-box{border-bottom:1px solid #f1f1f1;display:inline-block;padding-bottom:1em;width:100%}:host h4{color:#929292;display:block;font-size:1.1rem;font-weight:400;margin:1rem 0 0;text-align:center}"]
                },] }
    ];
    CalendarModal.ctorParameters = function () { return [
        { type: core.Renderer2 },
        { type: core.ElementRef },
        { type: angular.NavParams },
        { type: angular.ModalController },
        { type: core.ChangeDetectorRef },
        { type: CalendarService }
    ]; };
    CalendarModal.propDecorators = {
        content: [{ type: core.ViewChild, args: [angular.IonContent,] }],
        monthsEle: [{ type: core.ViewChild, args: ['months',] }],
        ionPage: [{ type: core.HostBinding, args: ['class.ion-page',] }],
        options: [{ type: core.Input }]
    };

    var CalendarWeekComponent = /** @class */ (function () {
        function CalendarWeekComponent() {
            this._weekArray = defaults.WEEKS_FORMAT;
            this._displayWeekArray = this._weekArray;
            this._weekStart = 0;
            this.color = defaults.COLOR;
        }
        Object.defineProperty(CalendarWeekComponent.prototype, "weekArray", {
            set: function (value) {
                if (value && value.length === 7) {
                    this._weekArray = __spread(value);
                    this.adjustSort();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CalendarWeekComponent.prototype, "weekStart", {
            set: function (value) {
                if (value === 0 || value === 1) {
                    this._weekStart = value;
                    this.adjustSort();
                }
            },
            enumerable: false,
            configurable: true
        });
        CalendarWeekComponent.prototype.adjustSort = function () {
            if (this._weekStart === 1) {
                var cacheWeekArray = __spread(this._weekArray);
                cacheWeekArray.push(cacheWeekArray.shift());
                this._displayWeekArray = __spread(cacheWeekArray);
            }
            else if (this._weekStart === 0) {
                this._displayWeekArray = __spread(this._weekArray);
            }
        };
        return CalendarWeekComponent;
    }());
    CalendarWeekComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ion-calendar-week',
                    template: "\n    <ion-toolbar [class]=\"'week-toolbar ' + color\" no-border-top>\n      <ul [class]=\"'week-title ' + color\">\n        <li *ngFor=\"let w of _displayWeekArray\">{{ w }}</li>\n      </ul>\n    </ion-toolbar>\n  ",
                    styles: [":host .toolbar-background-ios,:host .toolbar-background-md{background:transparent}:host .week-toolbar{--padding-bottom:0;--padding-end:0;--padding-start:0;--padding-top:0}:host .week-toolbar.primary{--background:var(--ion-color-primary)}:host .week-toolbar.secondary{--background:var(--ion-color-secondary)}:host .week-toolbar.danger{--background:var(--ion-color-danger)}:host .week-toolbar.dark{--background:var(--ion-color-dark)}:host .week-toolbar.light{--background:var(--ion-color-light)}:host .week-toolbar.transparent{--background:transparent}:host .week-toolbar.toolbar-md{min-height:44px}:host .week-title{color:#fff;font-size:.9em;height:44px;margin:0;padding:15px 0;width:100%}:host .week-title.light,:host .week-title.transparent{color:#9e9e9e}:host .week-title li{display:block;float:left;list-style-type:none;text-align:center;width:14%}:host .week-title li:nth-of-type(7n),:host .week-title li:nth-of-type(7n+1){width:15%}"]
                },] }
    ];
    CalendarWeekComponent.ctorParameters = function () { return []; };
    CalendarWeekComponent.propDecorators = {
        color: [{ type: core.Input }],
        weekArray: [{ type: core.Input }],
        weekStart: [{ type: core.Input }]
    };

    var MONTH_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MonthComponent; }),
        multi: true,
    };
    var MonthComponent = /** @class */ (function () {
        function MonthComponent(ref) {
            this.ref = ref;
            this.componentMode = false;
            this.readonly = false;
            this.color = defaults.COLOR;
            this.change = new core.EventEmitter();
            this.select = new core.EventEmitter();
            this.selectStart = new core.EventEmitter();
            this.selectEnd = new core.EventEmitter();
            this._date = [null, null];
            this._isInit = false;
            this.DAY_DATE_FORMAT = 'MMMM dd, yyyy';
        }
        Object.defineProperty(MonthComponent.prototype, "_isRange", {
            get: function () {
                return this.pickMode === pickModes.RANGE;
            },
            enumerable: false,
            configurable: true
        });
        MonthComponent.prototype.ngAfterViewInit = function () {
            this._isInit = true;
        };
        Object.defineProperty(MonthComponent.prototype, "value", {
            get: function () {
                return this._date;
            },
            enumerable: false,
            configurable: true
        });
        MonthComponent.prototype.writeValue = function (obj) {
            if (Array.isArray(obj)) {
                this._date = obj;
            }
        };
        MonthComponent.prototype.registerOnChange = function (fn) {
            this._onChanged = fn;
        };
        MonthComponent.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        MonthComponent.prototype.trackByTime = function (index, item) {
            return item ? item.time : index;
        };
        MonthComponent.prototype.isEndSelection = function (day) {
            if (!day)
                return false;
            if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[1] === null) {
                return false;
            }
            return this._date[1].time === day.time;
        };
        MonthComponent.prototype.getDayLabel = function (day) {
            return new Date(day.time);
        };
        MonthComponent.prototype.isBetween = function (day) {
            if (!day)
                return false;
            if (this.pickMode !== pickModes.RANGE || !this._isInit) {
                return false;
            }
            if (this._date[0] === null || this._date[1] === null) {
                return false;
            }
            var start = this._date[0].time;
            var end = this._date[1].time;
            return day.time < end && day.time > start;
        };
        MonthComponent.prototype.isStartSelection = function (day) {
            if (!day)
                return false;
            if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[0] === null) {
                return false;
            }
            return this._date[0].time === day.time && this._date[1] !== null;
        };
        MonthComponent.prototype.isSelected = function (time) {
            if (Array.isArray(this._date)) {
                if (this.pickMode !== pickModes.MULTI) {
                    if (this._date[0] !== null) {
                        return time === this._date[0].time;
                    }
                    if (this._date[1] !== null) {
                        return time === this._date[1].time;
                    }
                }
                else {
                    return this._date.findIndex(function (e) { return e !== null && e.time === time; }) !== -1;
                }
            }
            else {
                return false;
            }
        };
        MonthComponent.prototype.onSelected = function (item) {
            if (this.readonly)
                return;
            item.selected = true;
            this.select.emit(item);
            if (this.pickMode === pickModes.SINGLE) {
                this._date[0] = item;
                this.change.emit(this._date);
                return;
            }
            if (this.pickMode === pickModes.RANGE) {
                if (this._date[0] === null) {
                    this._date[0] = item;
                    this.selectStart.emit(item);
                }
                else if (this._date[1] === null) {
                    if (this._date[0].time < item.time) {
                        this._date[1] = item;
                        this.selectEnd.emit(item);
                    }
                    else {
                        this._date[1] = this._date[0];
                        this.selectEnd.emit(this._date[0]);
                        this._date[0] = item;
                        this.selectStart.emit(item);
                    }
                }
                else if (this._date[0].time > item.time) {
                    this._date[0] = item;
                    this.selectStart.emit(item);
                }
                else if (this._date[1].time < item.time) {
                    this._date[1] = item;
                    this.selectEnd.emit(item);
                }
                else {
                    this._date[0] = item;
                    this.selectStart.emit(item);
                    this._date[1] = null;
                }
                this.change.emit(this._date);
                return;
            }
            if (this.pickMode === pickModes.MULTI) {
                var index = this._date.findIndex(function (e) { return e !== null && e.time === item.time; });
                if (index === -1) {
                    this._date.push(item);
                }
                else {
                    this._date.splice(index, 1);
                }
                this.change.emit(this._date.filter(function (e) { return e !== null; }));
            }
        };
        return MonthComponent;
    }());
    MonthComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ion-calendar-month',
                    providers: [MONTH_VALUE_ACCESSOR],
                    // tslint:disable-next-line:use-host-property-decorator
                    host: {
                        '[class.component-mode]': 'componentMode'
                    },
                    template: "\n    <div [class]=\"color\">\n      <ng-template [ngIf]=\"!_isRange\" [ngIfElse]=\"rangeBox\">\n        <div class=\"days-box\">\n          <ng-template ngFor let-day [ngForOf]=\"month.days\" [ngForTrackBy]=\"trackByTime\">\n            <div class=\"days\">\n              <ng-container *ngIf=\"day\">\n                <button type='button'\n                        [class]=\"'days-btn ' + day.cssClass\"\n                        [class.today]=\"day.isToday\"\n                        (click)=\"onSelected(day)\"\n                        [class.marked]=\"day.marked\"\n                        [class.last-month-day]=\"day.isLastMonth\"\n                        [class.next-month-day]=\"day.isNextMonth\"\n                        [class.on-selected]=\"isSelected(day.time)\"\n                        [disabled]=\"day.disable\">\n                  <p>{{ day.title }}</p>\n                  <small *ngIf=\"day.subTitle\">{{ day?.subTitle }}</small>\n                </button>\n              </ng-container>\n            </div>\n          </ng-template>\n        </div>\n      </ng-template>\n\n      <ng-template #rangeBox>\n        <div class=\"days-box\">\n          <ng-template ngFor let-day [ngForOf]=\"month.days\" [ngForTrackBy]=\"trackByTime\">\n            <div class=\"days\"\n                 [class.startSelection]=\"isStartSelection(day)\"\n                 [class.endSelection]=\"isEndSelection(day)\"\n                 [class.is-first-wrap]=\"day?.isFirst\"\n                 [class.is-last-wrap]=\"day?.isLast\"\n                 [class.between]=\"isBetween(day)\">\n              <ng-container *ngIf=\"day\">\n                <button type='button'\n                        [class]=\"'days-btn ' + day.cssClass\"\n                        [class.today]=\"day.isToday\"\n                        (click)=\"onSelected(day)\"\n                        [class.marked]=\"day.marked\"\n                        [class.last-month-day]=\"day.isLastMonth\"\n                        [class.next-month-day]=\"day.isNextMonth\"\n                        [class.is-first]=\"day.isFirst\"\n                        [class.is-last]=\"day.isLast\"\n                        [class.on-selected]=\"isSelected(day.time)\"\n                        [disabled]=\"day.disable\">\n                  <p>{{ day.title }}</p>\n                  <small *ngIf=\"day.subTitle\">{{ day?.subTitle }}</small>\n                </button>\n              </ng-container>\n\n            </div>\n          </ng-template>\n        </div>\n      </ng-template>\n    </div>\n  ",
                    styles: [":host{display:inline-block;width:100%}:host .days-box{padding:.5rem}:host .days:nth-of-type(7n),:host .days:nth-of-type(7n+1){width:15%}:host .days{float:left;height:36px;margin-bottom:5px;text-align:center;width:14%}:host .days .marked p{font-weight:500}:host .days .on-selected{border:none}:host .days .on-selected p{font-size:1.3em}:host .primary .days .marked p,:host .primary .days .today p,:host .primary button.days-btn small{color:var(--ion-color-primary)}:host .primary .days .today p{font-weight:700}:host .primary .days .last-month-day p,:host .primary .days .next-month-day p{color:rgba(0,0,0,.25)}:host .primary .days .marked.on-selected p,:host .primary .days .today.on-selected p{color:#fff}:host .primary .days .on-selected,:host .primary .endSelection button.days-btn,:host .primary .startSelection button.days-btn{background-color:var(--ion-color-primary);color:#fff}:host .primary .startSelection{position:relative}:host .primary .startSelection:after,:host .primary .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .primary .startSelection:before{background-color:var(--ion-color-primary)}:host .primary .startSelection:after{background-color:#fff;opacity:.25}:host .primary .endSelection{position:relative}:host .primary .endSelection:after,:host .primary .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .primary .endSelection:before{background-color:var(--ion-color-primary)}:host .primary .endSelection:after{background-color:#fff;opacity:.25}:host .primary .startSelection.endSelection:after{background-color:transparent}:host .primary .startSelection button.days-btn{border-radius:50%}:host .primary .between button.days-btn{background-color:var(--ion-color-primary);border-radius:0;position:relative;width:100%}:host .primary .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .primary .between button.days-btn p{color:#fff}:host .primary .endSelection button.days-btn{border-radius:50%}:host .primary .days .on-selected p,:host .primary .endSelection button.days-btn p{color:#fff}:host .primary .between button.days-btn,:host .primary .endSelection button.days-btn,:host .primary .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .primary .startSelection.endSelection:before{--ion-color-primary:transparent}:host .secondary .days .marked p,:host .secondary .days .today p,:host .secondary button.days-btn small{color:var(--ion-color-secondary)}:host .secondary .days .today p{font-weight:700}:host .secondary .days .last-month-day p,:host .secondary .days .next-month-day p{color:rgba(0,0,0,.25)}:host .secondary .days .marked.on-selected p,:host .secondary .days .today.on-selected p{color:#fff}:host .secondary .days .on-selected,:host .secondary .endSelection button.days-btn,:host .secondary .startSelection button.days-btn{background-color:var(--ion-color-secondary);color:#fff}:host .secondary .startSelection{position:relative}:host .secondary .startSelection:after,:host .secondary .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .secondary .startSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .startSelection:after{background-color:#fff;opacity:.25}:host .secondary .endSelection{position:relative}:host .secondary .endSelection:after,:host .secondary .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .secondary .endSelection:before{background-color:var(--ion-color-secondary)}:host .secondary .endSelection:after{background-color:#fff;opacity:.25}:host .secondary .startSelection.endSelection:after{background-color:transparent}:host .secondary .startSelection button.days-btn{border-radius:50%}:host .secondary .between button.days-btn{background-color:var(--ion-color-secondary);border-radius:0;position:relative;width:100%}:host .secondary .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .secondary .between button.days-btn p{color:#fff}:host .secondary .endSelection button.days-btn{border-radius:50%}:host .secondary .days .on-selected p,:host .secondary .endSelection button.days-btn p{color:#fff}:host .secondary .between button.days-btn,:host .secondary .endSelection button.days-btn,:host .secondary .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .secondary .startSelection.endSelection:before{--ion-color-primary:transparent}:host .danger .days .marked p,:host .danger .days .today p,:host .danger button.days-btn small{color:var(--ion-color-danger)}:host .danger .days .today p{font-weight:700}:host .danger .days .last-month-day p,:host .danger .days .next-month-day p{color:rgba(0,0,0,.25)}:host .danger .days .marked.on-selected p,:host .danger .days .today.on-selected p{color:#fff}:host .danger .days .on-selected,:host .danger .endSelection button.days-btn,:host .danger .startSelection button.days-btn{background-color:var(--ion-color-danger);color:#fff}:host .danger .startSelection{position:relative}:host .danger .startSelection:after,:host .danger .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .danger .startSelection:before{background-color:var(--ion-color-danger)}:host .danger .startSelection:after{background-color:#fff;opacity:.25}:host .danger .endSelection{position:relative}:host .danger .endSelection:after,:host .danger .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .danger .endSelection:before{background-color:var(--ion-color-danger)}:host .danger .endSelection:after{background-color:#fff;opacity:.25}:host .danger .startSelection.endSelection:after{background-color:transparent}:host .danger .startSelection button.days-btn{border-radius:50%}:host .danger .between button.days-btn{background-color:var(--ion-color-danger);border-radius:0;position:relative;width:100%}:host .danger .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .danger .between button.days-btn p{color:#fff}:host .danger .endSelection button.days-btn{border-radius:50%}:host .danger .days .on-selected p,:host .danger .endSelection button.days-btn p{color:#fff}:host .danger .between button.days-btn,:host .danger .endSelection button.days-btn,:host .danger .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .danger .startSelection.endSelection:before{--ion-color-primary:transparent}:host .dark .days .marked p,:host .dark .days .today p,:host .dark button.days-btn small{color:var(--ion-color-dark)}:host .dark .days .today p{font-weight:700}:host .dark .days .last-month-day p,:host .dark .days .next-month-day p{color:rgba(0,0,0,.25)}:host .dark .days .marked.on-selected p,:host .dark .days .today.on-selected p{color:#fff}:host .dark .days .on-selected,:host .dark .endSelection button.days-btn,:host .dark .startSelection button.days-btn{background-color:var(--ion-color-dark);color:#fff}:host .dark .startSelection{position:relative}:host .dark .startSelection:after,:host .dark .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .dark .startSelection:before{background-color:var(--ion-color-dark)}:host .dark .startSelection:after{background-color:#fff;opacity:.25}:host .dark .endSelection{position:relative}:host .dark .endSelection:after,:host .dark .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .dark .endSelection:before{background-color:var(--ion-color-dark)}:host .dark .endSelection:after{background-color:#fff;opacity:.25}:host .dark .startSelection.endSelection:after{background-color:transparent}:host .dark .startSelection button.days-btn{border-radius:50%}:host .dark .between button.days-btn{background-color:var(--ion-color-dark);border-radius:0;position:relative;width:100%}:host .dark .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .dark .between button.days-btn p{color:#fff}:host .dark .endSelection button.days-btn{border-radius:50%}:host .dark .days .on-selected p,:host .dark .endSelection button.days-btn p{color:#fff}:host .dark .between button.days-btn,:host .dark .endSelection button.days-btn,:host .dark .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .dark .startSelection.endSelection:before{--ion-color-primary:transparent}:host .light .days .marked p,:host .light .days .today p,:host .light button.days-btn small{color:var(--ion-color-light)}:host .light .days .today p{font-weight:700}:host .light .days .last-month-day p,:host .light .days .next-month-day p{color:rgba(0,0,0,.25)}:host .light .days .marked.on-selected p,:host .light .days .today.on-selected p{color:#a0a0a0}:host .light .days .on-selected,:host .light .endSelection button.days-btn,:host .light .startSelection button.days-btn{background-color:var(--ion-color-light);color:#a0a0a0}:host .light .startSelection{position:relative}:host .light .startSelection:after,:host .light .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .light .startSelection:before{background-color:var(--ion-color-light)}:host .light .startSelection:after{background-color:#fff;opacity:.25}:host .light .endSelection{position:relative}:host .light .endSelection:after,:host .light .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .light .endSelection:before{background-color:var(--ion-color-light)}:host .light .endSelection:after{background-color:#fff;opacity:.25}:host .light .startSelection.endSelection:after{background-color:transparent}:host .light .startSelection button.days-btn{border-radius:50%}:host .light .between button.days-btn{background-color:var(--ion-color-light);border-radius:0;position:relative;width:100%}:host .light .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .light .between button.days-btn p{color:#a0a0a0}:host .light .endSelection button.days-btn{border-radius:50%}:host .light .days .on-selected p,:host .light .endSelection button.days-btn p{color:#a0a0a0}:host .light .between button.days-btn,:host .light .endSelection button.days-btn,:host .light .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .light .startSelection.endSelection:before{--ion-color-primary:transparent}:host .light .days .today p{color:#565656}:host button.days-btn{background-color:transparent;border-radius:36px;display:block;height:36px;margin:0 auto;outline:0;padding:0;position:relative;width:36px;z-index:2}:host button.days-btn p{color:#333;font-size:1.2em;margin:0;text-align:center}:host button.days-btn[disabled] p{color:rgba(0,0,0,.25)}:host button.days-btn.on-selected small{bottom:-14px;transition:bottom .3s}:host button.days-btn small{bottom:-5px;display:block;font-weight:200;left:0;overflow:hidden;position:absolute;right:0;text-align:center;z-index:1}:host .days.between:nth-child(7n) button.days-btn,:host .days.between button.days-btn.is-last,:host .days.startSelection:nth-child(7n):before{border-radius:0 36px 36px 0}:host .days.between:nth-child(7n) button.days-btn.on-selected,:host .days.between button.days-btn.is-last.on-selected,:host .days.startSelection:nth-child(7n):before.on-selected{border-radius:50%}:host .days.between.is-first-wrap button.days-btn.is-first,:host .days.between:nth-child(7n+1) button.days-btn,:host .days.endSelection:nth-child(7n+1):before,:host button.days-btn.is-first{border-radius:36px 0 0 36px}:host .endSelection button.days-btn.is-first,:host .endSelection button.days-btn.is-last,:host .startSelection button.days-btn.is-first,:host .startSelection button.days-btn.is-last,:host button.days-btn.is-first.on-selected,:host button.days-btn.is-last.on-selected{border-radius:50%}:host .startSelection.is-last-wrap:after,:host .startSelection.is-last-wrap:before{border-radius:0 36px 36px 0}:host .endSelection.is-first-wrap:after,:host .endSelection.is-first-wrap:before{border-radius:36px 0 0 36px}:host.component-mode .days.between button.days-btn.is-first,:host.component-mode .days.between button.days-btn.is-last,:host.component-mode .days.endSelection.is-first-wrap:after,:host.component-mode .days.endSelection.is-first-wrap:before,:host.component-mode .days.startSelection.is-last-wrap:after,:host.component-mode .days.startSelection.is-last-wrap:before{border-radius:0}:host .cal-color .days .today p{font-weight:700}:host .cal-color .days .last-month-day p,:host .cal-color .days .next-month-day p{color:rgba(0,0,0,.25)}:host .cal-color .days .marked.on-selected p,:host .cal-color .days .on-selected,:host .cal-color .days .today.on-selected p,:host .cal-color .endSelection button.days-btn,:host .cal-color .startSelection button.days-btn{color:#fff}:host .cal-color .startSelection{position:relative}:host .cal-color .startSelection:after,:host .cal-color .startSelection:before{content:\"\";display:block;height:36px;position:absolute;right:0;top:0;width:50%}:host .cal-color .startSelection:after{background-color:#fff;opacity:.25}:host .cal-color .endSelection{position:relative}:host .cal-color .endSelection:after,:host .cal-color .endSelection:before{content:\"\";display:block;height:36px;left:0;position:absolute;top:0;width:50%}:host .cal-color .endSelection:after{background-color:#fff;opacity:.25}:host .cal-color .startSelection.endSelection:after{background-color:transparent}:host .cal-color .startSelection button.days-btn{border-radius:50%}:host .cal-color .between button.days-btn{border-radius:0;position:relative;width:100%}:host .cal-color .between button.days-btn:after{background-color:#fff;content:\"\";display:block;height:36px;left:0;opacity:.25;position:absolute;right:0;top:0;width:100%}:host .cal-color .between button.days-btn p{color:#fff}:host .cal-color .endSelection button.days-btn{border-radius:50%}:host .cal-color .days .on-selected p,:host .cal-color .endSelection button.days-btn p{color:#fff}:host .cal-color .between button.days-btn,:host .cal-color .endSelection button.days-btn,:host .cal-color .startSelection button.days-btn{transition-duration:.18s;transition-property:background-color;transition-timing-function:ease-out}:host .cal-color .startSelection.endSelection:before{--ion-color-primary:transparent}"]
                },] }
    ];
    MonthComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef }
    ]; };
    MonthComponent.propDecorators = {
        componentMode: [{ type: core.Input }],
        month: [{ type: core.Input }],
        pickMode: [{ type: core.Input }],
        isSaveHistory: [{ type: core.Input }],
        id: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        color: [{ type: core.Input }],
        change: [{ type: core.Output }],
        select: [{ type: core.Output }],
        selectStart: [{ type: core.Output }],
        selectEnd: [{ type: core.Output }]
    };

    var getIconMap = function () {
        if (typeof window === 'undefined') {
            return new Map();
        }
        else {
            var win = window;
            win.Ionicons = win.Ionicons || {};
            win.Ionicons.map = win.Ionicons.map || new Map();
            return win.Ionicons.map;
        }
    };
    var ɵ0$1 = getIconMap;
    var isIonIconsV4 = function () {
        var iconMap = getIconMap();
        return !!iconMap.get('md-arrow-dropdown');
    };

    var ION_CAL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return CalendarComponent; }),
        multi: true,
    };
    var CalendarComponent = /** @class */ (function () {
        function CalendarComponent(calSvc) {
            this.calSvc = calSvc;
            this._view = 'days';
            this._calendarMonthValue = [null, null];
            this._showToggleButtons = true;
            this._showMonthPicker = true;
            this.format = defaults.DATE_FORMAT;
            this.type = 'string';
            this.readonly = false;
            this.change = new core.EventEmitter();
            this.monthChange = new core.EventEmitter();
            this.select = new core.EventEmitter();
            this.selectStart = new core.EventEmitter();
            this.selectEnd = new core.EventEmitter();
            this.MONTH_DATE_FORMAT = 'MMMM yyyy';
            this._onChanged = function () { };
            this._onTouched = function () { };
            if (isIonIconsV4()) {
                this._compatibleIcons = {
                    caretDown: 'md-arrow-dropdown',
                    caretUp: 'md-arrow-dropup',
                    chevronBack: 'ios-arrow-back',
                    chevronForward: 'ios-arrow-forward',
                };
            }
            else {
                this._compatibleIcons = {
                    caretDown: 'caret-down-outline',
                    caretUp: 'caret-up-outline',
                    chevronBack: 'chevron-back-outline',
                    chevronForward: 'chevron-forward-outline',
                };
            }
        }
        Object.defineProperty(CalendarComponent.prototype, "showToggleButtons", {
            get: function () {
                return this._showToggleButtons;
            },
            set: function (value) {
                this._showToggleButtons = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CalendarComponent.prototype, "showMonthPicker", {
            get: function () {
                return this._showMonthPicker;
            },
            set: function (value) {
                this._showMonthPicker = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CalendarComponent.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (value) {
                this._options = value;
                this.initOpt();
                if (this.monthOpt && this.monthOpt.original) {
                    this.monthOpt = this.createMonth(this.monthOpt.original.time);
                }
            },
            enumerable: false,
            configurable: true
        });
        CalendarComponent.prototype.ngOnInit = function () {
            this.initOpt();
            this.monthOpt = this.createMonth(new Date().getTime());
        };
        CalendarComponent.prototype.getViewDate = function () {
            return this._handleType(this.monthOpt.original.time);
        };
        CalendarComponent.prototype.getDate = function (date) {
            return new Date(date);
        };
        CalendarComponent.prototype.setViewDate = function (value) {
            this.monthOpt = this.createMonth(this._payloadToTimeNumber(value));
        };
        CalendarComponent.prototype.switchView = function () {
            this._view = this._view === 'days' ? 'month' : 'days';
        };
        CalendarComponent.prototype.prev = function () {
            if (this._view === 'days') {
                this.backMonth();
            }
            else {
                this.prevYear();
            }
        };
        CalendarComponent.prototype.next = function () {
            if (this._view === 'days') {
                this.nextMonth();
            }
            else {
                this.nextYear();
            }
        };
        CalendarComponent.prototype.prevYear = function () {
            if (moment__namespace(this.monthOpt.original.time).year() === 1970) {
                return;
            }
            var backTime = moment__namespace(this.monthOpt.original.time)
                .subtract(1, 'year')
                .valueOf();
            this.monthOpt = this.createMonth(backTime);
        };
        CalendarComponent.prototype.nextYear = function () {
            var nextTime = moment__namespace(this.monthOpt.original.time)
                .add(1, 'year')
                .valueOf();
            this.monthOpt = this.createMonth(nextTime);
        };
        CalendarComponent.prototype.nextMonth = function () {
            var nextTime = moment__namespace(this.monthOpt.original.time)
                .add(1, 'months')
                .valueOf();
            this.monthChange.emit({
                oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
                newMonth: this.calSvc.multiFormat(nextTime),
            });
            this.monthOpt = this.createMonth(nextTime);
        };
        CalendarComponent.prototype.canNext = function () {
            if (!this._d.to || this._view !== 'days') {
                return true;
            }
            return this.monthOpt.original.time < moment__namespace(this._d.to).valueOf();
        };
        CalendarComponent.prototype.backMonth = function () {
            var backTime = moment__namespace(this.monthOpt.original.time)
                .subtract(1, 'months')
                .valueOf();
            this.monthChange.emit({
                oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
                newMonth: this.calSvc.multiFormat(backTime),
            });
            this.monthOpt = this.createMonth(backTime);
        };
        CalendarComponent.prototype.canBack = function () {
            if (!this._d.from || this._view !== 'days') {
                return true;
            }
            return this.monthOpt.original.time > moment__namespace(this._d.from).valueOf();
        };
        CalendarComponent.prototype.monthOnSelect = function (month) {
            this._view = 'days';
            var newMonth = moment__namespace(this.monthOpt.original.time)
                .month(month)
                .valueOf();
            this.monthChange.emit({
                oldMonth: this.calSvc.multiFormat(this.monthOpt.original.time),
                newMonth: this.calSvc.multiFormat(newMonth),
            });
            this.monthOpt = this.createMonth(newMonth);
        };
        CalendarComponent.prototype.onChanged = function ($event) {
            switch (this._d.pickMode) {
                case pickModes.SINGLE:
                    var date = this._handleType($event[0].time);
                    this._onChanged(date);
                    this.change.emit(date);
                    break;
                case pickModes.RANGE:
                    if ($event[0] && $event[1]) {
                        var rangeDate = {
                            from: this._handleType($event[0].time),
                            to: this._handleType($event[1].time),
                        };
                        this._onChanged(rangeDate);
                        this.change.emit(rangeDate);
                    }
                    break;
                case pickModes.MULTI:
                    var dates = [];
                    for (var i = 0; i < $event.length; i++) {
                        if ($event[i] && $event[i].time) {
                            dates.push(this._handleType($event[i].time));
                        }
                    }
                    this._onChanged(dates);
                    this.change.emit(dates);
                    break;
                default:
            }
        };
        CalendarComponent.prototype.swipeEvent = function ($event) {
            var isNext = $event.deltaX < 0;
            if (isNext && this.canNext()) {
                this.nextMonth();
            }
            else if (!isNext && this.canBack()) {
                this.backMonth();
            }
        };
        CalendarComponent.prototype._payloadToTimeNumber = function (value) {
            var date;
            if (this.type === 'string') {
                date = moment__namespace(value, this.format);
            }
            else {
                date = moment__namespace(value);
            }
            return date.valueOf();
        };
        CalendarComponent.prototype._monthFormat = function (date) {
            return moment__namespace(date).format(this._d.monthFormat.replace(/y/g, 'Y'));
        };
        CalendarComponent.prototype.initOpt = function () {
            if (this._options && typeof this._options.showToggleButtons === 'boolean') {
                this.showToggleButtons = this._options.showToggleButtons;
            }
            if (this._options && typeof this._options.showMonthPicker === 'boolean') {
                this.showMonthPicker = this._options.showMonthPicker;
                if (this._view !== 'days' && !this.showMonthPicker) {
                    this._view = 'days';
                }
            }
            this._d = this.calSvc.safeOpt(this._options || {});
        };
        CalendarComponent.prototype.createMonth = function (date) {
            return this.calSvc.createMonthsByPeriod(date, 1, this._d)[0];
        };
        CalendarComponent.prototype._createCalendarDay = function (value) {
            return this.calSvc.createCalendarDay(this._payloadToTimeNumber(value), this._d);
        };
        CalendarComponent.prototype._handleType = function (value) {
            var date = moment__namespace(value);
            switch (this.type) {
                case 'string':
                    return date.format(this.format);
                case 'js-date':
                    return date.toDate();
                case 'moment':
                    return date;
                case 'time':
                    return date.valueOf();
                case 'object':
                    return date.toObject();
                default:
                    return date;
            }
        };
        CalendarComponent.prototype.writeValue = function (obj) {
            this._writeValue(obj);
            if (obj) {
                if (this._calendarMonthValue[0]) {
                    this.monthOpt = this.createMonth(this._calendarMonthValue[0].time);
                }
                else {
                    this.monthOpt = this.createMonth(new Date().getTime());
                }
            }
        };
        CalendarComponent.prototype.registerOnChange = function (fn) {
            this._onChanged = fn;
        };
        CalendarComponent.prototype.registerOnTouched = function (fn) {
            this._onTouched = fn;
        };
        CalendarComponent.prototype._writeValue = function (value) {
            var _this = this;
            if (!value) {
                this._calendarMonthValue = [null, null];
                return;
            }
            switch (this._d.pickMode) {
                case 'single':
                    this._calendarMonthValue[0] = this._createCalendarDay(value);
                    break;
                case 'range':
                    if (value.from) {
                        this._calendarMonthValue[0] = value.from ? this._createCalendarDay(value.from) : null;
                    }
                    if (value.to) {
                        this._calendarMonthValue[1] = value.to ? this._createCalendarDay(value.to) : null;
                    }
                    break;
                case 'multi':
                    if (Array.isArray(value)) {
                        this._calendarMonthValue = value.map(function (e) {
                            return _this._createCalendarDay(e);
                        });
                    }
                    else {
                        this._calendarMonthValue = [null, null];
                    }
                    break;
                default:
            }
        };
        return CalendarComponent;
    }());
    CalendarComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ion-calendar',
                    providers: [ION_CAL_VALUE_ACCESSOR],
                    template: "\n    <div class=\"title\">\n      <ng-template [ngIf]=\"_showMonthPicker\" [ngIfElse]=\"title\">\n        <ion-button type=\"button\"\n                    fill=\"clear\"\n                    class=\"switch-btn\"\n                    (click)=\"switchView()\">\n          {{ _monthFormat(monthOpt.original.time) }}\n          <ion-icon class=\"arrow-dropdown\"\n                    [name]=\"_view === 'days' ? _compatibleIcons.caretDown : _compatibleIcons.caretUp\"></ion-icon>\n        </ion-button>\n      </ng-template>\n      <ng-template #title>\n        <div class=\"switch-btn\">\n          {{ _monthFormat(monthOpt.original.time) }}\n        </div>\n      </ng-template>\n      <ng-template [ngIf]=\"_showToggleButtons\">\n        <ion-button type=\"button\" fill=\"clear\" class=\"back\" [disabled]=\"!canBack()\" (click)=\"prev()\">\n          <ion-icon slot=\"icon-only\" size=\"small\" [name]=\"_compatibleIcons.chevronBack\"></ion-icon>\n        </ion-button>\n        <ion-button type=\"button\" fill=\"clear\" class=\"forward\" [disabled]=\"!canNext()\" (click)=\"next()\">\n          <ion-icon slot=\"icon-only\" size=\"small\" [name]=\"_compatibleIcons.chevronForward\"></ion-icon>\n        </ion-button>\n      </ng-template>\n    </div>\n    <ng-template [ngIf]=\"_view === 'days'\" [ngIfElse]=\"monthPicker\">\n      <ion-calendar-week color=\"transparent\"\n                         [weekArray]=\"_d.weekdays\"\n                         [weekStart]=\"_d.weekStart\">\n      </ion-calendar-week>\n\n      <ion-calendar-month [componentMode]=\"true\"\n                          [(ngModel)]=\"_calendarMonthValue\"\n                          [month]=\"monthOpt\"\n                          [readonly]=\"readonly\"\n                          (change)=\"onChanged($event)\"\n                          (swipe)=\"swipeEvent($event)\"\n                          (select)=\"select.emit($event)\"\n                          (selectStart)=\"selectStart.emit($event)\"\n                          (selectEnd)=\"selectEnd.emit($event)\"\n                          [pickMode]=\"_d.pickMode\"\n                          [color]=\"_d.color\">\n      </ion-calendar-month>\n    </ng-template>\n\n    <ng-template #monthPicker>\n      <ion-calendar-month-picker [color]=\"_d.color\"\n                                 [monthFormat]=\"_options?.monthPickerFormat\"\n                                 (select)=\"monthOnSelect($event)\"\n                                 [month]=\"monthOpt\">\n      </ion-calendar-month-picker>\n    </ng-template>\n  ",
                    styles: [":host{background-color:#fff;box-sizing:border-box;display:inline-block;padding:10px 20px;width:100%}:host .title{overflow:hidden;padding:0 40px}:host .title .back,:host .title .forward,:host .title .switch-btn{--padding-end:0;--padding-start:0;display:block;float:left;font-size:15px;margin:0;min-height:32px;padding:0;position:relative}:host .title .back,:host .title .forward{color:#757575}:host .title .back{left:-40px;margin-left:-100%;width:40px}:host .title .forward{margin-left:-40px;right:-40px;width:40px}:host .title .switch-btn{--margin-bottom:0;--margin-end:auto;--margin-start:auto;--margin-top:0;color:#757575;line-height:32px;text-align:center;width:100%}:host .title .switch-btn .arrow-dropdown{margin-left:5px}"]
                },] }
    ];
    CalendarComponent.ctorParameters = function () { return [
        { type: CalendarService }
    ]; };
    CalendarComponent.propDecorators = {
        format: [{ type: core.Input }],
        type: [{ type: core.Input }],
        readonly: [{ type: core.Input }],
        change: [{ type: core.Output }],
        monthChange: [{ type: core.Output }],
        select: [{ type: core.Output }],
        selectStart: [{ type: core.Output }],
        selectEnd: [{ type: core.Output }],
        options: [{ type: core.Input }]
    };

    var MonthPickerComponent = /** @class */ (function () {
        function MonthPickerComponent() {
            this.color = defaults.COLOR;
            this.select = new core.EventEmitter();
            this._thisMonth = new Date();
            this._monthFormat = defaults.MONTH_FORMAT;
            this.MONTH_FORMAT = 'MMMM';
        }
        Object.defineProperty(MonthPickerComponent.prototype, "monthFormat", {
            get: function () {
                return this._monthFormat;
            },
            set: function (value) {
                if (Array.isArray(value) && value.length === 12) {
                    this._monthFormat = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        MonthPickerComponent.prototype._onSelect = function (month) {
            this.select.emit(month);
        };
        MonthPickerComponent.prototype.getDate = function (month) {
            return new Date(this._thisMonth.getFullYear(), month, 1);
        };
        return MonthPickerComponent;
    }());
    MonthPickerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'ion-calendar-month-picker',
                    template: "\n    <div [class]=\"'month-picker ' + color\">\n      <div class=\"month-packer-item\"\n           [class.this-month]=\" i === _thisMonth.getMonth() && month.original.year === _thisMonth.getFullYear()\"\n           *ngFor=\"let item of _monthFormat; let i = index\">\n        <button type=\"button\" (click)=\"_onSelect(i)\">{{ item }}</button>\n      </div>\n    </div>\n  ",
                    styles: [":host .month-picker{display:inline-block;margin:20px 0;width:100%}:host .month-packer-item{box-sizing:border-box;float:left;height:50px;padding:5px;width:25%}:host .month-packer-item button{background-color:transparent;border-radius:32px;font-size:.9em;height:100%;width:100%}:host .month-picker.primary .month-packer-item.this-month button{border:1px solid var(--ion-color-primary)}:host .month-picker.primary .month-packer-item.active button{background-color:var(--ion-color-primary);color:#fff}:host .month-picker.secondary .month-packer-item.this-month button{border:1px solid var(--ion-color-secondary)}:host .month-picker.secondary .month-packer-item.active button{background-color:var(--ion-color-secondary);color:#fff}:host .month-picker.danger .month-packer-item.this-month button{border:1px solid var(--ion-color-danger)}:host .month-picker.danger .month-packer-item.active button{background-color:var(--ion-color-danger);color:#fff}:host .month-picker.dark .month-packer-item.this-month button{border:1px solid var(--ion-color-dark)}:host .month-picker.dark .month-packer-item.active button{background-color:var(--ion-color-dark);color:#fff}:host .month-picker.light .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.light .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.transparent{background-color:transparent}:host .month-picker.transparent .month-packer-item.this-month button{border:1px solid var(--ion-color-light)}:host .month-picker.transparent .month-packer-item.active button{background-color:var(--ion-color-light);color:#9e9e9e}:host .month-picker.cal-color .month-packer-item.this-month button{border:1px solid}:host .month-picker.cal-color .month-packer-item.active button{color:#fff}"]
                },] }
    ];
    MonthPickerComponent.ctorParameters = function () { return []; };
    MonthPickerComponent.propDecorators = {
        month: [{ type: core.Input }],
        color: [{ type: core.Input }],
        select: [{ type: core.Output }],
        monthFormat: [{ type: core.Input }]
    };

    var CALENDAR_COMPONENTS = [
        CalendarModal,
        CalendarWeekComponent,
        MonthComponent,
        CalendarComponent,
        MonthPickerComponent
    ];

    var CalendarController = /** @class */ (function () {
        function CalendarController(modalCtrl, calSvc) {
            this.modalCtrl = modalCtrl;
            this.calSvc = calSvc;
        }
        /**
         * @deprecated
         * @param {CalendarModalOptions} calendarOptions
         * @param {ModalOptions} modalOptions
         * @returns {any}
         */
        CalendarController.prototype.openCalendar = function (calendarOptions, modalOptions) {
            if (modalOptions === void 0) { modalOptions = {}; }
            var options = this.calSvc.safeOpt(calendarOptions);
            return this.modalCtrl
                .create(Object.assign({ component: CalendarModal, componentProps: {
                    options: options,
                } }, modalOptions))
                .then(function (calendarModal) {
                calendarModal.present();
                return calendarModal.onDidDismiss().then(function (event) {
                    return event.data ? Promise.resolve(event.data) : Promise.reject('cancelled');
                });
            });
        };
        return CalendarController;
    }());
    CalendarController.decorators = [
        { type: core.Injectable }
    ];
    CalendarController.ctorParameters = function () { return [
        { type: angular.ModalController },
        { type: CalendarService }
    ]; };

    function calendarController(modalCtrl, calSvc) {
        return new CalendarController(modalCtrl, calSvc);
    }
    var CalendarModule = /** @class */ (function () {
        function CalendarModule() {
        }
        CalendarModule.forRoot = function (defaultOptions) {
            if (defaultOptions === void 0) { defaultOptions = {}; }
            return {
                ngModule: CalendarModule,
                providers: [
                    { provide: DEFAULT_CALENDAR_OPTIONS, useValue: defaultOptions }
                ]
            };
        };
        return CalendarModule;
    }());
    CalendarModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, angular.IonicModule, forms.FormsModule],
                    declarations: CALENDAR_COMPONENTS,
                    exports: CALENDAR_COMPONENTS,
                    entryComponents: CALENDAR_COMPONENTS,
                    providers: [
                        CalendarService,
                        {
                            provide: CalendarController,
                            useFactory: calendarController,
                            deps: [angular.ModalController, CalendarService],
                        },
                    ],
                    schemas: [core.CUSTOM_ELEMENTS_SCHEMA],
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CalendarComponent = CalendarComponent;
    exports.CalendarComponentMonthChange = CalendarComponentMonthChange;
    exports.CalendarController = CalendarController;
    exports.CalendarModal = CalendarModal;
    exports.CalendarModule = CalendarModule;
    exports.CalendarMonth = CalendarMonth;
    exports.CalendarResult = CalendarResult;
    exports.CalendarWeekComponent = CalendarWeekComponent;
    exports.DEFAULT_CALENDAR_OPTIONS = DEFAULT_CALENDAR_OPTIONS;
    exports.MonthComponent = MonthComponent;
    exports.MonthPickerComponent = MonthPickerComponent;
    exports.ɵa = CALENDAR_COMPONENTS;
    exports.ɵb = calendarController;
    exports.ɵc = CalendarService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ion2-calendar.umd.js.map
