import * as shell from "shelljs";

// Copy all the view templates
shell.cp("-R", "src/templates", "dist/src/templates");
shell.cp("-R", "src/*.pem", "dist/src");
