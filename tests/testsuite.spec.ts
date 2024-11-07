import { test, expect } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { randomGeneratedNewRoomPayload } from './testData';
import { randomGeneratedRoomEditPayload } from './testData';
import { randomGeneratedNewClientPayload } from './testData';
import { randomGeneratedClientEditPayload } from './testData';
import "dotenv/config";


const BASE_URL= 'http://localhost:3000/api';

test.describe('Test suite backend', () => {
  let apiHelper: APIHelper;

  test.beforeAll(async ({request}) => {
    apiHelper = new APIHelper(BASE_URL);
    const username = process.env.API_USERNAME ??"";
    const password = process.env.API_PASSWORD ??"";
    await apiHelper.login(request, username, password);
  })

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

  test('Delete Client by ID', async ({ request }) => {
    const getClients = await apiHelper.getAllClients(request);
    expect(getClients.ok()).toBeTruthy();
    const allClients = await getClients.json();
    const LastId = allClients[allClients.length - 1].id;

    const deleteRequest = await apiHelper.deleteClientById(request, LastId);
    expect(deleteRequest.ok()).toBeTruthy();

    const getClientById = await apiHelper.getClientById(request, LastId);
    expect(getClientById.status()).toBe(401);
    /// Ska egentligen testa för 404 istället för 401 men APIet är designat att skicka kod 401 om rummet inte finns.
  }); 

//logga ut 


})