"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LineAnimator = /** @class */ (function () {
    function LineAnimator(game) {
        this.index = 0;
        this.interval = undefined;
        this.wins = [];
        this.game = game;
    }
    LineAnimator.prototype.start = function (callback) {
        var _this = this;
        this.cycleCallback = callback;
        this.wins = this.game.clientInfo.wins;
        this.index = -1;
        this.showWin();
        this.interval = setInterval(function () { return _this.showWin(); }, 3000);
    };
    LineAnimator.prototype.showWin = function () {
        this.index++;
        if (this.index == this.wins.length) {
            if (this.cycleCallback !== undefined) {
                this.cycleCallback();
                this.cycleCallback = undefined;
            }
            this.index = 0;
        }
        this.hideWinAnimations();
        this.showWinAnimations(this.wins[this.index].positions);
        this.showLine(this.wins[this.index].line);
        this.showLinePin(this.wins[this.index].line);
    };
    LineAnimator.prototype.showLine = function (line) {
        this.game.getControlsByName("payline").forEach(function (control) {
            control.visible = control.nickname === "payline_" + line;
        });
    };
    LineAnimator.prototype.hideAllLines = function () {
        this.game.getControlsByName("payline").forEach(function (control) {
            control.visible = false;
        });
    };
    LineAnimator.prototype.showLinePin = function (line) {
        this.game.getControlsByName("line_pin_active").forEach(function (control) {
            control.visible = control.nickname.startsWith(line + "_line_pin");
        });
    };
    LineAnimator.prototype.hideWinAnimations = function () {
        this.game.getControlsByName("win_effect").forEach(function (anim) {
            anim.gotoAndStop(0);
            anim.visible = false;
        });
        this.game.getControlsByName("win_frame").forEach(function (control) {
            control.visible = false;
        });
    };
    LineAnimator.prototype.showWinAnimations = function (positions) {
        var _this = this;
        positions.forEach(function (pos, index) {
            var symPos = _this.game.getSymbol(Math.floor(pos / _this.game.rows), (pos % _this.game.rows) + 1).getGlobalPosition();
            var winEffect = _this.game.getControl("win_effect_" + (index + 1));
            winEffect.position.set(symPos.x, symPos.y);
            winEffect.visible = true;
            winEffect.play();
            var frame = _this.game.getControl("win_frame_" + (index + 1));
            frame.position.set(symPos.x, symPos.y);
            frame.visible = true;
        });
    };
    LineAnimator.prototype.stop = function () {
        clearInterval(this.interval);
        this.interval = undefined;
        this.hideWinAnimations();
        this.hideAllLines();
        this.game.toggleActiveLines();
    };
    return LineAnimator;
}());
exports.default = LineAnimator;
//# sourceMappingURL=LineAnimator.js.map