import { fs } from 'memfs'

export function readHelloWorld(path:string) {
    return fs.readFileSync(path, 'utf-8')
}