import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_orders_type" AS ENUM('vase', 'bowl', 'plate', 'mug', 'set', 'decor', 'other');
  CREATE TYPE "public"."enum_orders_purpose" AS ENUM('self', 'gift', 'interior', 'unsure');
  CREATE TYPE "public"."enum_orders_deadline" AS ENUM('flexible', 'month', 'date', 'discuss');
  CREATE TYPE "public"."enum_orders_budget" AS ENUM('lt3k', '3k_7k', '7k_15k', 'gt15k', 'unknown');
  CREATE TYPE "public"."enum_projects_type" AS ENUM('restaurant', 'private', 'collection', 'cafe');
  CREATE TYPE "public"."enum_subscribers_source" AS ENUM('journal', 'order');
  CREATE TYPE "public"."enum_horeca_inquiries_project_type" AS ENUM('new', 'update', 'expand', 'scouting');
  CREATE TYPE "public"."enum_horeca_inquiries_batch_size" AS ENUM('lt50', '50_150', '150_300', 'gt300', 'unknown');
  CREATE TYPE "public"."enum_horeca_inquiries_timeline" AS ENUM('flexible', 'quarter', 'opening', 'discuss');
  CREATE TYPE "public"."enum_horeca_inquiries_status" AS ENUM('new', 'in-progress', 'done');
  ALTER TYPE "public"."enum_orders_status" ADD VALUE 'in-progress' BEFORE 'done';
  CREATE TABLE "projects_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"image" varchar
  );
  
  CREATE TABLE "projects_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"year" varchar,
  	"type" "enum_projects_type" DEFAULT 'restaurant',
  	"subtitle" varchar,
  	"description" varchar,
  	"featured" boolean DEFAULT false,
  	"sort_order" numeric DEFAULT 0,
  	"main_photo_id" integer,
  	"main_image" varchar,
  	"quote" varchar,
  	"quote_author" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "subscribers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"source" "enum_subscribers_source" DEFAULT 'journal',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "horeca_inquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"venue_name" varchar NOT NULL,
  	"city" varchar,
  	"name" varchar NOT NULL,
  	"position" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"project_type" "enum_horeca_inquiries_project_type",
  	"batch_size" "enum_horeca_inquiries_batch_size",
  	"timeline" "enum_horeca_inquiries_timeline",
  	"concept_description" varchar,
  	"status" "enum_horeca_inquiries_status" DEFAULT 'new',
  	"internal_note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "products" ADD COLUMN "story" varchar;
  ALTER TABLE "products" ADD COLUMN "sizes_height" varchar;
  ALTER TABLE "products" ADD COLUMN "sizes_diameter" varchar;
  ALTER TABLE "products" ADD COLUMN "sizes_volume" varchar;
  ALTER TABLE "products" ADD COLUMN "material" varchar;
  ALTER TABLE "products" ADD COLUMN "care" varchar;
  ALTER TABLE "orders" ADD COLUMN "type" "enum_orders_type";
  ALTER TABLE "orders" ADD COLUMN "purpose" "enum_orders_purpose";
  ALTER TABLE "orders" ADD COLUMN "deadline" "enum_orders_deadline";
  ALTER TABLE "orders" ADD COLUMN "budget" "enum_orders_budget";
  ALTER TABLE "orders" ADD COLUMN "reference_link" varchar;
  ALTER TABLE "orders" ADD COLUMN "internal_note" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "subscribers_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "horeca_inquiries_id" integer;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_facts" ADD CONSTRAINT "projects_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_main_photo_id_media_id_fk" FOREIGN KEY ("main_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_gallery_order_idx" ON "projects_gallery" USING btree ("_order");
  CREATE INDEX "projects_gallery_parent_id_idx" ON "projects_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_photo_idx" ON "projects_gallery" USING btree ("photo_id");
  CREATE INDEX "projects_facts_order_idx" ON "projects_facts" USING btree ("_order");
  CREATE INDEX "projects_facts_parent_id_idx" ON "projects_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_main_photo_idx" ON "projects" USING btree ("main_photo_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE UNIQUE INDEX "subscribers_email_idx" ON "subscribers" USING btree ("email");
  CREATE INDEX "subscribers_updated_at_idx" ON "subscribers" USING btree ("updated_at");
  CREATE INDEX "subscribers_created_at_idx" ON "subscribers" USING btree ("created_at");
  CREATE INDEX "horeca_inquiries_updated_at_idx" ON "horeca_inquiries" USING btree ("updated_at");
  CREATE INDEX "horeca_inquiries_created_at_idx" ON "horeca_inquiries" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_subscribers_fk" FOREIGN KEY ("subscribers_id") REFERENCES "public"."subscribers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_horeca_inquiries_fk" FOREIGN KEY ("horeca_inquiries_id") REFERENCES "public"."horeca_inquiries"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_subscribers_id_idx" ON "payload_locked_documents_rels" USING btree ("subscribers_id");
  CREATE INDEX "payload_locked_documents_rels_horeca_inquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("horeca_inquiries_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "subscribers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "horeca_inquiries" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "projects_gallery" CASCADE;
  DROP TABLE "projects_facts" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "subscribers" CASCADE;
  DROP TABLE "horeca_inquiries" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_subscribers_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_horeca_inquiries_fk";
  
  ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE text;
  ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'new'::text;
  DROP TYPE "public"."enum_orders_status";
  CREATE TYPE "public"."enum_orders_status" AS ENUM('new', 'done');
  ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'new'::"public"."enum_orders_status";
  ALTER TABLE "orders" ALTER COLUMN "status" SET DATA TYPE "public"."enum_orders_status" USING "status"::"public"."enum_orders_status";
  DROP INDEX "payload_locked_documents_rels_projects_id_idx";
  DROP INDEX "payload_locked_documents_rels_subscribers_id_idx";
  DROP INDEX "payload_locked_documents_rels_horeca_inquiries_id_idx";
  ALTER TABLE "products" DROP COLUMN "story";
  ALTER TABLE "products" DROP COLUMN "sizes_height";
  ALTER TABLE "products" DROP COLUMN "sizes_diameter";
  ALTER TABLE "products" DROP COLUMN "sizes_volume";
  ALTER TABLE "products" DROP COLUMN "material";
  ALTER TABLE "products" DROP COLUMN "care";
  ALTER TABLE "orders" DROP COLUMN "type";
  ALTER TABLE "orders" DROP COLUMN "purpose";
  ALTER TABLE "orders" DROP COLUMN "deadline";
  ALTER TABLE "orders" DROP COLUMN "budget";
  ALTER TABLE "orders" DROP COLUMN "reference_link";
  ALTER TABLE "orders" DROP COLUMN "internal_note";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "subscribers_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "horeca_inquiries_id";
  DROP TYPE "public"."enum_orders_type";
  DROP TYPE "public"."enum_orders_purpose";
  DROP TYPE "public"."enum_orders_deadline";
  DROP TYPE "public"."enum_orders_budget";
  DROP TYPE "public"."enum_projects_type";
  DROP TYPE "public"."enum_subscribers_source";
  DROP TYPE "public"."enum_horeca_inquiries_project_type";
  DROP TYPE "public"."enum_horeca_inquiries_batch_size";
  DROP TYPE "public"."enum_horeca_inquiries_timeline";
  DROP TYPE "public"."enum_horeca_inquiries_status";`)
}
