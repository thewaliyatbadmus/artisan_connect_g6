export const USERS = [
  { id: 'u1', name: 'Amina Osei',    email: 'amina.osei@email.com',    role: 'customer', joined: '2024-01-15', status: 'active'   },
  { id: 'u2', name: 'Kofi Mensah',   email: 'kofi.mensah@email.com',   role: 'customer', joined: '2024-02-08', status: 'active'   },
  { id: 'u3', name: 'Fatima Diallo', email: 'fatima.diallo@email.com', role: 'customer', joined: '2024-02-20', status: 'active'   },
  { id: 'u4', name: 'Yaw Darko',     email: 'yaw.darko@email.com',     role: 'customer', joined: '2024-03-05', status: 'inactive' },
  { id: 'u5', name: 'Nneka Adeyemi', email: 'nneka.adeyemi@email.com', role: 'customer', joined: '2024-03-18', status: 'active'   },
  { id: 'u6', name: 'Samuel Owusu',  email: 'samuel.owusu@email.com',  role: 'customer', joined: '2024-04-01', status: 'active'   },
  { id: 'u7', name: 'Afia Asante',   email: 'afia.asante@email.com',   role: 'customer', joined: '2024-04-22', status: 'active'   },
  { id: 'u8', name: 'Emeka Nwosu',   email: 'emeka.nwosu@email.com',   role: 'customer', joined: '2024-05-11', status: 'active'   },
];

export const ARTISANS = [
  { id: 'a1', name: 'Chukwu Ikenna',  email: 'chukwu@email.com',   skill: 'Electrician',   location: 'Lagos, Nigeria',  rating: 4.8, reviews: 34, status: 'approved', available: true,  initials: 'CI' },
  { id: 'a2', name: 'Bola Adewale',   email: 'bola@email.com',     skill: 'Plumber',        location: 'Accra, Ghana',    rating: 4.5, reviews: 22, status: 'approved', available: true,  initials: 'BA' },
  { id: 'a3', name: 'Zainab Musa',    email: 'zainab@email.com',   skill: 'Tailor',         location: 'Abuja, Nigeria',  rating: 4.9, reviews: 57, status: 'approved', available: false, initials: 'ZM' },
  { id: 'a4', name: 'Kwame Boateng',  email: 'kwame@email.com',    skill: 'Carpenter',      location: 'Kumasi, Ghana',   rating: 4.6, reviews: 19, status: 'approved', available: true,  initials: 'KB' },
  { id: 'a5', name: 'Ngozi Eze',      email: 'ngozi@email.com',    skill: 'Hair Stylist',   location: 'Enugu, Nigeria',  rating: 4.7, reviews: 41, status: 'approved', available: true,  initials: 'NE' },
  { id: 'a6', name: 'Mamadou Camara', email: 'mamadou@email.com',  skill: 'Painter',        location: 'Dakar, Senegal',  rating: 0,   reviews: 0,  status: 'pending',  available: false, initials: 'MC' },
  { id: 'a7', name: 'Aisha Traoré',   email: 'aisha@email.com',    skill: 'Welder',         location: 'Bamako, Mali',    rating: 0,   reviews: 0,  status: 'pending',  available: false, initials: 'AT' },
  { id: 'a8', name: 'Damilola Bello', email: 'dami@email.com',     skill: 'Tiler',          location: 'Ibadan, Nigeria', rating: 0,   reviews: 0,  status: 'pending',  available: false, initials: 'DB' },
  { id: 'a9', name: 'Seun Adebayo',   email: 'seun@email.com',     skill: 'AC Technician',  location: 'Lagos, Nigeria',  rating: 3.8, reviews: 7,  status: 'rejected', available: false, initials: 'SA' },
];

export const BOOKINGS = [
  { id: 'BK001', customerId: 'u1', artisanId: 'a1', service: 'Electrical Wiring',  date: '2024-06-10', status: 'completed' },
  { id: 'BK002', customerId: 'u2', artisanId: 'a2', service: 'Pipe Repair',         date: '2024-06-12', status: 'confirmed' },
  { id: 'BK003', customerId: 'u3', artisanId: 'a3', service: 'Wedding Dress',       date: '2024-06-14', status: 'pending'   },
  { id: 'BK004', customerId: 'u4', artisanId: 'a4', service: 'Cabinet Build',       date: '2024-06-15', status: 'cancelled' },
  { id: 'BK005', customerId: 'u5', artisanId: 'a5', service: 'Hair Treatment',      date: '2024-06-17', status: 'confirmed' },
  { id: 'BK006', customerId: 'u6', artisanId: 'a1', service: 'Power Installation', date: '2024-06-18', status: 'pending'   },
  { id: 'BK007', customerId: 'u7', artisanId: 'a2', service: 'Bathroom Plumbing',  date: '2024-06-20', status: 'completed' },
  { id: 'BK008', customerId: 'u8', artisanId: 'a3', service: 'School Uniform',     date: '2024-06-22', status: 'confirmed' },
  { id: 'BK009', customerId: 'u1', artisanId: 'a4', service: 'Shelf Installation', date: '2024-06-24', status: 'pending'   },
  { id: 'BK010', customerId: 'u2', artisanId: 'a5', service: 'Braiding',           date: '2024-06-25', status: 'confirmed' },
  { id: 'BK011', customerId: 'u3', artisanId: 'a1', service: 'Generator Setup',    date: '2024-06-26', status: 'pending'   },
  { id: 'BK012', customerId: 'u5', artisanId: 'a4', service: 'Door Frame Fix',     date: '2024-06-27', status: 'completed' },
];

export const INITIAL_REVIEWS = [
  { id: 'r1', artisanId: 'a1', author: 'Amina Osei',    rating: 5, comment: 'Super professional, fixed everything quickly. Highly recommend!', date: '2024-06-11', status: 'approved' },
  { id: 'r2', artisanId: 'a2', author: 'Kofi Mensah',   rating: 4, comment: 'Good work overall, was a bit late but the quality was great.',     date: '2024-06-13', status: 'approved' },
  { id: 'r3', artisanId: 'a3', author: 'Fatima Diallo', rating: 5, comment: 'My dress was absolutely perfect. Zainab is a genius!',             date: '2024-06-14', status: 'approved' },
  { id: 'r4', artisanId: 'a5', author: 'Nneka Adeyemi',  rating: 5, comment: 'Best hair experience I have had. Will be back next month.',        date: '2024-06-18', status: 'pending'  },
  { id: 'r5', artisanId: 'a4', author: 'Afia Asante',   rating: 4, comment: 'Good craftsmanship on the shelves. Solid and beautiful.',          date: '2024-06-25', status: 'pending'  },
];