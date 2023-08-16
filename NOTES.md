

TODO

- Connect frontend to backend X
- implement feed logic X
- no spaces or special characters in id's (later)
- create NavBar X
- implement context and state for cluck modal
- connect to google auth X
    - do i need to add an Authorised redirect url? https://youtu.be/AbUVY16P4Ys?t=530

- finish cluck design
    - 

- Profile
    - userid
    - name
    - about
    - followers
    - following
    selector for
        - clucks
        - liked clucks
        - replies


## Key commands

python manage.py runserver        https://docs.djangoproject.com/en/4.2/intro/tutorial01/#the-development-server

### Database Changes
Change your models (in models.py).
- python manage.py makemigrations to create migrations for those changes
- python manage.py migrate to apply those changes to the database.


### Replies and Deletes
- Q: What happens to the replies to a cluck when a user delete's their cluck
- A: When the cluck is "deleted", the is_deleted is set to True and all of the contents are deleted. The Cluck is NOT removed from the DB so that the linkedlist of replies stays.

## Frontend Ideas
- cluck sound on send cluck?
- top right cluck
- top left profile
- top middle search?

## Feed Logic
fetch from the user's following as well as their OWN clucks, sort all by created_at

- How do we visualize replies, and the different reply chains?
    - reddit like indentation?
    - 'blocks' like figma demo?
    - clicking on a cluck will open a Modal, where you can see the replies

### REPLY LOGIC
- if you follow user x and NOT user y, and x responded to y, x's cluck will be in your feed, and you can click to see the whole feed
- if you follow user x and user y, and x responded to y, x's cluck will not be in your feed? but maybe it should be default uncollapsed?
