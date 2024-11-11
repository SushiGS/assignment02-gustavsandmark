import { APIRequestContext } from "@playwright/test";

export class APIHelper{
    // private baseUrl: string;
    private auth: string;

    constructor(){
        // this.baseUrl = baseUrl;
    }

    //LOGIN/LOGOUT
    async login(request: APIRequestContext, username: string, password: string){
        const response = (await request.post(`api/login`,{data:{username, password}}));
        const body = await response.json();
        const token = body.token;
        this.auth = JSON.stringify({username, token});
    }

    async logout(request: APIRequestContext) {
        const response = await request.post(`api/logout`);
        return response;
    }

    async loginWithWrongUsernamePassword(request: APIRequestContext, wrongUsername: string, wrongPassword: string){
        await request.post(`api/logout`);
        const responselogin = (await request.post(`api/login`,{data:{wrongUsername, wrongPassword}}));
        const body = await responselogin.json();
        const token = body.token;
        this.auth = JSON.stringify({wrongUsername, wrongPassword});
        return responselogin;
    }

    //GET
    async getAllRooms(request: APIRequestContext) {
        const response = await request.get(`api/rooms`,{headers: {"X-User-Auth": this.auth}});
        return response;
        
    }

    async getAllClients(request: APIRequestContext) {
        const response = await request.get(`api/clients`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getAllBills(request: APIRequestContext) {
        const response = await request.get(`api/bills`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getAllReservations(request: APIRequestContext) {
        const response = await request.get(`api/reservations`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getClientById(request: APIRequestContext, clientId: number) {
        const response = await request.get(`api/client/${clientId}`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getRoomById(request: APIRequestContext, roomId: number) {
        const response = await request.get(`api/room/${roomId}`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getBillById(request: APIRequestContext, billId: number) {
        const response = await request.get(`api/bill/${billId}`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getReservationById(request: APIRequestContext, reservationId: number) {
        const response = await request.get(`api/reservation/${reservationId}`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    //POST
    async createNewRoom(request: APIRequestContext, payload: object){
        const response = await request.post(`api/room/new`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async createNewClient(request: APIRequestContext, payload: object){
        const response = await request.post(`api/client/new`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async createNewBill(request: APIRequestContext, payload: object){
        const response = await request.post(`api/bill/new`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async createNewReservation(request: APIRequestContext, payload: object){
        const response = await request.post(`api/reservation/new`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    //PUT
    async editRoomById(request: APIRequestContext, roomId: number, payload: object) {
        const response = await request.put(`api/room/${roomId}`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(payload),
        });
        return response;
    }

    async editClientById(request: APIRequestContext, clientId: number, payload: object){
        const response = await request.put(`api/client/${clientId}`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async editBillById(request: APIRequestContext, billId: number, payload: object){
        const response = await request.put(`api/bill/${billId}`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async editReservationById(request: APIRequestContext, reservationId: number, payload: object){
        const response = await request.put(`api/reservation/${reservationId}`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    //DELETE
    async deleteClientById(request: APIRequestContext, clientId: number){
        const response = await request.delete(`api/client/${clientId}`,{
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            }
        });
        return response;
    }

    async deleteRoomById(request: APIRequestContext, roomId: number){
        const response = await request.delete(`api/room/${roomId}`,{
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            }
        });
        return response;
    }

    async deleteBillById(request: APIRequestContext, billId: number){
        const response = await request.delete(`api/bill/${billId}`,{
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            }
        });
        return response;
    }

    async deleteReservationById(request: APIRequestContext, reservationId: number){
        const response = await request.delete(`api/reservation/${reservationId}`,{
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            }
        });
        return response;
    }

}