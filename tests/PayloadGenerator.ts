import { faker } from "@faker-js/faker";

export class PayloadGenerator {
    static randomGeneratedNewRoomPayload = () => {
        return {
            category: 'double',
            floor: faker.number.int({ min: 10, max: 100 }),
            number: faker.number.int({ min: 101, max: 500 }),
            available: true,
            price: faker.number.int({ min: 501, max: 10000 }),
            features: [
                'balcony', 'ensuite'
            ]
        };
    };

    static randomGeneratedRoomEditPayload = (existingRoomPayload: object) => {
        return {
            ...existingRoomPayload,
            category: 'suite',
            floor: faker.number.int({ min: 1, max: 100 }),
            number: faker.number.int({ min: 101, max: 500 }),
            price: faker.number.int({ min: 501, max: 10000 }),
            features: ['balcony', 'view'],
        };
    };

    static randomGeneratedNewClientPayload = () => {
        return {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            telephone: faker.phone.number()
        };
    };

    static randomGeneratedClientEditPayload = (existingClientPayload: object) => {
        return {
            ...existingClientPayload,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            telephone: faker.phone.number()
        };
    };

    static randomGeneratedNewBillPayload = () => {
        return {
            value: faker.number.int({ min: 500, max: 100000 }),
            paid: false
        };
    };

    static randomGeneratedBillEditPayload = (existingBillPayload: object) => {
        return {
            ...existingBillPayload,
            value: faker.number.int({ min: 500, max: 100000 }),
            paid: true
        };
    };

    static randomGeneratedNewReservationPayload = () => {
        return {
            start: faker.date.soon().toISOString().slice(0, 10),
            end: faker.date.soon().toISOString().slice(0, 10),
            client: 1,
            room: 1,
            bill: 1
        };
    };

    static randomGeneratedReservationEditPayload = (existingReservationPayload: object) => {
        return {
            ...existingReservationPayload,
            start: faker.date.soon().toISOString().slice(0, 10),
            end: faker.date.soon().toISOString().slice(0, 10),
            client: 2,
            room: 2,
            bill: 2
        };
    };




}


