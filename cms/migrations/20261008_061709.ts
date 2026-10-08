import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`created_at\` text,
    \`expires_at\` text NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`email\` text NOT NULL,
    \`reset_password_token\` text,
    \`reset_password_expiration\` text,
    \`salt\` text,
    \`hash\` text,
    \`reset_password_requested_at\` text,
    \`login_attempts\` numeric DEFAULT 0,
    \`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`alt\` text NOT NULL,
    \`caption\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`url\` text,
    \`thumbnail_u_r_l\` text,
    \`filename\` text,
    \`mime_type\` text,
    \`filesize\` numeric,
    \`width\` numeric,
    \`height\` numeric,
    \`focal_x\` numeric,
    \`focal_y\` numeric,
    \`sizes_card_url\` text,
    \`sizes_card_width\` numeric,
    \`sizes_card_height\` numeric,
    \`sizes_card_mime_type\` text,
    \`sizes_card_filesize\` numeric,
    \`sizes_card_filename\` text,
    \`sizes_large_url\` text,
    \`sizes_large_width\` numeric,
    \`sizes_large_height\` numeric,
    \`sizes_large_mime_type\` text,
    \`sizes_large_filesize\` numeric,
    \`sizes_large_filename\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_card_sizes_card_filename_idx\` ON \`media\` (\`sizes_card_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE TABLE \`projects_gallery\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` text PRIMARY KEY NOT NULL,
    \`media_id\` integer,
    \`alt\` text,
    \`caption\` text,
    \`kind\` text,
    FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_gallery_order_idx\` ON \`projects_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_parent_id_idx\` ON \`projects_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_gallery_media_idx\` ON \`projects_gallery\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`english\` text,
    \`slug\` text,
    \`category\` text,
    \`status\` text,
    \`order\` numeric DEFAULT 0,
    \`cover_id\` integer,
    \`image\` text,
    \`image_note\` text,
    \`description\` text,
    \`material\` text,
    \`location\` text,
    \`year\` text,
    \`area\` text,
    \`role\` text,
    \`closing\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`_status\` text DEFAULT 'draft',
    FOREIGN KEY (\`cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_slug_idx\` ON \`projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`projects_cover_idx\` ON \`projects\` (\`cover_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`projects__status_idx\` ON \`projects\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_version_gallery\` (
    \`_order\` integer NOT NULL,
    \`_parent_id\` integer NOT NULL,
    \`id\` integer PRIMARY KEY NOT NULL,
    \`media_id\` integer,
    \`alt\` text,
    \`caption\` text,
    \`kind\` text,
    \`_uuid\` text,
    FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_order_idx\` ON \`_projects_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_parent_id_idx\` ON \`_projects_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_gallery_media_idx\` ON \`_projects_v_version_gallery\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_name\` text,
    \`version_english\` text,
    \`version_slug\` text,
    \`version_category\` text,
    \`version_status\` text,
    \`version_order\` numeric DEFAULT 0,
    \`version_cover_id\` integer,
    \`version_image\` text,
    \`version_image_note\` text,
    \`version_description\` text,
    \`version_material\` text,
    \`version_location\` text,
    \`version_year\` text,
    \`version_area\` text,
    \`version_role\` text,
    \`version_closing\` text,
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`version__status\` text DEFAULT 'draft',
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_parent_idx\` ON \`_projects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_slug_idx\` ON \`_projects_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_cover_idx\` ON \`_projects_v\` (\`version_cover_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_updated_at_idx\` ON \`_projects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version_created_at_idx\` ON \`_projects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_version_version__status_idx\` ON \`_projects_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_created_at_idx\` ON \`_projects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_updated_at_idx\` ON \`_projects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_latest_idx\` ON \`_projects_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`journal\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`slug\` text,
    \`label\` text,
    \`title\` text,
    \`text\` text,
    \`cover_id\` integer,
    \`image\` text,
    \`order\` numeric DEFAULT 0,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`_status\` text DEFAULT 'draft',
    FOREIGN KEY (\`cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`journal_cover_idx\` ON \`journal\` (\`cover_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_updated_at_idx\` ON \`journal\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`journal_created_at_idx\` ON \`journal\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`journal__status_idx\` ON \`journal\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_journal_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`parent_id\` integer,
    \`version_slug\` text,
    \`version_label\` text,
    \`version_title\` text,
    \`version_text\` text,
    \`version_cover_id\` integer,
    \`version_image\` text,
    \`version_order\` numeric DEFAULT 0,
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`version__status\` text DEFAULT 'draft',
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`journal\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_cover_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_journal_v_parent_idx\` ON \`_journal_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_journal_v_version_version_cover_idx\` ON \`_journal_v\` (\`version_cover_id\`);`)
  await db.run(sql`CREATE INDEX \`_journal_v_version_version_updated_at_idx\` ON \`_journal_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_v_version_version_created_at_idx\` ON \`_journal_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_v_version_version__status_idx\` ON \`_journal_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_journal_v_created_at_idx\` ON \`_journal_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_v_updated_at_idx\` ON \`_journal_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_v_latest_idx\` ON \`_journal_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`key\` text NOT NULL,
    \`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`global_slug\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`users_id\` integer,
    \`media_id\` integer,
    \`projects_id\` integer,
    \`journal_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`journal_id\`) REFERENCES \`journal\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_journal_id_idx\` ON \`payload_locked_documents_rels\` (\`journal_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`key\` text,
    \`value\` text,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`order\` integer,
    \`parent_id\` integer NOT NULL,
    \`path\` text NOT NULL,
    \`users_id\` integer,
    FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
    FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`name\` text,
    \`batch\` numeric,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`brand\` text,
    \`name\` text,
    \`english_name\` text,
    \`title\` text,
    \`subtitle\` text,
    \`bio\` text,
    \`bio_note\` text,
    \`email\` text,
    \`wechat\` text,
    \`instagram\` text,
    \`location\` text,
    \`home_hero_video\` text,
    \`home_hero_poster\` text,
    \`home_hero_pause_label\` text,
    \`home_hero_play_label\` text,
    \`home_hero_portrait\` text,
    \`home_hero_portrait_alt\` text,
    \`home_hero_portrait_note\` text,
    \`home_hero_disciplines\` text,
    \`home_hero_index\` text,
    \`home_hero_scroll\` text,
    \`home_philosophy_label\` text,
    \`home_philosophy_title\` text,
    \`home_philosophy_text\` text,
    \`home_philosophy_english\` text,
    \`home_philosophy_note\` text,
    \`home_philosophy_image\` text,
    \`home_philosophy_image_alt\` text,
    \`home_philosophy_image_note\` text,
    \`home_works_label\` text,
    \`home_works_title\` text,
    \`home_works_link\` text,
    \`home_works_note\` text,
    \`home_about_label\` text,
    \`home_about_title\` text,
    \`home_about_image\` text,
    \`home_about_image_alt\` text,
    \`home_about_image_note\` text,
    \`home_about_link\` text,
    \`home_journal_label\` text,
    \`home_journal_title\` text,
    \`home_journal_intro\` text,
    \`home_journal_link\` text,
    \`home_contact_label\` text,
    \`home_contact_title\` text,
    \`home_contact_intro\` text,
    \`home_contact_email_label\` text,
    \`home_contact_wechat_label\` text,
    \`home_contact_email_placeholder\` text,
    \`home_contact_wechat_placeholder\` text,
    \`assets_portrait_id\` integer,
    \`assets_video_id\` integer,
    \`assets_poster_id\` integer,
    \`assets_about_id\` integer,
    \`_status\` text DEFAULT 'draft',
    \`updated_at\` text,
    \`created_at\` text,
    FOREIGN KEY (\`assets_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`assets_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`assets_poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`assets_about_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_assets_assets_portrait_idx\` ON \`site_settings\` (\`assets_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_assets_assets_video_idx\` ON \`site_settings\` (\`assets_video_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_assets_assets_poster_idx\` ON \`site_settings\` (\`assets_poster_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_assets_assets_about_idx\` ON \`site_settings\` (\`assets_about_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings__status_idx\` ON \`site_settings\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
    \`id\` integer PRIMARY KEY NOT NULL,
    \`version_brand\` text,
    \`version_name\` text,
    \`version_english_name\` text,
    \`version_title\` text,
    \`version_subtitle\` text,
    \`version_bio\` text,
    \`version_bio_note\` text,
    \`version_email\` text,
    \`version_wechat\` text,
    \`version_instagram\` text,
    \`version_location\` text,
    \`version_home_hero_video\` text,
    \`version_home_hero_poster\` text,
    \`version_home_hero_pause_label\` text,
    \`version_home_hero_play_label\` text,
    \`version_home_hero_portrait\` text,
    \`version_home_hero_portrait_alt\` text,
    \`version_home_hero_portrait_note\` text,
    \`version_home_hero_disciplines\` text,
    \`version_home_hero_index\` text,
    \`version_home_hero_scroll\` text,
    \`version_home_philosophy_label\` text,
    \`version_home_philosophy_title\` text,
    \`version_home_philosophy_text\` text,
    \`version_home_philosophy_english\` text,
    \`version_home_philosophy_note\` text,
    \`version_home_philosophy_image\` text,
    \`version_home_philosophy_image_alt\` text,
    \`version_home_philosophy_image_note\` text,
    \`version_home_works_label\` text,
    \`version_home_works_title\` text,
    \`version_home_works_link\` text,
    \`version_home_works_note\` text,
    \`version_home_about_label\` text,
    \`version_home_about_title\` text,
    \`version_home_about_image\` text,
    \`version_home_about_image_alt\` text,
    \`version_home_about_image_note\` text,
    \`version_home_about_link\` text,
    \`version_home_journal_label\` text,
    \`version_home_journal_title\` text,
    \`version_home_journal_intro\` text,
    \`version_home_journal_link\` text,
    \`version_home_contact_label\` text,
    \`version_home_contact_title\` text,
    \`version_home_contact_intro\` text,
    \`version_home_contact_email_label\` text,
    \`version_home_contact_wechat_label\` text,
    \`version_home_contact_email_placeholder\` text,
    \`version_home_contact_wechat_placeholder\` text,
    \`version_assets_portrait_id\` integer,
    \`version_assets_video_id\` integer,
    \`version_assets_poster_id\` integer,
    \`version_assets_about_id\` integer,
    \`version__status\` text DEFAULT 'draft',
    \`version_updated_at\` text,
    \`version_created_at\` text,
    \`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
    \`latest\` integer,
    FOREIGN KEY (\`version_assets_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_assets_video_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_assets_poster_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
    FOREIGN KEY (\`version_assets_about_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_assets_version_assets_portrait_idx\` ON \`_site_settings_v\` (\`version_assets_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_assets_version_assets_video_idx\` ON \`_site_settings_v\` (\`version_assets_video_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_assets_version_assets_poster_idx\` ON \`_site_settings_v\` (\`version_assets_poster_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_assets_version_assets_about_idx\` ON \`_site_settings_v\` (\`version_assets_about_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version__status_idx\` ON \`_site_settings_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_latest_idx\` ON \`_site_settings_v\` (\`latest\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`projects_gallery\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_projects_v\`;`)
  await db.run(sql`DROP TABLE \`journal\`;`)
  await db.run(sql`DROP TABLE \`_journal_v\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
}
