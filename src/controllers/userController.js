import User from "../models/user";

class UserController {

    static async  list(req, response) {
        let status = 200;
        let body = {};
        try {
            let users = await User.find().populate('type_id');
            body = { users, 'message': 'List users' };
        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }

    static async create(request, response) {
        let status = 200;
        let body = {};
        try {
            let user = await User.create({
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                type_id: request.body.type_id
            });
            body = { user, 'message': `User created` }
        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }

    static async details(request, response) {
        let status = 200;
        let body = {};
        try {
            let user = await User.findById(request.params.id).populate('type_id');
            body = { user, 'message': ' User Information' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
    /**
 * Delete User
 * @param {Request} request 
 * @param {Response} response 
 */

    static async delete(request, response) {
        let status = 200;
        let body = {};
        try {
            let id = request.params.id;
            console.log(id)
            await User.deleteOne({ _id: id });
            body = { 'message': ' User delete' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }




    static async authentication(request, response) {
        let status = 200;
        let body = {};
        try {
            let user = await User.findOne({ email: request.body.email }).populate('type_id');;
            if (user.password === request.body.password) {
                body = { user, 'message': ' User auth' };
            }


        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
    /**
* Update User
* @param {Request} request 
* @param {Response} response 
*/
    static async update(request, response) {
        let status = 200;
        let body = {};
        try {
            let user = await User.findById(request.params.id);
            console.log(user);
            Object.assign(user, request.body);
            await user.save();
            body = { user, 'message': ' User Information' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
}
export default UserController;