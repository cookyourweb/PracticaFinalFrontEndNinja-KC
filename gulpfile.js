var gulp = require("gulp"); // importamos la librería gulp
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");
var gulp = require('gulp');
var sass = require('gulp-sass');

//voy a añadir la configuracion tal como explica http://www.codevoila.com/post/32/customize-bootstrap-using-bootstrap-sass-and-gulp adaptado a lo que tenía de clase
// source and distribution folder
var source = 'src/';
var dest = 'dist/';
// Bootstrap scss source
var bootstrapSass = {
    in: './node_modules/bootstrap-sass/'
};
// Bootstrap fonts source
var fonts = {
    in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};
// Our scss source folder: .scss files
var scss = {
    in: source + 'scss/main.scss',
    out: dest + 'css/',
    watch: source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precison: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};

// definimos la tarea por defecto
gulp.task("default", ["html", "sass"], function(){

    // iniciamos el servidor de desarrollo
    browserSync.init({ server: "dist/" });

    // observa cambios en los archivos SASS, y entonces ejecuta la tarea 'sass'


    
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);

   
     // observa cambios en los archivos HTML y entonces ejecuta la tarea 'html'
     gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);

});
//compilar fuentes
// copy bootstrap required fonts to dest
gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});
// compilar sass



gulp.task("sass", function(){
    gulp.src("src/scss/style.scss") // cargamos el archivo style.scss
   // return gulp.src(scss.in)    
    .pipe(sass().on("error", sass.logError))
    
    
    // lo compilamos con gulp-sass
           // return notify().write(error); // si ocurre un error, mostramos una notificación
      //  }))
        .pipe(sass(scss.sassOpts))
        .pipe(gulp.dest(scss.out))
       .pipe(gulp.dest("src/css")) // guardamos el resultado en la carpeta css
        .pipe(browserSync.stream()) // recargue el CSS del navegador
        .pipe(notify("SASS Compilado 🤘🏻")) // muestra notifiación en pantalla
});



// copiar e importar html
gulp.task("html", function(){
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/")) // reemplaza los @import de los HTML
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream())
        .pipe(notify("HTML importado"));
});