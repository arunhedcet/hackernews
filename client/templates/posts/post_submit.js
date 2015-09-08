Template.postSubmit.onCreated(function() {
	Session.set('postSubmitErrors', {});
});

Template.postSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function (field) {
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	},
	urlAjax:function(){
		return !!Session.get('urlAjaxPending');
	}

});
function ValidUrl(str) {
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	if(!pattern.test(str)) {
		return false;
	} else {
		return true;
	}
}
Template.postSubmit.events({
	'blur [name=url]':function(e,template){
		var _this = e.target;
		var url = $(_this).val();
		if(ValidUrl(url)){
			Session.set('urlAjaxPending',"pending");
			$.ajax({
				url: "http://textance.herokuapp.com/title/"+url.replace(/.*?:\/\//g, ""),
				complete: function(data) {
					Session.set('urlAjaxPending',"");
					$('[name=title]').val(data.responseText);
				}
			});

		}
		else{

		}
	},
	'submit form': function(e) {
		e.preventDefault();
		var urlVal = $(e.target).find('[name=url]').val();
		urlVal = urlVal.match(/http:\/\//g)?urlVal : "http://"+urlVal;
		var post = {
			url: urlVal,
			title: $(e.target).find('[name=title]').val()
		};

		var errors = validatePost(post);
		if (errors.title || errors.url)
			return Session.set('postSubmitErrors', errors);

		Meteor.call('postInsert', post, function(error, result) {
			// display the error to the user and abort
			if (error)
				return throwError(error.reason);

			// show this result but route anyway
			if (result.postExists)
				throwError('This link has already been posted');

			Router.go('postPage', {_id: result._id});  
		});
	}
});
