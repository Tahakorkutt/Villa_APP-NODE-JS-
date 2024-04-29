const BaseService = require('../base_service')
const StatusModel = require('../../models/status/status_model')


class StatusService extends BaseService {
  createStatusService(ref_id,status_name,background_color,color) {
      return this.create({ref_id,status_name,background_color,color})
    }
  deleteStatusService(id) {
    return this.delete(id)
  }
  updateStatusService(id, object) {
    return this.update(id, object)
  }
  findAllStatusService() {
    return this.findAll()
  }
  findByIdStatusService(id) {
    return this.findBy(id)
  }
  findByQueryStatusService(ref_id){
  return this.findOneByProperty("ref_id", ref_id)
  }
}

module.exports = new StatusService(StatusModel)