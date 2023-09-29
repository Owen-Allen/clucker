import json
import requests


URL = 'http://localhost:9000'
TOKEN = ''

FETCHER_URL = 'http://api.clucker.club'

headers = {'Content-Type': 'application/json'}


def fetcher():
    # USER
    response = requests.get(f'{FETCHER_URL}/api/user/')
    data = response.json()
    with open('backups/users.json', 'w') as f:
        json.dump(data, f)

    # FOLLOWS
    response = requests.get(f'{FETCHER_URL}/api/follow/')
    data = response.json()
    with open('backups/follows.json', 'w') as f:
        json.dump(data, f)
    
    # CLUCK
    response = requests.get(f'{FETCHER_URL}/api/cluck/')
    data = response.json()
    with open('backups/clucks.json', 'w') as f:
        json.dump(data, f)
    
    # LIKE
    response = requests.get(f'{FETCHER_URL}/api/like/')
    data = response.json()
    with open('backups/likes.json', 'w') as f:
        json.dump(data, f)




    



def post_users(filename):
    f = open(filename)
    data = json.load(f)
    headers = {'Content-Type': 'application/json'}
    for d in data:
        user = {'id': d['id'], 'name': d['name'], 'about':d['about'], 'email':d['email']}
        json_user = json.dumps(user)
        print(json_user)
        response = requests.post(f'{URL}/api/new_user/', data=json_user, headers=headers)
        print(response)


def post_clucks(filename):
    f = open(filename)
    data = json.load(f)
    headers = {'Content-Type': 'application/json'}
    for d in data:
        cluck = {'author': d['author'], 'content': d['content'], 'created_at': d['created_at'], 'id':d['id'] }
        json_cluck = json.dumps(cluck)
        print(json_cluck)
        response = requests.post(f'{URL}/api/cluck_detail/', data=json_cluck, headers=headers)
        print(response)
        print(response.json())
        break


def post_follows(filename):
    f = open(filename)
    data = json.load(f)
    headers = {'Content-Type': 'application/json'}
    for d in data:
        follow = {'user_id':d['user_id'], 'following': d['following']}
        json_data = json.dumps(follow)
        print(json_data)
        response = requests.post(f'{URL}/api/follow_detail/', data=json_data, headers=headers)
        print(response)

def post_likes(filename):
    f = open(filename)
    data = json.load(f)
    headers = {'Content-Type': 'application/json'}
    for d in data:
        like = {'user':d['user'], 'cluck': d['cluck']}
        json_data = json.dumps(like)
        print(json_data)
        response = requests.post(f'{URL}/api/like_detail/', data=json_data, headers=headers)
        print(response)


def post_clucks_and_likes():
    f1 = open('backups/clucks.json')
    f2 = open('backups/likes.json')

    clucks = json.load(f1)
    likes = json.load(f2)
    f1.close()
    f2.close()

    for c in clucks:
        c_old_id = c['id']
        json_cluck = json.dumps(c)
        response = requests.post(f'{URL}/api/cluck_detail/', data=json_cluck, headers=headers)
        if(response.status_code != 201):
            continue
        print(response)
        data = response.json()
        c_new_id = data['id']
        print(c_new_id)

        for l in likes:
            if(l['cluck'] == c_old_id):
                like = {'user':l['user'], 'cluck': c_new_id}
                json_data = json.dumps(like)
                response = requests.post(f'{URL}/api/like_detail/', data=json_data, headers=headers)
                print(response)
                
        

        
post_users('./backups/users.json')
post_follows('./backups/follows.json')
# fetcher()


post_clucks_and_likes()
