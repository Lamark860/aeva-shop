import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_page_material_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_triptych" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL
  );
  
  CREATE TABLE "about_page_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"cta_text" varchar,
  	"cta_link" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"portrait_photo_id" integer,
  	"quote_text" varchar,
  	"quote_author" varchar,
  	"material_photo_id" integer,
  	"material_subtitle" varchar,
  	"material_heading" varchar,
  	"types_subtitle" varchar,
  	"types_heading" varchar,
  	"cta_subtitle" varchar,
  	"cta_heading_line1" varchar,
  	"cta_heading_line2" varchar,
  	"cta_btn_text" varchar,
  	"cta_btn_link" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "about_page_material_paragraphs" ADD CONSTRAINT "about_page_material_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_triptych" ADD CONSTRAINT "about_page_triptych_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_triptych" ADD CONSTRAINT "about_page_triptych_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_types" ADD CONSTRAINT "about_page_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_portrait_photo_id_media_id_fk" FOREIGN KEY ("portrait_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_material_photo_id_media_id_fk" FOREIGN KEY ("material_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_page_material_paragraphs_order_idx" ON "about_page_material_paragraphs" USING btree ("_order");
  CREATE INDEX "about_page_material_paragraphs_parent_id_idx" ON "about_page_material_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_page_triptych_order_idx" ON "about_page_triptych" USING btree ("_order");
  CREATE INDEX "about_page_triptych_parent_id_idx" ON "about_page_triptych" USING btree ("_parent_id");
  CREATE INDEX "about_page_triptych_photo_idx" ON "about_page_triptych" USING btree ("photo_id");
  CREATE INDEX "about_page_types_order_idx" ON "about_page_types" USING btree ("_order");
  CREATE INDEX "about_page_types_parent_id_idx" ON "about_page_types" USING btree ("_parent_id");
  CREATE INDEX "about_page_portrait_photo_idx" ON "about_page" USING btree ("portrait_photo_id");
  CREATE INDEX "about_page_material_photo_idx" ON "about_page" USING btree ("material_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_page_material_paragraphs" CASCADE;
  DROP TABLE "about_page_triptych" CASCADE;
  DROP TABLE "about_page_types" CASCADE;
  DROP TABLE "about_page" CASCADE;`)
}
