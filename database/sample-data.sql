USE artisan_connect;

INSERT INTO users (full_name,email,password,role) VALUES
('John Kamali','john@mail.com','pass123','artisan'),
('Alice Uwase','alice@mail.com','pass123','customer');

INSERT INTO artisans (user_id,location,availability,experience,skill,hourly_rate) VALUES
(1,'Kigali','Available',5,'Plumbing',25.00);

INSERT INTO customers (user_id,location) VALUES
(2,'Kigali');

INSERT INTO skills (skill_name) VALUES
('Plumbing'),
('Tailoring');

INSERT INTO bookings (customer_id,artisan_id,service_date,status) VALUES
(1,1,'2026-03-07','pending');

INSERT INTO reviews (booking_id,rating,comment) VALUES
(1,5,'good service');
