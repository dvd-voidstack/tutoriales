//cuando se importa un modulo nativo de nodejs el node: es opcional pero recomendable poner
//import os from 'os'
//el 'node:' se recomienda para asegurarse de importar el modulo nativo
import os from 'node:os'
import ms from 'ms'

console.log('Tipo de SO:', os.type())
console.log('Plataforma:', os.platform())
console.log("Arquitectura:", os.arch())
console.log('Memoria Total (bytes):', os.totalmem())
console.log('Memoria libre (bytes):', os.freemem())
console.log('Directorio home del usuario:', os.homedir())
console.log('Tiempo de actividad del sistema (segundos):', os.uptime())
//Para instalar cualquier dependencia externa se tiene una variedad de opciones ya sea npm (incluido por defecto), yarn, pnpm
// npm install <nombre>     p.ejem npm install ms
// donde <nombre> se sustituye por el de la dependencia a instalar
// hay que tomar en cuenta que siempre que se quiera instalar una nueva dependencia externa se debe hacer apuntando a la direccion del fichero package.json
// package.json nos indica cuales son las dependencias utilizadas en el proyecto, versiones exactas y otros datos
// se genera un nuevo fichero package-lock.json que seria como la foto de todas las versiones exactas que se han instalado
console.log('Tiempo de actividad del sistema:', ms(os.uptime() * 1000, { long: true }))

console.log('------------------------------------')
console.log('CPUS:', os.cpus())
console.log('------------------------------------')

//Informacion adicional
console.log('Numero de nucleos de CPU:', os.cpus().length)
console.log('Hostname del sistema:', os.hostname())
console.log('Version del SO:', os.release())