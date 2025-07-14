INSERT INTO public."Category" (name) VALUES
('Action_Adventure'),
('RPG'),
('Platformer'),
('Sandbox'),
('Action_RPG'),
('Sports');

INSERT INTO public."User" (email, password, name, token, usertype, state) VALUES
('20214826@aloe.ulima.edu.pe', 'Fabrizzio_PW', 'Fabrizzio', NULL, 0, 0),
('20213654@aloe.ulima.edu.pe', 'Gianfranco_PW', 'Gianfranco', NULL, 0, 0),
('20221543@aloe.ulima.edu.pe', 'Lucas_PW', 'Lucas', NULL, 0, 0),
('20211953@aloe.ulima.edu.pe', 'Ryuichi_PW', 'Ryuichi', NULL, 1, 0),
('20203801@aloe.ulima.edu.pe', 'Giancarlo_PW', 'Giancarlo', NULL, 1, 0);

INSERT INTO public."Game" (name, price, description, company, plataformas, "categoryId", state) VALUES
('The Legend of Zelda: Breath of the Wild', 31.5, 'Explora un vasto mundo abierto lleno de misterio y aventura.', 'Nintendo', 'Switch', 1, 0),
('Red Dead Redemption 2', 61, 'Vive una épica historia en el salvaje oeste americano.', 'Rockstar Games','PS4', 1, 0),
('The Witcher 3: Wild Hunt', 50, 'Embárcate en una aventura de fantasía como cazador de monstruos.', 'CD Projekt', 'Xbox', 2, 0),
('God of War (2018)', 23, 'Disfruta de una épica mitología nórdica con combates intensos.', 'Santa Monica Studio', 'PS5',1, 0),
('Elden Ring', 25, 'Descubre un mundo abierto lleno de desafíos y secretos.', 'FromSoftware', 'PC', 2, 1),
('Grand Theft Auto V', 185, 'Explora una ciudad abierta con acción y crimen sin límites.', 'Rockstar Games', 'PC',1, 1),
('Super Mario Odyssey', 27, 'Acompaña a Mario en un viaje lleno de plataformas y creatividad.', 'Nintendo','Switch', 3, 1),
('Minecraft', 300, 'Crea y explora un mundo infinito con bloques.', 'Mojang Studios','Xbox', 4, 1),
('Horizon Zero Dawn', 24, 'Sobrevive en un mundo postapocalíptico dominado por máquinas.', 'Guerrilla Games','PS5', 5, 1),
('Cyberpunk 2077', 25, 'Vive una experiencia futurista en una ciudad cyberpunk.', 'CD Projekt', 'PS5',2, 1),
('Haxball', 100, 'Disfruta de un juego multijugador de fútbol con mecánicas simples.', 'Mario Carbajal','PC', 6, 1);

INSERT INTO public."GameImage" (url, "gameId") VALUES
('/imagenes/juegos/thelegendofzeldabreathofthewild/1.jpg', 1),
('/imagenes/juegos/thelegendofzeldabreathofthewild/2.jpg', 1),
('/imagenes/juegos/thelegendofzeldabreathofthewild/3.jpg', 1),
('/imagenes/juegos/thelegendofzeldabreathofthewild/4.jpg', 1),
('/imagenes/juegos/thelegendofzeldabreathofthewild/5.jpg', 1),
('/imagenes/juegos/reddeadredemption2/1.jpg', 2),
('/imagenes/juegos/reddeadredemption2/2.jpg', 2),
('/imagenes/juegos/reddeadredemption2/3.jpg', 2),
('/imagenes/juegos/reddeadredemption2/4.jpg', 2),
('/imagenes/juegos/reddeadredemption2/5.jpg', 2),
('/imagenes/juegos/thewitcher3wildhunt/1.jpg', 3),
('/imagenes/juegos/thewitcher3wildhunt/2.jpg', 3),
('/imagenes/juegos/thewitcher3wildhunt/3.jpg', 3),
('/imagenes/juegos/thewitcher3wildhunt/4.jpg', 3),
('/imagenes/juegos/thewitcher3wildhunt/5.jpg', 3),
('/imagenes/juegos/godofwar(2018)/1.jpg', 4),
('/imagenes/juegos/godofwar(2018)/2.jpg', 4),
('/imagenes/juegos/godofwar(2018)/3.jpg', 4),
('/imagenes/juegos/godofwar(2018)/4.jpg', 4),
('/imagenes/juegos/godofwar(2018)/5.jpg', 4),
('/imagenes/juegos/eldenring/1.jpg', 5),
('/imagenes/juegos/eldenring/2.jpg', 5),
('/imagenes/juegos/eldenring/3.jpg', 5),
('/imagenes/juegos/eldenring/4.jpg', 5),
('/imagenes/juegos/eldenring/5.jpg', 5),
('/imagenes/juegos/grandtheftautov/1.jpg', 6),
('/imagenes/juegos/grandtheftautov/2.jpg', 6),
('/imagenes/juegos/grandtheftautov/3.jpg', 6),
('/imagenes/juegos/grandtheftautov/4.jpg', 6),
('/imagenes/juegos/grandtheftautov/5.jpg', 6),
('/imagenes/juegos/supermarioodyssey/1.jpg', 7),
('/imagenes/juegos/supermarioodyssey/2.jpg', 7),
('/imagenes/juegos/supermarioodyssey/3.jpg', 7),
('/imagenes/juegos/supermarioodyssey/4.jpg', 7),
('/imagenes/juegos/supermarioodyssey/5.jpg', 7),
('/imagenes/juegos/minecraft/1.jpg', 8),
('/imagenes/juegos/minecraft/2.jpg', 8),
('/imagenes/juegos/minecraft/3.jpg', 8),
('/imagenes/juegos/minecraft/4.jpg', 8),
('/imagenes/juegos/minecraft/5.jpg', 8),
('/imagenes/juegos/horizonzerodawn/1.jpg', 9),
('/imagenes/juegos/horizonzerodawn/2.jpg', 9),
('/imagenes/juegos/horizonzerodawn/3.jpg', 9),
('/imagenes/juegos/horizonzerodawn/4.jpg', 9),
('/imagenes/juegos/horizonzerodawn/5.jpg', 9),
('/imagenes/juegos/cyberpunk2077/1.jpg', 10),
('/imagenes/juegos/cyberpunk2077/2.jpg', 10),
('/imagenes/juegos/cyberpunk2077/3.jpg', 10),
('/imagenes/juegos/cyberpunk2077/4.jpg', 10),
('/imagenes/juegos/cyberpunk2077/5.jpg', 10),
('/imagenes/juegos/haxball/1.jpg', 11),
('/imagenes/juegos/haxball/2.jpg', 11),
('/imagenes/juegos/haxball/3.jpg', 11),
('/imagenes/juegos/haxball/4.jpg', 11),
('/imagenes/juegos/haxball/5.jpg', 11);

INSERT INTO public."GameTrailer" (url, "gameId") VALUES
('https://www.youtube.com/watch?v=zw47_q9wbBE', 1),
('https://www.youtube.com/watch?v=gmA6MrX81z4', 2),
('https://www.youtube.com/watch?v=c0i88t0Kacs', 3),
('https://www.youtube.com/watch?v=K0u_kAWLJOA', 4),
('https://www.youtube.com/watch?v=E3Huy2cdih0', 5),
('https://www.youtube.com/watch?v=QkkoHAzjnUs', 6),
('https://www.youtube.com/watch?v=wGQHQc_3ycE', 7),
('https://www.youtube.com/watch?v=MmB9b5njVbA', 8),
('https://www.youtube.com/watch?v=u4-FCsiF5x4', 9),
('https://www.youtube.com/watch?v=8X2kIfS6fb8', 10),
('https://www.youtube.com/watch?v=OTv7xd8PTpg', 11);

INSERT INTO public."GameAttachment" (url, "gameId") VALUES
('/imagenes/juegos/thelegendofzeldabreathofthewild/attachment.jpg', 1), --zelda
('/imagenes/juegos/reddeadredemption2/attachment.jpg', 2), --reddead 
('/imagenes/juegos/thewitcher3wildhunt/attachment.jpg', 3), --thewitcher
('/imagenes/juegos/godofwar(2018)/attachment.jpg', 4), --godofwar
('/imagenes/juegos/eldenring/attachment.jpg', 5), --eldenring
('/imagenes/juegos/grandtheftautov/attachment.jpg', 6), --GTA V
('/imagenes/juegos/supermarioodyssey/attachment.jpg', 7), --super mario
('/imagenes/juegos/minecraft/attachment.jpg', 8), --minecraft
('/imagenes/juegos/horizonzerodawn/attachment.jpg', 9), --horizon
('/imagenes/juegos/cyberpunk2077/attachment.jpg', 10), --cyberpunk
('/imagenes/juegos/haxball/attachment.jpg', 11); --haxball

