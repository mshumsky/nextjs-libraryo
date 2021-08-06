import store from "../redux";
import {STORAGE_SYNC} from "../redux/actions";

class StorageItem {
  data = undefined;
  onChange = undefined;

  constructor(data, onChange) {
    this.data = data;
    this.onChange = onChange;
  }

  update(obj) {
    for (let key in obj) key !== "id" && (this.data[key] = obj[key]);

    this.onChange();
  }
}

class StorageStack {
  data = undefined;
  onChange = undefined;

  constructor(data, onChange) {
    this.data = data;
    this.onChange = onChange;
  }

  findById(id) {
    const item = this.data[id];
    return item ? new StorageItem(item, this.onChange) : false;
  }

  insert(item) {
    const ids = Object.keys(this.data).sort((a, b) => a - b);
    const nextId = +ids[ids.length - 1] + 1;
    item.id = isNaN(nextId) ? 1 : nextId;
    this.data[item.id] = item;
    this.onChange();
    return item.id;
  }

  deleteById(id) {
    delete this.data[id];
    this.onChange();
  }
}

export default class StorageMgr {
  itemKey = undefined;
  db = undefined;

  constructor(itemKey) {
    const jsonData = localStorage.getItem(itemKey);

    if (!jsonData) {
      localStorage.setItem(itemKey, JSON.stringify({}));
      this.db = {};
    }

    this.db = JSON.parse(jsonData) || {};
    this.itemKey = itemKey;
  }

  getStack(key, wrapper) {
    const stack = this.db.hasOwnProperty(key) && this.db[key];
    if (!stack) {
      this.db[key] = {};
      this.onStackChange();
    }

    for (let key in stack) {
      if (!wrapper) break;
      const item = stack[key];
      stack[key] = wrapper(item);
    }

    wrapper && this.onStackChange();

    return new StorageStack(this.db[key], this.onStackChange.bind(this));
  }

  onStackChange() {
    store.dispatch({ type: STORAGE_SYNC, payload: this.db });
    localStorage.setItem(this.itemKey, JSON.stringify(this.db));
  }
}
