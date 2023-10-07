module.exports = {
  '**/*.(md|json)': filenames =>
    `npx prettier --write --list-different ${filenames.join(' ')}`,

  '**/*.(ts|tsx|js|jsx)': filenames => [
    `npx eslint ${filenames.join(' ')}`,
    `npx prettier --write --list-different ${filenames.join(' ')}`,
  ],
};
