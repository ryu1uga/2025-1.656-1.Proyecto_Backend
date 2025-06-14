export interface Game {
    id : number
    name : string
    rating : number
    price : number
    category : string
    description : string
    coments? : string[]
    sells: number
    company: string
    images_url? : string[]
    trailer? : string[]
    state : number
}

export const gamesList: Game[] = [
  {
    id: 1,
    name: "The Legend of Zelda: Breath of the Wild",
    rating: 9.8,
    price: 31.5,
    category: "Action-Adventure",
    description: "Embárcate en una épica aventura en un vasto mundo abierto lleno de misterio y maravillas...",
    coments: [],
    sells: 32000000,
    company: "Nintendo",
    images_url: [],
    trailer: ["zw47_q9wbBE"],
    state: 0
  },
  {
    id: 2,
    name: "Red Dead Redemption 2",
    rating: 9.7,
    price: 61,
    category: "Action-Adventure",
    description: "Sumérgete en una épica historia ambientada en el salvaje oeste americano...",
    coments: [],
    sells: 64000000,
    company: "Rockstar Games",
    images_url: [],
    trailer: ["gmA6MrX81z4"],
    state: 0
  },
  {
    id: 3,
    name: "The Witcher 3: Wild Hunt",
    rating: 9.6,
    price: 50,
    category: "RPG",
    description: "Adéntrate en un vasto mundo de fantasía como Geralt de Rivia...",
    coments: [],
    sells: 50000000,
    company: "CD Projekt",
    images_url: [],
    trailer: ["c0i88t0Kacs"],
    state: 0
  },
  {
    id: 4,
    name: "God of War (2018)",
    rating: 9.5,
    price: 23,
    category: "Action-Adventure",
    description: "Acompaña a Kratos y su hijo Atreus en un viaje épico a través de la mitología nórdica...",
    coments: [],
    sells: 32000000,
    company: "Santa Monica Studio",
    images_url: [],
    trailer: ["K0u_kAWLJOA"],
    state: 0
  },
  {
    id: 5,
    name: "Elden Ring",
    rating: 9.5,
    price: 25,
    category: "RPG",
    description: "Explora las Tierras Intermedias, un vasto mundo abierto creado por FromSoftware...",
    coments: [],
    sells: 30000000,
    company: "FromSoftware",
    images_url: [],
    trailer: ["E3Huy2cdih0"],
    state: 1
  },
  {
    id: 6,
    name: "Grand Theft Auto V",
    rating: 9.6,
    price: 185,
    category: "Action-Adventure",
    description: "Sumérgete en la vibrante ciudad de Los Santos y sus alrededores...",
    coments: [],
    sells: 200000000,
    company: "Rockstar Games",
    images_url: [],
    trailer: ["QkkoHAzjnUs"],
    state: 1
  },
  {
    id: 7,
    name: "Super Mario Odyssey",
    rating: 9.2,
    price: 27,
    category: "Platformer",
    description: "Acompaña a Mario y su nuevo amigo Cappy en un viaje global...",
    coments: [],
    sells: 28000000,
    company: "Nintendo",
    images_url: [],
    trailer: ["wGQHQc_3ycE"],
    state: 1
  },
  {
    id: 8,
    name: "Minecraft",
    rating: 9.0,
    price: 300,
    category: "Sandbox",
    description: "Crea y explora un mundo infinito generado proceduralmente...",
    coments: [],
    sells: 300000000,
    company: "Mojang Studios",
    images_url: [],
    trailer: ["MmB9b5njVbA"],
    state: 1
  },
  {
    id: 9,
    name: "Horizon Zero Dawn",
    rating: 8.9,
    price: 24,
    category: "Action-RPG",
    description: "Explora un impresionante mundo postapocalíptico donde las máquinas dominan la tierra...",
    coments: [],
    sells: 24000000,
    company: "Guerrilla Games",
    images_url: [],
    trailer: ["u4-FCsiF5x4"],
    state: 1
  },
  {
    id: 10,
    name: "Cyberpunk 2077",
    rating: 8.5,
    price: 25,
    category: "RPG",
    description: "Adéntrate en Night City, una metrópoli futurista donde las megacorporaciones controlan todo...",
    coments: [],
    sells: 25000000,
    company: "CD Projekt",
    images_url: [],
    trailer: ["8X2kIfS6fb8"],
    state: 1
  },
  {
    id: 11,
    name: "Haxball",
    rating: 10.0,
    price: 100,
    category: "Sports",
    description: "Disfruta de un juego multijugador en línea de fútbol con mecánicas simples pero adictivas...",
    coments: [],
    sells: 1000000,
    company: "Mario Carbajal",
    images_url: [],
    trailer: ["OTv7xd8PTpg"],
    state: 1
  }
]