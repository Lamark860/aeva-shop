import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"photo_id" integer,
  	"image" varchar
  );
  
  CREATE TABLE "homepage_insta_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"photo_id" integer,
  	"image" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_photo_id" integer,
  	"hero_image" varchar,
  	"title_line1" varchar,
  	"title_line2" varchar,
  	"primary_btn_text" varchar,
  	"primary_btn_link" varchar,
  	"outline_btn_text" varchar,
  	"outline_btn_link" varchar,
  	"collection_subtitle" varchar,
  	"collection_heading" varchar,
  	"about_photo_id" integer,
  	"about_image" varchar,
  	"about_subtitle" varchar,
  	"about_heading_line1" varchar,
  	"about_heading_line2" varchar,
  	"about_cta_text" varchar,
  	"about_cta_link" varchar,
  	"process_subtitle" varchar,
  	"process_heading" varchar,
  	"popular_subtitle" varchar,
  	"popular_heading" varchar,
  	"popular_cta_text" varchar,
  	"popular_cta_link" varchar,
  	"atmospheric_photo_id" integer,
  	"atmospheric_image" varchar,
  	"atmospheric_text" varchar,
  	"gallery_subtitle" varchar,
  	"gallery_heading" varchar,
  	"cta_subtitle" varchar,
  	"cta_heading" varchar,
  	"cta_btn_text" varchar,
  	"cta_btn_link" varchar,
  	"insta_subtitle" varchar,
  	"insta_heading" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "homepage_about_paragraphs" ADD CONSTRAINT "homepage_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_process_steps" ADD CONSTRAINT "homepage_process_steps_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_process_steps" ADD CONSTRAINT "homepage_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_insta_images" ADD CONSTRAINT "homepage_insta_images_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_insta_images" ADD CONSTRAINT "homepage_insta_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_photo_id_media_id_fk" FOREIGN KEY ("hero_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_about_photo_id_media_id_fk" FOREIGN KEY ("about_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_atmospheric_photo_id_media_id_fk" FOREIGN KEY ("atmospheric_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_about_paragraphs_order_idx" ON "homepage_about_paragraphs" USING btree ("_order");
  CREATE INDEX "homepage_about_paragraphs_parent_id_idx" ON "homepage_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "homepage_process_steps_order_idx" ON "homepage_process_steps" USING btree ("_order");
  CREATE INDEX "homepage_process_steps_parent_id_idx" ON "homepage_process_steps" USING btree ("_parent_id");
  CREATE INDEX "homepage_process_steps_photo_idx" ON "homepage_process_steps" USING btree ("photo_id");
  CREATE INDEX "homepage_insta_images_order_idx" ON "homepage_insta_images" USING btree ("_order");
  CREATE INDEX "homepage_insta_images_parent_id_idx" ON "homepage_insta_images" USING btree ("_parent_id");
  CREATE INDEX "homepage_insta_images_photo_idx" ON "homepage_insta_images" USING btree ("photo_id");
  CREATE INDEX "homepage_hero_photo_idx" ON "homepage" USING btree ("hero_photo_id");
  CREATE INDEX "homepage_about_photo_idx" ON "homepage" USING btree ("about_photo_id");
  CREATE INDEX "homepage_atmospheric_photo_idx" ON "homepage" USING btree ("atmospheric_photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_about_paragraphs" CASCADE;
  DROP TABLE "homepage_process_steps" CASCADE;
  DROP TABLE "homepage_insta_images" CASCADE;
  DROP TABLE "homepage" CASCADE;`)
}
