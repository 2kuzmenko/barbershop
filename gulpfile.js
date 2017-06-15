var gulp  		= require('gulp');//Подключаем Gulp
var sass        = require('gulp-sass');// Подключаем пакет Sass
var browserSync = require('browser-sync');// Подключаем browse-sync
var jade 		= require('gulp-jade');// Подключаем jade
const image = require('gulp-image');

gulp.task('image', function () {
    gulp.src('app/scss/picture/**/*')
        .pipe(image())
        .pipe(gulp.dest('./dist/css/picture'));
});



gulp.task('jade',function() {
	gulp.src('app/templates/**/*.jade')// Выборка исходных файлов для обработки плагином
	.pipe(jade())// вызов jade для обработки
	.pipe(gulp.dest('./dist/'))//Файл после обработки идет в dist

});



gulp.task('sass',function(){
	return gulp.src('app/scss/**/*.scss')// Берем все sass файлы из папки sass и дочерних, если таковые будут
	.pipe(sass())// Вызов Sass для обработки файла
	.pipe(gulp.dest('dist/css'))// Вывод результирующего файла в папку назначения (dest - пункт назначения)
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync',function(){// Создаем таск browser-sync
	browserSync({// Выполняем browser Sync
		server: {// Определяем параметры сервера
			baseDir: 'dist'
		},
		notify: false
	});
});

gulp.task('watch',['browser-sync','sass','jade','image'],function(){
    gulp.watch('app/scss/picture/**/*',['image'])
	gulp.watch('app/scss/**/*.scss',['sass']);
	gulp.watch('dist/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);
	gulp.watch('app/templates/**/*.jade',['jade',browserSync.reload]);
});
