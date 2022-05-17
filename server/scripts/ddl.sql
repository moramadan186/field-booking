-- booking.admins definition

-- Drop table

-- DROP TABLE booking.admins;

CREATE TABLE booking.admins (
	admins_id serial4 NOT NULL,
	admins_ssd_id varchar(100) NOT NULL,
	admins_name varchar(30) NOT NULL,
	admins_email varchar(50) NOT NULL,
	admins_password text NOT NULL,
	admins_phone text NOT NULL,
	CONSTRAINT admins_email_pkey UNIQUE (admins_email),
	CONSTRAINT admins_pkey PRIMARY KEY (admins_id)
);


-- booking.booked definition

-- Drop table

-- DROP TABLE booking.booked;

CREATE TABLE booking.booked (
	booked_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	admins_id int4 NOT NULL,
	booked_data_work date NOT NULL,
	booked_time_start time NOT NULL,
	booked_time_end time NOT NULL,
	state bool NULL,
	CONSTRAINT booked_pkey PRIMARY KEY (booked_id)
);


-- booking.booked foreign keys

ALTER TABLE booking.booked ADD CONSTRAINT fk_admins_id FOREIGN KEY (admins_id) REFERENCES booking.admins(admins_id);
ALTER TABLE booking.booked ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES booking.users(user_id);

-- booking.club definition

-- Drop table

-- DROP TABLE booking.club;

CREATE TABLE booking.club (
	club_id serial4 NOT NULL,
	admins_id int4 NOT NULL,
	club_name varchar(30) NOT NULL,
	club_date_work date NOT NULL,
	club_time_work_from time NOT NULL,
	club_time_work_to time NOT NULL,
	club_location text NOT NULL,
	club_price int4 NOT NULL,
	url_image text NULL,
	club_description text NULL,
	CONSTRAINT club_pkey PRIMARY KEY (club_id)
);


-- booking.club foreign keys

ALTER TABLE booking.club ADD CONSTRAINT fk_admins_id FOREIGN KEY (admins_id) REFERENCES booking.admins(admins_id);

-- booking.payment definition

-- Drop table

-- DROP TABLE booking.payment;

CREATE TABLE booking.payment (
	payment_id serial4 NOT NULL,
	user_id int4 NOT NULL,
	card_number int4 NOT NULL,
	expiry_date date NULL,
	cvc_number int4 NULL,
	total_price int4 NULL,
	booked_id int4 NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT payment_pkey PRIMARY KEY (payment_id)
);


-- booking.payment foreign keys

ALTER TABLE booking.payment ADD CONSTRAINT fk_booked_id FOREIGN KEY (booked_id) REFERENCES booking.booked(booked_id);
ALTER TABLE booking.payment ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES booking.users(user_id);

-- booking.users definition

-- Drop table

-- DROP TABLE booking.users;

CREATE TABLE booking.users (
	user_id serial4 NOT NULL,
	user_name varchar(30) NOT NULL,
	user_email varchar(50) NOT NULL,
	user_password text NOT NULL,
	user_phone text NULL,
	CONSTRAINT email_user_pkey UNIQUE (user_email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id)
);