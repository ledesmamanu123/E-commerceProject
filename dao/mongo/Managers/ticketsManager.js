import ticketsModel from "../Models/ticket.js";

export default class TicketsManager{
    createTicket = (cart)=>{
        return ticketsModel.create(cart);
    }
}