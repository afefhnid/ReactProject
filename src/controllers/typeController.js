import Type from "../models/type";

class TypeConttoller {


    static async create(request, response) {
        let status = 200;
        let body = {};
        try {
            let type = await Type.create({
                name: request.body.name,
            });
            body = { type, 'message': `Type created` }
        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
    static async getType(request, response) {
        let status = 200;
        let body = {};
        try {
            let user = await Type.findById(request.params.id)
            body = { user, 'message': ' User Information' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
}
export default TypeConttoller;