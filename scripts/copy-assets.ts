import * as shell from "shelljs";

export default function copyAssets() {
  // Ensure destination directories exist
  shell.mkdir("-p", "dist/src/templates");
  shell.mkdir("-p", "dist/src");

  // Copy all the view templates
  shell.cp("-R", "src/templates/*", "dist/src/templates");
  shell.cp("-R", "src/*.pem", "dist/src");
}
