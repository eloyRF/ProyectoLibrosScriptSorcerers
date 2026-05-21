CREATE TABLE AUTORES
(NOMBRE VARCHAR2(80) CONSTRAINT PK_NAUTOR PRIMARY KEY,
EDAD NUMBER(3),
NACIONALIDAD VARCHAR2(20),
FECHA_NACIMIENTO DATE,
BIOGRAFIA VARCHAR2(400));

CREATE TABLE LIBROS 
(ISBN NUMBER(13) CONSTRAINT PK_ISBN PRIMARY KEY,
TITULO VARCHAR2(80) CONSTRAINT CK_TITULO NOT NULL,
FECHA_PUBLICACION DATE,
AUTOR VARCHAR2(80),
CONSTRAINT FK_NAUTOR FOREIGN KEY (AUTOR) REFERENCES AUTORES(NOMBRE));

INSERT INTO AUTORES 
VALUES ('Stephen King', 78,'Estadounidense', TO_DATE('1947-09-21', 'YYYY-MM-DD'), 'es un escritor de novelas de terror, ficción sobrenatural, misterio, ciencia ficción y literatura fantástica.'),
       ('J. R. R. Tolkien', 81,'Británico', TO_DATE('1892-01-03', 'YYYY-MM-DD'), 'fue un escritor, poeta, filólogo, lingüista y profesor universitario británico, nacido en el Estado Libre de Orange.');

INSERT INTO LIBROS 
VALUES(9434953675104, 'El Resplandor', TO_DATE('1977-01-28', 'YYYY-MM-DD'), 'Stephen King'),
      (9486879234328, 'La Milla Verde', TO_DATE('1996-08-29', 'YYYY-MM-DD'), 'Stephen King'),
      (6345398459034, 'El Señor de los Anillos', TO_DATE('1954-07-29', 'YYYY-MM-DD'), 'J. R. R. Tolkien'),
      (5783498573945, 'El hobbit', TO_DATE('1937-09-21', 'YYYY-MM-DD'), 'J. R. R. Tolkien'),
      (7349857398754, 'La Comunidad del Anillo', TO_DATE('1954-07-29', 'YYYY-MM-DD'), 'J. R. R. Tolkien');