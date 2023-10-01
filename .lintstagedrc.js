module.exports = {
  '**/*.(md)': filenames =>
    `npx prettier --write --list-different ${filenames.join(' ')}`,

  '**/*.(ts|tsx|js|jsx|json)': filenames => [
    // `npx eslint ${filenames.join(" ")} --fix`,
    `npx prettier --write --list-different ${filenames.join(' ')}`,
  ],
};
