const path = require('path');

const fse = require('fs-extra');

const packagePath = process.cwd();

const createPackage = async () => {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'));

  const pckg = JSON.parse(packageData);

  pckg.main = 'index.js';

  await fse.writeFile(
    path.resolve(packagePath, './package.json'),
    JSON.stringify(pckg, null, 2),
    'utf8',
  );
};

const run = async () => {
  try {
    await createPackage();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// eslint-disable-next-line unicorn/prefer-top-level-await
run();
