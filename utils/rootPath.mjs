import path from "path";
import { fileURLToPath } from "url";


const currentDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(currentDir,'..');
export default rootDir;