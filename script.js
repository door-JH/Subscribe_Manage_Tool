  // activity_modal
  const body = document.querySelector("body");
  const modal_login = document.querySelector(".modal_login_cover");
  const modal_add = document.querySelector(".modal_add_cover");
  const modal_update = document.querySelector(".modal_update_cover");
  const modal_delete = document.querySelector(".modal_delete_cover");
  const modal_save = document.querySelector(".modal_save_cover");



  const btn_Login = document.querySelector("#login_button");
  const btn_Add = document.querySelector("#add_button");
  const btn_Update = document.querySelector("#update_button");
  const btn_Del = document.querySelector("#delete_button");
  const btn_Save = document.querySelector("#save_button");


  const inside_login_btn = document.querySelector("#inside_login_btn");
  const inside_add_btn = document.querySelector("#inside_add_btn");
  const inside_update_btn = document.querySelector("#inside_update_btn");
  const inside_del_btn = document.querySelector("#inside_del_btn");
  const inside_save_btn = document.querySelector("#inside_save_btn");


  const inside_addcal_btn = document.querySelector("#inside_addcal_btn");
  const inside_updatecal_btn = document.querySelector("#inside_updatecal_btn");

  const inside_updatefind_btn = document.querySelector("#update_select_find");
  const inside_deletefind_btn = document.querySelector("#delete_select_find");

  const sample_download_btn = document.querySelector("#sample_download");

  //define input_texts
  var input_texts = document.getElementsByClassName("input_text");

  var key_id = input_texts[0].value;

  var add_service_name = input_texts[1];
  var add_start_date = input_texts[2];
  var add_for_long_month = input_texts[3];
  var add_end_date = input_texts[4];

  var update_service_name = input_texts[5];
  var update_start_date = input_texts[6];
  var update_for_long_month = input_texts[7];
  var update_end_date = input_texts[8];

  var delete_service_name = input_texts[9];

  var save_file_name = input_texts[10];

  //other variables
  var pos = 0;
  var temp_object = [];
  var filename = "";
  var dataUri;
  var sample_object = [];

  var t_start; 
  var t_end;
  var t_now;
  

  //functions
  $(function () {
    $(add_start_date).datepicker();
    $(update_start_date).datepicker();
  });

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  //get remain service_time per
  function get_time_per(start, end){

    t_start = new Date(start).getTime();
    t_end = new Date(end).getTime();
    t_now = new Date().getTime();

    var t_full = Math.floor((t_end - t_start) / (24 * 3600 * 1000));
    var t_chase = Math.floor((t_now - t_start) / (24 * 3600 * 1000));

    var t_per = (t_chase * 100) / t_full;
    return t_per;
  }


  var all_html = "";

  function load_html() {
    all_html = "";
    document.querySelector('.elements_cover').innerHTML = "";
    for (var i = 0; i < temp_object.length; i++) {
      var sub_temp = temp_object[i];
      all_html = all_html +
        '<div class="element">' +
        '<span class = "name">' + sub_temp.service_name + '</span>' +
        '<progress value='+parseInt(get_time_per(sub_temp.start_date, sub_temp.end_date))+' max="100"></progress>' +
        '<span class="per">'+ parseInt(get_time_per(sub_temp.start_date, sub_temp.end_date))+'%</span>' +
        '</div>'
      document.querySelector('.elements_cover').innerHTML = all_html;
    }
  }




  function reset_inputs() {
    for (i = 0; i < input_texts.length; i++) {
      input_texts[i].value = '';
    }
  };

  //openfile
  function openTextFile() {
    var input = document.createElement("input");

    input.type = "file";
    input.accept = ".json";
    input.click();
    input.onchange = function (event) {
      processFile(event.target.files[0]);
    };

    function processFile(file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      reader.onload = function () {
        result_object = JSON.parse(reader.result);
        temp_object = result_object;
        console.log(result_object);

        if (result_object !== null) {
          alert('데이터를 성공적으로 불러왔습니다.');
          document.getElementById("menu_buttons").style.display = "inline-block";
          document.getElementById("login_button").style.display = "none";

          load_html();
        }
      };
    }
  }
  //sample ready
  $(document).ready(function () {
    var sample = JSON.stringify(sample_object, null, "\t");
    dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(sample);
  });
  //sample_download
  sample_download_btn.addEventListener("click", () => {
    $("#sample_download_a").attr("href", dataUri);
    sample_download_btn.style.display = "none";
  });




  //login modal activity

  btn_Login.addEventListener("click", () => {
    openTextFile();
    sample_download_btn.style.display = "none";
  });



  //Add modal activity
  btn_Add.addEventListener("click", () => {
    modal_add.classList.toggle("show");

    if (modal_add.classList.contains("show")) {
      modal_add.style.overflow = "hidden";

    }
  });

  modal_add.addEventListener("click", (event) => {
    if (event.target === modal_add) {
      modal_add.classList.toggle("show");

      if (!modal_add.classList.contains("show")) {
        body.style.overflow = "auto";
        reset_inputs();
      }
    }
  });

  inside_addcal_btn.addEventListener("click", () => {

    var start_date_temp = add_start_date.value;
    var addDate = 30 * add_for_long_month.value;

    var end_date_temp = addDays(start_date_temp, addDate).toISOString();

    console.log(end_date_temp);

    var month = end_date_temp.slice(5, 7);
    var date = end_date_temp.slice(8, 10);
    var year = end_date_temp.slice(0, 4);

    end_date_temp = month + '/' + date + '/' + year;

    input_texts[4].value = end_date_temp;

  });

  inside_add_btn.addEventListener("click", () => {
    //add object

    for (var i = 0; i < temp_object.length; i++) {
      if (temp_object[i].service_name === add_service_name.value) {
        alert("같은 이름의 서비스가 이미 존재합니다.")
        throw "INPUT_SAME_VALUE";

      }
    }
    temp_object.push({
      "service_name": add_service_name.value,
      "start_date": add_start_date.value,
      "end_date": add_end_date.value
    });

    //reset inputs
    reset_inputs();
    console.log(temp_object);
    alert('추가되었습니다.');
    load_html();
  });

  inside_add_btn.addEventListener("click", () => {
    modal_add.classList.remove("show");
  });

  //Update modal activity
  btn_Update.addEventListener("click", () => {
    modal_update.classList.toggle("show");

    if (modal_add.classList.contains("show")) {
      modal_update.style.overflow = "hidden";
    }
  });

  modal_update.addEventListener("click", (event) => {
    if (event.target === modal_update) {
      modal_update.classList.toggle("show");

      if (!modal_update.classList.contains("show")) {
        body.style.overflow = "auto";
        reset_inputs();
      }
    }
  });

  inside_updatecal_btn.addEventListener("click", () => {

    var start_date_temp = update_start_date.value;
    var addDate = 30 * update_for_long_month.value;
    var end_date_temp = addDays(start_date_temp, addDate).toISOString();

    var month = end_date_temp.slice(5, 7);
    var date = end_date_temp.slice(8, 10);
    var year = end_date_temp.slice(0, 4);

    end_date_temp = month + '/' + date + '/' + year;

    input_texts[8].value = end_date_temp;

  });

  inside_updatefind_btn.addEventListener("click", () => {
    object_length = temp_object.length;

    for (var i = 0; i < object_length; i++) {
      console.log(i);
      if (temp_object[i].service_name === update_service_name.value) {
        alert("수정할 서비스를 찾았습니다.");

        pos = i;

        update_start_date.value = temp_object[i].start_date;
        update_end_date.value = temp_object[i].end_date;

        update_start_date.disabled = false;
        update_end_date.disabled = false;
        inside_update_btn.disabled = false;

      }
    }


  });


  inside_update_btn.addEventListener("click", () => {
    modal_update.classList.remove("show");

    temp_object[pos].start_date = update_start_date.value;
    temp_object[pos].end_date = update_end_date.value;

    update_start_date.disabled = false;
    update_end_date.disabled = false;

    reset_inputs();
    console.log(temp_object);
    alert('수정되었습니다.');
    load_html();
  });

  //delete modal activity
  btn_Del.addEventListener("click", () => {
    modal_delete.classList.toggle("show");

    if (modal_delete.classList.contains("show")) {
      modal_delete.style.overflow = "hidden";
    }
  });

  modal_delete.addEventListener("click", (event) => {
    if (event.target === modal_delete) {
      modal_delete.classList.toggle("show");

      if (!modal_delete.classList.contains("show")) {
        body.style.overflow = "auto";
        reset_inputs();
      }
    }
  });

  var object_length = 0;
  inside_deletefind_btn.addEventListener("click", () => {
    object_length = temp_object.length;

    if (delete_service_name.value === "") {
      alert('서비스 이름을 제대로 입력해주세요.');
      throw "NOT_FOUND_ELEMENT";
    }

    for (var i = 0; i < object_length; i++) {
      console.log(i);
      if (temp_object[i].service_name === delete_service_name.value) {
        alert("삭제할 서비스를 찾았습니다.");
        pos = i;
        inside_del_btn.disabled = false;

      }

    }

  });

  inside_del_btn.addEventListener("click", () => {
    modal_delete.classList.remove("show");
    temp_object.pop(pos);
    reset_inputs();
    alert('서비스를 삭제했습니다.');
    inside_del_btn.disabled = true;
    load_html();

  });


  //save modal activity
  btn_Save.addEventListener("click", () => {
    modal_save.classList.toggle("show");

    if (modal_save.classList.contains("show")) {
      modal_save.style.overflow = "hidden";
    }
  });

  modal_save.addEventListener("click", (event) => {
    if (event.target === modal_save) {
      modal_save.classList.toggle("show");

      if (!modal_save.classList.contains("show")) {
        body.style.overflow = "auto";
        reset_inputs();
      }
    }
  });


  save_file_name.addEventListener("keyup", () => {

    filename = save_file_name.value;

    $(document).ready(function () {
      var obj = new Object();
      var obj_s = JSON.stringify(temp_object, null, "\t");
      dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(obj_s);
    });

    document.getElementById("download_file").setAttribute('download', filename + '.json');
    console.log("동작");
  })


  inside_save_btn.addEventListener("click", () => {

    filename = save_file_name.value;

    if (filename === "") {
      alert('파일이름을 입력해주세요.');
      throw "NO_INPUT_TEXT";
    } else {
      $("#download_file").attr("href", dataUri);
    }

    reset_inputs();
  });