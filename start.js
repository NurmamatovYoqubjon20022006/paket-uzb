#!/usr/bin/env node

/**
 * Paket UZB - Loyihani ishga tushurish skripti
 * Bu skript loyihani avtomatik ravishda ishga tushiradi
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const PROJECT_ROOT = __dirname;
const BACKEND_PATH = path.join(PROJECT_ROOT, 'backend');
const FRONTEND_PATH = path.join(PROJECT_ROOT, 'frontend');

// Ranglar uchun ANSI kodlar
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function runCommand(command, args, cwd, name) {
  return new Promise((resolve, reject) => {
    log(`🚀 ${name} ishga tushirilmoqda...`, 'cyan');
    
    const process = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: true
    });

    process.on('error', (error) => {
      log(`❌ ${name} xatosi: ${error.message}`, 'red');
      reject(error);
    });

    process.on('close', (code) => {
      if (code === 0) {
        log(`✅ ${name} muvaffaqiyatli ishga tushdi`, 'green');
        resolve();
      } else {
        log(`❌ ${name} xato bilan tugatildi (kod: ${code})`, 'red');
        reject(new Error(`${name} failed with code ${code}`));
      }
    });
  });
}

async function installDependencies() {
  log('📦 Dependencies o\'rnatilmoqda...', 'yellow');
  
  // Backend dependencies
  if (checkFileExists(path.join(BACKEND_PATH, 'package.json'))) {
    log('📦 Backend dependencies o\'rnatilmoqda...', 'blue');
    await runCommand('npm', ['install'], BACKEND_PATH, 'Backend NPM Install');
  }
  
  // Frontend dependencies
  if (checkFileExists(path.join(FRONTEND_PATH, 'package.json'))) {
    log('📦 Frontend dependencies o\'rnatilmoqda...', 'blue');
    await runCommand('npm', ['install'], FRONTEND_PATH, 'Frontend NPM Install');
  }
}

async function checkEnvironmentFiles() {
  log('🔍 Environment fayllar tekshirilmoqda...', 'yellow');
  
  const backendEnv = path.join(BACKEND_PATH, '.env');
  const frontendEnv = path.join(FRONTEND_PATH, '.env');
  
  if (!checkFileExists(backendEnv)) {
    log('⚠️  Backend .env fayli topilmadi!', 'yellow');
    log('Iltimos backend/.env faylini yarating va kerakli o\'zgaruvchilarni qo\'shing.', 'yellow');
  }
  
  if (!checkFileExists(frontendEnv)) {
    log('⚠️  Frontend .env fayli topilmadi!', 'yellow');
    log('Iltimos frontend/.env faylini yarating va kerakli o\'zgaruvchilarni qo\'shing.', 'yellow');
  }
}

async function startServers() {
  log('🚀 Serverlar ishga tushirilmoqda...', 'magenta');
  
  // Backend serverni background'da ishga tushirish
  const backendProcess = spawn('npm', ['run', 'dev'], {
    cwd: BACKEND_PATH,
    stdio: 'inherit',
    shell: true,
    detached: false
  });
  
  // Frontend serverni ishga tushirish
  setTimeout(() => {
    const frontendProcess = spawn('npm', ['start'], {
      cwd: FRONTEND_PATH,
      stdio: 'inherit',
      shell: true,
      detached: false
    });

    frontendProcess.on('error', (error) => {
      log(`❌ Frontend xatosi: ${error.message}`, 'red');
    });
  }, 3000); // Backend ishga tushgach frontend'ni ishga tushirish

  backendProcess.on('error', (error) => {
    log(`❌ Backend xatosi: ${error.message}`, 'red');
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    log('\n🛑 Serverlar to\'xtatilmoqda...', 'yellow');
    backendProcess.kill();
    process.exit(0);
  });
}

async function main() {
  try {
    log('🎯 Paket UZB loyihasi ishga tushirilmoqda...', 'bright');
    log('=' .repeat(50), 'blue');
    
    await checkEnvironmentFiles();
    await installDependencies();
    
    log('=' .repeat(50), 'blue');
    log('🌐 Serverlar:', 'bright');
    log('   Backend:  http://localhost:3004', 'green');
    log('   Frontend: http://localhost:3000', 'green');
    log('=' .repeat(50), 'blue');
    
    await startServers();
    
  } catch (error) {
    log(`❌ Xatolik yuz berdi: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Skriptni ishga tushirish
if (require.main === module) {
  main();
}

module.exports = { main };
