-- create database inventario;
-- use inventario;
-- drop table usuario

create table usuario(
	id int primary key auto_increment,
    nombre varchar(60) not null,
    user_ varchar(40) unique not null,
    password_ varchar(250) not null,
    id_almacen int,
    estado tinyint default 1
);

-- drop table producto
create table producto(
	id int primary key auto_increment,
    nombre varchar(100) not null,
    descripcion varchar(200),
    unid_medida varchar(60),
    id_proveedor int not null,
    estado tinyint default 1,
    precio float
);

-- drop table proveedor
create table proveedor(
	id int primary key auto_increment,
    nombre varchar(100) not null,
    direccion varchar(150)
);

create table almacen(
	id int primary key auto_increment,
    nombre varchar(50) not null,
    direccion varchar(150)
);

-- drop table producto_almacen
create table producto_almacen(
	id int primary key auto_increment,
    id_producto int not null,
    id_almacen int not null,
    stock int not null
);

alter table usuario add foreign key (id_almacen) references almacen(id);
alter table producto add foreign key (id_proveedor) references proveedor(id);
alter table producto_almacen add foreign key (id_producto) references producto(id);
alter table producto_almacen add foreign key (id_almacen) references almacen(id);







