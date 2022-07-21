export const carMock = {
  model: 'Ford Fiesta',
  year: 2010,
  color: 'Red',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 4,
}

export const carMockReturn = {
  _id: '123451234512345123451234',
  model: 'Ford Fiesta',
  year: 2010,
  color: 'Red',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 4,
}

export const validCarRequisitionMock = {
  model: 'Ford Fiesta',
  year: 2010,
  color: 'Red',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 4,
}

export const invalidCarRequisitionMock = {
  model: 'Ford Fiesta',
  year: 2010,
  color: 'Red',
  buyValue: 10000,
  seatsQty: 5,
  doorsQty: 900,
}

export const arrayOfCarsMock = [
  {
    _id: '123451234512345123451234',
    model: 'Ford Fiesta',
    year: 2010,
    color: 'Red',
    buyValue: 10000,
    seatsQty: 5,
    doorsQty: 4,
  },
  {
    _id: '123451234512345123451235',
    model: 'Ford Fiesta 2',
    year: 2010,
    color: 'Red',
    buyValue: 10000,
    seatsQty: 5,
    doorsQty: 4,
  },
]

export const zodErrorMock = {
  error: {
    issues: [
      {
        code: "too_big",
        maximum: 4,
        type: "number",
        inclusive: true,
        message: "Car doorsQty must be less than or equal 4",
        path: [
          "doorsQty"
        ]
      }
    ],
    name: "ZodError"
  }
}