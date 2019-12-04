import Company from "../models/company";

class CompanyController {

    static async  list(req, response) {
        let status = 200;
        let body = {};
        try {
            let company = await Company.find();
            body = { company, 'message': 'List company' };
        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
    static async  getTickets(req, response) {
        let status = 200;
        let body = {};
        let tickets = [];
        try {
            let company = await Company.find();
            company.map((item, index) => {

                item.ticket.map((item, index) => {
                    tickets.push(item);
                });
            });
            body = { tickets, 'message': 'List company' };
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
            let company = await Company.create({
                name: request.body.name,
                destination: request.body.destination,
                birthdayCompany: request.body.birthdayCompany,
                description: request.body.description,
                image: request.body.image,
                ticket: request.body.ticket,
            });
            body = { company, 'message': `company created` }
        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
    static async getCompanyByName(request, response) {
        let status = 200;
        let body = {};
        try {
            console.log("test");
            let company = await Company.findOne({ name: request.body.name });
            console.log(company);
            body = { company, 'message': `company By Nmae` }
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
            let id = request.params.id;
            let company = await Company.findById(id);
            body = { company, 'message': ' User Information' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }
    /**
 * Delete Company
 * @param {Request} request 
 * @param {Response} response 
 */

    static async delete(request, response) {
        let status = 200;
        let body = {};
        try {
            let id = request.params.id;
            await Company.deleteOne({ _id: id });
            body = { 'message': ' Company delete' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }

    /**
* Update Company
* @param {Request} request 
* @param {Response} response 
*/
    static async update(request, response) {
        let status = 200;
        let body = {};
        try {
            let company = await Company.findById(request.params.id);
            Object.assign(company, request.body);
            await company.save();
            body = { company, 'message': ' Company Update' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }

    static async updateTicket(request, response) {
        let status = 200;
        let body = {};

        try {
            let idCompany = request.params.idCompany;
            let company = await Company.findById(idCompany);
            //console.log(company);
            let tickets = company.ticket;

            let ticket = tickets.find(item => item.id === request.params.idTicket);
            Object.assign(ticket, request.body);

            let index = tickets.findIndex(item => item.id === request.params.idTicket);
            console.log(index);
            tickets[index] = ticket;

            company.ticket = tickets;
            await company.save();
            body = { company, 'message': ' ticket create' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);
    }


    static async getTicketByUser(request, response) {
        let status = 200;
        let body = {};

        try {
            let idUser = request.params.idUser;
            let company = await Company.find();
            let tickets = [];
            company.map((item, index) => {
                item.ticket.map((item1, index) => {
                    if (item1.user_id == request.params.idUser) {
                        tickets.push(item1);
                        body = { tickets, 'message': ' ticket user' };
                    } else {
                        console.log("non");
                    }
                });
            });
        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);

    }
    static async addTicket(request, response) {
        let status = 200;
        let body = {};

        try {
            let id = request.params.id;
            let company = await Company.findById(id);
            console.log(company);
            let tickets = company.ticket;
            let ticket = {
                destination: request.body.destination,
                date: request.body.date,
                prix: request.body.prix,
                isSold: request.body.isSold,
                company_id: id,
                user_id: request.body.user_id

            };
            tickets.push(ticket);
            company.ticket = tickets;
            await company.save();

            body = { company, 'message': ' ticket create' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);

    }
    static async deleteTicket(request, response) {
        let status = 200;
        let body = {};

        try {
            let idCompany = request.params.idCompany;
            let company = await Company.findById(idCompany);
            console.log(company);
            let tickets = company.ticket;

            tickets.map((item, index) => {
                if (item.id === request.params.idTicket) {
                    tickets.splice(index, 1);
                }
            })

            await company.save();

            body = { company, 'message': ' ticket create' };

        } catch (error) {
            status = 500;
            body = { 'message': error.message };
        }
        return response.status(status).json(body);

    }
}
export default CompanyController;