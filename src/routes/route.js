import { Router } from 'express';
import UserController from '../controllers/userController';
import CompanyController from '../controllers/companyController';
import TypeConttoller from '../controllers/typeController';
const router = Router();
//user
router.put('/users/:id', UserController.update);
router.get('/users/:id', UserController.details);
router.get('/users', UserController.list);
router.post('/users', UserController.create);
router.post('/users/authentication', UserController.authentication);


router.delete('/users/:id', UserController.delete);



//compagny
router.post('/companys/name', CompanyController.getCompanyByName);
router.get('/companys', CompanyController.list);
router.get('/companys/tickets', CompanyController.getTickets);
router.get('/companys/:id', CompanyController.details);
router.post('/companys', CompanyController.create);
router.delete('/companys/:id', CompanyController.delete);
router.put('/companys/:id', CompanyController.update);
router.post('/companys/:id/ticket', CompanyController.addTicket);
router.delete('/companys/:idCompany/ticket/:idTicket', CompanyController.deleteTicket);
router.put('/companys/:idCompany/ticket/:idTicket', CompanyController.updateTicket);
router.get('/companys/ticket/:idUser', CompanyController.getTicketByUser);

//type
router.post('/types/:id', TypeConttoller.getType);
router.post('/types', TypeConttoller.create);


export default router;