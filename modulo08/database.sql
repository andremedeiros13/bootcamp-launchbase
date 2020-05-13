DROP DATABASE IF EXISTS launchstoredb;
CREATE DATABASE launchstoredb;

create schema public;

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "category_id" int NOT NULL,
  "user_id" int,
  "name" text,
  "description" text,
  "old_price" int,
  "price" int,
  "quantity" int,
  "status" int,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" text
);

CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text,
  "product_id" int
);

ALTER TABLE "products" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
ALTER TABLE "files" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "cpf_cnpj" text UNIQUE NOT NULL ,
  "cep" text,
  "address" text,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()),
  "reset_token" text,
  "reset_token_expires" text
);

--INSERT
insert into categories(name) values('comida')
insert into categories(name) values('eletrônico')
insert into categories(name) values('automóveis')

-- foreign key

ALTER TABLE "products" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id")

-- create procedure

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

--auto update_at products
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

--auto update_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


--connect pg simple table  
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- efeito cascata ao deltar deletar usuários e produtos

alter table "products"
drop constraint products_user_id_fkey,
add constraint products_user_id_fkey
foreign key ("user_id")
references "users" ("id")
on delete cascade;

alter table "files"
drop constraint files_product_id_fkey,
add constraint files_product_id_fkey
foreign key ("product_id")
references "products" ("id")
on delete cascade;

-- to run seeds
delete from products;
delete from users;
delete from files;
-- restart sequence auto_incremente from tables ids
alter sequence products_id_seq restart with 1;
alter sequence users_id_seq restart with 1;
alter sequence files_id_seq restart with 1;

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "seller_id" int NOT NULL,
  "buyer_id" int NOT NULL,
  "product_id" int NOT NULL,
  "price" int NOT NULL,
  "quantity" int DEFAULT 0,
  "total" int NOT NULL,
  "status" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

ALTER TABLE "orders" ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id");
ALTER TABLE "orders" ADD FOREIGN KEY ("buyer_id") REFERENCES "users" ("id");
ALTER TABLE "orders" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();


--SOFT DELETE
--1 Criar uma coluna na tabela products "deleted_at"
ALTER TABLE products ADD COLUMN "deleted_at" timestamp;
--2 Criar uma Regra que vai rodar todas as vezes que for solicitado o DELETE
CREATE OR REPLACE RULE delete_product AS
ON DELETE TO products DO INSTEAD
UPDATE products
SET deleted_at = now()
WHERE products.id = old.id;
--3 Criar uma VIEW onde vamos puxar somente os dados que estão ativos
CREATE VIEW products_without_deleted AS
SELECT * FROM products WHERE deleted_at IS NULL

-- 4 Renomear a nossa VIEW e a nossa TABLE
ALTER TABLE products RENAME TO product_with_deleted;
ALTER VIEW products_without_deleted RENAME TO products;