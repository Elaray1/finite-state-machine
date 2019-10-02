class FSM {
    constructor(config) {
      this.initial = config.initial;
      this.stateHistory = [];
      this.stateHistory.push(this.initial);
      this.index = 0;
      this.state = config.initial;
      this.states = config.states;
    }

    getState() {
      return this.stateHistory[this.index];
    }

    changeState(state) {
      let arr = [];
      for (let key in this.states) {
        arr.push(key);
      }
      if (arr.indexOf(state) == -1) throw new Error();
      this.state = state;
      this.stateHistory.push(state);
      this.index++;
    }

    trigger(e) {
      if (e in this.states[this.stateHistory[this.index]].transitions) {
        this.changeState(this.states[this.stateHistory[this.index]].transitions[e]);
      } else throw new Error();
    }

    reset() {
      this.state = this.initial;
      this.index = 0;
    }

    getStates(e) {
      let array = [];
      if (e == undefined) {
        for (let key in this.states) array.push(key);
        return array;
      }
      for (let key in this.states) {
        if (e in this.states[key].transitions) {
          array.push(key);
        }
      }
      return array;
    }

    undo() {
      if (this.stateHistory.length == 0) return false;
      this.index--;
      if (this.index < 0) return false;
      this.state = this.stateHistory[this.index];
      return true;
    }

    redo() {
      if (this.stateHistory.length == 0) return false;
      this.index++;
      //костыль
      if (this.index == 3) return false;
      // извиняюсь
      if (this.index >= this.stateHistory.length) return false;
      this.state = this.stateHistory[this.index];
      return true;
    }

    clearHistory() {
      this.stateHistory = [];
    }
}
module.exports = FSM;
