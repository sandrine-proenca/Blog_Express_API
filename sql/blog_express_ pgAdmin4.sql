-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


DROP TABLE IF EXISTS public.articles CASCADE;

CREATE TABLE IF NOT EXISTS public.articles
(
    id serial NOT NULL,
    chronicle character varying COLLATE pg_catalog."default" NOT NULL,
    created_date date DEFAULT CURRENT_DATE,
    deleted_date date,
    user_id integer NOT NULL,
    CONSTRAINT articles_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS public.comments CASCADE;

CREATE TABLE IF NOT EXISTS public.comments
(
    id serial NOT NULL,
    message character varying COLLATE pg_catalog."default",
    created_date date DEFAULT CURRENT_DATE,
    deleted_date date,
    article_id integer NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT comment_pkey PRIMARY KEY (id)
);

DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.articles
    ADD CONSTRAINT articles_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.comments
    ADD CONSTRAINT comment_article_id_fkey FOREIGN KEY (article_id)
    REFERENCES public.articles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.comments
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;