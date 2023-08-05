npx sequelize-cli model:generate --name Song --attributes
judul:string,
artis:string,
path:string,
voc:integer,
xvoc:integer,
GolId:integer,
JenisId:integer,
vol:integer,
hits:integer,
new:integer,
popular:integer,
judul3:string,
exjudul:string,
artis3:string,
exartis:string,
Balancing:integer

npx sequelize-cli model:generate --name User --attributes name:string,username:string,email:string,password:string,noHandphone:string

npx sequelize-cli model:generate --name Golongan --attributes name:string
npx sequelize-cli model:generate --name Jenis --attributes name:string
