import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { randomGeneratedNewRoomPayload } from './testData';
import { randomGeneratedRoomEditPayload } from './testData';
import { randomGeneratedNewClientPayload } from './testData';
import { randomGeneratedClientEditPayload } from './testData';
import { randomGeneratedNewBillPayload } from './testData';
import { randomGeneratedBillEditPayload } from './testData';
import { randomGeneratedNewReservationPayload } from './testData';
import { randomGeneratedReservationEditPayload } from './testData';
import "dotenv/config";

test.describe('Test suite backend', () => {
  let apiHelper: APIHelper;

  test.beforeAll(async ({request}) => {
    apiHelper = new APIHelper();
    const username = process.env.API_USERNAME ??"";
    const password = process.env.API_PASSWORD ??"";
    await apiHelper.login(request, username, password);
  })

  //GET
  test('Get all Rooms', async ({ request }) => {
    const getRooms = await apiHelper.getAllRooms(request);
    expect(getRooms.ok()).toBeTruthy();
  });

  test('Get all Clients', async ({ request }) => {
    const getClients = await apiHelper.getAllClients(request);
    expect(getClients.ok()).toBeTruthy();
  });

  test('Get all Bills', async ({ request }) => {
    const getBills = await apiHelper.getAllBills(request);
    expect(getBills.ok()).toBeTruthy();
  });

  test('Get all Reservations', async ({ request }) => {
    const getReservations = await apiHelper.getAllReservations(request);
    expect(getReservations.ok()).toBeTruthy();
  });

  test('Get room by ID', async ({ request }) => {
    const getRooms = await apiHelper.getRoomById(request,1);
    expect(getRooms.ok()).toBeTruthy();
  });

  test('Get Client by ID', async ({ request }) => {
    const getClients = await apiHelper.getClientById(request,1);
    expect(getClients.ok()).toBeTruthy();
  });

  test('Get Bill by ID', async ({ request }) => {
    const getBills = await apiHelper.getBillById(request,1);
    expect(getBills.ok()).toBeTruthy();
  });

  test('Get Reservation by ID', async ({ request }) => {
    const getReservations = await apiHelper.getReservationById(request,1);
    expect(getReservations.ok()).toBeTruthy();
  });

  //POST
  test('Create New Room', async ({ request }) => {
    const payload = randomGeneratedNewRoomPayload();
    const createRoomResponse = await apiHelper.createNewRoom(request, payload);
    expect(createRoomResponse.ok()).toBeTruthy();

    expect(await createRoomResponse.json()).toMatchObject({
      category: payload.category,
      floor: payload.floor,
      number: payload.number,
      available: payload.available,
      price: payload.price,
      features: payload.features
    })

    const getRooms = await apiHelper.getAllRooms(request);
    expect(getRooms.ok()).toBeTruthy();
    expect(await getRooms.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: payload.category,
          floor: payload.floor,
          number: payload.number,
          available: payload.available,
          price: payload.price,
          features: payload.features
        })
      ])
    )
  });

  test('Create New Client', async ({ request }) => {
    const payload = randomGeneratedNewClientPayload();
    const createClientResponse = await apiHelper.createNewClient(request, payload);
    expect(createClientResponse.ok()).toBeTruthy();

    expect(await createClientResponse.json()).toMatchObject({
      name: payload.name,
		  email: payload.email,
		  telephone: payload.telephone
    })

    const getClients = await apiHelper.getAllClients(request);
    expect(getClients.ok()).toBeTruthy();
    expect(await getClients.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: payload.name,
		      email: payload.email,
		      telephone: payload.telephone
        })
      ])
    )
  });

  test('Create New Bill', async ({ request }) => {
    const payload = randomGeneratedNewBillPayload();
    const createBillResponse = await apiHelper.createNewBill(request, payload);
    expect(createBillResponse.ok()).toBeTruthy();

    expect(await createBillResponse.json()).toMatchObject({
      value: payload.value,
		  paid: payload.paid
    })

    const getBills = await apiHelper.getAllBills(request);
    expect(getBills.ok()).toBeTruthy();
    expect(await getBills.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: payload.value,
          paid: payload.paid
        })
      ])
    )
  });

  test('Create New Reservation', async ({ request }) => {
    const payload = randomGeneratedNewReservationPayload();
    const createReservationResponse = await apiHelper.createNewReservation(request, payload);
    expect(createReservationResponse.ok()).toBeTruthy();

    expect(await createReservationResponse.json()).toMatchObject({
      start: payload.start,
		  end: payload.end,
      client: payload.client,
		  room: payload.room,
		  bill: payload.bill
    })

    const getReservations = await apiHelper.getAllReservations(request);
    expect(getReservations.ok()).toBeTruthy();
    expect(await getReservations.json()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          start: payload.start,
          end: payload.end,
          client: payload.client,
          room: payload.room,
          bill: payload.bill
        })
      ])
    )
  });

  //PUT
  test('Edit Room by ID', async ({ request }) => {
    const getRooms = await apiHelper.getAllRooms(request);
    expect(getRooms.ok()).toBeTruthy();

    const allRooms = await getRooms.json();
    const roomId = allRooms[0].id;

    const getRoomResponse = await apiHelper.getRoomById(request, roomId);
    expect(getRoomResponse.ok()).toBeTruthy();
    const existingRoomPayload = await getRoomResponse.json();

    const updatedPayload = randomGeneratedRoomEditPayload(existingRoomPayload);

    const editRoomResponse = await apiHelper.editRoomById(request, roomId, updatedPayload);
    expect(editRoomResponse.ok()).toBeTruthy();

    const getUpdatedRoomResponse = await apiHelper.getRoomById(request, roomId);
    expect(getUpdatedRoomResponse.ok()).toBeTruthy();
    
    const updatedRoom = await getUpdatedRoomResponse.json();
    expect(updatedRoom).toMatchObject(updatedPayload);
  });

  test('Edit Client by ID', async ({ request }) => {
    const getClients = await apiHelper.getAllClients(request);
    expect(getClients.ok()).toBeTruthy();

    const allClients = await getClients.json();
    const clientId = allClients[0].id;

    const getClientresponse = await apiHelper.getRoomById(request, clientId);
    expect(getClientresponse.ok()).toBeTruthy();
    const existingClientPayload = await getClientresponse.json();

    const updatedPayload = randomGeneratedClientEditPayload(existingClientPayload);

    const editClientResponse = await apiHelper.editClientById(request, clientId, updatedPayload);
    expect(editClientResponse.ok()).toBeTruthy();

    const getUpdatedClientResponse = await apiHelper.getClientById(request, clientId);
    expect(getUpdatedClientResponse.ok()).toBeTruthy();
    
    const updatedClient = await getUpdatedClientResponse.json();
    expect(updatedClient).toMatchObject(updatedPayload);
  });

  test('Edit Bill by ID', async ({ request }) => {
    const getBills = await apiHelper.getAllBills(request);
    expect(getBills.ok()).toBeTruthy();

    const allBIlls = await getBills.json();
    const billId = allBIlls[0].id;

    const getBillresponse = await apiHelper.getBillById(request, billId);
    expect(getBillresponse.ok()).toBeTruthy();
    const existingBillPayload = await getBillresponse.json();

    const updatedPayload = randomGeneratedBillEditPayload(existingBillPayload);

    const editBillResponse = await apiHelper.editBillById(request, billId, updatedPayload);
    expect(editBillResponse.ok()).toBeTruthy();

    const getUpdatedBillResponse = await apiHelper.getBillById(request, billId);
    expect(getUpdatedBillResponse.ok()).toBeTruthy();
    
    const updatedBill = await getUpdatedBillResponse.json();
    expect(updatedBill).toMatchObject(updatedPayload);
  });

  test('Edit Reservation by ID', async ({ request }) => {
    const getReservations = await apiHelper.getAllReservations(request);
    expect(getReservations.ok()).toBeTruthy();

    const allReservations = await getReservations.json();
    const reservationId = allReservations[0].id;

    const getReservationResponse = await apiHelper.getReservationById(request, reservationId);
    expect(getReservationResponse.ok()).toBeTruthy();
    const existingReservationPayload = await getReservationResponse.json();

    const updatedPayload = randomGeneratedReservationEditPayload(existingReservationPayload);

    const editReservationResponse = await apiHelper.editReservationById(request, reservationId, updatedPayload);
    expect(editReservationResponse.ok()).toBeTruthy();

    const getUpdatedReservationResponse = await apiHelper.getReservationById(request, reservationId);
    expect(getUpdatedReservationResponse.ok()).toBeTruthy();
    
    const updatedReservation = await getUpdatedReservationResponse.json();
    expect(updatedReservation).toMatchObject(updatedPayload);
  });

  //DELETE
  test('Delete Room by ID', async ({ request }) => {
    const getRooms = await apiHelper.getAllRooms(request);
    expect(getRooms.ok()).toBeTruthy();
    const allRooms = await getRooms.json();
    const lastId = allRooms[allRooms.length - 1].id;

    const deleteRequest = await apiHelper.deleteRoomById(request, lastId);
    expect(deleteRequest.ok()).toBeTruthy();

    const getRoomById = await apiHelper.getRoomById(request, lastId);
    expect(getRoomById.status()).toBe(401);
    /// Ska egentligen testa för 404 istället för 401 men APIet är designat att skicka kod 401 om rummet inte finns.
  }); 

  test('Delete Client by ID', async ({ request }) => {
    const getClients = await apiHelper.getAllClients(request);
    expect(getClients.ok()).toBeTruthy();
    const allClients = await getClients.json();
    const LastId = allClients[allClients.length - 1].id;

    const deleteRequest = await apiHelper.deleteClientById(request, LastId);
    expect(deleteRequest.ok()).toBeTruthy();

    const getClientById = await apiHelper.getClientById(request, LastId);
    expect(getClientById.status()).toBe(401);
    /// Ska egentligen testa för 404 istället för 401 men APIet är designat att skicka kod 401 om Client inte finns.
  }); 

  test('Delete Bill by ID', async ({ request }) => {
    const getBills = await apiHelper.getAllBills(request);
    expect(getBills.ok()).toBeTruthy();
    const allBills = await getBills.json();
    const LastId = allBills[allBills.length - 1].id;

    const deleteRequest = await apiHelper.deleteBillById(request, LastId);
    expect(deleteRequest.ok()).toBeTruthy();

    const getBillById = await apiHelper.getBillById(request, LastId);
    expect(getBillById.status()).toBe(401);
    /// Ska egentligen testa för 404 istället för 401 men APIet är designat att skicka kod 401 om Bill inte finns.
  }); 

  test('Delete Reservation by ID', async ({ request }) => {
    const getReservations = await apiHelper.getAllReservations(request);
    expect(getReservations.ok()).toBeTruthy();
    const allReservations = await getReservations.json();
    const LastId = allReservations[allReservations.length - 1].id;

    const deleteRequest = await apiHelper.deleteReservationById(request, LastId);
    expect(deleteRequest.ok()).toBeTruthy();

    const getReservationById = await apiHelper.getReservationById(request, LastId);
    expect(getReservationById.status()).toBe(401);
    /// Ska egentligen testa för 404 istället för 401 men APIet är designat att skicka kod 401 om Reservation inte finns.
  }); 

  //LOGOUT / LOGIN
  test('Logout', async ({ request }) => {
    const logoutResponse = await apiHelper.logout(request);
    expect(logoutResponse.status()).toBe(200);
  });

  test('Login with wrong USERNAME/PASSWORD', async ({ request }) => {
    const logoutResponse = await apiHelper.logout(request);
    expect(logoutResponse.status()).toBe(200);

    const loginResponse = await apiHelper.loginWithWrongUsernamePassword(request,"bajs","korv");
    expect(loginResponse.status()).toBe(401);
  });

})