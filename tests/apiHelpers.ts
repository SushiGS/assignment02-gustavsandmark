import { APIRequestContext } from "@playwright/test";

export class APIHelper{
    private baseUrl: string;
    private auth: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    async login(request: APIRequestContext, username: string, password: string){
        const response = (await request.post(`${this.baseUrl}/login`,{data:{username, password}}));
        const body = await response.json();
        const token = body.token;
        this.auth = JSON.stringify({username, token});
    }

    async getAllRooms(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`,{headers: {"X-User-Auth": this.auth}});
        return response;
        
    }

    async getAllClients(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/clients`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getAllBills(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/bills`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getAllReservations(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/reservations,`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getClientById(request: APIRequestContext, clientId: number) {
        const response = await request.get(`${this.baseUrl}/client/${clientId}`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async getRoomById(request: APIRequestContext, roomId: number) {
        const response = await request.get(`${this.baseUrl}/room/${roomId}`,{headers: {"X-User-Auth": this.auth}});
        return response;
    }

    async createNewRoom(request: APIRequestContext, payload: object){
        const response = await request.post(`${this.baseUrl}/room/new`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async deleteRoomById(request: APIRequestContext, roomId: number){
        const response = await request.delete(`${this.baseUrl}/room/${roomId}`,{
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            }
        });
        return response;
    }

    async editRoomById(request: APIRequestContext, roomId: number, payload: object) {
        const response = await request.put(`${this.baseUrl}/room/${roomId}`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: JSON.stringify(payload),
        });
        return response;
    }

    async createNewClient(request: APIRequestContext, payload: object){
        const response = await request.post(`${this.baseUrl}/client/new`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }
    
    async editClientById(request: APIRequestContext, clientId: number, payload: object){
        const response = await request.put(`${this.baseUrl}/client/${clientId}`, {
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            },
            data: payload
        });
        return response;
    }

    async deleteClientById(request: APIRequestContext, clientId: number){
        const response = await request.delete(`${this.baseUrl}/client/${clientId}`,{
            headers: {
                "X-User-Auth": this.auth,
                "Content-Type": "application/json"
            }
        });
        return response;
    }



}