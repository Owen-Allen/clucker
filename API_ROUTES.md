# API ROUTES

The API routes can be found in [/clucker/urls.py](/clucker/urls.py) within the urlpatterns list.
Corresponding functions are in [/coop/views.py](/coop/views.py)



## Fetching User ID
When a user logs in, we need to fetch their id.
```
/api/userid/email=alice@gmail.com
```
The ID is stored in the client side so that when the user likes a cluck or goes to their profile, we know which user liked the cluck etc.


## Fetching a feed
```
/api/feed?id=userID
```
Requires auth token

## Fetching Likes

Checking if a user likes a cluck?
```
/api/like_detail?user=user_id&cluck=cluck_id
```

Getting every like on a cluck?
```
/api/like_detail?cluck=cluck_id
```

Getting every like that a user has made?
```
/api/like_detail?user=user_id
```

### Liking and unliking
Send JSON of the user"s id and the cluck id. Use POST to like, delete to unlike.


```json
{
	"method": "POST",
	"headers": { "Content-Type": "application/json" },
	"body": { "user": "owen", "cluck": 32 }
}
```

Will return a 200 for a successful like, 204 for successful delete.

Same logic for likes is applied for **Follow** and /api/follow_detail

## Fetching all of a User"s Clucks

```
/api/clucks_author?author=user_id
```
## Fetching a specific Cluck (or all clucks)

Want all clucks?
```
/api/cluck/
```

Get a cluck by id?


```
/api/cluck/770/
```

## Creating a Cluck

To create a cluck

```/api/cluck_detail```

```json
{
    "method": "POST",
    "headers": { "Content-Type": "application/json" },
    "body": { "author": "owen", "content": "Hello Clucker!" }
}
```


## Deleting a Cluck?

To delete a cluck, send a delete request to
```
/api/cluck/cluck_id/
```
## Creating an account
Send a POST request to, with the id, name and email of the new user.

```
/api/new_user/
```

```
{
	"method: "POST",
	"headers": { "Content-Type": "application/json" },
	"body": { "id": "owen", "name": "o'dawg", "email": "owen@email.com"}
}
```

You can use api/email_available/ and api/id_available/ if you want to verify that the email and id within the signup step, or have a dynamic form. 
