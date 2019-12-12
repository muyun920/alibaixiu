//用户添加
$('#userForm').on('submit', function() {
	var formdata = $(this).serialize();
    $.ajax({
		type: "post",
		url: "/users",
		data: formdata,
		// dataType: "dataType",
		success: function (response) {
			location.reload();
		},
		error: function(err) {
			var er = JSON.parse(err.responseText);
			// console.log(er);
			alert(er.message)
			
		}
	});
	return false;
});
//用户头像上传
$('#modifyBox').on('change', '#avatar', function() {
	var formData = new FormData();
	formData.append('avatar',this.files[0]);
	$.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		// dataType: "dataType",
		contentType : false,
		processData : false,
		success: function (response) {
			// console.log(response);
			$('#preview').attr('src' , response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar);
		},
		error : function () {
			console.log('错误');
			
		}
	});

});
//获取用户列表
$.ajax({
	type: "get",
	url: "/users",
	success: function (response) {
		// console.log(response);
		var html = template('userTpl', response);
		$('#userBox').html(html)
		
	}
});
//点击用户编辑
$('#userBox').on('click', '.edit',function () {
	var id = $(this).attr('data-id');
	// console.log(id);
	$.ajax({
		type: "get",
		url: "/users/" + id,
		success: function (response) {
			// console.log(response);
			var html =template('modifyTpl', response);
			$('#modifyBox').html(html);
		}
	});
});
//用户修改提交上传
$('#modifyBox').on('submit','#modifyForm', function() {
	var formdata = $(this).serialize();
	var id = $(this).attr('data-id');
	$.ajax({
		type: "put",
		url: "/users/" +id,
		data: formdata,
		success: function (response) {
			location.reload()
		}
	});

});
//点击删除,删除对应用户信息
$('#userBox').on('click', '.del' ,function() {
	var id = $(this).attr('data-id');
	// console.log(id);
	if(confirm('确认删除用户?')) {
		$.ajax({
			type: "delete",
			url: "/users/" +id,
			success: function (response) {
				//重新加载页面 重新显示用户列表
				location.reload()
			}
		});
	}
});
//获取全选按钮
var selectall = $('#selectAll');
selectall.on('click', function() {
	var status = $(this).prop('checked');
	$('#userBox').find('input').prop('checked', status);
});
//当用户前面的复选框发生变化时
$('#userBox').on('change', '#userStatus' ,function() {
	var input = $('#userBox').find('input');
	if (input.length == input.filter(':checked').length) {
		// alert('ok')
		selectall.prop('checked' , true)
	} else {
		// alert('no')
		selectall.prop('checked' , false)
	}
})






















