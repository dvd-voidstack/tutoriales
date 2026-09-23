import { mkdir, readFile, writeFile } from 'node:fs/promises'
//join es un module nativo de nodejs que sirve para concatenar rutas segun sea el sistema operativo linux '/', windows '\'
//va a permitir el codigo ejecutarse independientemente del sistema operativo
import { join, basename, extname } from 'node:path'

let content = ''
// se puede hacer comprobacion de los permisos para evitar que aparezcan errores
if (process.permission.has('fs.read', 'archivo.txt')) {
    //lectura de ficheros
    content = await readFile('archivo.txt', 'utf-8')
    console.log(content)
} else {
    console.log('No tienes permiso para leer el archivo.')
}

if (process.permission.has('fs.write', join('output', 'files', 'documentos'))) {
    //craecion de un directorio de manera recursiva 
    const outputDir = join('output', 'files', 'documents')
    await mkdir(outputDir, { recursive: true })
    
    //escritura de ficheros
    const uppercaseContent = content.toUpperCase()
    const outputFilePath = join(outputDir, 'archivo-uppercase.txt')
    
    //extname sirve para ver la extension de un fichero
    console.log('La extension es: ', extname(outputFilePath))
    
    //basename siver para recuperar el nombre del fichero
    console.log('El nombre del archivo es: ', basename(outputFilePath))
    
    await writeFile(outputFilePath, uppercaseContent)
    console.log('Archivo creado en mayusculas')    
} else {
    console.log('No tienes permiso para escribir en el directorio especificado')
}

//para manejar los permisos podemons intentar con el comando
// node --permission fileName.js
// probablemente este primer comando deniegue el acceso por falta de permisos
// para darle permisos es necesario agregar los siguientes comandos
// --allow-fs-read="*"  Esto quiere decir que le otorgamos todos los permisos de lectura
// --allow-fs-write="*" Esto quiere decir que le otorgamos todos los permisos de escritura
// para evitar asignar todos los permisos basta con reemplazar "*" por el nombre de los ficheros o direcctorios a los que le queramos otorgar acceso
// p.ejem node --permission --allow-fs-read="./archivo.txt" --allow-fs-wrirte="./output/*" manage-files.js