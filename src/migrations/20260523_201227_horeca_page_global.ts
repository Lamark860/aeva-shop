import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "horeca_page_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "horeca_page_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "horeca_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_bg_photo_id" integer,
  	"hero_bg_url" varchar,
  	"hero_meta" varchar,
  	"hero_title" varchar,
  	"hero_lead" varchar,
  	"hero_btn_text" varchar,
  	"cases_subtitle" varchar,
  	"cases_heading" varchar,
  	"process_subtitle" varchar,
  	"process_heading" varchar,
  	"form_subtitle" varchar,
  	"form_heading" varchar,
  	"form_lead" varchar,
  	"form_btn_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "horeca_page_metrics" ADD CONSTRAINT "horeca_page_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."horeca_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "horeca_page_steps" ADD CONSTRAINT "horeca_page_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."horeca_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "horeca_page" ADD CONSTRAINT "horeca_page_hero_bg_photo_id_media_id_fk" FOREIGN KEY ("hero_bg_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "horeca_page_metrics_order_idx" ON "horeca_page_metrics" USING btree ("_order");
  CREATE INDEX "horeca_page_metrics_parent_id_idx" ON "horeca_page_metrics" USING btree ("_parent_id");
  CREATE INDEX "horeca_page_steps_order_idx" ON "horeca_page_steps" USING btree ("_order");
  CREATE INDEX "horeca_page_steps_parent_id_idx" ON "horeca_page_steps" USING btree ("_parent_id");
  CREATE INDEX "horeca_page_hero_bg_photo_idx" ON "horeca_page" USING btree ("hero_bg_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "horeca_page_metrics" CASCADE;
  DROP TABLE "horeca_page_steps" CASCADE;
  DROP TABLE "horeca_page" CASCADE;`)
}
