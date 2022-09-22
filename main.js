$(function () {
    var thisExt, msgs = [];


    // $('.imageupload > ul').fineUploader({
    //     debug: false,
    //     multiple: false,
    //     request: {
    //         endpoint: "http://dev-sonycsc.fb-app-hosting.com/api/v4/tinypop/birthday/upload?ext=png",
    //         paramsInBody: true,
    //         params: {
    //             ext: function () {
    //                 return thisExt;
    //             }
    //         }
    //     },
    //     chunking: {
    //         enabled: false
    //     },
    //     resume: {
    //         enabled: true
    //     },
    //     //retry: {
    //     //    enableAuto: true,
    //     //    //showButton: true
    //     //},
    //     deleteFile: {
    //         enabled: false
    //     },
    //     display: {
    //         fileSizeOnSubmit: false
    //     },
    //     paste: {
    //         targetElement: $(document)
    //     },
    //     text: {
    //         uploadButton: 'Upload a photo'
    //     },
    //     validation: {
    //         allowedExtensions: ['jpeg', 'jpg', 'gif', 'png'],
    //         minSizeLimit: 500000,
    //     },
    //     formatProgress: '{percent} % of {total_size}',
    //     showMessage: function (message) {
    //         if ($.inArray(message, msgs) == -1) {
    //             msgs.push(message);
    //             $('.uploadalerts').append('<p>' + message + '</p>').show();
    //         }
    //     }
    // }).on('complete', function (e, id, fileName, responseJSON) {
    //
    //     console.log(responseJSON);
    //     if (responseJSON.result === "SUCCESS") {
    //         //$('.uploadalerts p').remove();
    //         //$('.uploadalerts').hide();
    //         //$('.imageholder .preview').remove();
    //         //$('#crop').remove();
    //
    //         $('#hdnGuid').val(responseJSON.guid + '.' + responseJSON.fext);
    //
    //         //$(".fixed-dragger-cropper > img").attr("src", "/UserFiles/Images/Uploaded/" + $('#hdnGuid').val());
    //         $(".fixed-dragger-cropper > img").attr("src", responseJSON.base_url + responseJSON.transcoded_media_file.url);
    //         $(".fixed-dragger-cropper > img").attr("data-g", responseJSON.guid);
    //         $(".fixed-dragger-cropper > img").attr("data-ext", responseJSON.fext);
    //
    //         initializeCropper();
    //
    //         $("#step1").hide();
    //         $("#step2").show();
    //
    //         $('.qq-upload-list li').remove();
    //     }
    // }).on('upload', function (e, id, name) {
    //     var aext = name.split('.');
    //     thisExt = aext[aext.length - 1];
    // }).on('submit', function (e) {
    //     $('img.preview').remove();
    // });

    // $('#select_file').change(function ()
	// {
	// 	if (this.files && this.files[0]) {
    //
	// 		var file = this.files[0];
    //         console.log(file);
    //
	// 	}
	// });

    var FileApiSupported = !!('File' in window && 'FileReader' in window && 'FileList' in window && 'Blob' in window);

    if(!FileApiSupported)
    {
        $('.uploadalerts').append('<p>browser is not supported <br/> please try another</p>').show();
        $('.qq-upload-button').hide();
    }
    else
    {
        $('#select_file').on('change', function(e)
        {
            if(e.target.files && e.target.files[0])
            {
                var reader = new FileReader();
                reader.onload = function(e)
                {
                    var image = new Image();
                    image.onload = function()
                    {
                        if(image.naturalWidth < 400 || image.naturalHeight < 400)
                        {
                            $('#select_file').val('');
                            $('.uploadalerts').append('<p>image must be at least 400px x 400px <br/> please upload another image</p>').show();
                        }
                        else
                        {
                            $('.uploadalerts p').remove();
                            $('.uploadalerts').hide();
                            // $('.imageholder .preview').remove();
                            // $('#crop').remove();

                            //$('#hdnGuid').val(responseJSON.guid + '.' + responseJSON.fext);

                            //$(".fixed-dragger-cropper > img").attr("src", "/UserFiles/Images/Uploaded/" + $('#hdnGuid').val());
                            $(".fixed-dragger-cropper > img").attr("src",  e.target.result);
                            //$(".fixed-dragger-cropper > img").attr("data-g", responseJSON.guid);
                            //$(".fixed-dragger-cropper > img").attr("data-ext", responseJSON.fext);

                            initializeCropper();

                            $("#step1").hide();
                            $("#step2").show();

                            $('.qq-upload-list li').remove();
                        }


                    }
                    image.src = e.target.result;
                }
                reader.readAsDataURL(e.target.files[0]);
            }

            // console.log(e.target.files[0]);
            // var image = new Image();
            // image.src = e.target.files[0];
            // document.body.appendChild(image);
        })
    }


    var initializeCropper = function () {

        var $image = $('.fixed-dragger-cropper > img'),
            $dataX = $('#dataX'),
            $dataY = $('#dataY'),
            $dataHeight = $('#dataHeight'),
            $dataWidth = $('#dataWidth'),
            $dataRotate = $('#dataRotate'),
            options = {
                //data: {
                //  x: 0,
                //  y: 0,
                //  width: 300,
                //  height: 300
                //},
                // strict: false,
                // responsive: false,
                // checkImageOrigin: false

                // modal: false,
                 guides: false,
                // highlight: false,
                // background: false,

                // autoCrop: false,
                // autoCropArea: 0.5,
                // dragCrop: false,
                // movable: false,
                // rotatable: false,
                // zoomable: false,
                // touchDragZoom: false,
                // mouseWheelZoom: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
                // doubleClickToggle: false,

                //minCanvasWidth: 450,
                //minCanvasHeight: 450,
                //minCropBoxWidth: 450,
                //minCropBoxHeight: 450,
                //minContainerWidth: 450,
                //minContainerHeight: 450,

                // build: null,
                // built: null,
                // dragstart: null,
                // dragmove: null,
                // dragend: null,
                // zoomin: null,
                // zoomout: null,

                // aspectRatio: 16 / 9,
                aspectRatio: 1,
                autoCropArea: 1, // Center 50%
                //multiple: false,
                dragCrop: false,
                dashed: false,
                movable: true,
                resizable: false,
                built: function () {
                    $(this).cropper("zoom", 2.5);
                    $(this).cropper("setAspectRatio", 1);
                },
                //preview: '.img-preview',
                crop: function (data) {
                    $dataX.val(Math.round(data.x));
                    $dataY.val(Math.round(data.y));
                    $dataHeight.val(Math.round(data.height));
                    $dataWidth.val(Math.round(data.width));
                    $dataRotate.val(Math.round(data.rotate));
                }
            };


        $image.on({
            'build.cropper': function (e) {
                //console.log(e.type);
            },
            'built.cropper': function (e) {
                //console.log(e.type);
            },
            'dragstart.cropper': function (e) {
                //console.log(e.type, e.dragType);
            },
            'dragmove.cropper': function (e) {
                //console.log(e.type, e.dragType);
            },
            'dragend.cropper': function (e) {
                //console.log(e.type, e.dragType);
            },
            'zoomin.cropper': function (e) {
                //console.log(e.type);
            },
            'zoomout.cropper': function (e) {
            //    console.log(e.type);
            },
            'change.cropper': function (e) {
            //    console.log(e.type);
            }
        }).cropper(options);


        // Methods
        $(document.body).on('click', '[data-method]', function () {
            var data = $(this).data(),
                $target,
                result;

            if (!$image.data('cropper')) {
                return;
            }

            if (data.method) {
                data = $.extend({}, data); // Clone a new one

                if (typeof data.target !== 'undefined') {
                    $target = $(data.target);

                    if (typeof data.option === 'undefined') {
                        try {
                            data.option = JSON.parse($target.val());
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                }

                result = $image.cropper(data.method, data.option);

                if (data.method === 'getCroppedCanvas') {
                    $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
                }

                if ($.isPlainObject(result) && $target) {
                    try {
                        $target.val(JSON.stringify(result));
                    } catch (e) {
                        console.log(e.message);
                    }
                }

            }
        }).on('keydown', function (e) {

            if (!$image.data('cropper')) {
                return;
            }

            switch (e.which) {
                case 37:
                    e.preventDefault();
                    $image.cropper('move', -1, 0);
                    break;

                case 38:
                    e.preventDefault();
                    $image.cropper('move', 0, -1);
                    break;

                case 39:
                    e.preventDefault();
                    $image.cropper('move', 1, 0);
                    break;

                case 40:
                    e.preventDefault();
                    $image.cropper('move', 0, 1);
                    break;
            }

        });


        //$('a').click(function (e) {
        //    e.preventDefault();
        //});

        $(".crop-image").click(function (e) {
            e.preventDefault();

            var base64ImageDataString = $image.cropper("getCroppedCanvas", {
                width: 400,
                height: 400
            }).toDataURL();

            //base64ImageDataString = base64ImageDataString.replace('data:image/png;base64,', '');

            var filename = $image.data('g') + "-crop." + $image.data('ext');

            var params = {
                source: base64ImageDataString,
                filename: filename
            };

            //console.log("base64ToImage", params);



            $("#step3 img").attr("src", base64ImageDataString);
            $("#step4 .right .inner img").attr("src", base64ImageDataString);

            $('#hdnGuid').val(filename);

            $("#step2").hide();
            $("#step3").show();

            // $.ajax({
            //     type: 'POST',
            //     url: '/Upload/WsBase64ToImage',
            //     async: false,
            //     data: params,
            //     success: function (data) {
            //         console.log(data);
            //         $("#step3 img").attr("src", data.htmlFilePath);
            //         $('#hdnGuid').val(data.filename);
            //
            //         $("#step2").hide();
            //         $("#step3").show();
            //     }
            // });
        });



    };


    $("#perfect").click(function (e) {
        e.preventDefault();

        var dateOfBirthIsValid = checkDateOfBirthIn3MonthsAhead();

        if ($("#gallery-image-form").parsley().validate() && dateOfBirthIsValid) {

            //var dateOfBirth = new Date($("#year").val(), $("#month").val(), $("#day").val());
            var dateOfBirth = $("#month").val() + "/" + $("#day").val() + "/" + $("#year").val();
            //console.log(dateOfBirth);

            var params = {
                name        : $('#name').val(),
                dateOfBirth : dateOfBirth,
                parentsName : $('#ParentsName').val(),
                email       : $('#email').val(),
                imageName   : $('#hdnGuid').val()
            };


            var imageSrc = $("#step3 img").attr("src");
            var imageBlock = imageSrc.split(";");
            var contentType = imageBlock[0].split(":")[1];// In this case "image/gif"
            var realData = imageBlock[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."
            var blob = b64toBlob(realData, contentType);
            //blob.name = $('#hdnGuid').val();
            //blob.lastModifiedDate = new Date();
        //    var file = new File([blob], "image");
        //    var xhr = new XMLHttpRequest();
        //     xhr.addEventListener("load", function(event)
        //     {
        //         var response    = JSON.parse(event.target.responseText)
           //
        //         //console.log(response);
           //
        //         var url         = response.base_url + response.transcoded_media_file.url;
        //         var imageName   = response.guid + "." + response.fext;
        //         //$("#step4 .right .inner img").attr("src",response.base_url + response.guid + "." + response.fext);
           //
        //         params.imageName = imageName;
        //         sendBd(params);
        //    });

        //    xhr.addEventListener("error", function(event) {
        //        console.log("error", event);
        //    });
        //    xhr.open("POST", BIRTHDAYS.baseURL+"api/v4/tinypop/birthday/upload?ext=png");
        //    xhr.send(file);

           $.ajax
            ({
                url         : "/wp-json/birthdays/v1/upload-image",
                type        : 'POST',
                crossDomain : true,
                data        : {qqfile:$("#step3 img").attr("src")},
                success     : function (response)
                {
                    if(typeof response === "string")  {  response = JSON.parse(response);  }
                    console.log(response);

                   // var url         = response.base_url + response.transcoded_media_file.url;
                    var imageName   = response.guid + "." + response.fext;

                    params.imageName = imageName;
                    sendBd(params);

                },
                error       : function (result) { console.log(result); }
            });

        }

        applyValidationToMonthAndDay(dateOfBirthIsValid);

    });

    function sendBd(params)
   {
       $.ajax({
           type: 'POST',
           url: "/wp-json/birthdays/v1/entry",
           async: false,
           data: params,
           success: function (data) {
             //  console.log(data);
               $("#step3").hide();
               $("#step4").show();
           }
       });
   }

    function b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || '';
            sliceSize = sliceSize || 512;

            var byteCharacters = atob(b64Data);
            var byteArrays = [];

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);

                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                var byteArray = new Uint8Array(byteNumbers);

                byteArrays.push(byteArray);
            }

          var blob = new Blob(byteArrays, {type: contentType});
          return blob;
    }

    $("#month, #year").change(function () {
        var originalSel = $("#day").val();
        var month       = $("#month").val();
        var year        = $("#year").val();

        var startDay    = 1;
        var endDay      = 31;

        if (month && year && month != "" && year != "") {
            // Ensure select has the correct days
            startDay    = new Date(year, month - 1, 1).getDate();
            endDay      = new Date(year, month, 0).getDate();
        }

        // Clear old days
        $("#day").empty();

        // Add default label
        $("#day")
            .append($("<option></option>")
            .attr("value", "")
            .text("Day"));

        // Add each day
        for (var i = startDay; i < (endDay + 1) ; i++) {
            $("#day")
                .append($("<option></option>")
                .attr("value", i)
                .text(i));
        }

        if (typeof(originalSel) != "undefined")
            $("#day").val(originalSel);
    });

    $("#month, #day").change(function () {

        var dateOfBirthIsValid = checkDateOfBirthIn3MonthsAhead();
        applyValidationToMonthAndDay(dateOfBirthIsValid);
    });

    var applyValidationToMonthAndDay = function (dateOfBirthIsValid) {

        if ($("#month").val() != "" && $("#day").val() != "") {
            if (!dateOfBirthIsValid) {
                $(".date-error-list").show();
                $("#month-wrapper").removeClass("parsley-success");
                $("#day-wrapper").removeClass("parsley-success");
                $("#month-wrapper").addClass("parsley-error");
                $("#day-wrapper").addClass("parsley-error");
            } else {
                $(".date-error-list").hide();
                $("#month-wrapper").removeClass("parsley-error");
                $("#day-wrapper").removeClass("parsley-error");
                $("#month-wrapper").addClass("parsley-success");
                $("#day-wrapper").addClass("parsley-success");
            }
        }
    }

    var checkDateOfBirthIn3MonthsAhead = function () {

        var month       = $("#month").val();
        var day         = $("#day").val();

        if (month.length <= 0 || day.length <= 0)
            return false;

        var dateOfBirth = new Date();

        // Increment month by one until we reach the chosen month
        // This method ensures that if the month is in the new
        // year that it is correctly selected
        while(dateOfBirth.getMonth() != (parseInt(month) - 1))
            dateOfBirth.setMonth(dateOfBirth.getMonth() + 1, day); // month (from 0-11) and day (1-31)

        var currentDate = new Date();
        // you can’t submit a date of birth that’s more than 3 months away
        if (currentDate <= dateOfBirth && currentDate.setMonth(currentDate.getMonth() + 3) >= dateOfBirth) {
            //console.log("true");
            return true;
        }

    //    console.log("false");
        return false;
    }

    //window.ParsleyValidator.addValidator('dateconditionalcheck',
    //    function(value, requirements) {

    //        var day = 0;
    //        var month = 0;

    //        if (requirements == "#day") {
    //            day = $(requirements).val();
    //            month = value;
    //        } else {
    //            month = $(requirements).val();
    //            day = value;
    //        }

    //        return checkDateOfBirthIn3MonthsAhead(month, day);

    //    }, 32);
    //    //.addMessage('en', 'dateconditionalcheck', 'Sorry! We only accept birthdays no more than three months in advance. Please come back nearer to your birthday to submit!');



});
