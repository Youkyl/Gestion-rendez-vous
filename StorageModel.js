// StorageModel.js

export class StorageModel {
  constructor(storageKey) {
    this.storageKey = storageKey; 
  }

  save(data) {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(this.storageKey, jsonData);
      return true;
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return false;
    }
  }


  load() {
    try {
      const jsonData = localStorage.getItem(this.storageKey);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      return null;
    }
  }


  addItem(item) {
    const data = this.load() || [];
    data.push(item);
    return this.save(data);
  }


  updateItem(index, updatedItem) {
    const data = this.load() || [];
    if (index >= 0 && index < data.length) {
      data[index] = updatedItem;
      return this.save(data);
    }
    return false;
  }


  deleteItem(index) {
    const data = this.load() || [];
    if (index >= 0 && index < data.length) {
      data.splice(index, 1);
      return this.save(data);
    }
    return false;
  }


  clear() {
    localStorage.removeItem(this.storageKey);
    return true;
  }


  exists() {
    return localStorage.getItem(this.storageKey) !== null;
  }
}


// export default StorageModel;