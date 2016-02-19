import socket

DEBUG = True if socket.getfqdn().startswith('127.0.0.1') else False
SECRET_KEY = '3tJhmR0XFbSOUG02Wpp7'
CSRF_ENABLED = True
CSRF_SESSION_LKEY = 'e8uXRmxo701QarZiXxGf'
