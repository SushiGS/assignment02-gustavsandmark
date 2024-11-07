import { faker } from "@faker-js/faker";

export const randomGeneratedNewRoomPayload = () => {
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

export const randomGeneratedRoomEditPayload = (existingRoomPayload: object) => {
    return {
        ...existingRoomPayload,
        category: 'suite',
        floor: faker.number.int({ min: 1, max: 100 }),
        number: faker.number.int({ min: 101, max: 500 }),
        price: faker.number.int({ min: 501, max: 10000 }),
        features: ['balcony', 'view'],
    };
};

export const randomGeneratedNewClientPayload = () => {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        telephone: faker.phone.number()
    };
};

export const randomGeneratedClientEditPayload = (existingClientPayload: object) => {
    return {
        ...existingClientPayload,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        telephone: faker.phone.number()
    };
};
