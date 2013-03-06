var ThreadPriority = (function () {
    function ThreadPriority() { }
    ThreadPriority.REALTIME = 0;
    ThreadPriority.HIGH = 10;
    ThreadPriority.NORMAL = 100;
    ThreadPriority.LOW = 1000;
    return ThreadPriority;
})();
var Thread = (function () {
    function Thread(runnable) {
        this.priority = ThreadPriority.NORMAL;
        this.runnable = runnable;
    }
    Thread.prototype.start = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.run();
        }, this.priority);
    };
    Thread.prototype.stop = function () {
        clearInterval(this.interval);
    };
    Thread.prototype.run = function () {
        if(this.runnable.run() == 0) {
            this.stop();
        }
    };
    Thread.prototype.setPriority = function (prio) {
        this.priority = prio;
        if(this.interval) {
            this.stop();
            this.start();
        }
    };
    return Thread;
})();
