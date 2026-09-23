// Creacion de servidor sin dependencias
import { createServer } from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from 'node:stream/consumers'

// un servidor cuando lo creamos tenemos que indicarle el puerto
// lo mejor en el caso es utilizar una variable de entorno, alamcenadas en un archivo .env
// una variable de entorno son variable que etsan a nivel tanto del sistema operativo o del entorno donde estamos ejecutando el proceso

process.loadEnvFile() // con esto lee automaticamente .env y poner en el process.env todas las variables de .env 

const port = process.env.PORT ?? 3000
// si colocamos 0 en el port
// const port = 0
// y lo asignamos, al inicializar el servidor este se asignara al primer puerto que encuentre disponible

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}

const users = [
    {"id":1,"name":"David"},
    {"id":2,"name":"Shizu"},
    {"name":"Lucia","id":"ff36b77f-c489-45b1-aaa4-43c6f2d246c3"},
    {"name":"Sara","id":"165dfcaa-00c2-4430-88fa-c0eae830c42b"},
    {"name":"Maria","id":"c381df04-f20e-442c-96b5-1ae99e09bf22"}
]

// crear servidor 
// un servidor debe tener dos cosas indispensables: peticiones (request) y respuestas
const server = createServer(async (req, res) => {
    const { method, url } = req

    const [ pathname, querystring ] = url.split("?")

    const searchParams = new URLSearchParams(querystring)
    
    // Para comprobar el tipo de peticion y llevar un control
    if (method === 'GET') {
        // curl -X GET "http://127.0.0.1:1234/users"
    
        if (pathname === '/users') {

            // revisar que no se manden letras en la peticion
            // existen mejores formas de validarlo, solo para tener en cuenta que se debe de validar
            /*if (Number.isNaN(Number(searchParams.get('limit') || '0')) || Number.isNaN(Number(searchParams.get('offset')) || '0')) {
                return sendJson(res, 400, { error: 'Limit and offset must be numbers' })
            }*/

            // curl -X GET "http://127.0.0.1:1234/users?limit=2"
            const limit = Number(searchParams.get('limit')) || users.length
            // curl -X GET "http://127.0.0.1:1234/users?limit=2&offset=1"
            const offset = Number(searchParams.get('offset')) || 0

            const paginatedUsers = users.slice(offset, offset + limit)

            return sendJson(res, 200, paginatedUsers)
        }
    
        // revisar si esta activo
        if (pathname === '/health') {
            return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
        }
        //return sendJson(res, 405, { error: 'Method Not Allowed' })
    }

    if (method === 'POST') {
        // Para enviar un post por cmd de windows se hace de la siguiente manera
        // curl -X POST http://127.0.0.1:1234/users -H "Content-Type: application/json" -d "{\"name\":\"Lucia\"}"
        if (pathname === '/users') {
            const body = await json(req)
            
            if (!body || !body.name) {
                return sendJson(res, 400, { error: 'Name is requierd' })
            }

            const newUser = {
                name: body.name,
                id: randomUUID()
            }

            users.push(newUser)

            return sendJson(res, 201, { message: 'Usuario Creado' })
        }
    }


    return sendJson(res, 404, { error: 'Not Found' })
})

// Inicializar el servidor en el puerto indicado
server.listen(port, () => {
    const address = server.address()
    console.log(`Servidor escuchando en http://localhost:${address.port}`)
})

// Si usamos node server.js
// Para aplicar los cambios es necesario cerrar el servidor en caso que este abierto y volver a abrirlo
// Para evitar esto es posible agregar una flag para que enc aso de detectar cambios refresque el servidor
// node --watch server.js

// para asignar directamente en terminal una variable de entorno se hace de la siguiente manera
// WINDOWS CMD set PORT=8888 && node server.js   // regresar a valor base set PORT=
// LINUX/MACOS PORT=8888 node server.js