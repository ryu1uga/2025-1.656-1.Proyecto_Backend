INSERT INTO public."User" (email, password, usertype, state) VALUES
('fabrizzio@email.pw', 'Fabrizzio_PW', 0, 0),
('gianfranco@email.pw', 'Gianfranco_PW', 0, 0),
('lucas@email.pw', 'Lucas_PW', 0, 0),
('ryuichi@email.pw', 'Ryuichi_PW', 1, 0),
('giancarlo@email.pw', 'Giancarlo_PW', 1, 0);

INSERT INTO public."Game" (name, rating, price, category, description, coments, sells, company, images_url, trailer, state) VALUES
('The Legend of Zelda: Breath of the Wild', 9.8, 31.5, 'Action-Adventure', 'Embárcate en una épica aventura en un vasto mundo abierto lleno de misterio y maravillas...', ARRAY[]::TEXT[], 32000000, 'Nintendo', ARRAY[]::TEXT[], ARRAY['zw47_q9wbBE'], 0),
('Red Dead Redemption 2', 9.7, 61, 'Action-Adventure', 'Sumérgete en una épica historia ambientada en el salvaje oeste americano...', ARRAY[]::TEXT[], 64000000, 'Rockstar Games', ARRAY[]::TEXT[], ARRAY['gmA6MrX81z4'], 0),
('The Witcher 3: Wild Hunt', 9.6, 50, 'RPG', 'Adéntrate en un vasto mundo de fantasía como Geralt de Rivia...', ARRAY[]::TEXT[], 50000000, 'CD Projekt', ARRAY[]::TEXT[], ARRAY['c0i88t0Kacs'], 0),
('God of War (2018)', 9.5, 23, 'Action-Adventure', 'Acompaña a Kratos y su hijo Atreus en un viaje épico a través de la mitología nórdica...', ARRAY[]::TEXT[], 32000000, 'Santa Monica Studio', ARRAY[]::TEXT[], ARRAY['K0u_kAWLJOA'], 0),
('Elden Ring', 9.5, 25, 'RPG', 'Explora las Tierras Intermedias, un vasto mundo abierto creado por FromSoftware...', ARRAY[]::TEXT[], 30000000, 'FromSoftware', ARRAY[]::TEXT[], ARRAY['E3Huy2cdih0'], 1),
('Grand Theft Auto V', 9.6, 185, 'Action-Adventure', 'Sumérgete en la vibrante ciudad de Los Santos y sus alrededores...', ARRAY[]::TEXT[], 200000000, 'Rockstar Games', ARRAY[]::TEXT[], ARRAY['QkkoHAzjnUs'], 1),
('Super Mario Odyssey', 9.2, 27, 'Platformer', 'Acompaña a Mario y su nuevo amigo Cappy en un viaje global...', ARRAY[]::TEXT[], 28000000, 'Nintendo', ARRAY[]::TEXT[], ARRAY['wGQHQc_3ycE'], 1),
('Minecraft', 9.0, 300, 'Sandbox', 'Crea y explora un mundo infinito generado proceduralmente...', ARRAY[]::TEXT[], 300000000, 'Mojang Studios', ARRAY[]::TEXT[], ARRAY['MmB9b5njVbA'], 1),
('Horizon Zero Dawn', 8.9, 24, 'Action-RPG', 'Explora un impresionante mundo postapocalíptico donde las máquinas dominan la tierra...', ARRAY[]::TEXT[], 24000000, 'Guerrilla Games', ARRAY[]::TEXT[], ARRAY['u4-FCsiF5x4'], 1),
('Cyberpunk 2077', 8.5, 25, 'RPG', 'Adéntrate en Night City, una metrópoli futurista donde las megacorporaciones controlan todo...', ARRAY[]::TEXT[], 25000000, 'CD Projekt', ARRAY[]::TEXT[], ARRAY['8X2kIfS6fb8'], 1),
('Haxball', 10.0, 100, 'Sports', 'Disfruta de un juego multijugador en línea de fútbol con mecánicas simples pero adictivas...', ARRAY[]::TEXT[], 1000000, 'Mario Carbajal', ARRAY[]::TEXT[], ARRAY['OTv7xd8PTpg'], 1);