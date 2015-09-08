## Terminal ##
1. Install Meteor
1. Install node and npm
2. Install Bower - `sudo npm install -g bower`
3. Install vulcanize - `sudo npm install -g vulcanize`
4. Clone hackernews git repo - `git clone git@github.com:arunhedcet/hackernews.git`
5. `cd hackernews`
6. Install polymer and other dependancies`bower install`
7. Vulcanize polymer components into a single file - `vulcanize -o public/build.html public/pol.html `
8. Run app - `meteor`.

##How to use the app##
1. Landing page is where you have all the posts in chronological order
1. To switch the sorting order from chronological to best rated click on the
	 button named best in the header.
1. You have to sign in to add posts,vote or add comments
1. Title corresponding to the url you have entered will be autofilled when you
	 trigger the input field blur event. ie click somewhere else in the document.
1. Wait for the spinner to stop and then you can choose whether to stick with
	 the default title or change it to something else.
1. Use load more button in the bottom to load more posts

*tkay*

