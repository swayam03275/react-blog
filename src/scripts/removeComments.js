import fs from 'fs';
import path from 'path';

const removeComments = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const cleanedContent = fileContent.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // Remove all comments
  fs.writeFileSync(filePath, cleanedContent);
};

const removeCommentsFromDir = (dirPath) => {
  fs.readdirSync(dirPath).forEach(file => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      removeCommentsFromDir(fullPath); // Recurse into subdirectories
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      removeComments(fullPath); // Remove comments from JavaScript files
    }
  });
};

const directory = './src'; // Your source folder or project folder
removeCommentsFromDir(directory); // Remove comments in all .js/.jsx files in the 'src' folder
