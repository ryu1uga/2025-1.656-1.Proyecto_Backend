import { PrismaClient } from "../../src/generated/prisma";

const prisma = new PrismaClient()

const main = async () => {
    await prisma.category.createMany({
        data : [
            { name : "Action-Adventure" },
            { name : "RPG" },
            { name : "Platformer" },
            { name : "Sandbox" },
            { name : "Action-RPG" },
            { name : "Sports" }
        ]
    })

    await prisma.game.createMany({
        data: [
            { name: 'The Legend of Zelda: Breath of the Wild', price: 31.5, description: 'Explora un vasto mundo abierto lleno de misterio y aventura.', company: 'Nintendo', categoryId: 1, state: 0 },
            { name: 'Red Dead Redemption 2', price: 61, description: 'Vive una épica historia en el salvaje oeste americano.', company: 'Rockstar Games', categoryId: 1, state: 0 },
            { name: 'The Witcher 3: Wild Hunt', price: 50, description: 'Embárcate en una aventura de fantasía como cazador de monstruos.', company: 'CD Projekt', categoryId: 2, state: 0 },
            { name: 'God of War (2018)', price: 23, description: 'Disfruta de una épica mitología nórdica con combates intensos.', company: 'Santa Monica Studio', categoryId: 1, state: 0 },
            { name: 'Elden Ring', price: 25, description: 'Descubre un mundo abierto lleno de desafíos y secretos.', company: 'FromSoftware', categoryId: 2, state: 1 },
            { name: 'Grand Theft Auto V', price: 185, description: 'Explora una ciudad abierta con acción y crimen sin límites.', company: 'Rockstar Games', categoryId: 1, state: 1 },
            { name: 'Super Mario Odyssey', price: 27, description: 'Acompaña a Mario en un viaje lleno de plataformas y creatividad.', company: 'Nintendo', categoryId: 3, state: 1 },
            { name: 'Minecraft', price: 300, description: 'Crea y explora un mundo infinito con bloques.', company: 'Mojang Studios', categoryId: 4, state: 1 },
            { name: 'Horizon Zero Dawn', price: 24, description: 'Sobrevive en un mundo postapocalíptico dominado por máquinas.', company: 'Guerrilla Games', categoryId: 5, state: 1 },
            { name: 'Cyberpunk 2077', price: 25, description: 'Vive una experiencia futurista en una ciudad cyberpunk.', company: 'CD Projekt', categoryId: 2, state: 1 },
            { name: 'Haxball', price: 100, description: 'Disfruta de un juego multijugador de fútbol con mecánicas simples.', company: 'Mario Carbajal', categoryId: 6, state: 1 }
        ]
    })

    await prisma.gameImage.createMany({
        data: [
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/thelegendofzeldabreathofthewild/${n}.jpg`, gameId: 1 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/reddeadredemption2/${n}.jpg`, gameId: 2 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/thewitcher3wildhunt/${n}.jpg`, gameId: 3 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/godofwar(2018)/${n}.jpg`, gameId: 4 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/eldenring/${n}.jpg`, gameId: 5 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/grandtheftautov/${n}.jpg`, gameId: 6 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/supermarioodyssey/${n}.jpg`, gameId: 7 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/minecraft/${n}.jpg`, gameId: 8 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/horizonzerodawn/${n}.jpg`, gameId: 9 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/cyberpunk2077/${n}.jpg`, gameId: 10 })),
        ...[1,2,3,4,5].map(n => ({ url: `/imagenes/juegos/haxball/${n}.jpg`, gameId: 11 })),
        ]
    })

    await prisma.gameTrailer.createMany({
        data: [
            { url: 'https://www.youtube.com/watch?v=zw47_q9wbBE', gameId: 1 },
            { url: 'https://www.youtube.com/watch?v=gmA6MrX81z4', gameId: 2 },
            { url: 'https://www.youtube.com/watch?v=c0i88t0Kacs', gameId: 3 },
            { url: 'https://www.youtube.com/watch?v=K0u_kAWLJOA', gameId: 4 },
            { url: 'https://www.youtube.com/watch?v=E3Huy2cdih0', gameId: 5 },
            { url: 'https://www.youtube.com/watch?v=QkkoHAzjnUs', gameId: 6 },
            { url: 'https://www.youtube.com/watch?v=wGQHQc_3ycE', gameId: 7 },
            { url: 'https://www.youtube.com/watch?v=MmB9b5njVbA', gameId: 8 },
            { url: 'https://www.youtube.com/watch?v=u4-FCsiF5x4', gameId: 9 },
            { url: 'https://www.youtube.com/watch?v=8X2kIfS6fb8', gameId: 10 },
            { url: 'https://www.youtube.com/watch?v=OTv7xd8PTpg', gameId: 11 }
        ]
    })

    await prisma.gameAttachment.createMany({
        data: [
            { url: '/imagenes/juegos/cyberpunk2077/attachment.jpg', gameId: 1 }
        ]
    })
}