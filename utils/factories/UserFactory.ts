import { faker } from '@faker-js/faker';

export interface UserData {
  // ── Login Info ──
  name:      string;
  email:     string;
  password:  string;

  // ── Personal Info ──
  title:     'Mr' | 'Mrs';
  firstName: string;
  lastName:  string;
  day:       string;
  month:     string;
  year:      string;

  // ── Address Info ──
  company:   string;
  address1:  string;
  address2:  string;
  country:   string;
  state:     string;
  city:      string;
  zipcode:   string;
  mobile:    string;
}

export class UserFactory {

  // ── Generate Complete Random User ──
  static generate(): UserData {

    const firstName = faker.person.firstName('male');
    const lastName  = faker.person.lastName();

    return {
      // ── Login Info ──
      name:      `${firstName} ${lastName}`,
      email:     faker.internet.email({
                   firstName,
                   lastName,
                   provider: 'testmail.com'
                 }),
      password:  'Test@1234',

      // ── Personal Info ──
      title:     'Mr',
      firstName: firstName,
      lastName:  lastName,
      day:       String(faker.number.int({ min: 1, max: 28 })),
      month:     String(faker.number.int({ min: 1, max: 12 })),
      year:      String(faker.number.int({ min: 1980, max: 2000 })),

      // ── Address Info ──
      company:   faker.company.name(),
      address1:  faker.location.streetAddress(),
      address2:  faker.location.secondaryAddress(),
      country:   'India',
      state:     'Telangana',
      city:      'Hyderabad',
      zipcode:   '500001',
      mobile:    faker.phone.number({ style: 'national' }),
    };
  }

  // ── Generate Just Login Credentials ──
  static generateCredentials() {
    return {
      email:    faker.internet.email({ provider: 'testmail.com' }),
      password: 'Test@1234',
    };
  }


  
}

// ── Product Data ──
export const ProductData = {

  // All available products on site
  products: [
    'Blue Top',
    'Men Tshirt',
    'Sleeveless Dress',
    'Stylish Dress',
    'Winter Top',
    'Summer White Top',
    'Madame Top For Women',
    'Fancy Green Top',
  ],

  // Get random product from list
  getRandom(): string {
    const index = Math.floor(
      Math.random() * this.products.length
    );
    return this.products[index];
  },

  // Get specific product by index
  getByIndex(index: number): string {
    return this.products[index];
  },

  // Fixed products for specific tests
  featured: {
    mens:    'Men Tshirt',
    womens:  'Blue Top',
    dress:   'Sleeveless Dress',
  }
};