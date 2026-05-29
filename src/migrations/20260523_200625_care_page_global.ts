import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "care_page_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "care_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subtitle" varchar,
  	"title" varchar,
  	"lead" varchar,
  	"footer_text" varchar,
  	"footer_link_text" varchar,
  	"footer_link_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "care_page_items" ADD CONSTRAINT "care_page_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."care_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "care_page_items_order_idx" ON "care_page_items" USING btree ("_order");
  CREATE INDEX "care_page_items_parent_id_idx" ON "care_page_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "care_page_items" CASCADE;
  DROP TABLE "care_page" CASCADE;`)
}
