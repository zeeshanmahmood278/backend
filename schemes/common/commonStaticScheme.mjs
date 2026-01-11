const common = {
  findByFieldName: async function (filter) {
    return await this.find(filter);
  },
  _findById: async function (id) {
    return await this.findById(id);
  },
};

export default common;