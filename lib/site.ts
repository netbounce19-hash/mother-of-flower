/**
 * Single source of truth for business contact details.
 *
 * These used to be hardcoded separately in the footer, contact hero and
 * location section, which had drifted into three different phone numbers,
 * three mailboxes and two opening-hour schedules. Import from here instead.
 */

export const site = {
  name: 'Mother of Flower',
  city: 'Las Vegas',
  url: 'https://motherofflower.com',

  phone: {
    display: '+1 (725) 224-2454',
    href: 'tel:+17252242454',
  },

  email: 'info@motherofflower.com',

  address: {
    street: '7710 Eastgate Rd',
    city: 'Henderson',
    state: 'NV',
    zip: '89011',
    get line1() {
      return this.street;
    },
    get line2() {
      return `${this.city}, ${this.state} ${this.zip}`;
    },
    get full() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
    mapsUrl:
      'https://maps.google.com/?q=7710+Eastgate+Rd,+Henderson,+NV+89011',
  },

  hours: {
    display: 'Mon – Sun, 10:00 AM – 7:00 PM',
    short: 'Mon–Sun: 10:00 AM – 7:00 PM',
    /** Machine-readable for LocalBusiness structured data. */
    schema: 'Mo-Su 10:00-19:00',
  },

  social: {
    instagram: 'https://www.instagram.com/mother_of_flower/',
  },

  /** Cut-off for same-day delivery, referenced in the partnerships copy. */
  sameDayCutoff: '2 PM',
} as const;
