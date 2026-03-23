import { execSync } from 'node:child_process';

function runSeed(scriptPath: string) {
  console.log(`\n=> Running seed: ${scriptPath}`);
  execSync(`npx tsx ${scriptPath}`, { stdio: 'inherit', cwd: process.cwd() });
}

async function main() {
  try {
    runSeed('src/db/seed/firstSeed.ts');
    runSeed('src/db/seed/locationSeed.ts');
    runSeed('src/db/seed/optionsSeed.ts');
    console.log('\n-> All seed scripts completed successfully');
  } catch (error) {
    console.error('\n-> Seed scripts failed:', error);
    process.exit(1);
  }
}

main();