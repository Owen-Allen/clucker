

TODO

- Connect frontend & backend         X
- implement feed logic               X
- no spaces or special chars in ids
- create NavBar                      X
- implement context and state for cluck modal [ USING QUERY PARAMS INSTEAD ] X
- connect to google auth             X
- finish cluck design
    - add 'liked by' way to access liked list
    - add a reply button
    - add a tool menu to access (triple dot top right or wheel symbol?)
        - the delete button.
    - add time stamp of date posted

- validate session in layout.tsx

- Profile
    - userid        X
    - name          X
    - about         X
    - followers
    - following
    selector for    X
        - clucks    X
        - likes     
        - replies   


## Key commands

python manage.py runserver        https://docs.djangoproject.com/en/4.2/intro/tutorial01/#the-development-server

### Database Changes
Change your models (in models.py).
- python manage.py makemigrations to create migrations for those changes
- python manage.py migrate to apply those changes to the database.

## Feed Logic
fetch from the user's following as well as their OWN clucks, sort all by created_at

- How do we visualize replies, and the different reply chains?
    - reddit like indentation?
    - 'blocks' like figma demo?


### REPLY LOGIC
- if you follow user x and NOT user y, and x responded to y, x's cluck will be in your feed, and you can click to see the whole feed
- if you follow user x and user y, and x responded to y, x's cluck will not be in your feed? but maybe it should be default uncollapsed?

- (Deletes) if a Cluck is deleted and someone has replied to that Cluck, the reply chain is NOT deleted
        - instead, mark the cluck as is_deleted and we will not display its contents or the user who posted it