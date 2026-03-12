const fs = require('fs');
const path = require('path');
const extensions = ['.html', '.css', '.js'];

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!file.startsWith('.')) processDir(fullPath);
        } else if (extensions.includes(path.extname(fullPath))) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content.replace(/href=\"\/(?!\/)/g, 'href="');
            newContent = newContent.replace(/src=\"\/(?!\/)/g, 'src="');
            newContent = newContent.replace(/url\(['\"]?\/(?!\/)/g, 'url('); 
            // Also handle single quotes for href and src if any
            newContent = newContent.replace(/href=\'\/(?!\/)/g, "href='");
            newContent = newContent.replace(/src=\'\/(?!\/)/g, "src='");
            
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Updated:', fullPath);
            }
        }
    });
}
processDir('.');
