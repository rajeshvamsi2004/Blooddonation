const { spawn } = require('child_process');

const services = [
  { name: 'Register Service', file: 'Register.js' },
  { name: 'Search Blood Bank API', file: 'donation.js' },
  { name: 'Blood Camp Service', file: 'Camp.js' },
  { name: 'MySQL Stats Service', file: 'db.js' },
  { name: 'bloodbanks', file: 'bank.js' },
];

services.forEach(service => {
  const child = spawn('node', [service.file], {
    cwd: __dirname, // ensures correct working directory
    shell: true,
    stdio: 'inherit', // shows logs from the child services
  });

  child.on('close', (code) => {
    console.log(`${service.name} exited with code ${code}`);
  });
});