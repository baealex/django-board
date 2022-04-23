import { spawn } from 'child_process'
import { copyFileSync, existsSync } from 'fs'
import { resolve } from 'path'

if (!existsSync(resolve('.env'))) {
    copyFileSync(resolve('./cli/sample/.env'), resolve('.env'))
}

spawn('docker-compose', ['up', '--build'], { stdio: 'inherit' })

spawn('sh', [ resolve('./cli/shall/docker-clean.sh') ])