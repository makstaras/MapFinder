Meteor.startup(function() {
    if (Meteor.users.find().fetch().length === 0) {
        var users = [{
            name: 'Customer Service',
            email: 'cs@home.com',
            roles: ['view-projects', 'view-customers']
        }, {
            name: 'Admin Super User',
            email: 'admin@home.com',
            roles: ['admin']
        }];
        _.each(users, function(userData) {
            var userid = Accounts.createUser({
                email: userData.email,
                password: 'mytest1',
                username: userData.email,
                profile: {
                    name: userData.name
                }
            })
            Meteor.users.update({
                _id: userid
            }, {
                $set: {
                    'emails.0.verified': true
                }
            });
            Roles.addUsersToRoles(userid, userData.roles);
        })
    }
});

Meteor.methods({
    'submitPost': function(title, location, radius, date, time) {
        Blogs.insert({
            title: title,
            location: location,
            radius: radius,
            date: date,
            time: time,
			userId: Meteor.userId()
        });
    }
});