$('document').ready(
    function () {
        var form = $('#myform');
        /*var message = $('#myform_status');*/

        /*form.on('click',function () {*/
        $('#content-block-reviews-form-submit').on('click',function () {
            var formData = new FormData();
            if (($('#content-block-reviews-form-photo')[0].files).length != 0) {
                $.each($('#content-block-reviews-form-photo')[0].files, function (i, file) {
                    formData.append("file[" + i + "]", file);
                });
            } else {
                console.log('Нужно выбрать файл');
                return false;
            }

            $.ajax({
                type: 'POST',
                url: '../functions/downloadimg.php',
                data: formData,
                cache: false,
                dataType: 'json',
                contentType: false,
                processData: false,
                beforeSend: function () {
                    console.log('Запрос начат');
                    form.find('input').prop("disabled", true);
                },
                success: function (data) {
                    if (data.status == 'ok') {
                        console.log('Файлы загружены');
                        $('#content-block-reviews-form-photo').val('');
                    } else {
                        console.log('Загрузка не работает');
                    }
                },
                complete: function () {
                    console.log('Запрос закончен');
                    form.find('input').prop("disabled", false);
                    alert('Фото загружено');
                }
            });
            return false;
            /*});*/
        });
    }
);