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


CREATE TABLE public."user"
(
    id character(16) NOT NULL,
    password character(16) NOT NULL,
    auth integer,
    isdeleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE public."group"
(
    id integer NOT NULL,
    userid character(16) NOT NULL,
    name character(256) NOT NULL,
    isdeleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id, userid)
);

CREATE TABLE public."project"
(
    id integer NOT NULL,
    groupid integer NOT NULL,
    name character(256) NOT NULL,
    isdeleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id, groupid)
);

CREATE TABLE public."assignment"
(
    id integer NOT NULL,
    projectid integer NOT NULL,
    name character(256) NOT NULL,
	isfinished boolean NOT NULL DEFAULT false,
    isdeleted boolean NOT NULL DEFAULT false,
    PRIMARY KEY (id, projectid)
);