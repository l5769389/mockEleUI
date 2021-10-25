const {series,src,dest} =require('gulp');
/*
gulp sass 5没有默认的sass编译器；请自己定一个。
* */
const sass =require('gulp-sass')(require('sass'));
function compile() {
    return src('./src/*.scss')
        .pipe(sass())
        .pipe(dest('./lib'))
}
function copyfont() {
    return src('./src/fonts/*')
        .pipe(dest('./lib/fonts'))
}

exports.build =series(compile,copyfont)
