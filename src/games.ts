export interface Game {
    id : number
    name : string
    rating : number
    price : number
    category : string
    description : string
    coments : string[]
    trailer : string[]
    state : number
}

export const gamesList : Game[] = [
    { 
        id : 1,
        name : "The Legend of Zelda: Breath of the Wild", 
        rating : 9.8, 
        price : 31.5, 
        category : "Action-Adventure",
        description : "Embárcate en una épica aventura en un vasto mundo abierto lleno de misterio y maravillas. Explora el reino de Hyrule, descubre santuarios antiguos, resuelve acertijos y combate contra criaturas mágicas mientras desentrañas la historia del héroe Link y la princesa Zelda.", 
        coments : [], 
        trailer : ["zw47_q9wbBE"],
        state : 0
    },
    { 
        id : 2,
        name : "Red Dead Redemption 2", 
        rating : 9.7, 
        price : 61, 
        category : "Action-Adventure",
        description : "Sumérgete en una épica historia ambientada en el salvaje oeste americano a finales del siglo XIX. Vive la vida de Arthur Morgan, un forajido de la banda Van der Linde, mientras enfrentas dilemas morales, robos, tiroteos y la lucha por sobrevivir en un mundo que cambia rápidamente.", 
        coments : [], 
        trailer : ["gmA6MrX81z4"],
        state : 0
    },
    { 
        id : 3,
        name : "The Witcher 3: Wild Hunt", 
        rating : 9.6, 
        price : 50, 
        category : "RPG",
        description : "Adéntrate en un vasto mundo de fantasía como Geralt de Rivia, un cazador de monstruos profesional. Embárcate en misiones épicas, explora un continente devastado por la guerra, toma decisiones que afectan la historia y enfréntate a criaturas míticas en combates estratégicos llenos de acción.", 
        coments : [], 
        trailer : ["c0i88t0Kacs"],
        state : 0
    },
    { 
        id : 4,
        name : "God of War (2018)", 
        rating : 9.5, 
        price : 23, 
        category : "Action-Adventure",
        description : "Acompaña a Kratos y su hijo Atreus en un viaje épico a través de la mitología nórdica. Disfruta de combates intensos, resuelve acertijos y descubre una narrativa emocional sobre la redención y la relación padre-hijo, todo en un mundo lleno de dioses y monstruos.", 
        coments : [], 
        trailer : ["K0u_kAWLJOA"],
        state : 0
    },
    { 
        id : 5,
        name : "Elden Ring", 
        rating : 9.5, 
        price : 25, 
        category : "RPG",
        description : "Explora las Tierras Intermedias, un vasto mundo abierto creado por FromSoftware y George R.R. Martin. Enfréntate a desafiantes enemigos, descubre secretos ocultos y forja tu propio camino en una aventura épica llena de combates intensos y exploración sin límites.", 
        coments : [], 
        trailer : ["E3Huy2cdih0"],
        state : 1
    },
    { 
        id : 6,
        name : "Grand Theft Auto V", 
        rating : 9.6, 
        price : 185, 
        category : "Action-Adventure",
        description : "Sumérgete en la vibrante ciudad de Los Santos y sus alrededores en este juego de mundo abierto. Sigue las historias entrelazadas de tres criminales mientras realizas atracos, exploras, participas en actividades ilegales y vives una experiencia llena de acción y libertad sin límites.", 
        coments : [], 
        trailer : ["QkkoHAzjnUs"],
        state : 1
    },
    { 
        id : 7,
        name : "Super Mario Odyssey", 
        rating : 9.2, 
        price : 27, 
        category : "Platformer",
        description : "Acompaña a Mario y su nuevo amigo Cappy en un viaje global para rescatar a la princesa Peach de Bowser. Explora reinos únicos, recolecta lunas para alimentar tu nave y disfruta de mecánicas de plataformas innovadoras en esta colorida y creativa aventura 3D.", 
        coments : [], 
        trailer : ["wGQHQc_3ycE"],
        state : 1
    },
    { 
        id : 8,
        name : "Minecraft", 
        rating : 9.0, 
        price : 300, 
        category : "Sandbox",
        description : "Crea y explora un mundo infinito generado proceduralmente, donde cada bloque puede ser tu herramienta para construir. Sobrevive a las noches, enfréntate a criaturas, mina recursos y desata tu creatividad en un juego que ha inspirado a millones de jugadores en todo el mundo.", 
        coments : [], 
        trailer : ["MmB9b5njVbA"],
        state : 1
    },
    { 
        id : 9,
        name : "Horizon Zero Dawn", 
        rating : 8.9, 
        price : 24, 
        category : "Action-RPG",
        description : "Explora un impresionante mundo postapocalíptico donde las máquinas dominan la tierra. Como Aloy, descubre los secretos de tu pasado, caza robots gigantes con estrategias únicas y desentraña los misterios de una civilización perdida en esta aventura visualmente espectacular.", 
        coments : [], 
        trailer : ["u4-FCsiF5x4"],
        state : 1
    },
    { 
        id : 10,
        name : "Cyberpunk 2077", 
        rating : 8.5, 
        price : 25, 
        category : "RPG",
        description : "Adéntrate en Night City, una metrópoli futurista donde las megacorporaciones controlan todo. Personaliza a tu personaje, toma decisiones que moldean la historia y vive una experiencia inmersiva llena de acción, tecnología avanzada y dilemas morales en un mundo cyberpunk vibrante.", 
        coments : [], 
        trailer : ["8X2kIfS6fb8"],
        state : 1
    },
    { 
        id : 11,
        name : "Haxball", 
        rating : 10.0, 
        price : 100, 
        category : "Sports",
        description : "Disfruta de un juego multijugador en línea de fútbol con mecánicas simples pero adictivas. Controla un disco en un campo 2D, compite contra otros jugadores en partidas rápidas y demuestra tus habilidades en este título minimalista que ha ganado popularidad por su jugabilidad directa y divertida.", 
        coments : [], 
        trailer : ["OTv7xd8PTpg"],
        state : 1
    }
]