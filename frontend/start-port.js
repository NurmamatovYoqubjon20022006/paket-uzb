const { execSync } = require('child_process');
try {
  execSync(`netstat -aon | findstr :3000`, { stdio: 'pipe' })
    .toString()
    .split('\n')
    .forEach(line => {
      const parts = line.trim().split(/\s+/);
      const pid = parts[4];
      if (pid) execSync(`taskkill /F /PID ${pid}`);
    });
} catch (e) {}