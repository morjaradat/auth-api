"use strict";

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    if (id) {
      return this.model.findOne({ id });
    } else {
      return this.model.findAll({});
    }
  }

  create(record) {
    return this.model.create(record);
  }

  async update(data) {
    try {
      this.model.update(data);
    } catch (error) {}
    if (!item) throw new Error(`Item with id ${id} not found`);
    return item.update(data);
  }

  async delete(data_id) {
    if (!data_id) {
      throw new Error("no id provided for model ", this.model);
    }
    try {
      let deleted = await this.model.destroy({ where: { id: data_id } });
      return deleted;
    } catch (e) {
      console.error("error in deleting record in model ", this.model);
    }
  }
}

module.exports = DataCollection;
