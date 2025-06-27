INSERT INTO public."Category" (name) VALUES
('Action-Adventure'),
('RPG'),
('Platformer'),
('Sandbox'),
('Action-RPG'),
('Sports');

INSERT INTO public."User" (email, password, name, token, usertype, state) VALUES
('fabrizzio@email.pw', 'Fabrizzio_PW', 'Fabrizzio', '', 0, 0),
('gianfranco@email.pw', 'Gianfranco_PW', 'Gianfranco', '', 0, 0),
('lucas@email.pw', 'Lucas_PW', 'Lucas', '', 0, 0),
('ryuichi@email.pw', 'Ryuichi_PW', 'Ryuichi', '', 1, 0),
('giancarlo@email.pw', 'Giancarlo_PW', 'Giancarlo', '', 1, 0);

INSERT INTO public."Game" (name, price, description, company, "categoryId", state) VALUES
('The Legend of Zelda: Breath of the Wild', 31.5, 'Embárcate en una épica aventura en un vasto mundo abierto lleno de misterio y maravillas...', 'Nintendo', 1, 0),
('Red Dead Redemption 2', 61, 'Sumérgete en una épica historia ambientada en el salvaje oeste americano...', 'Rockstar Games', 1, 0),
('The Witcher 3: Wild Hunt', 50, 'Adéntrate en un vasto mundo de fantasía como Geralt de Rivia...', 'CD Projekt', 2, 0),
('God of War (2018)', 23, 'Acompaña a Kratos y su hijo Atreus en un viaje épico a través de la mitología nórdica...', 'Santa Monica Studio', 1, 0),
('Elden Ring', 25, 'Explora las Tierras Intermedias, un vasto mundo abierto creado por FromSoftware...', 'FromSoftware', 2, 1),
('Grand Theft Auto V', 185, 'Sumérgete en la vibrante ciudad de Los Santos y sus alrededores...', 'Rockstar Games', 1, 1),
('Super Mario Odyssey', 27, 'Acompaña a Mario y su nuevo amigo Cappy en un viaje global...', 'Nintendo', 3, 1),
('Minecraft', 300, 'Crea y explora un mundo infinito generado proceduralmente...', 'Mojang Studios', 4, 1),
('Horizon Zero Dawn', 24, 'Explora un impresionante mundo postapocalíptico donde las máquinas dominan la tierra...', 'Guerrilla Games', 5, 1),
('Cyberpunk 2077', 25, 'Adéntrate en Night City, una metrópoli futurista donde las megacorporaciones controlan todo...', 'CD Projekt', 2, 1),
('Haxball', 100, 'Disfruta de un juego multijugador en línea de fútbol con mecánicas simples pero adictivas...', 'Mario Carbajal', 6, 1);

INSERT INTO public."GameTrailer" (url, "gameId") VALUES
('zw47_q9wbBE', 1),
('gmA6MrX81z4', 2),
('c0i88t0Kacs', 3),
('K0u_kAWLJOA', 4),
('E3Huy2cdih0', 5),
('QkkoHAzjnUs', 6),
('wGQHQc_3ycE', 7),
('MmB9b5njVbA', 8),
('u4-FCsiF5x4', 9),
('8X2kIfS6fb8', 10),
('OTv7xd8PTpg', 11);