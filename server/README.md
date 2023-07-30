# AHA-WEBKTV

    1	idlagu	int(11)
    2	edp	int(11)
    3	judul	varchar(255)
    4	artis	varchar(255)
    5	path	varchar(255)
    6	voc	int(11)
    7	xvoc	int(11)
    8	gol	int(11)
    9	jenis	int(11)
    10	hade	int(11)
    11	vol	int(11)
    12	hits	int(11)
    13	new	int(11)
    14	popular	int(11)
    15	idsource Indeks	int(11)
    16	datertime	datetime
    17	judul3	varchar(255)
    18	exjudul	varchar(255)
    19	artis3	varchar(255)
    20	exartis	varchar(255)
    21	Balancing	int(11)

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

from this
[
{
idlagu: 10,
edp: 1,
judul: 'Katineung',
artis: 'Darso',
path: 'DISK01\\D0003\\09.DAT',
voc: 3,
xvoc: 2,
gol: 7,
jenis: 1,
hade: null,
vol: 80,
hits: 0,
new: 0,
popular: 0,
idsource: 1,
datertime: '2015-08-20T09:23:21.000Z',
judul3: '',
exjudul: '',
artis3: '',
exartis: '',
Balancing: 0,
createdAt: 2023-07-27T18:56:24.569Z,
updatedAt: 2023-07-27T18:56:24.569Z,
GolId: 7,
JenisId: 1
},
{
idlagu: 11,
edp: 1,
judul: 'Leuyang',
artis: 'Darso',
path: 'DISK01\\D0004\\010.DAT',
voc: 3,
xvoc: 2,
gol: 7,
jenis: 1,
hade: null,
vol: 80,
hits: 0,
new: 0,
popular: 0,
idsource: 1,
datertime: '2015-11-06T15:30:36.000Z',
judul3: '',
exjudul: '',
artis3: '',
exartis: '',
Balancing: 0,
createdAt: 2023-07-27T18:56:24.569Z,
updatedAt: 2023-07-27T18:56:24.569Z,
GolId: 7,
JenisId: 1
}
]

to this
[
{
judul: 'Katineung',
artis: 'Darso',
path: 'DISK01\\D0003\\09.DAT',
voc: 3,
xvoc: 2,
hade: null,
vol: 80,
hits: 0,
new: 0,
popular: 0,
idsource: 1,
datertime: '2015-08-20T09:23:21.000Z',
judul3: '',
exjudul: '',
artis3: '',
exartis: '',
Balancing: 0,
createdAt: 2023-07-27T18:56:24.569Z,
updatedAt: 2023-07-27T18:56:24.569Z,
GolId: 7,
JenisId: 1
},
{
judul: 'Leuyang',
artis: 'Darso',
path: 'DISK01\\D0004\\010.DAT',
voc: 3,
xvoc: 2,
hade: null,
vol: 80,
hits: 0,
new: 0,
popular: 0,
idsource: 1,
datertime: '2015-11-06T15:30:36.000Z',
judul3: '',
exjudul: '',
artis3: '',
exartis: '',
Balancing: 0,
createdAt: 2023-07-27T18:56:24.569Z,
updatedAt: 2023-07-27T18:56:24.569Z,
GolId: 7,
JenisId: 1
}
]
