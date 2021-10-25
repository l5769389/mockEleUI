const fs =require('fs');
const path=require('path');
const ComponentsJson =require('../../components.json');

const Components =Object.keys(ComponentsJson);
let indexContent =`@import "./base.scss";\n`;
Components.forEach(key=>{
    let filename =`${key}.scss`;
    // let filePath =path.resolve(__dirname,'../../packages/theme-chalk/src/',filename);
    indexContent =`${indexContent} @import "./${filename}";\n`;
    fs.writeFileSync(path.resolve(__dirname,'../../packages/theme-chalk/src/index.scss'),indexContent);
})
