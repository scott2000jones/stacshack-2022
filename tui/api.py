import requests as r
from typing import List

server_root = "https://saj7.host.cs.st-andrews.ac.uk/gangs/"

def login(user,passw) -> bool:
    if "" in (user,passw): return False
    return (r.get(f'{server_root}login/{user}.{passw}').text) == 'TRUE'

def register(user,passw) -> bool:
    if "" in (user,passw): return False
    return r.get(f'{server_root}register/{user}.{passw}').status_code == 200

def get_user_gangs(user) -> List[str]:
    res = r.get(f'{server_root}teams_for_user/{user}')
    if res.status_code != 200:
        return []
    return [it for it in res.json()]

def get_gang_dms(gang: str):
    res = r.get(f'{server_root}list_dms/{gang}')
    if res.status_code != 200:
        return []
    return [it for it in res.json()]

def create_gang(name: str):
    res = r.get(f'{server_root}create_team/{name}')
    return res.status_code == 200
        
def gang_add_user(gang:str, user: str):
    res = r.get(f'{server_root}add_user_to_team/{gang}.{user}')
    return res.status_code == 200
        
def gang_write(gang: str, user: str, text: str):
    res = r.get(f'{server_root}send_dm/{gang}.{user}.{text}')