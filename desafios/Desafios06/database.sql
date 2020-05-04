CREATE TABLE "customers" (
  "id" SERIAL PRIMARY KEY,
  "order_id" int NOT NULL,
  "address" text,
  "name" text,
  "gender" text,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "agencies" (
  "id" SERIAL PRIMARY KEY,
  "street" text,
  "address_id" int UNIQUE,
  "order_id" int NOT NULL
);

CREATE TABLE "addresses" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "product_id" int UNIQUE
);

CREATE TABLE "cars" (
  "id" SERIAL PRIMARY KEY,
  "color" text,
  "placa" text
);

CREATE TABLE "models" (
  "id" SERIAL PRIMARY KEY,
  "brand" text,
  "model" text,
  "car_id" int NOT NULL
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "customer_id" int NOT NULL,
  "agencie_id" int NOT NULL,
  "car_id" int NOT NULL
);

ALTER TABLE "customers" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "agencies" ADD FOREIGN KEY ("address_id") REFERENCES "addresses" ("id");

ALTER TABLE "agencies" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");

ALTER TABLE "models" ADD FOREIGN KEY ("car_id") REFERENCES "cars" ("id");
