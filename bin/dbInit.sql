-- Database: progress_dev

-- DROP DATABASE IF EXISTS progress_dev;

CREATE DATABASE progress_dev
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- ----------------------------
--create table
-- ----------------------------
CREATE TABLE "user"
(
    user_id varchar(16) NOT NULL,
    password varchar(16) NOT NULL,
    auth integer,
    is_deleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (user_id)
);

CREATE TABLE "group"
(
    group_id integer NOT NULL,
    user_id varchar(16) NOT NULL,
    name varchar(256) NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (group_id)
);

CREATE TABLE "project"
(
    project_id integer NOT NULL,
    group_id integer NOT NULL,
    name varchar(256) NOT NULL,
    is_deleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (project_id)
);

CREATE TABLE "assignment"
(
    assignment_id integer NOT NULL,
    project_id integer NOT NULL,
    name varchar(256) NOT NULL,
	is_finished boolean NOT NULL DEFAULT false,
    is_deleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (assignment_id)
);

-- ----------------------------
--create sequence
-- ----------------------------
CREATE SEQUENCE public.group_id_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 999999
    CACHE 1;
ALTER TABLE public.group ALTER COLUMN group_id SET DEFAULT nextval('group_id_sequence'::regclass);

CREATE SEQUENCE public.project_id_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 999999
    CACHE 1;
ALTER TABLE public.project ALTER COLUMN project_id SET DEFAULT nextval('project_id_sequence'::regclass);

CREATE SEQUENCE public.assignment_id_sequence
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 999999
    CACHE 1;
ALTER TABLE public.assignment ALTER COLUMN assignment_id SET DEFAULT nextval('assignment_id_sequence'::regclass);

-- ----------------------------
-- Foreign Keys structure for table report_cud
-- ----------------------------
ALTER TABLE "public"."group" ADD CONSTRAINT "group_FKC" FOREIGN KEY ("user_id") REFERENCES "public"."user" ("user_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."project" ADD CONSTRAINT "project_FKC" FOREIGN KEY ("group_id") REFERENCES "public"."group" ("group_id") ON DELETE NO ACTION ON UPDATE CASCADE;
ALTER TABLE "public"."assignment" ADD CONSTRAINT "assignment_FKC" FOREIGN KEY ("project_id") REFERENCES "public"."project" ("project_id") ON DELETE NO ACTION ON UPDATE CASCADE;