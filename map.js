if (Meteor.isClient) {
	Template.store.events({
		'submit #blogForm': function(e) {
			e.preventDefault();
			var title = document.getElementById('pac-input').value;
			var location = document.getElementById('qlist').value;
			var radius = document.getElementById("radiusList").value;
			var day = new Date();
			var date = day.toDateString();
			var time = day.toLocaleTimeString();
			if (title.length && location.length) {
				Meteor.call('submitPost', title, location, radius, date, time, Meteor.userId())
			}
		}
	}),

	Template.store.blogs = function(){
		return Blogs.find({userId : Meteor.userId()});	
	},

	Template.store.events({
		'click .deleteQuery': function(evt, tmpl) {
			Blogs.remove(this._id);
		}
	});
		
		

}