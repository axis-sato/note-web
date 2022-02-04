module.exports = {
  "**/*.{js,jsx,ts,tsx,html,css}": ["yarn format:fix"],
  "**/*.ts?(x)": (filenames) =>
    `yarn lint:fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(" --file ")}`,
};
