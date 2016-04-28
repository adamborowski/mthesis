export default class Timer {
    start(name) {
        this.currentName = name;
        this.startDate = new Date();
        console.log(`${name} started`);
    }

    finish() {
        var diff = new Date() - this.startDate;
        console.log(`${this.currentName} finished in ${diff} msc`);
    }

    next(name) {
        this.finish();
        this.start(name);
    }
}