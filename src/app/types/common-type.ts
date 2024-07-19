
export interface Profile {
    firstName: String,
    lastName: String,
    email: String,
    gender: string,
    age: Number,
    doctorDetails: [{ id: string, slot: string }],
    address: Address[]
}

export interface Address {
    _id: String,
    name: String,
    houseNo: Number,
    street: String,
    city: String,
    state: String,
    phone: String,
    pincode: Number,
    landmark?: String
}


export interface Medicine {
    _id: String,
    name: String,
    description: String,
    qty: Number,
    cost: Number,
    imageUrl: String
}
export interface Cart {
    _id: String,
    name: String,
    medicineId: String,
    qty: number,
    actualCost: number,
    imageUrl: String
}

export interface Carts {
    cartId: String,
    carts: Cart[]
}

export interface State { id: Number, name: String, iso2: String }